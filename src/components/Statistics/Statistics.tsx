import { View, StyleSheet } from "react-native";
import { WeeklyProgressChart } from "../../ui/charts/WeeklyProgressChart";
import { MonthlyProgressChart } from "../../ui/charts/MonthlyProgressChart";

export const Statistics = () => {
  return (
    <View style={styles.container}>
      <WeeklyProgressChart />
      <MonthlyProgressChart />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#102C57",
    gap: 24,
  },
});
