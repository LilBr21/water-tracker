import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { colors } from "../../ui/constants/colors";
import { MainTitle } from "../MainTitle/MainTitle";
import { Button } from "../../ui/Button";
import { GoalSetModal } from "../GoalSetModal/GoalSetModal";
import { getUserGoal } from "../../utils/trackerData";
import { useAuth } from "../../store/auth-context";
import { useData } from "../../store/data-context";

export const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userGoal } = useData();

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <View style={styles.container}>
      <MainTitle />
      <Text style={styles.text}>
        Welcome to Water Tracker, your personalized hydration companion. With
        Water Tracker, you can effortlessly monitor your daily water intake and
        stay on top of your hydration goals.
      </Text>
      {userGoal > 0 ? (
        <View>
          <Text style={styles.text}>
            Your daily goal is {userGoal} liters of water. Stay hydrated!
          </Text>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <Button title="Set your goal" onPress={() => setIsModalOpen(true)} />
          <GoalSetModal isVisible={isModalOpen} onClose={handleCloseModal} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 64,
    paddingHorizontal: 24,
  },
  text: {
    color: colors.lightPrimary,
    fontSize: 16,
    textAlign: "justify",
  },
  buttonContainer: {
    padding: 36,
  },
});
