import { Modal, View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { Input } from "../../ui/Input";
import { colors } from "../../ui/constants/colors";

interface IProps {
  isVisible: boolean;
}

export const GoalSetModal = ({ isVisible }: IProps) => {
  const [chosenAmmount, setChosenAmmount] = useState(0);
  console.log(chosenAmmount);

  const handleSetGoal = (ammount: string) => {
    setChosenAmmount(parseInt(ammount));
  };

  return (
    <Modal visible={isVisible}>
      <View style={styles.container}>
        <Text style={styles.text}>Set your daily goal.</Text>
        <Text style={styles.text}>How much water do you want to drink?</Text>
        <Input
          inputMode="numeric"
          keyboardType="numeric"
          labelText={"Water ammount in liters"}
          onChangeText={(ammount) => handleSetGoal(ammount)}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.darkPrimary,
  },
  text: {
    color: colors.lightPrimary,
    fontSize: 16,
    padding: 12,
  },
});
