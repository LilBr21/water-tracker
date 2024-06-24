import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../../ui/constants/colors";

export const IntervalNotifications = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>You will receive a reminder every:</Text>
      <View style={styles.intervalContainer}>
        <Text style={styles.chosenIntervalText}>1 hour</Text>
        <AntDesign name="edit" size={24} color={colors.darkPrimary} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  text: {
    textAlign: "center",
    color: colors.darkPrimary,
  },
  intervalContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  chosenIntervalText: {
    color: colors.darkPrimary,
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 12,
  },
});
