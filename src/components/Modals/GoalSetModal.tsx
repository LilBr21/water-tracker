import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Input } from "../../ui/Input";
import { colors } from "../../ui/constants/colors";
import { Button } from "../../ui/Button";
import { useAuth } from "../../store/auth-context";
import { useData } from "../../store/data-context";
import { setGoal } from "../../utils/trackerData";

interface IProps {
  isVisible: boolean;
  onClose: () => void;
}

export const GoalSetModal = ({ isVisible, onClose }: IProps) => {
  const [chosenAmmount, setChosenAmmount] = useState(0);
  const { userData } = useAuth();
  const { refetchGoal } = useData();

  const handleSetGoal = (ammount: string) => {
    setChosenAmmount(parseInt(ammount));
  };

  const handleSaveGoal = () => {
    setGoal(chosenAmmount, userData.userId);
    refetchGoal();
    onClose();
  };

  return (
    <Modal visible={isVisible}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={onClose}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons
            name="close"
            size={32}
            color={colors.lightPrimary}
          />
        </TouchableOpacity>
        <Text style={styles.text}>Set your daily goal.</Text>
        <Text style={styles.text}>How much water do you want to drink?</Text>
        <Input
          inputMode="numeric"
          keyboardType="numeric"
          labelText={"Water ammount in mililiters (ml)"}
          onChangeText={(ammount) => handleSetGoal(ammount)}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Save"
            onPress={handleSaveGoal}
            color={colors.actionPrimary}
            textColor={colors.lightPrimary}
          />
        </View>
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
  iconContainer: {
    position: "absolute",
    top: 52,
    right: 20,
  },
  buttonContainer: {
    width: "100%",
    padding: 20,
  },
  text: {
    color: colors.lightPrimary,
    fontSize: 16,
    paddingHorizontal: 40,
    paddingVertical: 8,
    width: "100%",
    textAlign: "left",
  },
});
