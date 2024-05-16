import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "./constants/colors";

export enum ButtonSizes {
  S = "small",
  M = "medium",
  L = "large",
}

export enum ButtonWidth {
  Full = "100%",
}

interface IProps {
  title: string;
  onPress: () => void;
  color?: string;
  textColor?: string;
  size?: ButtonSizes;
  width?: ButtonWidth;
}

export const Button = ({
  title,
  onPress,
  color,
  textColor,
  size,
  width,
}: IProps) => {
  const paddingValue =
    size === ButtonSizes.S ? 8 : size === ButtonSizes.L ? 24 : 16;

  return (
    <TouchableOpacity
      style={styles(paddingValue, color, textColor, width).button}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles(paddingValue, color, textColor).text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = (
  paddingValue: number,
  color?: string,
  textColor?: string,
  width?: ButtonWidth
) =>
  StyleSheet.create({
    button: {
      backgroundColor: color || colors.lightPrimary,
      padding: paddingValue,
      borderRadius: 8,
      alignItems: "center",
      width: width || "auto",
    },
    text: {
      color: textColor || colors.darkPrimary,
      fontWeight: "700",
    },
  });
