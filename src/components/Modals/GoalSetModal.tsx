import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useToast } from "react-native-toast-notifications";
import { LinearGradient } from "expo-linear-gradient";
import { Input } from "../../ui/Input";
import { colors } from "../../ui/constants/colors";
import { Button } from "../../ui/Button";
import { setGoalThunk } from "../../actions/data";
import { useOrientation, Orientation } from "../../hooks/useOrientation";
import { RootAuthState } from "../../interfaces/store";
import { AppDispatch } from "../../store/store";
import { AmmountList } from "../List/AmmountList";

interface IProps {
  isVisible: boolean;
  onClose: () => void;
}

export const GoalSetModal = ({ isVisible, onClose }: IProps) => {
  const [chosenAmmount, setChosenAmmount] = useState(0);
  const [selectedAmmount, setSelectedAmmount] = useState(0);

  const userId = useSelector((state: RootAuthState) => state.auth.userId);
  const token = useSelector((state: RootAuthState) => state.auth.token);

  const [fontsLoaded] = useFonts({
    "Pacifico-Refular": require("../../assets/fonts/Pacifico-Regular.ttf"),
  });

  const { currentOrientation } = useOrientation();
  const isPortrait = currentOrientation === Orientation.PORTRAIT;

  const toast = useToast();

  const dispatch = useDispatch<AppDispatch>();

  const handleSelectAmmount = (ammount: number) => {
    setSelectedAmmount(ammount);
  };

  const handleSetGoal = (ammount: string) => {
    setChosenAmmount(parseInt(ammount));
  };

  const handleSaveGoal = async () => {
    try {
      await dispatch(
        setGoalThunk({
          goal: chosenAmmount > 0 ? chosenAmmount : selectedAmmount,
          userId,
          token,
        })
      ).unwrap();

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
      setChosenAmmount(0);
      onClose();
    }
  };

  return (
    <Modal
      visible={isVisible}
      supportedOrientations={["portrait", "landscape"]}
    >
      <LinearGradient
        style={styles().container}
        colors={["#ccfff9", "#73b4ff"]}
      >
        <TouchableOpacity
          style={styles(isPortrait).iconContainer}
          onPress={onClose}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons
            name="close"
            size={32}
            color={colors.darkPrimary}
          />
        </TouchableOpacity>
        <Text style={styles(isPortrait, fontsLoaded).heading}>
          Set your daily goal.
        </Text>
        <Text style={styles(isPortrait).text}>
          How much water do you want to drink?
        </Text>
        <View style={styles().listContainer}>
          <AmmountList handleSelectAmmount={handleSelectAmmount} settingGoal />
        </View>
        <View style={styles(isPortrait).inputContainer}>
          <Text style={styles(isPortrait).text}>
            or enter your own ammount:
          </Text>
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
      </LinearGradient>
    </Modal>
  );
};

const styles = (isPortrait?: boolean, fontsLoaded?: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "transparent",
      gap: 16,
    },
    iconContainer: {
      position: "absolute",
      top: 52,
      right: isPortrait ? 20 : 120,
    },
    inputContainer: {
      width: isPortrait ? "100%" : "60%",
      marginTop: 20,
    },
    buttonContainer: {
      width: isPortrait ? "100%" : "60%",
      padding: 36,
    },
    listContainer: {
      height: 75,
      width: "85%",
      borderRadius: 8,
      paddingHorizontal: 36,
      backgroundColor: colors.lightPrimary,
    },
    text: {
      color: colors.darkPrimary,
      fontSize: 16,
      paddingHorizontal: 40,
      width: "100%",
      textAlign: isPortrait ? "left" : "center",
    },
    heading: {
      color: colors.darkPrimary,
      fontSize: 24,
      textAlign: "center",
      fontFamily: fontsLoaded ? "Pacifico-Refular" : "",
      marginBottom: 32,
    },
  });
