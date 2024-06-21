import { View, Text, StyleSheet } from "react-native";
import Animated, {
  SlideInDown,
  SlideOutDown,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import { RootDataState } from "../../interfaces/store";
import { colors } from "../../ui/constants/colors";
import Coffe from "../../assets/coffee-cup.svg";
import Juice from "../../assets/juice.svg";
import Water from "../../assets/water-glass.svg";
import { getFullDayName } from "../../utils/date";
import { IDayDetails } from "./Statistics";

interface IProps {
  dayDetails: IDayDetails;
  toggleDayDetails: () => void;
}

export const DayDetails = ({ dayDetails, toggleDayDetails }: IProps) => {
  const userGoal = useSelector((state: RootDataState) => state.data.userGoal);
  const sumDrinks = dayDetails.water + dayDetails.juice + dayDetails.coffee;

  const goalCompleted = sumDrinks >= userGoal;

  const offset = useSharedValue(0);

  const handleToggle = () => {
    toggleDayDetails();
    offset.value = 0;
  };

  const pan = Gesture.Pan()
    .onChange((event) => {
      const offsetDelta = event.changeY + offset.value;

      const clamp = Math.max(-20, offsetDelta);
      offset.value = offsetDelta > 0 ? offsetDelta : withSpring(clamp);
    })
    .onFinalize(() => {
      if (offset.value < 320 / 3) {
        offset.value = withSpring(0);
      } else {
        offset.value = withTiming(320, {}, () => {
          runOnJS(handleToggle)();
        });
      }
    });

  const translateY = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[styles.container, translateY]}
        entering={SlideInDown.damping(15)}
        exiting={SlideOutDown}
      >
        <View style={styles.contentWrapper}>
          <Text style={styles.text}>
            {getFullDayName(dayDetails.day)} details
          </Text>
          <View style={styles.dataContainer}>
            <Text style={styles.text}>Water:</Text>
            <Text style={styles.waterText}>{dayDetails.water} ml</Text>
            <Water width={48} height={48} />
          </View>
          <View style={styles.dataContainer}>
            <Text style={styles.text}>Juice:</Text>
            <Text style={styles.juiceText}>{dayDetails.juice} ml</Text>
            <Juice width={48} height={48} />
          </View>
          <View style={styles.dataContainer}>
            <Text style={styles.text}>Coffee:</Text>
            <Text style={styles.coffeeText}>{dayDetails.coffee} ml</Text>
            <Coffe width={48} height={48} />
          </View>
          <View style={styles.dataContainer}>
            <Text style={styles.text}>Goal completed:</Text>
            {goalCompleted ? (
              <Entypo name="check" size={24} color={colors.successPrimary} />
            ) : (
              <Entypo name="cross" size={24} color={colors.errorPrimary} />
            )}
          </View>
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  contentWrapper: {
    backgroundColor: colors.lightPrimary,
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
    height: 320,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    gap: 12,
  },
  text: {
    color: colors.darkPrimary,
    fontSize: 16,
    paddingTop: 4,
  },
  waterText: {
    color: colors.actionPrimary,
    fontSize: 16,
    paddingTop: 4,
  },
  juiceText: {
    color: colors.orangePrimary,
    fontSize: 16,
    paddingTop: 4,
  },
  coffeeText: {
    color: colors.brownPrimary,
    fontSize: 16,
    paddingTop: 4,
  },
  dataContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "40%",
    height: 48,
  },
});
