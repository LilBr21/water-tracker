import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "./constants/colors";

interface IProps {
  title: string;
  onPress: () => void;
  color?: string;
}

export const Button = ({ title, onPress, color }: IProps) => {
  return (
    <TouchableOpacity
      style={styles(color).button}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles(color).text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = (color?: string) =>
  StyleSheet.create({
    button: {
      backgroundColor: color || colors.lightPrimary,
      padding: 16,
      marginHorizontal: 20,
      borderRadius: 8,
      alignItems: "center",
    },
    text: {
      color: colors.darkPrimary,
      fontWeight: "700",
    },
  });
