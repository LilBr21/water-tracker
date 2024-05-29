import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Button } from "../../ui/Button";
import { DailyProgressChart } from "../Charts/DailyProgressChart";
import { useOrientation, Orientation } from "../../hooks/useOrientation";
import { AddProgressModal } from "../Modals/AddProgressModal";
import { colors } from "../../ui/constants/colors";
import { RootDataState } from "../../interfaces/store";

export const Progress = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [drankWater, setDrankWater] = useState(0);
  const [drankJuice, setDrankJuice] = useState(0);
  const [drankCoffee, setDrankCoffee] = useState(0);
  const [drankAmount, setDrankAmount] = useState(0);

  const userGoal = useSelector((state: RootDataState) => state.data.userGoal);
  const dailyProgress = useSelector(
    (state: RootDataState) => state.data.dailyProgress
  );

  const { currentOrientation } = useOrientation();
  const isPortrait = currentOrientation === Orientation.PORTRAIT;

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (dailyProgress) {
      setDrankWater(dailyProgress.water);
      setDrankJuice(dailyProgress.juice);
      setDrankCoffee(dailyProgress.coffee);
      setDrankAmount(
        dailyProgress.water + dailyProgress.juice + dailyProgress.coffee
      );
    }
  }, [dailyProgress]);

  return (
    <View>
      <Text style={styles().text}>
        Your daily goal is {userGoal} ml. Stay hydrated!
      </Text>
      <Text style={styles().text}>
        {dailyProgress
          ? `You've drunk ${drankAmount} ml today.`
          : "You haven't drunk any water today."}
      </Text>
      <View style={styles(isPortrait).mainContentContainer}>
        <View style={styles(isPortrait).chartContainer}>
          <DailyProgressChart
            drankAmount={drankAmount}
            drankWater={drankWater}
            drankJuice={drankJuice}
            drankCoffee={drankCoffee}
            dailyGoal={userGoal}
          />
        </View>
        <View style={styles().buttonContainer}>
          <Button title="Add progress" onPress={() => setIsModalOpen(true)} />
          <AddProgressModal
            isVisible={isModalOpen}
            onClose={handleCloseModal}
          />
        </View>
      </View>
    </View>
  );
};

const styles = (isPortrait?: boolean) =>
  StyleSheet.create({
    text: {
      color: colors.lightPrimary,
      fontSize: 16,
      textAlign: "justify",
    },
    mainContentContainer: {
      display: "flex",
      flexDirection: isPortrait ? "column" : "row",
      justifyContent: "center",
      alignItems: "center",
    },
    buttonContainer: {
      padding: 36,
    },
    chartContainer: {
      marginTop: isPortrait ? 24 : 0,
    },
  });
