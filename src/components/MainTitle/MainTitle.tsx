import { View, Text, Image, StyleSheet } from "react-native";
import dropIcon from "../../assets/drop-icon.png";
import { colors } from "../../ui/constants/colors";

export const MainTitle = () => {
  return (
    <View style={styles.container}>
      <Image source={dropIcon} />
      <Text style={styles.text}>Water Tracker</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    paddingBottom: 36,
    alignItems: "center",
  },
  text: {
    color: colors.lightPrimary,
    fontSize: 24,
  },
});
