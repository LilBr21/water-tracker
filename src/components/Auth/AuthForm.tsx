import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { createUser, signInUser } from "../../utils/auth";
import { validatePassword, validateEmail } from "../../utils/validation";
import { useAuth } from "../../store/auth-context";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
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

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const { authenticate } = useAuth();

  const handleAuthModeSwitch = () => {
    if (isOnLogin) {
      navigation.navigate("Signup");
    } else {
      navigation.navigate("Signin");
    }
  };

  const handleSignup = async () => {
    const token = await createUser(email, password);
    authenticate(token);
  };

  const handleSignin = async () => {
    const token = await signInUser(email, password);
    authenticate(token);
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
    setPasswordError(passwordValidation);

    const emailValidation = validateEmail(email);
    setEmailError(emailValidation);

    if (isOnLogin) {
      if (!passwordError && !emailError) {
        handleSignin();
      }
    } else {
      if (!passwordError && !emailError) {
        handleSignup();
      }
    }
  };

  return (
    <View style={styles.container}>
      {isOnLogin ? (
        <NewAccountButton handleAuthModeSwitch={handleAuthModeSwitch} />
      ) : (
        <ExistingAccountButton handleAuthModeSwitch={handleAuthModeSwitch} />
      )}
      <View style={styles.contentContainer}>
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
        <Button
          title={isOnLogin ? "Sign in" : "Sign up"}
          onPress={handleAuth}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#102C57",
  },
  contentContainer: {
    flex: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
