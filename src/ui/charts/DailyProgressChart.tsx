import { View, Dimensions, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { ProgressChart } from "react-native-chart-kit";
import { colors } from "../constants/colors";

interface IProps {
  drankAmount: number;
  dailyGoal: number;
}

const chartConfig = {
  backgroundGradientFrom: colors.darkPrimary,
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: colors.darkPrimary,
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `rgba(118, 192, 210, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.9,
  useShadowColorFromDataset: false,
};

export const DailyProgressChart = ({ drankAmount, dailyGoal }: IProps) => {
  const [chartData, setChartData] = useState(0);
  const windowWidth = Dimensions.get("window").width;

  useEffect(() => {
    const percentage = drankAmount / dailyGoal;
    setChartData(percentage);
  }, [drankAmount, dailyGoal]);

  return (
    <View style={styles.container}>
      <ProgressChart
        data={{ data: [chartData] }}
        width={windowWidth - 32}
        height={260}
        strokeWidth={16}
        radius={32}
        chartConfig={chartConfig}
        hideLegend={false}
      />
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
