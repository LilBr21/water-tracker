import { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useToast } from "react-native-toast-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCreateUser, useSignIn } from "../../hooks/useAuth";
import { useOrientation, Orientation } from "../../hooks/useOrientation";
import { validatePassword, validateEmail } from "../../utils/validation";
import { authenticate } from "../../actions/auth";
import { Input } from "../../ui/Input";
import { Button, ButtonWidth, ButtonSizes } from "../../ui/Button";
import { colors } from "../../ui/constants/colors";
import { MainTitle } from "../MainTitle/MainTitle";
import { ExistingAccountButton } from "./ExistingAccountButton";
import { NewAccountButton } from "./NewAccountButton";

interface IProps {
  isOnLogin?: boolean;
}

export const AuthForm = ({ isOnLogin = false }: IProps) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { currentOrientation } = useOrientation();
  const isPortrait = currentOrientation === Orientation.PORTRAIT;

  const toast = useToast();

  const dispatch = useDispatch();

  const { createNewUser } = useCreateUser();
  const { signInUser } = useSignIn();

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleAuthModeSwitch = () => {
    if (isOnLogin) {
      navigation.navigate("Signup");
    } else {
      navigation.navigate("Signin");
    }
  };

  const handleSignup = async () => {
    try {
      const userData = await createNewUser({ email, password });

      if (userData?.token && userData?.userId && userData?.refreshToken) {
        dispatch(
          authenticate({
            token: userData.token,
            userId: userData.userId,
            refreshToken: userData.refreshToken,
          })
        );
        AsyncStorage.setItem("token", userData.token);
        AsyncStorage.setItem("userId", userData.userId);
        AsyncStorage.setItem("refreshToken", userData.refreshToken);
      } else {
        toast.show("Signup failed", {
          type: "danger",
          placement: "top",
          duration: 4000,
        });
      }
    } catch (error) {
      toast.show("Signup failed", {
        type: "danger",
        placement: "top",
        duration: 4000,
      });
    }
  };

  const handleSignin = async () => {
    try {
      const userData = await signInUser({ email, password });

      if (userData?.token && userData?.userId && userData?.refreshToken) {
        dispatch(
          authenticate({
            token: userData.token,
            userId: userData.userId,
            refreshToken: userData.refreshToken,
          })
        );
        AsyncStorage.setItem("token", userData.token);
        AsyncStorage.setItem("userId", userData.userId);
        AsyncStorage.setItem("refreshToken", userData.refreshToken);
      } else {
        toast.show("Signin failed", {
          type: "danger",
          placement: "top",
          duration: 4000,
        });
      }
    } catch (error) {
      toast.show("Signin failed", {
        type: "danger",
        placement: "top",
        duration: 4000,
      });
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (passwordError) {
      const error = validatePassword(password);
      setPasswordError(error);
    }
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (emailError) {
      const error = validateEmail(email);
      setEmailError(error);
    }
  };

  const handlePasswordBlur = () => {
    const error = validatePassword(password);
    setPasswordError(error);
  };

  const handleEmailBlur = () => {
    const error = validateEmail(email);
    setEmailError(error);
  };

  const handlePasswordFocus = () => {
    setPasswordError("");
  };

  const handleEmailFocus = () => {
    setEmailError("");
  };

  const handleAuth = () => {
    const passwordValidation = validatePassword(password);
    const emailValidation = validateEmail(email);

    setPasswordError(passwordValidation);
    setEmailError(emailValidation);

    if (!passwordValidation && !emailValidation) {
      if (isOnLogin) {
        handleSignin();
      } else {
        handleSignup();
      }
    }
  };

  const getStoredToken = async () => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem("token");
    const userId = await AsyncStorage.getItem("userId");
    const refreshToken = await AsyncStorage.getItem("refreshToken");

    if (token && userId && refreshToken) {
      dispatch(authenticate({ token, userId, refreshToken }));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getStoredToken();
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large" color={colors.lightPrimary} />;
  }

  return (
    <View style={styles().container}>
      {isOnLogin ? (
        <NewAccountButton handleAuthModeSwitch={handleAuthModeSwitch} />
      ) : (
        <ExistingAccountButton handleAuthModeSwitch={handleAuthModeSwitch} />
      )}
      <View style={styles().contentContainer}>
        <MainTitle />
        <Input
          placeholder="email"
          autoComplete="email"
          onChangeText={(text) => handleEmailChange(text)}
          onBlur={() => handleEmailBlur()}
          onFocus={() => handleEmailFocus()}
          labelText="Email"
          isError={!!emailError}
          errorText={emailError}
        />
        <Input
          placeholder="password"
          autoComplete="password"
          secureTextEntry
          onChangeText={(text) => handlePasswordChange(text)}
          onBlur={() => handlePasswordBlur()}
          onFocus={() => handlePasswordFocus()}
          labelText="Password"
          isError={!!passwordError}
          errorText={passwordError}
        />
        <View style={styles(isPortrait).buttonContainer}>
          <Button
            title={isOnLogin ? "Sign in" : "Sign up"}
            onPress={handleAuth}
            width={ButtonWidth.Full}
            size={isPortrait ? ButtonSizes.M : ButtonSizes.S}
            color={colors.actionPrimary}
            textColor={colors.lightPrimary}
          />
        </View>
      </View>
    </View>
  );
};

const styles = (isPortrait?: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#102C57",
    },
    contentContainer: {
      flex: 5,
      alignItems: "center",
    },
    buttonContainer: {
      width: "100%",
      paddingHorizontal: isPortrait ? 40 : 46,
      paddingTop: 20,
    },
  });
