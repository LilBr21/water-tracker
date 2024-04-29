import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "./constants/colors";

interface IProps {
  title: string;
  onPress: () => void;
  color?: string;
  textColor?: string;
}

export const Button = ({ title, onPress, color, textColor }: IProps) => {
  return (
    <TouchableOpacity
      style={styles(color, textColor).button}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles(color, textColor).text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = (color?: string, textColor?: string) =>
  StyleSheet.create({
    button: {
      backgroundColor: color || colors.lightPrimary,
      padding: 16,
      marginHorizontal: 20,
      borderRadius: 8,
      alignItems: "center",
    },
    text: {
      color: textColor || colors.darkPrimary,
      fontWeight: "700",
    },
  });
