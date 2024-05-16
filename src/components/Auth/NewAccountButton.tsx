import { Text, Button, View, StyleSheet } from "react-native";

interface IProps {
  handleAuthModeSwitch: () => void;
}

export const NewAccountButton = ({ handleAuthModeSwitch }: IProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Don't have an account?</Text>
      <Button title="Sign up" onPress={handleAuthModeSwitch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#102C57",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    paddingHorizontal: 12,
  },
  text: {
    color: "#FEFAF6",
  },
});
