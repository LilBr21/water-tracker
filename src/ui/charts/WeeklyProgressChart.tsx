import { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { VictoryChart, VictoryBar } from "victory-native";
import { getDay, format, subDays } from "date-fns";
import { useAuth } from "../../store/auth-context";
import { getCurrentWeekDay, getPastWeekDays } from "../../utils/date";
import { getWeeklyProgress } from "../../api/trackerData";
import { useGetWeeklyProgress } from "../../hooks/useData";
import { colors } from "../constants/colors";

export const WeeklyProgressChart = () => {
  const { userData } = useAuth();
  const { weeklyProgressData } = useGetWeeklyProgress(userData.userId);
  console.log(weeklyProgressData);

  const currentDayNumber = getDay(new Date());
  const currentDay = getCurrentWeekDay(currentDayNumber);

  const generateData = () => {
    return weeklyProgressData.reverse().map((day, index) => {
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
