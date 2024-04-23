import { View, Text, Button } from "react-native";
import { StyleSheet } from "react-native";

interface IProps {
  handleAuthModeSwitch: () => void;
}

export const ExistingAccountButton = ({ handleAuthModeSwitch }: IProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Already have an account?</Text>
      <Button title="Sign in" onPress={handleAuthModeSwitch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#102C57",
    alignItems: "flex-end",
    justifyContent: "center",
    padding: 12,
  },
  text: {
    color: "#FEFAF6",
  },
});
