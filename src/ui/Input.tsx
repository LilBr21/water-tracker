import {
  TextInput,
  Text,
  View,
  TextInputProps,
  StyleSheet,
} from "react-native";
import { useOrientation, Orientation } from "../hooks/useOrientation";
import { colors } from "./constants/colors";

interface IProps {
  labelText?: string;
  placeholder?: string;
  errorText?: string;
  onChangeText?: (text: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  autoComplete?: TextInputProps["autoComplete"];
  autoCapitalize?: TextInputProps["autoCapitalize"];
  isError?: boolean;
  secureTextEntry?: boolean;
  inputMode?: TextInputProps["inputMode"];
  keyboardType?: TextInputProps["keyboardType"];
}

export const Input = ({
  labelText,
  placeholder,
  errorText,
  onChangeText,
  onBlur,
  onFocus,
  autoComplete,
  autoCapitalize = "none",
  isError = false,
  secureTextEntry,
  inputMode = "text",
  keyboardType = "default",
}: IProps) => {
  const { currentOrientation } = useOrientation();

  return (
    <View style={styles(currentOrientation).container}>
      <Text style={styles(currentOrientation).text}>{labelText}</Text>
      <TextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        autoComplete={autoComplete}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        style={styles(currentOrientation).textInput}
        onBlur={onBlur}
        onFocus={onFocus}
        inputMode={inputMode}
        keyboardType={keyboardType}
      />
      {isError && (
        <Text style={styles(currentOrientation).errorText}>{errorText}</Text>
      )}
    </View>
  );
};

const styles = (currentOrientation: Orientation) =>
  StyleSheet.create({
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: currentOrientation === Orientation.PORTRAIT ? 20 : 8,
      gap: 8,
      width: "100%",
    },
    text: {
      fontSize: 12,
      color: colors.lightPrimary,
      textAlign: "left",
      width: "100%",
      paddingLeft: currentOrientation === Orientation.PORTRAIT ? 20 : 36,
    },
    textInput: {
      backgroundColor: colors.lightPrimary,
      color: colors.darkPrimary,
      padding: 12,
      width: "90%",
      borderRadius: 8,
    },
    errorText: {
      color: colors.errorPrimary,
      fontSize: 14,
    },
  });
