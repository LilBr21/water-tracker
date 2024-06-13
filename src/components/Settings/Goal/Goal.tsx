import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RootDataState } from "../../../interfaces/store";
import { Button, ButtonSizes } from "../../../ui/Button";
import { colors } from "../../../ui/constants/colors";
import { GoalSetModal } from "../../Modals/GoalSetModal";

export const GoalSetting = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userGoal = useSelector((state: RootDataState) => state.data.userGoal);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Your current goal:&nbsp;</Text>
        <Text style={styles.goalText}>{userGoal} ml</Text>
      </View>
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
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  textContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: colors.darkPrimary,
    fontSize: 16,
  },
  goalText: {
    color: colors.darkPrimary,
    fontSize: 16,
    fontWeight: "700",
    marginRight: 20,
  },
});
