import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { Button } from "../../ui/Button";
import { DailyProgressChart } from "../../ui/charts/DailyProgressChart";
import { useOrientation, Orientation } from "../../hooks/useOrientation";
import { AddProgressModal } from "../Modals/AddProgressModal";
import { useData } from "../../store/data-context";
import { colors } from "../../ui/constants/colors";

export const Progress = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userGoal, dailyProgress } = useData();

  const { currentOrientation } = useOrientation();
  const isPortrait = currentOrientation === Orientation.PORTRAIT;

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <View>
      <Text style={styles().text}>
        Your daily goal is {userGoal} ml of water. Stay hydrated!
      </Text>
      <Text style={styles().text}>
        {dailyProgress
          ? `You've drunk ${dailyProgress} ml of water today.`
          : "You haven't drunk any water today."}
      </Text>
      <View style={styles(isPortrait).mainContentContainer}>
        <View style={styles(isPortrait).chartContainer}>
          <DailyProgressChart
            drankAmount={dailyProgress ?? 0}
            dailyGoal={userGoal}
          />
        </View>
        <View style={styles().buttonContainer}>
          <Button title="Add progress" onPress={() => setIsModalOpen(true)} />
          <AddProgressModal
            isVisible={isModalOpen}
            onClose={handleCloseModal}
          />
        </View>
      </View>
    </View>
  );
};

const styles = (isPortrait?: boolean) =>
  StyleSheet.create({
    text: {
      color: colors.lightPrimary,
      fontSize: 16,
      textAlign: "justify",
    },
    mainContentContainer: {
      display: "flex",
      flexDirection: isPortrait ? "column" : "row",
      justifyContent: "center",
      alignItems: "center",
    },
    buttonContainer: {
      padding: 36,
    },
    chartContainer: {
      marginTop: isPortrait ? 24 : 0,
    },
  });
