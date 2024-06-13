import { View, StyleSheet, useWindowDimensions } from "react-native";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout } from "../../actions/auth";
import { Button, ButtonSizes } from "../../ui/Button";
import { SectionCard } from "../../ui/SectionCard";
import { GoalSetting } from "./Goal/Goal";
import { NotificationsSetting } from "./Notifications/Notifications";

export const Settings = () => {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();

  const handleLogout = () => {
    dispatch(logout());
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("userId");
  };

  return (
    <View style={styles().container}>
      <SectionCard>
        <GoalSetting />
      </SectionCard>
      <SectionCard>
        <NotificationsSetting />
      </SectionCard>
      <View style={styles(width).buttonContainer}>
        <Button title="Log out" onPress={handleLogout} size={ButtonSizes.M} />
      </View>
    </View>
  );
};

const styles = (width?: number) =>
  StyleSheet.create({
    container: {
      padding: 20,
      gap: 16,
      alignItems: "flex-start",
      height: "100%",
    },
    buttonContainer: {
      position: "absolute",
      bottom: 20,
      width: width,
      paddingHorizontal: 20,
      display: "flex",
      alignItems: "flex-end",
    },
  });
