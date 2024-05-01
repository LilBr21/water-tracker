import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button, View } from "react-native";
import { AuthContextProvider, useAuth } from "./src/store/auth-context";
import { DataContextProvider } from "./src/store/data-context";
import Signup from "./src/components/Auth/Signup";
import Signin from "./src/components/Auth/Signin";
import { Home } from "./src/components/Home/Home";
import { Settings } from "./src/components/Settings/Settings";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#102C57" },
        headerTintColor: "#FEFAF6",
        contentStyle: { backgroundColor: "#102C57" },
      }}
    >
      <Stack.Screen
        name="Signin"
        component={Signin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

interface IAuthenticatedStackProps {
  logout: () => void;
}

function AuthenticatedStack({ logout }: IAuthenticatedStackProps) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#102C57" },
        headerTintColor: "#FEFAF6",
        contentStyle: { backgroundColor: "#102C57" },
        headerRight: () => <Button title="Log out" onPress={logout} />,
        headerTitle: "",
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const [authenticated, setAuthenticated] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    setAuthenticated(isAuthenticated);
  }, [isAuthenticated]);

  return (
    <NavigationContainer>
      {authenticated ? <AuthenticatedStack logout={logout} /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthContextProvider>
      <DataContextProvider>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <Navigation />
        </View>
      </DataContextProvider>
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#102C57",
  },
  text: {
    color: "#FEFAF6",
  },
});
