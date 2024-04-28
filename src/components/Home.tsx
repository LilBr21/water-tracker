import { View, Text, StyleSheet } from "react-native";
import { colors } from "../ui/constants/colors";
import { MainTitle } from "./MainTitle/MainTitle";
import { Button } from "../ui/Button";

export const Home = () => {
  return (
    <View style={styles.container}>
      <MainTitle />
      <Text style={styles.text}>
        Welcome to Water Tracker, your personalized hydration companion. With
        Water Tracker, you can effortlessly monitor your daily water intake and
        stay on top of your hydration goals.
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="Set your goal" onPress={() => {}} />
      </View>
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
