import { Button, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../ui/constants/colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../Home/Home";
import { Statistics } from "../Statistics/Statistics";
import { Settings } from "../Settings/Settings";

const Tab = createBottomTabNavigator();

export const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      sceneContainerStyle={styles.container}
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: colors.actionPrimary,
        tabBarActiveTintColor: colors.lightPrimary,
        tabBarInactiveBackgroundColor: "#102C57",
        tabBarStyle: {
          paddingBottom: 0,
          borderRadius: 8,
          height: 64,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="home"
              size={24}
              color={focused ? colors.lightPrimary : colors.actionPrimary}
            />
          ),
          tabBarLabelStyle: { marginBottom: 8 },
        }}
      />
      <Tab.Screen
        name="Statistics"
        component={Statistics}
        options={{
          tabBarLabel: "Statistics",
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="barschart"
              size={24}
              color={focused ? colors.lightPrimary : colors.actionPrimary}
            />
          ),
          tabBarLabelStyle: { marginBottom: 8 },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="setting"
              size={24}
              color={focused ? colors.lightPrimary : colors.actionPrimary}
            />
          ),
          tabBarLabelStyle: { marginBottom: 8 },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkPrimary,
    paddingBottom: 0,
  },
});
