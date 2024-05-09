import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../ui/constants/colors";
import { MainTitle } from "../MainTitle/MainTitle";
import { useData } from "../../store/data-context";
import { Progress } from "./Progress";
import { NoGoal } from "./NoGoal";

export const Home = () => {
  const { userGoal } = useData();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleOpenSettings = () => {
    navigation.navigate("Settings");
  };

  return (
    <View style={styles.container}>
      {userGoal > 0 && (
        <TouchableOpacity
          style={styles.settingsIconContainer}
          onPress={handleOpenSettings}
        >
          <AntDesign name="setting" size={24} color={colors.lightPrimary} />
        </TouchableOpacity>
      )}
      <MainTitle />
      {userGoal > 0 ? <Progress /> : <NoGoal />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 64,
    paddingHorizontal: 24,
  },
  settingsIconContainer: {
    position: "absolute",
    top: 12,
    right: 26,
  },
});
