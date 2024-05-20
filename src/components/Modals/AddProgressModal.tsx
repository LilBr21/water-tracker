import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { useToast } from "react-native-toast-notifications";
import { format } from "date-fns";
import { Input } from "../../ui/Input";
import { colors } from "../../ui/constants/colors";
import { Button } from "../../ui/Button";
import { useAuth } from "../../store/auth-context";
import { useData } from "../../store/data-context";
import { useUpdateDailyProgress } from "../../hooks/useData";
import { useOrientation, Orientation } from "../../hooks/useOrientation";

interface IProps {
  isVisible: boolean;
  onClose: () => void;
}

export const AddProgressModal = ({ isVisible, onClose }: IProps) => {
  const [chosenAmmount, setChosenAmmount] = useState(0);
  const { userData } = useAuth();
  const { refetchDailyProgress, dailyProgress } = useData();
  const { updateProgress: updateDailyProgress } = useUpdateDailyProgress();

  const { currentOrientation } = useOrientation();
  const isPortrait = currentOrientation === Orientation.PORTRAIT;

  const toast = useToast();

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
        <Text style={styles(isPortrait).text}>
          How much water did you drink?
        </Text>
        <View style={styles(isPortrait).inputContainer}>
          <Input
            inputMode="numeric"
            keyboardType="numeric"
            labelText={"Water ammount in mililiters (ml)"}
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
