import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useToast } from "react-native-toast-notifications";
import { format } from "date-fns";
import CoffeeCup from "../../assets/coffee-cup.svg";
import WaterGlass from "../../assets/water-glass.svg";
import Juice from "../../assets/juice.svg";
import { Input } from "../../ui/Input";
import { colors } from "../../ui/constants/colors";
import { Button } from "../../ui/Button";
import { useData } from "../../store/data-context";
import { useUpdateDailyProgress } from "../../hooks/useData";
import { useOrientation, Orientation } from "../../hooks/useOrientation";
import { RootAuthState } from "../../interfaces/store";

interface IProps {
  isVisible: boolean;
  onClose: () => void;
}

export enum DrinkType {
  WATER = "water",
  JUICE = "juice",
  COFFEE = "coffee",
}

export const AddProgressModal = ({ isVisible, onClose }: IProps) => {
  const [chosenAmmount, setChosenAmmount] = useState(0);
  const [chosenDrink, setChosenDrink] = useState(DrinkType.WATER);

  const userId = useSelector((state: RootAuthState) => state.auth.userId);

  const { refetchDailyProgress, dailyProgress } = useData();
  const { updateProgress: updateDailyProgress } = useUpdateDailyProgress();

  const { currentOrientation } = useOrientation();
  const isPortrait = currentOrientation === Orientation.PORTRAIT;

  const toast = useToast();

  const handleChooseDrink = (drink: DrinkType) => {
    setChosenDrink(drink);
  };

  const handleSetProgress = (ammount: string) => {
    setChosenAmmount(parseInt(ammount));
  };

  const getDrankToday = () => {
    switch (chosenDrink) {
      case DrinkType.WATER:
        return dailyProgress?.water;
      case DrinkType.JUICE:
        return dailyProgress?.juice;
      case DrinkType.COFFEE:
        return dailyProgress?.coffee;
      default:
        return 0;
    }
  };

  const handleSaveProgress = async () => {
    const date = format(new Date(), "dd-MM-yyyy");
    const drankToday = getDrankToday();
    const totalDailyProgress = drankToday + chosenAmmount;

    try {
      await updateDailyProgress({
        userId,
        date,
        progress: totalDailyProgress,
        drink_type: chosenDrink,
      });

      refetchDailyProgress();
    } catch (error) {
      toast.show("Failed to update progress", {
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
      <View style={styles().container}>
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
        <Text style={styles(isPortrait).text}>Add daily progress.</Text>
        <View style={styles(isPortrait).drinkButtonsContainer}>
          <View>
            <TouchableOpacity
              style={
                styles(isPortrait, chosenDrink === DrinkType.WATER).drinkButton
              }
              onPress={() => handleChooseDrink(DrinkType.WATER)}
            >
              <WaterGlass width={52} height={52} />
            </TouchableOpacity>
            <Text style={styles(isPortrait).drinkButtonText}>Water</Text>
          </View>
          <View>
            <TouchableOpacity
              style={
                styles(isPortrait, chosenDrink === DrinkType.JUICE).drinkButton
              }
              onPress={() => handleChooseDrink(DrinkType.JUICE)}
            >
              <Juice width={52} height={52} />
            </TouchableOpacity>
            <Text style={styles(isPortrait).drinkButtonText}>Juice</Text>
          </View>
          <View>
            <TouchableOpacity
              style={
                styles(isPortrait, chosenDrink === DrinkType.COFFEE).drinkButton
              }
              onPress={() => handleChooseDrink(DrinkType.COFFEE)}
            >
              <CoffeeCup width={52} height={52} />
            </TouchableOpacity>
            <Text style={styles(isPortrait).drinkButtonText}>Coffee</Text>
          </View>
        </View>
        <Text style={styles(isPortrait).text}>
          How much {chosenDrink} did you drink?
        </Text>
        <View style={styles(isPortrait).inputContainer}>
          <Input
            inputMode="numeric"
            keyboardType="numeric"
            labelText={`${chosenDrink} ammount in mililiters (ml)`}
            onChangeText={(ammount) => handleSetProgress(ammount)}
          />
        </View>
        <View style={styles(isPortrait).buttonContainer}>
          <Button
            title="Save"
            onPress={handleSaveProgress}
            color={colors.actionPrimary}
            textColor={colors.lightPrimary}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = (isPortrait?: boolean, isDrinkChosen?: boolean) =>
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
    drinkButtonsContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      width: "100%",
      paddingVertical: 32,
    },
    drinkButton: {
      backgroundColor: isDrinkChosen
        ? "rgba(254, 250, 246, 0.8)"
        : "rgba(254, 250, 246, 0.5)",
      borderColor: colors.lightPrimary,
      borderWidth: 2,
      borderRadius: 50,
      width: 64,
      height: 64,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 4,
    },
    drinkButtonText: {
      color: colors.lightPrimary,
      fontSize: 10,
      textAlign: "center",
    },
  });
