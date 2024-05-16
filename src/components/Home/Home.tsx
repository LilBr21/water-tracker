import { View, StyleSheet, ActivityIndicator } from "react-native";
import { MainTitle } from "../MainTitle/MainTitle";
import { useData } from "../../store/data-context";
import { Progress } from "./Progress";
import { NoGoal } from "./NoGoal";

export const Home = () => {
  const { userGoal, isGoalLoading } = useData();

  if (isGoalLoading) {
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
