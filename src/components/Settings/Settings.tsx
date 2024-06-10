import { View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { logout } from "../../actions/auth";
import { Button, ButtonSizes } from "../../ui/Button";
import { colors } from "../../ui/constants/colors";
import { GoalSetModal } from "../Modals/GoalSetModal";
import { RootDataState } from "../../interfaces/store";

export const Settings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const userGoal = useSelector((state: RootDataState) => state.data.userGoal);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("userId");
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
      <Button title="Log out" onPress={handleLogout} size={ButtonSizes.S} />
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
