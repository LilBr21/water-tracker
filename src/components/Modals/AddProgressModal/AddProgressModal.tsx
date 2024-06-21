import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useToast } from "react-native-toast-notifications";
import { LinearGradient } from "expo-linear-gradient";
import { format, getMonth, getYear } from "date-fns";
import { useFonts } from "expo-font";
import { Input } from "../../../ui/Input";
import { colors } from "../../../ui/constants/colors";
import { Button } from "../../../ui/Button";
import {
  updateDailyProgressThunk,
  getStreakThunk,
} from "../../../actions/data";
import { useOrientation, Orientation } from "../../../hooks/useOrientation";
import { RootAuthState, RootDataState } from "../../../interfaces/store";
import { AppDispatch } from "../../../store/store";
import { DrinkType } from "../../../interfaces/drinks";
import { AmmountList } from "../../List/AmmountList";
import { WaterButton } from "./DrinkButtons/WaterButton";
import { JuiceButton } from "./DrinkButtons/JuiceButton";
import { CoffeeButton } from "./DrinkButtons/CoffeeButton";

interface IProps {
  isVisible: boolean;
  onClose: () => void;
}

export const AddProgressModal = ({ isVisible, onClose }: IProps) => {
  const [chosenAmmount, setChosenAmmount] = useState(0);
  const [selectedAmmount, setSelectedAmmount] = useState(0);
  const [chosenDrink, setChosenDrink] = useState(DrinkType.WATER);

  const userId = useSelector((state: RootAuthState) => state.auth.userId);
  const token = useSelector((state: RootAuthState) => state.auth.token);
  const dailyProgress = useSelector(
    (state: RootDataState) => state.data.dailyProgress
  );
  const userGoal = useSelector((state: RootDataState) => state.data.userGoal);

  const { currentOrientation } = useOrientation();
  const isPortrait = currentOrientation === Orientation.PORTRAIT;

  const dispatch = useDispatch<AppDispatch>();

  const toast = useToast();

  const [fontsLoaded] = useFonts({
    "Pacifico-Refular": require("../../../assets/fonts/Pacifico-Regular.ttf"),
  });

  const handleChooseDrink = (drink: DrinkType) => {
    setChosenDrink(drink);
  };

  const handleSetProgress = (ammount: string) => {
    setChosenAmmount(parseInt(ammount));
  };

  const handleSelectAmmount = (ammount: number) => {
    setSelectedAmmount(ammount);
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
    const year = getYear(new Date()).toString();
    const month = getMonth(new Date()).toString();
    const date = format(new Date(), "dd-MM-yyyy");
    const yesterday = format(
      new Date(new Date().setDate(new Date().getDate() - 1)),
      "dd-MM-yyyy"
    );
    const drankToday = getDrankToday();
    const ammountToAdd = chosenAmmount > 0 ? chosenAmmount : selectedAmmount;
    const totalDailyProgress = drankToday + ammountToAdd;

    try {
      await dispatch(
        updateDailyProgressThunk({
          userId,
          year,
          month,
          date,
          progress: totalDailyProgress,
          drink_type: chosenDrink,
          token,
        })
      ).unwrap();
      dispatch(
        getStreakThunk({ userId, token, date: yesterday, goal: userGoal })
      ).unwrap();
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
          Add daily progress
        </Text>
        <View style={styles(isPortrait).drinkButtonsContainer}>
          <WaterButton
            chosenDrink={chosenDrink}
            handleChooseDrink={handleChooseDrink}
          />
          <JuiceButton
            chosenDrink={chosenDrink}
            handleChooseDrink={handleChooseDrink}
          />
          <CoffeeButton
            chosenDrink={chosenDrink}
            handleChooseDrink={handleChooseDrink}
          />
        </View>
        <Text style={styles(isPortrait).centeredText}>
          How much {chosenDrink} did you drink?
        </Text>
        <Text style={styles(isPortrait).text}>Choose from the list:</Text>
        <View style={styles(isPortrait).listContainer}>
          <AmmountList handleSelectAmmount={handleSelectAmmount} />
        </View>
        <View style={styles(isPortrait).inputContainer}>
          <Text style={styles(isPortrait).text}>
            or enter your own ammount:
          </Text>
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
    },
    iconContainer: {
      position: "absolute",
      top: 52,
      right: isPortrait ? 20 : 120,
    },
    listContainer: {
      height: 75,
      width: "85%",
      borderRadius: 8,
      paddingHorizontal: 36,
      backgroundColor: colors.lightPrimary,
      marginTop: 16,
    },
    inputContainer: {
      width: isPortrait ? "100%" : "60%",
      marginTop: 20,
    },
    buttonContainer: {
      width: isPortrait ? "100%" : "60%",
      padding: 36,
    },
    heading: {
      color: colors.darkPrimary,
      fontSize: 24,
      padding: 16,
      fontFamily: fontsLoaded ? "Pacifico-Refular" : "",
    },
    centeredText: {
      color: colors.darkPrimary,
      fontSize: 18,
      paddingHorizontal: 40,
      marginBottom: 16,
      width: "100%",
      textAlign: "center",
    },
    text: {
      color: colors.darkPrimary,
      fontSize: 14,
      paddingHorizontal: 40,
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
  });
