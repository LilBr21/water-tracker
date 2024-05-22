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
  dailyGoal: number;
}

export const DailyProgressChart = ({ drankAmount, dailyGoal }: IProps) => {
  const [chartData, setChartData] = useState(0);
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const { currentOrientation } = useOrientation();
  const isPortrait = currentOrientation === Orientation.PORTRAIT;

  useEffect(() => {
    const percentage = (drankAmount / dailyGoal) * 100;
    setChartData(percentage);
  }, [drankAmount, dailyGoal]);

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
            { x: 1, y: chartData },
            { x: 2, y: 100 - chartData },
          ]}
          innerRadius={isPortrait ? 120 : 55}
          cornerRadius={0}
          labels={() => null}
          style={{
            data: {
              fill: ({ datum }) => {
                const color =
                  chartData > 100
                    ? colors.successPrimary
                    : colors.actionPrimary;
                return datum.x === 1 ? color : colors.lightPrimary;
              },
            },
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
          text={`${Math.round(chartData)}%`}
          style={{
            fontSize: isPortrait ? 40 : 32,
            fill: `${
              chartData > 100 ? colors.successPrimary : colors.actionPrimary
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
