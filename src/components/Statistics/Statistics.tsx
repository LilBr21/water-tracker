import { View, StyleSheet } from "react-native";
import { WeeklyProgressChart } from "../Charts/WeeklyProgressChart";
import { MonthlyProgressChart } from "../Charts/MonthlyProgressChart";
import { useOrientation, Orientation } from "../../hooks/useOrientation";
import { SectionCard } from "../../ui/SectionCard";

export const Statistics = () => {
  const { currentOrientation } = useOrientation();
  const isPortrait = currentOrientation === Orientation.PORTRAIT;

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
    },
  });
