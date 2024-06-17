import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { WeeklyProgressChart } from "../Charts/WeeklyProgressChart";
import { MonthlyProgressChart } from "../Charts/MonthlyProgressChart";
import { useOrientation, Orientation } from "../../hooks/useOrientation";
import { AppDispatch } from "../../store/store";
import { RootAuthState, RootDataState } from "../../interfaces/store";
import { getStreakThunk } from "../../actions/data";
import { SectionCard } from "../../ui/SectionCard";

export const Statistics = () => {
  const { currentOrientation } = useOrientation();
  const isPortrait = currentOrientation === Orientation.PORTRAIT;

  const userGoal = useSelector((state: RootDataState) => state.data.userGoal);
  const token = useSelector((state: RootAuthState) => state.auth.token);
  const userId = useSelector((state: RootAuthState) => state.auth.userId);
  const streak = useSelector((state: RootDataState) => state.data.streak);

  const date = format(new Date(), "dd-MM-yyyy");

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getStreakThunk({ userId, token, date, goal: userGoal })).unwrap();
    console.log("streeeeeak", streak);
  }, [userGoal, userId, token, streak]);

  return (
    <View style={styles(isPortrait).container}>
      <SectionCard>
        <WeeklyProgressChart />
      </SectionCard>
      <SectionCard>
        <MonthlyProgressChart />
      </SectionCard>
    </View>
  );
};

const styles = (isPortrait?: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "transparent",
      gap: isPortrait ? 24 : 0,
      display: "flex",
      flexDirection: isPortrait ? "column" : "row",
      paddingHorizontal: 16,
    },
  });
