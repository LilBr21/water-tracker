import { useState, useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { VictoryChart, VictoryBar } from "victory-native";
import { getDay, format, subDays, set } from "date-fns";
import { useAuth } from "../../store/auth-context";
import { getCurrentWeekDay, getPastWeekDays } from "../../utils/date";
import { getDailyProgress } from "../../api/trackerData";
import { useData } from "../../store/data-context";
import { colors } from "../constants/colors";

export const WeeklyProgressChart = () => {
  const [weeklyProgress, setWeeklyProgress] = useState<null | any[]>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { userData } = useAuth();
  const { dailyProgress } = useData();

  const currentDayNumber = getDay(new Date());
  const currentDay = getCurrentWeekDay(currentDayNumber);

  const getWeeklyProgress = async () => {
    try {
      setIsLoading(true);
      const today = new Date();
      const weekDays = [];

      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        weekDays.push(format(date, "dd-MM-yyyy"));
      }

      const weeklyProgressData = [];

      for (const day of weekDays) {
        const progress = await getDailyProgress(userData.userId, day);
        weeklyProgressData.push(progress);
      }

      return weeklyProgressData;
    } catch (error) {
      throw new Error(`Failed to fetch weekly progress, ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetWeeklyProgress = async () => {
    const weeklyProgressData = await getWeeklyProgress();
    if (weeklyProgressData && weeklyProgressData.length > 0) {
      setWeeklyProgress(weeklyProgressData);
    }
  };

  useEffect(() => {
    handleSetWeeklyProgress();
  }, [dailyProgress]);

  const generateData = () => {
    if (!weeklyProgress) {
      return [];
    }
    return weeklyProgress.map((day, index) => {
      return {
        x: getPastWeekDays(currentDay)[index],
        y: day,
        label: day,
      };
    });
  };

  const todayFormatted = format(new Date(), "dd.MM");
  const sixDaysAgo = subDays(new Date(), 6);
  const sixDaysAgoFormatted = format(sixDaysAgo, "dd.MM");

  const chartTheme = {
    axis: {
      style: {
        axis: {
          fill: colors.lightPrimary,
          stroke: colors.lightPrimary,
        },
        tickLabels: {
          fill: colors.lightPrimary,
        },
        grid: {
          fill: "rgba(254, 250, 246, 0.1)",
          stroke: "rgba(254, 250, 246, 0.1)",
          pointerEvents: "painted",
        },
      },
    },
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color={colors.lightPrimary} />;
  }

  return (
    <View>
      <Text style={styles.text}>Your last week statistics:</Text>
      <Text style={styles.date}>
        {sixDaysAgoFormatted} - {todayFormatted}
      </Text>
      <View style={styles.chartContainer}>
        <VictoryChart theme={chartTheme} domainPadding={{ x: 15 }}>
          <VictoryBar
            data={generateData().reverse()}
            style={{
              data: { fill: colors.actionPrimary },
              labels: { fill: colors.lightPrimary },
            }}
          />
        </VictoryChart>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
  },
  text: {
    color: colors.lightPrimary,
    fontSize: 16,
    margin: 16,
    textAlign: "center",
  },
  date: {
    color: colors.lightPrimary,
    fontSize: 16,
    textAlign: "center",
  },
});
