import { NavigationContainer } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ToastProvider } from "react-native-toast-notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import * as Notifications from "expo-notifications";
import { exchangeTokenForRefreshThunk } from "./src/actions/auth";
import { store } from "./src/store/store";
import Signup from "./src/components/Auth/Signup";
import Signin from "./src/components/Auth/Signin";
import { AppDispatch } from "./src/store/store";
import { MyTabs } from "./src/components/BottomBar/BottomBar";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    };
  },
});

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "transparent" },
        contentStyle: { backgroundColor: "transparent" },
        headerTintColor: "#FEFAF6",
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
  const refreshToken = useSelector((state: any) => state.auth.refreshToken);
  const dispatch = useDispatch<AppDispatch>();

  if (token) {
    setTimeout(() => {
      dispatch(exchangeTokenForRefreshThunk(refreshToken)).unwrap();
    }, 1000 * 60 * 60);
  }

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
          <LinearGradient
            colors={["#ccfff9", "#73b4ff"]}
            style={styles.gradient}
          >
            <SafeAreaView style={{ flex: 1 }}>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <StatusBar style="auto" />
                <Navigation />
              </GestureHandlerRootView>
            </SafeAreaView>
          </LinearGradient>
        </QueryClientProvider>
      </Provider>
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});
