import { useState, useEffect } from "react";
import { View, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { getDay } from "date-fns";
import { useAuth } from "../../store/auth-context";
import { getCurrentWeekDay, getPastWeekDays } from "../../utils/date";
import { getWeeklyProgress } from "../../utils/trackerData";
import { colors } from "../constants/colors";

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

export const WeeklyProgressChart = () => {
  const [weeklyProgress, setWeeklyProgress] = useState<any[]>([]);
  const { userData } = useAuth();

  const currentDayNumber = getDay(new Date());
  const currentDay = getCurrentWeekDay(currentDayNumber);

  const fetchWeeklyProgress = async () => {
    const progressData = await getWeeklyProgress(userData.userId);
    setWeeklyProgress(progressData);
  };

  useEffect(() => {
    fetchWeeklyProgress();
  }, [userData.userId]);

  const data = {
    labels: getPastWeekDays(currentDay),
    datasets: [
      {
        data: weeklyProgress,
      },
    ],
  };

  const windowWidth = Dimensions.get("window").width;

  return (
    <View>
      <BarChart
        data={data}
        width={windowWidth}
        height={220}
        yAxisLabel=""
        yAxisSuffix="ml"
        chartConfig={chartConfig}
        verticalLabelRotation={30}
        fromZero
      />
    </View>
  );
};
