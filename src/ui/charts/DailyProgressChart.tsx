import { View, StyleSheet, useWindowDimensions } from "react-native";
import { useEffect, useState } from "react";
import {
  VictoryPie,
  VictoryChart,
  VictoryLabel,
  VictoryAxis,
} from "victory-native";
import { colors } from "../constants/colors";

interface IProps {
  drankAmount: number;
  dailyGoal: number;
}

export const DailyProgressChart = ({ drankAmount, dailyGoal }: IProps) => {
  const [chartData, setChartData] = useState(0);
  const { width: windowWidth } = useWindowDimensions();

  useEffect(() => {
    const percentage = (drankAmount / dailyGoal) * 100;
    setChartData(percentage);
  }, [drankAmount, dailyGoal]);

  return (
    <View style={styles.container}>
      <VictoryChart height={windowWidth - 40} width={windowWidth - 40}>
        <VictoryPie
          standalone={false}
          animate={{ duration: 1000 }}
          width={windowWidth - 40}
          height={windowWidth - 40}
          data={[
            { x: 1, y: chartData },
            { x: 2, y: 100 - chartData },
          ]}
          innerRadius={120}
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
          x={200}
          y={200}
          text={`${Math.round(chartData)}%`}
          style={{
            fontSize: 45,
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
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
