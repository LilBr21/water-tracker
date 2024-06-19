import { useEffect } from "react";
import { StyleSheet, Text, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { WeeklyProgressChart } from "../Charts/WeeklyProgressChart";
import { MonthlyProgressChart } from "../Charts/MonthlyProgressChart";
import { useOrientation, Orientation } from "../../hooks/useOrientation";
import { AppDispatch } from "../../store/store";
import { RootAuthState, RootDataState } from "../../interfaces/store";
import { getStreakThunk } from "../../actions/data";
import { SectionCard } from "../../ui/SectionCard";
import { colors } from "../../ui/constants/colors";

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
  }, [userGoal, userId, token]);

  return (
    <ScrollView
      contentContainerStyle={styles(isPortrait).contentContainer}
      contentInset={{ bottom: 64 }}
    >
      <SectionCard>
        <Text style={styles(isPortrait).text}>Streak: {streak}</Text>
      </SectionCard>
      <SectionCard>
        <WeeklyProgressChart />
      </SectionCard>
      <SectionCard>
        <MonthlyProgressChart />
      </SectionCard>
    </ScrollView>
  );
};

const styles = (isPortrait: boolean) =>
  StyleSheet.create({
    contentContainer: {
      flex: 1,
      backgroundColor: "transparent",
      gap: isPortrait ? 24 : 0,
      display: "flex",
      flexDirection: isPortrait ? "column" : "row",
      paddingHorizontal: 16,
    },
    text: {
      fontSize: 20,
      fontWeight: "bold",
      padding: 12,
      color: colors.darkPrimary,
      textAlign: "center",
    },
  });
