import { View, Text, StyleSheet } from "react-native";
import WaterDrop from "../../assets/drop-filled.svg";
import { colors } from "../../ui/constants/colors";

interface IProps {
  isOnHome?: boolean;
}

export const MainTitle = ({ isOnHome = false }: IProps) => {
  return (
    <View style={styles(isOnHome).container}>
      <WaterDrop width={isOnHome ? 64 : 120} height={isOnHome ? 64 : 120} />
      <Text style={styles(isOnHome).text}>Water Tracker</Text>
    </View>
  );
};

const styles = (isOnHome: boolean) =>
  StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      paddingBottom: 36,
      paddingLeft: isOnHome ? 0 : 20,
      width: "100%",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    text: {
      color: colors.lightPrimary,
      fontSize: isOnHome ? 24 : 32,
    },
    image: {
      width: 32,
      height: 32,
    },
  });
