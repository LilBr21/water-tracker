import { Text, Button, View, StyleSheet } from "react-native";
import { useOrientation, Orientation } from "../../hooks/useOrientation";
import { colors } from "../../ui/constants/colors";

interface IProps {
  handleAuthModeSwitch: () => void;
}

export const NewAccountButton = ({ handleAuthModeSwitch }: IProps) => {
  const { currentOrientation } = useOrientation();
  const isPortrait = currentOrientation === Orientation.PORTRAIT;

  return (
    <View style={styles(isPortrait).container}>
      <Text style={styles(isPortrait).text}>Don't have an account?</Text>
      <Button title="Sign up" onPress={handleAuthModeSwitch} />
    </View>
  );
};

const styles = (isPortrait: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "transparent",
      alignItems: "flex-end",
      justifyContent: "flex-start",
      paddingHorizontal: isPortrait ? 12 : 42,
      paddingTop: isPortrait ? 0 : 24,
    },
    text: {
      color: colors.darkPrimary,
    },
  });
