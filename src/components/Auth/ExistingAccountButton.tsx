import { View, Text, Button } from "react-native";
import { StyleSheet } from "react-native";
import { useOrientation, Orientation } from "../../hooks/useOrientation";

interface IProps {
  handleAuthModeSwitch: () => void;
}

export const ExistingAccountButton = ({ handleAuthModeSwitch }: IProps) => {
  const { currentOrientation } = useOrientation();
  const isPortrait = currentOrientation === Orientation.PORTRAIT;

  return (
    <View style={styles(isPortrait).container}>
      <Text style={styles(isPortrait).text}>Already have an account?</Text>
      <Button title="Sign in" onPress={handleAuthModeSwitch} />
    </View>
  );
};

const styles = (isPortrait: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#102C57",
      alignItems: "flex-end",
      justifyContent: "flex-start",
      paddingHorizontal: isPortrait ? 12 : 42,
      paddingTop: isPortrait ? 0 : 24,
    },
    text: {
      color: "#FEFAF6",
    },
  });
