import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { Button } from "../../ui/Button";
import { DailyProgressChart } from "../../ui/charts/DailyProgressChart";
import { WeeklyProgressChart } from "../../ui/charts/WeeklyProgressChart";
import { AddProgressModal } from "../Modals/AddProgressModal";
import { useData } from "../../store/data-context";
import { colors } from "../../ui/constants/colors";

export const Progress = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userGoal, dailyProgress } = useData();

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <View>
      <Text style={styles.text}>
        Your daily goal is {userGoal} ml of water. Stay hydrated!
      </Text>
      <Text style={styles.text}>
        {dailyProgress
          ? `You've drunk ${dailyProgress} ml of water today.`
          : "You haven't drunk any water today."}
      </Text>
      <View style={styles.chartContainer}>
        <DailyProgressChart
          drankAmount={dailyProgress ?? 0}
          dailyGoal={userGoal}
        />
        <WeeklyProgressChart />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Add progress" onPress={() => setIsModalOpen(true)} />
        <AddProgressModal isVisible={isModalOpen} onClose={handleCloseModal} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.lightPrimary,
    fontSize: 16,
    textAlign: "justify",
  },
  buttonContainer: {
    padding: 36,
  },
  chartContainer: {
    marginTop: 24,
  },
});
