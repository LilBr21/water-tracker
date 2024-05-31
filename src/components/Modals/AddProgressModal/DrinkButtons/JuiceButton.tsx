import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { DrinkType } from "../../../../interfaces/drinks";
import Juice from "../../../../assets/juice.svg";
import { colors } from "../../../../ui/constants/colors";

interface IProps {
  chosenDrink: DrinkType;
  handleChooseDrink: (drink: DrinkType) => void;
}

export const JuiceButton = ({ chosenDrink, handleChooseDrink }: IProps) => {
  const pressed = useSharedValue<boolean>(false);

  const handleChooseJuice = () => {
    handleChooseDrink(DrinkType.JUICE);
  };

  const tap = Gesture.Tap()
    .onBegin(() => {
      pressed.value = true;
    })
    .onFinalize(() => {
      pressed.value = false;
      runOnJS(handleChooseJuice)();
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(pressed.value ? 1.2 : 1) }],
  }));

  return (
    <GestureDetector gesture={tap}>
      <View>
        <Animated.View
          style={[
            styles(chosenDrink === DrinkType.JUICE).drinkButton,
            animatedStyles,
          ]}
        >
          <Juice width={52} height={52} />
        </Animated.View>
        <Text style={styles(chosenDrink === DrinkType.JUICE).drinkButtonText}>
          Juice
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
      color: colors.lightPrimary,
      fontSize: 10,
      textAlign: "center",
    },
  });
