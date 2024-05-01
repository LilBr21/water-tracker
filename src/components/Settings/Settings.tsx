import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { useData } from "../../store/data-context";
import { Button, ButtonSizes } from "../../ui/Button";
import { colors } from "../../ui/constants/colors";
import { GoalSetModal } from "../GoalSetModal/GoalSetModal";

export const Settings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userGoal } = useData();

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your current goal:&nbsp;</Text>
      <Text style={styles.goalText}>{userGoal} ml</Text>
      <Button
        title="Change goal"
        onPress={() => setIsModalOpen(true)}
        size={ButtonSizes.S}
        color={colors.actionPrimary}
        textColor={colors.lightPrimary}
      />
      <GoalSetModal isVisible={isModalOpen} onClose={handleCloseModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: colors.lightPrimary,
    fontSize: 16,
  },
  goalText: {
    color: colors.lightPrimary,
    fontSize: 16,
    fontWeight: "700",
  },
});
