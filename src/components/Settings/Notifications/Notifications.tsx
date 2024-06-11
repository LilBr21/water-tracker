import { Switch, View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import * as Notifications from "expo-notifications";
import { useToast } from "react-native-toast-notifications";
import { colors } from "../../../ui/constants/colors";

export const NotificationsSetting = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [notificationId, setNotificationId] = useState<string | null>(null);

  const toast = useToast();

  const toggleSwitch = async () => {
    if (!isEnabled) {
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
  },
  text: {
    color: colors.lightPrimary,
    fontSize: 16,
  },
});
