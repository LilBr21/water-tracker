import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../ui/constants/colors";
import { getFullDayName } from "../../utils/date";
import { IDayDetails } from "./Statistics";

interface IProps {
  dayDetails: IDayDetails;
}

export const DayDetails = ({ dayDetails }: IProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <Text style={styles.text}>
          {getFullDayName(dayDetails.day)} details
        </Text>
        <View style={styles.dataContainer}>
          <Text style={styles.text}>Water:</Text>
          <Text style={styles.waterText}>{dayDetails.water} ml</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.text}>Juice:</Text>
          <Text style={styles.juiceText}>{dayDetails.juice} ml</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.text}>Coffee:</Text>
          <Text style={styles.coffeeText}>{dayDetails.coffee} ml</Text>
        </View>
      </View>
    </View>
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
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    gap: 12,
  },
  text: {
    color: colors.darkPrimary,
    fontSize: 16,
  },
  waterText: {
    color: colors.actionPrimary,
    fontSize: 16,
  },
  juiceText: {
    color: colors.orangePrimary,
    fontSize: 16,
  },
  coffeeText: {
    color: colors.brownPrimary,
    fontSize: 16,
  },
  dataContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
  },
});
