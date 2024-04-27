import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { AuthContextProvider, useAuth } from "./src/store/auth-context";
import Signup from "./src/components/Auth/Signup";
import Signin from "./src/components/Auth/Signin";
import { Home } from "./src/components/Home";

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

function AuthenticatedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={Home} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const [authenticated, setAuthenticated] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    setAuthenticated(isAuthenticated);
  }, [isAuthenticated]);

  return (
    <NavigationContainer>
      {authenticated ? <AuthenticatedStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthContextProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Navigation />
      </View>
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
