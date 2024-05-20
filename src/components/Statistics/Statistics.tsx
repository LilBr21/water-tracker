import { View, StyleSheet } from "react-native";
import { WeeklyProgressChart } from "../../ui/charts/WeeklyProgressChart";
import { MonthlyProgressChart } from "../../ui/charts/MonthlyProgressChart";
import { useOrientation, Orientation } from "../../hooks/useOrientation";

export const Statistics = () => {
  const { currentOrientation } = useOrientation();
  const isPortrait = currentOrientation === Orientation.PORTRAIT;

  return (
    <View style={styles(isPortrait).container}>
      <WeeklyProgressChart />
      <MonthlyProgressChart />
    </View>
  );
};

const styles = (isPortrait?: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#102C57",
      gap: isPortrait ? 24 : 0,
      display: "flex",
      flexDirection: isPortrait ? "column" : "row",
    },
  });
