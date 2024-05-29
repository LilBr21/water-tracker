import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useToast } from "react-native-toast-notifications";
import { Input } from "../../ui/Input";
import { colors } from "../../ui/constants/colors";
import { Button } from "../../ui/Button";
import { setGoalThunk } from "../../actions/data";
import { useOrientation, Orientation } from "../../hooks/useOrientation";
import { RootAuthState } from "../../interfaces/store";
import { AppDispatch } from "../../store/store";

interface IProps {
  isVisible: boolean;
  onClose: () => void;
}

export const GoalSetModal = ({ isVisible, onClose }: IProps) => {
  const [chosenAmmount, setChosenAmmount] = useState(0);

  const userId = useSelector((state: RootAuthState) => state.auth.userId);

  const { currentOrientation } = useOrientation();
  const isPortrait = currentOrientation === Orientation.PORTRAIT;

  const toast = useToast();

  const dispatch = useDispatch<AppDispatch>();

  const handleSetGoal = (ammount: string) => {
    setChosenAmmount(parseInt(ammount));
  };

  const handleSaveGoal = async () => {
    try {
      await dispatch(setGoalThunk({ goal: chosenAmmount, userId })).unwrap();

      toast.show("Goal set!", {
        type: "success",
        placement: "top",
        duration: 4000,
      });
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
