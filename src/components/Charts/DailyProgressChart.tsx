import { View, StyleSheet, useWindowDimensions } from "react-native";
import { useEffect, useState } from "react";
import {
  VictoryPie,
  VictoryChart,
  VictoryLabel,
  VictoryAxis,
} from "victory-native";
import { useOrientation, Orientation } from "../../hooks/useOrientation";
import { colors } from "../../ui/constants/colors";

interface IProps {
  drankAmount: number;
  drankWater: number;
  drankJuice: number;
  drankCoffee: number;
  dailyGoal: number;
}

export const DailyProgressChart = ({
  drankAmount,
  drankWater,
  drankJuice,
  drankCoffee,
  dailyGoal,
}: IProps) => {
  const [chartData, setChartData] = useState({
    water: 0,
    juice: 0,
    coffee: 0,
  });
  const [drankInTotal, setDrankInTotal] = useState(0);
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const { currentOrientation } = useOrientation();
  const isPortrait = currentOrientation === Orientation.PORTRAIT;

  useEffect(() => {
    const waterPercentage = (drankWater / dailyGoal) * 100;
    const juicePercentage = (drankJuice / dailyGoal) * 100;
    const coffeePercentage = (drankCoffee / dailyGoal) * 100;
    setChartData({
      water: waterPercentage,
      juice: juicePercentage,
      coffee: coffeePercentage,
    });

    setDrankInTotal((drankAmount / dailyGoal) * 100);
  }, [drankAmount, dailyGoal, drankWater, drankJuice, drankCoffee]);

  return (
    <View style={styles.container}>
      <VictoryChart
        height={isPortrait ? windowWidth - 40 : windowHeight - 200}
        width={isPortrait ? windowWidth - 40 : windowHeight - 200}
      >
        <VictoryPie
          standalone={false}
          animate={{ duration: 1000 }}
          data={[
            { x: 1, y: chartData.water, color: colors.actionPrimary },
            { x: 2, y: chartData.juice, color: colors.orangePrimary },
            { x: 3, y: chartData.coffee, color: colors.brownPrimary },
            { x: 4, y: 100 - drankInTotal, color: colors.lightPrimary },
          ]}
          innerRadius={isPortrait ? 120 : 55}
          cornerRadius={0}
          labels={() => null}
          style={{
            data: { fill: (d) => d.datum.color },
          }}
        />
        <VictoryAxis
          style={{
            axis: { stroke: "transparent" },
            ticks: { stroke: "transparent" },
            tickLabels: { fill: "transparent" },
          }}
        />
        <VictoryLabel
          textAnchor="middle"
          verticalAnchor="middle"
          x={isPortrait ? 200 : 112}
          y={isPortrait ? 200 : 112}
          text={`${Math.round(drankInTotal)}%`}
          style={{
            fontSize: isPortrait ? 40 : 32,
            fill: `${
              drankInTotal > 100 ? colors.successPrimary : colors.actionPrimary
            }`,
          }}
        />
      </VictoryChart>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
