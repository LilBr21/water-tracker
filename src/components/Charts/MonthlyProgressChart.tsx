import { useState, useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { VictoryChart, VictoryBar } from "victory-native";
import {
  Gesture,
  GestureDetector,
  Directions,
} from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import { format, subDays, getDaysInMonth } from "date-fns";
import { useAuth } from "../../store/auth-context";
import { getDailyProgress } from "../../api/trackerData";
import { useData } from "../../store/data-context";
import { colors } from "../../ui/constants/colors";

export const MonthlyProgressChart = () => {
  const [monthlyProgress, setMonthlyProgress] = useState<null | any[]>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [chosenMonth, setChosenMonth] = useState(
    parseInt(format(new Date(), "M"))
  );
  const [chosenYear, setChosenYear] = useState(
    parseInt(format(new Date(), "yyyy"))
  );

  const { userData } = useAuth();
  const { dailyProgress } = useData();

  const handlePreviousMonth = () => {
    if (chosenMonth - 1 === 0) {
      setChosenMonth(12);
      setChosenYear(chosenYear - 1);
    } else {
      setChosenMonth(chosenMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (chosenMonth === parseInt(format(new Date(), "M"))) {
      return;
    }
    if (chosenMonth + 1 === 13) {
      setChosenMonth(1);
      setChosenYear(chosenYear + 1);
    } else {
      setChosenMonth(chosenMonth + 1);
    }
  };

  const flingRightGesture = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onEnd(() => {
      runOnJS(handlePreviousMonth)();
    });

  const flingLeftGesture = Gesture.Fling()
    .direction(Directions.LEFT)
    .onEnd(() => {
      runOnJS(handleNextMonth)();
    });

  const combinedGestures = Gesture.Simultaneous(
    flingRightGesture,
    flingLeftGesture
  );

  const getMonthlyProgress = async () => {
    try {
      setIsLoading(true);
      const monthDays = [];

      for (
        let i = 0;
        i < getDaysInMonth(new Date(chosenYear, chosenMonth - 1));
        i++
      ) {
        const date = new Date(chosenYear, chosenMonth - 1);
        date.setDate(i + 1);
        monthDays.push(format(date, "dd-MM-yyyy"));
      }

      const monthlyProgressData = [];

      for (const day of monthDays) {
        const progress = await getDailyProgress(userData.userId, day);
        monthlyProgressData.push(progress);
      }

      return monthlyProgressData;
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
  }, [dailyProgress, chosenMonth, chosenYear]);

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
        <Text style={styles.text}>Your current month statistics:</Text>
        <Text style={styles.date}>
          {chosenMonth} {chosenYear}
        </Text>
        <View>
          <VictoryChart theme={chartTheme} domainPadding={{ x: 15 }}>
            <VictoryBar
              data={generateData()}
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
