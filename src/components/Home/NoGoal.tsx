import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../../ui/Button";
import { GoalSetModal } from "../Modals/GoalSetModal";
import { colors } from "../../ui/constants/colors";
import { AppDispatch } from "../../store/store";
import { getUserGoalThunk } from "../../actions/data";

export const NoGoal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = useSelector((state: any) => state.auth.token);
  const userId = useSelector((state: any) => state.auth.userId);

  const dispatch = useDispatch<AppDispatch>();

  const handleCloseModal = () => {
    setIsModalOpen(false);
    dispatch(getUserGoalThunk({ userId, token })).unwrap();
  };

  return (
    <View>
      <Text style={styles.text}>
        Welcome to Water Tracker, your personalized hydration companion. With
        Water Tracker, you can effortlessly monitor your daily water intake and
        stay on top of your hydration goals.
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="Set your goal" onPress={() => setIsModalOpen(true)} />
        <GoalSetModal isVisible={isModalOpen} onClose={handleCloseModal} />
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
});
