import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import DateTimePicker from "react-native-modal-datetime-picker";
import { timeConvert } from "../../../utils/time";
import { colors } from "../../../ui/constants/colors";

interface IProps {
  dailyNotificationHour: number;
  dailyNotificationMinute: number;
  handleChooseDailyTime: (hour: number, minute: number) => void;
}

export const DailyNotifications = ({
  dailyNotificationHour,
  dailyNotificationMinute,
  handleChooseDailyTime,
}: IProps) => {
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const handleHidePicker = () => {
    setIsPickerVisible(false);
  };

  const handleConfirm = (time: Date) => {
    console.log(time, typeof time);
    setIsPickerVisible(false);
    handleChooseDailyTime(time.getHours(), time.getMinutes());
  };

  const dailyMinute = ("0" + dailyNotificationMinute).slice(-2);
  console.log("dailyMinute", dailyMinute);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>You will receive a reminder every day at:</Text>
      <View style={styles.timeContainer}>
        <Text style={styles.chosenHourText}>
          {timeConvert(dailyNotificationHour)} : {dailyMinute}{" "}
          {dailyNotificationHour > 12 ? "pm" : "am"}
        </Text>
        <TouchableOpacity onPress={() => setIsPickerVisible(true)}>
          <AntDesign name="edit" size={24} color={colors.darkPrimary} />
        </TouchableOpacity>
      </View>
      <DateTimePicker
        isVisible={isPickerVisible}
        mode="time"
        onCancel={handleHidePicker}
        onConfirm={handleConfirm}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  text: {
    textAlign: "center",
    color: colors.darkPrimary,
  },
  timeContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  chosenHourText: {
    color: colors.darkPrimary,
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 12,
  },
});
