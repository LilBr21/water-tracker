import { View, StyleSheet } from "react-native";
import { MainTitle } from "../MainTitle/MainTitle";
import { useData } from "../../store/data-context";
import { Progress } from "./Progress";
import { NoGoal } from "./NoGoal";

export const Home = () => {
  const { userGoal } = useData();

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
