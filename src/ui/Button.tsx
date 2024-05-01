import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "./constants/colors";

export enum ButtonSizes {
  S = "small",
  M = "medium",
  L = "large",
}

interface IProps {
  title: string;
  onPress: () => void;
  color?: string;
  textColor?: string;
  size?: ButtonSizes;
}

export const Button = ({ title, onPress, color, textColor, size }: IProps) => {
  const paddingValue =
    size === ButtonSizes.S ? 8 : size === ButtonSizes.L ? 24 : 16;

  return (
    <TouchableOpacity
      style={styles(paddingValue, color, textColor).button}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles(paddingValue, color, textColor).text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = (paddingValue: number, color?: string, textColor?: string) =>
  StyleSheet.create({
    button: {
      backgroundColor: color || colors.lightPrimary,
      padding: paddingValue,
      marginHorizontal: 20,
      borderRadius: 8,
      alignItems: "center",
    },
    text: {
      color: textColor || colors.darkPrimary,
      fontWeight: "700",
    },
  });
