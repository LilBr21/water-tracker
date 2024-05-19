import { View, Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { useOrientation, Orientation } from "../../hooks/useOrientation";
import WaterDrop from "../../assets/drop-filled.svg";
import { colors } from "../../ui/constants/colors";

interface IProps {
  isOnHome?: boolean;
}

export const MainTitle = ({ isOnHome = false }: IProps) => {
  const [fontsLoaded] = useFonts({
    "Pacifico-Refular": require("../../assets/fonts/Pacifico-Regular.ttf"),
  });

  const { currentOrientation } = useOrientation();

  const authImgWSize = currentOrientation === Orientation.PORTRAIT ? 120 : 64;

  return (
    <View style={styles(isOnHome, fontsLoaded, currentOrientation).container}>
      <WaterDrop
        width={isOnHome ? 64 : authImgWSize}
        height={isOnHome ? 64 : authImgWSize}
      />
      <Text style={styles(isOnHome, fontsLoaded, currentOrientation).text}>
        Water Tracker
      </Text>
    </View>
  );
};

const styles = (
  isOnHome: boolean,
  fontsLoaded: boolean,
  currentOrientation: Orientation
) =>
  StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      paddingBottom: currentOrientation === Orientation.PORTRAIT ? 36 : 12,
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
