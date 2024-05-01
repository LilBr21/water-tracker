import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { colors } from "../../ui/constants/colors";
import { MainTitle } from "../MainTitle/MainTitle";
import { Button } from "../../ui/Button";
import { GoalSetModal } from "../GoalSetModal/GoalSetModal";
import { useData } from "../../store/data-context";

export const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userGoal } = useData();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  console.log(userGoal);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenSettings = () => {
    navigation.navigate("Settings");
  };

  return (
    <View style={styles.container}>
      {userGoal > 0 && (
        <TouchableOpacity
          style={styles.settingsIconContainer}
          onPress={handleOpenSettings}
        >
          <AntDesign name="setting" size={24} color={colors.lightPrimary} />
        </TouchableOpacity>
      )}
      <MainTitle />
      {userGoal > 0 ? (
        <View>
          <Text style={styles.text}>
            Your daily goal is {userGoal} ml of water. Stay hydrated!
          </Text>
        </View>
      ) : (
        <View>
          <Text style={styles.text}>
            Welcome to Water Tracker, your personalized hydration companion.
            With Water Tracker, you can effortlessly monitor your daily water
            intake and stay on top of your hydration goals.
          </Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Set your goal"
              onPress={() => setIsModalOpen(true)}
            />
            <GoalSetModal isVisible={isModalOpen} onClose={handleCloseModal} />
          </View>
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
  settingsIconContainer: {
    position: "absolute",
    top: 12,
    right: 26,
  },
});
