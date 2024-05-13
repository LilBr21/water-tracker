import { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { getDay } from "date-fns";
import { useAuth } from "../../store/auth-context";
import { getCurrentWeekDay, getPastWeekDays } from "../../utils/date";
import { getWeeklyProgress } from "../../utils/trackerData";
import { colors } from "../constants/colors";

const chartConfig = {
  backgroundGradientFrom: colors.darkPrimary,
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: colors.darkPrimary,
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `rgba(118, 192, 210, ${opacity})`,
  strokeWidth: 1,
  barPercentage: 1,
  useShadowColorFromDataset: false,
  decimalPlaces: 0,
};

export const WeeklyProgressChart = () => {
  const [weeklyProgress, setWeeklyProgress] = useState<any[]>([]);
  const { userData } = useAuth();

  const currentDayNumber = getDay(new Date());
  const currentDay = getCurrentWeekDay(currentDayNumber);

  const fetchWeeklyProgress = async () => {
    const progressData = await getWeeklyProgress(userData.userId);
    setWeeklyProgress(progressData.reverse());
  };

  useEffect(() => {
    fetchWeeklyProgress();
  }, [userData.userId]);

  const data = {
    labels: getPastWeekDays(currentDay).reverse(),
    datasets: [
      {
        data: weeklyProgress,
      },
    ],
  };

  const windowWidth = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your last week statistics:</Text>
      <View style={styles.chartContainer}>
        <BarChart
          data={data}
          width={windowWidth - 20}
          height={300}
          yAxisLabel=""
          yAxisSuffix="&nbsp;ml"
          chartConfig={chartConfig}
          verticalLabelRotation={0}
          fromZero
          showValuesOnTopOfBars
          withHorizontalLabels={false}
          withInnerLines={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  chartContainer: {
    flex: 1,
  },
  text: {
    color: colors.lightPrimary,
    fontSize: 16,
    margin: 16,
  },
});
