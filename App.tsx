import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { ToastProvider } from "react-native-toast-notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextProvider, useAuth } from "./src/store/auth-context";
import { DataContextProvider } from "./src/store/data-context";
import Signup from "./src/components/Auth/Signup";
import Signin from "./src/components/Auth/Signin";
import { MyTabs } from "./src/components/BottomBar/BottomBar";

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

function Navigation() {
  const [authenticated, setAuthenticated] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    setAuthenticated(isAuthenticated);
  }, [isAuthenticated]);

  return (
    <NavigationContainer>
      {authenticated ? <MyTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 0,
      },
    },
  });

  return (
    <ToastProvider>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <DataContextProvider>
            <SafeAreaView style={styles.container}>
              <StatusBar style="auto" />
              <Navigation />
            </SafeAreaView>
          </DataContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </ToastProvider>
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
