import { useState, useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { VictoryChart, VictoryBar } from "victory-native";
import {
  Gesture,
  GestureDetector,
  Directions,
} from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import { format, getDaysInMonth } from "date-fns";
import { colors } from "../../ui/constants/colors";
import { getMonthlyProgressThunk } from "../../actions/data";
import { AppDispatch } from "../../store/store";
import { RootAuthState, RootDataState } from "../../interfaces/store";

export const MonthlyProgressChart = () => {
  const [monthlyProgress, setMonthlyProgress] = useState<null | any[]>(null);
  const [chosenMonth, setChosenMonth] = useState(
    parseInt(format(new Date(), "M"))
  );
  const [chosenYear, setChosenYear] = useState(
    parseInt(format(new Date(), "yyyy"))
  );
  const [showNoData, setShowNoData] = useState(false);

  const userId = useSelector((state: RootAuthState) => state.auth.userId);

  const dailyProgress = useSelector(
    (state: RootDataState) => state.data.dailyProgress
  );

  const dispatch = useDispatch<AppDispatch>();

  const monthlyProgressData = useSelector(
    (state: RootDataState) => state.data.monthlyProgress
  );

  const isMonthlyProgressLoading = useSelector(
    (state: RootDataState) => state.data.isMonthlyProgressLoading
  );

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

  const getMonthlyProgress = (data: any, daysInMonth: number) => {
    const result = Array(daysInMonth).fill(0);

    const dataArray: any = [];
    Object.keys(data).forEach((date) => {
      Object.keys(data[date]).forEach((beverage) => {
        dataArray.push({
          date: date,
          beverage: beverage,
          progress: data[date][beverage].progress,
        });
      });
    });

    for (let day = 1; day <= daysInMonth; day++) {
      const dayStr = day.toString().padStart(2, "0");
      const monthStr = chosenMonth.toString().padStart(2, "0");
      const dateKey = `${dayStr}-${monthStr}-2024`;

      const dayEntries = dataArray.filter(
        (entry: { date: string }) => entry.date === dateKey
      );

      const totalProgress = dayEntries.reduce(
        (sum: any, entry: { progress: any }) => sum + entry.progress,
        0
      );

      result[day - 1] = totalProgress;
    }

    return result;
  };

  useEffect(() => {
    const year = chosenYear.toString();
    const month = (chosenMonth - 1).toString();
    dispatch(getMonthlyProgressThunk({ userId, year, month }));
  }, [dailyProgress, chosenMonth, chosenYear]);

  useEffect(() => {
    if (monthlyProgressData) {
      setShowNoData(false);
      const daysInMonth = getDaysInMonth(new Date(chosenYear, chosenMonth - 1));
      const newMonthlyProgressData = getMonthlyProgress(
        monthlyProgressData,
        daysInMonth
      );
      setMonthlyProgress(newMonthlyProgressData);
    } else {
      setShowNoData(true);
    }
  }, [monthlyProgressData]);

  const generateData = () => {
    if (!monthlyProgress) {
      return [];
    }
    return monthlyProgress.map((day, index) => {
      return {
        x: index + 1,
        y: day === 0 ? "" : day,
        label: day === 0 ? "" : day,
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

  if (isMonthlyProgressLoading === "pending") {
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
          {showNoData ? (
            <Text style={styles.text}>No data for this month</Text>
          ) : (
            <VictoryChart theme={chartTheme} domainPadding={{ x: 15 }}>
              <VictoryBar
                data={generateData()}
                style={{
                  data: { fill: colors.actionPrimary },
                  labels: { fill: colors.lightPrimary },
                }}
              />
            </VictoryChart>
          )}
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
