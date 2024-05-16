import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { format } from "date-fns";
import { Input } from "../../ui/Input";
import { colors } from "../../ui/constants/colors";
import { Button } from "../../ui/Button";
import { useAuth } from "../../store/auth-context";
import { useData } from "../../store/data-context";
import { useUpdateDailyProgress } from "../../hooks/useData";

interface IProps {
  isVisible: boolean;
  onClose: () => void;
}

export const AddProgressModal = ({ isVisible, onClose }: IProps) => {
  const [chosenAmmount, setChosenAmmount] = useState(0);
  const { userData } = useAuth();
  const { refetchDailyProgress, dailyProgress } = useData();
  const { updateProgress: updateDailyProgress } = useUpdateDailyProgress();

  const handleSetProgress = (ammount: string) => {
    setChosenAmmount(parseInt(ammount));
  };

  const handleSaveProgress = async () => {
    const date = format(new Date(), "dd-MM-yyyy");
    const drankToday = dailyProgress ?? 0;
    const totalDailyProgress = drankToday + chosenAmmount;

    try {
      await updateDailyProgress({
        userId: userData.userId,
        date,
        progress: totalDailyProgress,
      });
      refetchDailyProgress();
      onClose();
    } catch (error) {
      console.error("Error updating progress:", error);
    }
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
        <Text style={styles.text}>Add daily progress.</Text>
        <Text style={styles.text}>How much water did you drink?</Text>
        <Input
          inputMode="numeric"
          keyboardType="numeric"
          labelText={"Water ammount in mililiters (ml)"}
          onChangeText={(ammount) => handleSetProgress(ammount)}
        />
        <View style={styles.buttonContainer}>
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
