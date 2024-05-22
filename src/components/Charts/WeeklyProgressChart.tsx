import { useState, useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { VictoryChart, VictoryBar } from "victory-native";
import { getDay, format, subDays } from "date-fns";
import {
  Gesture,
  GestureDetector,
  Directions,
} from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import { useAuth } from "../../store/auth-context";
import { getCurrentWeekDay, getPastWeekDays } from "../../utils/date";
import { getDailyProgress } from "../../api/trackerData";
import { useData } from "../../store/data-context";
import { colors } from "../../ui/constants/colors";

export const WeeklyProgressChart = () => {
  const [weeklyProgress, setWeeklyProgress] = useState<null | any[]>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pastWeeks, setPastWeeks] = useState(0);
  const [toFormatted, setToFormatted] = useState("");
  const [fromFormatted, setFromFormatted] = useState("");

  const { userData } = useAuth();
  const { dailyProgress } = useData();

  const handlePreviousWeek = () => {
    setPastWeeks((prevState) => prevState + 1);
  };

  const handleNextWeek = () => {
    setPastWeeks((prevState) => prevState - 1);
  };

  const flingRightGesture = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onEnd(() => {
      runOnJS(handlePreviousWeek)();
    });

  const flingLeftGesture = Gesture.Fling()
    .direction(Directions.LEFT)
    .onEnd(() => {
      if (pastWeeks > 0) {
        runOnJS(handleNextWeek)();
      } else {
        return;
      }
    });

  const combinedGestures = Gesture.Simultaneous(
    flingRightGesture,
    flingLeftGesture
  );

  const currentDayNumber = getDay(new Date());
  const currentDay = getCurrentWeekDay(currentDayNumber);

  const getWeeklyProgress = async () => {
    try {
      setIsLoading(true);
      const today = new Date();
      const weekDays = [];

      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        if (pastWeeks > 0) {
          date.setDate(today.getDate() - 7 * pastWeeks - i);
        } else {
          date.setDate(today.getDate() - i);
        }
        weekDays.push(format(date, "dd-MM-yyyy"));
        console.log(weekDays);
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

  const handleSetFormattedDate = () => {
    if (pastWeeks > 0) {
      const to = subDays(new Date(), 7 * pastWeeks);
      const toDateFormatted = format(to, "dd.MM");
      const from = subDays(to, 6);
      const fromDateFormatted = format(from, "dd.MM");
      setToFormatted(toDateFormatted);
      setFromFormatted(fromDateFormatted);
    } else {
      const to = new Date();
      const toFormatted = format(to, "dd.MM");
      const from = subDays(to, 6);
      const fromFormatted = format(from, "dd.MM");
      setToFormatted(toFormatted);
      setFromFormatted(fromFormatted);
    }
  };

  useEffect(() => {
    handleSetWeeklyProgress();
    handleSetFormattedDate();
    console.log(pastWeeks);
  }, [dailyProgress, pastWeeks]);

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
    <GestureDetector gesture={combinedGestures}>
      <View>
        <Text style={styles.text}>Your week statistics:</Text>
        <Text style={styles.date}>
          {fromFormatted} - {toFormatted}
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
    </GestureDetector>
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
