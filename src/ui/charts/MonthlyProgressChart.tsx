import { useState, useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { VictoryChart, VictoryBar } from "victory-native";
import { format, subDays } from "date-fns";
import { useAuth } from "../../store/auth-context";
import { getDailyProgress } from "../../api/trackerData";
import { useData } from "../../store/data-context";
import { colors } from "../constants/colors";

export const MonthlyProgressChart = () => {
  const [monthlyProgress, setMonthlyProgress] = useState<null | any[]>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { userData } = useAuth();
  const { dailyProgress } = useData();

  const today = new Date();
  const dayOfTheMonth = parseInt(format(today, "d"));

  const getMonthlyProgress = async () => {
    try {
      setIsLoading(true);
      const monthDays = [];

      for (let i = 0; i < dayOfTheMonth; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        monthDays.push(format(date, "dd-MM-yyyy"));
      }

      const monthlyProgressData = [];

      for (const day of monthDays) {
        const progress = await getDailyProgress(userData.userId, day);
        monthlyProgressData.push(progress);
      }

      return monthlyProgressData.reverse();
    } catch (error) {
      throw new Error(`Failed to fetch weekly progress, ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetMonthlyProgress = async () => {
    const monthlyProgressData = await getMonthlyProgress();
    if (monthlyProgressData && monthlyProgressData.length > 0) {
      setMonthlyProgress(monthlyProgressData);
    }
  };

  useEffect(() => {
    handleSetMonthlyProgress();
  }, [dailyProgress]);

  const generateData = () => {
    if (!monthlyProgress) {
      return [];
    }
    return monthlyProgress.map((day, index) => {
      return {
        x: index + 1,
        y: day,
        label: day,
      };
    });
  };

  const todayFormatted = format(new Date(), "dd.MM");
  const monthStart = subDays(new Date(), dayOfTheMonth - 1);
  const monthStartFormatted = format(monthStart, "dd.MM");

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
      <Text style={styles.text}>Your current month statistics:</Text>
      <Text style={styles.date}>
        {monthStartFormatted} - {todayFormatted}
      </Text>
      <View>
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
