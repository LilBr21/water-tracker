import { Button, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../ui/constants/colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../Home/Home";
import { Statistics } from "../Statistics/Statistics";
import { Settings } from "../Settings/Settings";
import { useAuth } from "../../store/auth-context";

const Tab = createBottomTabNavigator();

export const MyTabs = () => {
  const { logout } = useAuth();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      sceneContainerStyle={styles.container}
      screenOptions={{
        headerStyle: { backgroundColor: "#102C57" },
        tabBarActiveBackgroundColor: colors.actionPrimary,
        tabBarActiveTintColor: colors.lightPrimary,
        tabBarInactiveBackgroundColor: "#102C57",
        headerTintColor: "#FEFAF6",
        headerRight: () => <Button title="Log out" onPress={logout} />,
        headerTitle: "",
        tabBarStyle: { paddingBottom: 0, marginBottom: 32, borderRadius: 8 },
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
