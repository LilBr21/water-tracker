import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { DrinkType } from "../../../../interfaces/drinks";
import Coffee from "../../../../assets/coffee-cup.svg";
import { colors } from "../../../../ui/constants/colors";

interface IProps {
  chosenDrink: DrinkType;
  handleChooseDrink: (drink: DrinkType) => void;
}

export const CoffeeButton = ({ chosenDrink, handleChooseDrink }: IProps) => {
  const pressed = useSharedValue<boolean>(false);

  const handleChooseCoffee = () => {
    handleChooseDrink(DrinkType.COFFEE);
  };

  const tap = Gesture.Tap()
    .onBegin(() => {
      pressed.value = true;
    })
    .onFinalize(() => {
      pressed.value = false;
      runOnJS(handleChooseCoffee)();
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(pressed.value ? 1.2 : 1) }],
  }));

  return (
    <GestureDetector gesture={tap}>
      <View>
        <Animated.View
          style={[
            styles(chosenDrink === DrinkType.COFFEE).drinkButton,
            animatedStyles,
          ]}
        >
          <Coffee width={52} height={52} />
        </Animated.View>
        <Text style={styles(chosenDrink === DrinkType.COFFEE).drinkButtonText}>
          Coffee
        </Text>
      </View>
    </GestureDetector>
  );
};

const styles = (isDrinkChosen: boolean) =>
  StyleSheet.create({
    drinkButton: {
      backgroundColor: isDrinkChosen
        ? "rgba(254, 250, 246, 0.8)"
        : "rgba(254, 250, 246, 0.5)",
      borderColor: colors.lightPrimary,
      borderWidth: 2,
      borderRadius: 50,
      width: 64,
      height: 64,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 4,
    },
    drinkButtonText: {
      color: colors.darkPrimary,
      fontSize: 12,
      marginTop: 2,
      textAlign: "center",
    },
  });
