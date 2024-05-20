import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { useToast } from "react-native-toast-notifications";
import { Input } from "../../ui/Input";
import { colors } from "../../ui/constants/colors";
import { Button } from "../../ui/Button";
import { useAuth } from "../../store/auth-context";
import { useData } from "../../store/data-context";
import { useSetGoal } from "../../hooks/useData";
import { useOrientation, Orientation } from "../../hooks/useOrientation";

interface IProps {
  isVisible: boolean;
  onClose: () => void;
}

export const GoalSetModal = ({ isVisible, onClose }: IProps) => {
  const [chosenAmmount, setChosenAmmount] = useState(0);
  const { userData } = useAuth();
  const { refetchGoal } = useData();
  const { setUserGoal } = useSetGoal();

  const { currentOrientation } = useOrientation();
  const isPortrait = currentOrientation === Orientation.PORTRAIT;

  const toast = useToast();

  const handleSetGoal = (ammount: string) => {
    setChosenAmmount(parseInt(ammount));
  };

  const handleSaveGoal = async () => {
    try {
      await setUserGoal({ goal: chosenAmmount, userId: userData.userId });

      toast.show("Goal set!", {
        type: "success",
        placement: "top",
        duration: 4000,
      });
      refetchGoal();
    } catch (error) {
      toast.show("Failed to set goal", {
        type: "danger",
        placement: "top",
        duration: 4000,
      });
    } finally {
      onClose();
    }
  };

  return (
    <Modal
      visible={isVisible}
      supportedOrientations={["portrait", "landscape"]}
    >
      <View style={styles(isPortrait).container}>
        <TouchableOpacity
          style={styles(isPortrait).iconContainer}
          onPress={onClose}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons
            name="close"
            size={32}
            color={colors.lightPrimary}
          />
        </TouchableOpacity>
        <Text style={styles(isPortrait).text}>Set your daily goal.</Text>
        <Text style={styles(isPortrait).text}>
          How much water do you want to drink?
        </Text>
        <View style={styles(isPortrait).inputContainer}>
          <Input
            inputMode="numeric"
            keyboardType="numeric"
            labelText={"Water ammount in mililiters (ml)"}
            onChangeText={(ammount) => handleSetGoal(ammount)}
          />
        </View>
        <View style={styles(isPortrait).buttonContainer}>
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

const styles = (isPortrait?: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.darkPrimary,
    },
    iconContainer: {
      position: "absolute",
      top: 52,
      right: isPortrait ? 20 : 120,
    },
    inputContainer: {
      width: isPortrait ? "100%" : "60%",
    },
    buttonContainer: {
      width: isPortrait ? "100%" : "60%",
      padding: 36,
    },
    text: {
      color: colors.lightPrimary,
      fontSize: 16,
      paddingHorizontal: 40,
      paddingVertical: 8,
      width: "100%",
      textAlign: isPortrait ? "left" : "center",
    },
  });
