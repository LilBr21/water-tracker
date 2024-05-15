import { View, Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import WaterDrop from "../../assets/drop-filled.svg";
import { colors } from "../../ui/constants/colors";

interface IProps {
  isOnHome?: boolean;
}

export const MainTitle = ({ isOnHome = false }: IProps) => {
  const [fontsLoaded] = useFonts({
    "Pacifico-Refular": require("../../assets/fonts/Pacifico-Regular.ttf"),
  });

  return (
    <View style={styles(isOnHome, fontsLoaded).container}>
      <WaterDrop width={isOnHome ? 64 : 120} height={isOnHome ? 64 : 120} />
      <Text style={styles(isOnHome, fontsLoaded).text}>Water Tracker</Text>
    </View>
  );
};

const styles = (isOnHome: boolean, fontsLoaded: boolean) =>
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
      fontSize: isOnHome ? 24 : 36,
      fontFamily: fontsLoaded ? "Pacifico-Refular" : "",
    },
  });
