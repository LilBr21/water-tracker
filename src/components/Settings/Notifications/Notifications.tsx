import {
  Switch,
  View,
  Text,
  StyleSheet,
  Alert,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import * as Notifications from "expo-notifications";
import { useToast } from "react-native-toast-notifications";
import { colors } from "../../../ui/constants/colors";
import { DailyNotifications } from "./DailyNotifications";
import { IntervalNotifications } from "./IntervalNotifications";

enum NotificationType {
  DAILY = "DAILY",
  INTERVAL = "INTERVAL",
}

export const NotificationsSetting = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [notificationId, setNotificationId] = useState<string | null>(null);
  const [chosenNotificationType, setChosenNotificationType] =
    useState<NotificationType>(NotificationType.DAILY);
  const [dailyNotificationHour, setDailyNotificationHour] =
    useState<number>(17);
  const [dailyNotificationMinute, setDailyNotificationMinute] =
    useState<number>(0);

  const toast = useToast();

  async function configurePushNotifications() {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status, canAskAgain } =
        await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      Alert.alert(
        "Permission required",
        "Notifications need the appropriate permissions."
      );
      return false;
    }

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.DEFAULT,
      });
    }

    return true;
  }

  const toggleSwitch = async () => {
    if (!isEnabled) {
      const hasPermission = await configurePushNotifications();
      if (hasPermission) {
        const id = await Notifications.scheduleNotificationAsync({
          content: {
            title: "Drink reminder",
            body: "Time to drink some water!",
          },
          trigger: {
            hour: dailyNotificationHour,
            minute: dailyNotificationMinute,
            repeats: true,
          },
        });
        setNotificationId(id);
        setIsEnabled(true);
        toast.show("Notifications enabled", {
          type: "success",
          placement: "top",
          duration: 3000,
        });
      }
    } else {
      if (notificationId) {
        await Notifications.cancelScheduledNotificationAsync(notificationId);
        setNotificationId(null);
      }
      setIsEnabled(false);
      toast.show("Notifications disabled", {
        type: "success",
        placement: "top",
        duration: 3000,
      });
    }
  };

  const handleChoooseDaily = () => {
    setChosenNotificationType(NotificationType.DAILY);
  };

  const handleChooseInterval = () => {
    setChosenNotificationType(NotificationType.INTERVAL);
  };

  const handleChooseDailyTime = (hour: number, minute: number) => {
    setDailyNotificationHour(hour);
    setDailyNotificationMinute(minute);
  };

  return (
    <View style={styles().container}>
      <View style={styles().enableContainer}>
        <Text style={styles().text}>Enable notifications:</Text>
        <Switch value={isEnabled} onValueChange={toggleSwitch} />
      </View>
      {isEnabled && (
        <View>
          <View style={styles().notificationTypesContainer}>
            <TouchableOpacity
              onPress={handleChoooseDaily}
              style={
                styles(chosenNotificationType === NotificationType.DAILY).button
              }
            >
              <Text
                style={
                  styles(chosenNotificationType === NotificationType.DAILY).text
                }
              >
                Once a day
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleChooseInterval}
              style={
                styles(chosenNotificationType === NotificationType.INTERVAL)
                  .button
              }
            >
              <Text
                style={
                  styles(chosenNotificationType === NotificationType.INTERVAL)
                    .text
                }
              >
                Time interval
              </Text>
            </TouchableOpacity>
          </View>

          {chosenNotificationType === NotificationType.DAILY ? (
            <DailyNotifications
              dailyNotificationHour={dailyNotificationHour}
              dailyNotificationMinute={dailyNotificationMinute}
              handleChooseDailyTime={handleChooseDailyTime}
            />
          ) : (
            <IntervalNotifications />
          )}
        </View>
      )}
    </View>
  );
};

const styles = (notificationChosen?: boolean) =>
  StyleSheet.create({
    container: {
      gap: 16,
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    enableContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    text: {
      color: notificationChosen ? colors.lightPrimary : colors.darkPrimary,
      fontSize: 16,
    },
    notificationTypesContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
    },
    button: {
      backgroundColor: notificationChosen
        ? colors.darkPrimary
        : colors.lightPrimary,
      padding: 8,
      borderRadius: 4,
      flexGrow: 1,
      marginHorizontal: 4,
      justifyContent: "center",
      alignItems: "center",
    },
  });
