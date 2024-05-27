import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ToastProvider } from "react-native-toast-notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
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
  const token = useSelector((state: any) => state.auth.token);

  return (
    <NavigationContainer>
      {!!token ? <MyTabs /> : <AuthStack />}
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
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <DataContextProvider>
            <SafeAreaView style={styles.container}>
              <GestureHandlerRootView>
                <StatusBar style="auto" />
                <Navigation />
              </GestureHandlerRootView>
            </SafeAreaView>
          </DataContextProvider>
        </QueryClientProvider>
      </Provider>
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
