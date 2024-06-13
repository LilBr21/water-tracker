import { Switch, View, Text, StyleSheet, Alert, Platform } from "react-native";
import { useState } from "react";
import * as Notifications from "expo-notifications";
import { useToast } from "react-native-toast-notifications";
import { colors } from "../../../ui/constants/colors";

export const NotificationsSetting = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [notificationId, setNotificationId] = useState<string | null>(null);

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
            hour: 17,
            minute: 0,
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

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Enable notifications:</Text>
      <Switch value={isEnabled} onValueChange={toggleSwitch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  text: {
    color: colors.darkPrimary,
    fontSize: 16,
  },
});
