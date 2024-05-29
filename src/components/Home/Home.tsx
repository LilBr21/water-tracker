import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { MainTitle } from "../MainTitle/MainTitle";
import { Progress } from "./Progress";
import { NoGoal } from "./NoGoal";
import { AppDispatch } from "../../store/store";
import { getUserGoalThunk, getDailyProgressThunk } from "../../actions/data";
import { RootDataState } from "../../interfaces/store";

export const Home = () => {
  const userGoal = useSelector((state: any) => state.data.userGoal);
  const userId = useSelector((state: any) => state.auth.userId);
  const isGoalLoading = useSelector(
    (state: RootDataState) => state.data.isGoalLoading
  );

  const dispatch = useDispatch<AppDispatch>();

  const date = format(new Date(), "dd-MM-yyyy");

  useEffect(() => {
    dispatch(getUserGoalThunk(userId)).unwrap();
    dispatch(getDailyProgressThunk({ userId, date })).unwrap();
  }, [userId]);

  if (isGoalLoading === "pending") {
    return (
      <View style={styles.container}>
        <MainTitle isOnHome />
        <ActivityIndicator size="large" color="#102C57" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MainTitle isOnHome />
      {userGoal > 0 ? <Progress /> : <NoGoal />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
});
