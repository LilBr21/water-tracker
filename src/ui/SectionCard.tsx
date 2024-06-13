import { View, StyleSheet } from "react-native";
import { colors } from "./constants/colors";
import React from "react";

interface SectionCardProps {
  children: React.ReactNode;
}

export const SectionCard: React.FC<SectionCardProps> = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardPrimary,
    borderRadius: 8,
    shadowColor: colors.darkPrimary,
    width: "100%",
    shadowOffset: {
      width: 2,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
});
