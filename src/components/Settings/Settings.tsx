import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { useData } from "../../store/data-context";
import { useAuth } from "../../store/auth-context";
import { Button, ButtonSizes } from "../../ui/Button";
import { colors } from "../../ui/constants/colors";
import { GoalSetModal } from "../Modals/GoalSetModal";

export const Settings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userGoal } = useData();
  const { logout } = useAuth();

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.changeGoalContainer}>
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
      <Button title="Log out" onPress={logout} size={ButtonSizes.S} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 16,
    alignItems: "flex-start",
  },
  changeGoalContainer: {
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
    marginRight: 20,
  },
  logoutButton: {
    margin: 0,
  },
});
