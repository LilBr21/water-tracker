import { View, StyleSheet, useWindowDimensions, Text } from "react-native";
import { useEffect, useState } from "react";
import {
  VictoryPie,
  VictoryChart,
  VictoryLabel,
  VictoryAxis,
} from "victory-native";
import { useOrientation, Orientation } from "../../hooks/useOrientation";
import Star from "../../assets/star.svg";
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

  const isGoalCompleted = drankInTotal > 100;

  const waterColor = isGoalCompleted
    ? colors.successPrimary
    : colors.actionPrimary;
  const juiceColor = isGoalCompleted
    ? colors.successPrimary
    : colors.orangePrimary;
  const coffeeColor = isGoalCompleted
    ? colors.successPrimary
    : colors.brownPrimary;

  return (
    <View style={styles.container}>
      {isGoalCompleted && (
        <View style={styles.congratsContainer}>
          <Star width="64" height="64" />
          <Text style={styles.text}>Congrats! Goal completed</Text>
        </View>
      )}
      <VictoryChart
        height={isPortrait ? windowWidth - 40 : windowHeight - 200}
        width={isPortrait ? windowWidth - 40 : windowHeight - 200}
      >
        <VictoryPie
          standalone={false}
          animate={{ duration: 1000 }}
          data={[
            { x: 1, y: chartData.water, color: waterColor },
            { x: 2, y: chartData.juice, color: juiceColor },
            { x: 3, y: chartData.coffee, color: coffeeColor },
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
              isGoalCompleted ? colors.successPrimary : colors.actionPrimary
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
  congratsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 16,
  },
  text: {
    color: colors.darkPrimary,
    fontSize: 16,
    fontWeight: "bold",
  },
});
