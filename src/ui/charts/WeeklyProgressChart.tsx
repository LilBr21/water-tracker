import { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import { VictoryChart, VictoryBar, VictoryAxis } from "victory-native";
import { getDay } from "date-fns";
import { useAuth } from "../../store/auth-context";
import { getCurrentWeekDay, getPastWeekDays } from "../../utils/date";
import { getWeeklyProgress } from "../../utils/trackerData";
import { colors } from "../constants/colors";

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

  const generateData = () => {
    return weeklyProgress.map((day, index) => {
      return {
        x: getPastWeekDays(currentDay)[index],
        y: day,
        label: day,
      };
    });
  };

  console.log(generateData());

  const windowWidth = Dimensions.get("window").width;

  const chartTheme = {
    axis: {
      style: {
        axis: {
          fill: colors.lightPrimary,
          stroke: colors.lightPrimary,
        },
        tickLabels: {
          // this changed the color of my numbers to white
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
    <View style={styles.container}>
      <Text style={styles.text}>Your last week statistics:</Text>
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
