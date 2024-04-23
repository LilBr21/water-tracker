import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { createUser, signInUser } from "../../utils/auth";
import { ExistingAccountButton } from "./ExistingAccountButton";
import { NewAccountButton } from "./NewAccountButton";

interface IProps {
  isOnLogin?: boolean;
}

export const AuthForm = ({ isOnLogin = false }: IProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleAuthModeSwitch = () => {
    if (isOnLogin) {
      navigation.navigate("Signup");
    } else {
      navigation.navigate("Signin");
    }
  };

  const handleSignup = () => {
    createUser(email, password);
  };

  const handleSignin = () => {
    signInUser(email, password);
  };

  const handleAuth = () => {
    if (isOnLogin) {
      handleSignin();
    } else {
      handleSignup();
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
        <Text style={styles.text}>{isOnLogin ? "Sign in" : "Sign up"}</Text>
        <TextInput
          placeholder="email"
          autoComplete="email"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="password"
          autoComplete="password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
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
  text: {
    color: "#FEFAF6",
  },
});
