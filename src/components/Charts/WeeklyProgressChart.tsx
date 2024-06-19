import { useState, useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import { VictoryChart, VictoryBar, VictoryStack } from "victory-native";
import { getDay, format, subDays, getMonth, getYear } from "date-fns";
import {
  Gesture,
  GestureDetector,
  Directions,
} from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import { getCurrentWeekDay, getPastWeekDays } from "../../utils/date";
import { getWeekDayDetailsIndex } from "../../utils/data";
import { getDailyProgress } from "../../api/trackerData";
import { colors } from "../../ui/constants/colors";
import { RootAuthState, RootDataState } from "../../interfaces/store";
import { IDayDetails } from "../Statistics/Statistics";

interface IProps {
  handleSetDayDetails: (dayDetails: IDayDetails) => void;
  handleViewDayDetails: () => void;
}

export const WeeklyProgressChart = ({
  handleSetDayDetails,
  handleViewDayDetails,
}: IProps) => {
  const [weeklyProgress, setWeeklyProgress] = useState<null | any[]>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pastWeeks, setPastWeeks] = useState(0);
  const [toFormatted, setToFormatted] = useState("");
  const [fromFormatted, setFromFormatted] = useState("");
  const [totalProgress, setTotalProgress] = useState<null | number[]>(null);

  const year = getYear(new Date()).toString();
  const month = getMonth(new Date()).toString();

  const userId = useSelector((state: RootAuthState) => state.auth.userId);
  const token = useSelector((state: RootAuthState) => state.auth.token);

  const dailyProgress = useSelector(
    (state: RootDataState) => state.data.dailyProgress
  );

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
      }

      const weeklyProgressData = [];

      for (const day of weekDays) {
        const progress = await getDailyProgress(
          userId,
          year,
          month,
          day,
          token
        );
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
      const formattedProgress = weeklyProgressData.map(
        (day) => day.coffee + day.juice + day.water
      );
      setTotalProgress(formattedProgress);
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
  }, [dailyProgress, pastWeeks]);

  const generateData = () => {
    if (!weeklyProgress) {
      return [];
    }

    console.log(weeklyProgress);

    return weeklyProgress.flatMap((day, index) => {
      const xValue = getPastWeekDays(currentDay)[index];
      console.log("xValue", xValue, index);
      return Object.keys(day).map((key) => {
        return {
          x: xValue,
          y: day[key],
        };
      });
    });
  };

  const showNoData =
    totalProgress?.length === 0 ||
    !totalProgress ||
    totalProgress.every((day) => day === 0);

  const chartTheme = {
    axis: {
      style: {
        axis: {
          fill: colors.lightPrimary,
          stroke: colors.darkPrimary,
        },
        tickLabels: {
          fill: colors.darkPrimary,
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
    return <ActivityIndicator size="large" color={colors.darkPrimary} />;
  }

  return (
    <GestureDetector gesture={combinedGestures}>
      <View>
        <Text style={styles.text}>Your week statistics:</Text>
        <Text style={styles.date}>
          {fromFormatted} - {toFormatted}
        </Text>
        <View>
          {showNoData ? (
            <Text style={styles.text}>No data for this week</Text>
          ) : (
            <VictoryChart theme={chartTheme} domainPadding={{ x: 15 }}>
              <VictoryStack
                colorScale={[
                  `${colors.brownPrimary}`,
                  `${colors.orangePrimary}`,
                  `${colors.actionPrimary}`,
                ]}
              >
                {generateData()
                  .reverse()
                  .map((day, i) => (
                    <VictoryBar
                      key={i}
                      data={[day]}
                      events={[
                        {
                          target: "data",
                          eventHandlers: {
                            onPress: () => {
                              console.log("pressed", day, i);
                              console.log(getWeekDayDetailsIndex(i));
                              const dayName =
                                getPastWeekDays(currentDay)[
                                  getWeekDayDetailsIndex(i) ?? 0
                                ];
                              handleSetDayDetails({
                                day: dayName,
                                water: weeklyProgress
                                  ? weeklyProgress[
                                      getWeekDayDetailsIndex(i) ?? 0
                                    ].water
                                  : 0,
                                juice: weeklyProgress
                                  ? weeklyProgress[
                                      getWeekDayDetailsIndex(i) ?? 0
                                    ].juice
                                  : 0,
                                coffee: weeklyProgress
                                  ? weeklyProgress[
                                      getWeekDayDetailsIndex(i) ?? 0
                                    ].coffee
                                  : 0,
                              });
                              handleViewDayDetails();
                            },
                          },
                        },
                      ]}
                    />
                  ))}
              </VictoryStack>
            </VictoryChart>
          )}
        </View>
      </View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.darkPrimary,
    fontSize: 16,
    margin: 16,
    textAlign: "center",
  },
  date: {
    color: colors.darkPrimary,
    fontSize: 16,
    textAlign: "center",
  },
});
