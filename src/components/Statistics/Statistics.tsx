import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { WeeklyProgressChart } from "../Charts/WeeklyProgressChart";
import { MonthlyProgressChart } from "../Charts/MonthlyProgressChart";
import { useOrientation, Orientation } from "../../hooks/useOrientation";
import { AppDispatch } from "../../store/store";
import { RootAuthState, RootDataState } from "../../interfaces/store";
import { getStreakThunk } from "../../actions/data";
import { SectionCard } from "../../ui/SectionCard";
import { colors } from "../../ui/constants/colors";
import { DayDetails } from "./DayDetails";

export interface IDayDetails {
  day: string;
  water: number;
  juice: number;
  coffee: number;
}

export const Statistics = () => {
  const [areDetailsVisible, setAreDetailsVisible] = useState(false);
  const [dayDetails, setDayDetails] = useState<IDayDetails>({
    day: "",
    water: 0,
    juice: 0,
    coffee: 0,
  });

  const { currentOrientation } = useOrientation();
  const isPortrait = currentOrientation === Orientation.PORTRAIT;

  const userGoal = useSelector((state: RootDataState) => state.data.userGoal);
  const token = useSelector((state: RootAuthState) => state.auth.token);
  const userId = useSelector((state: RootAuthState) => state.auth.userId);
  const streak = useSelector((state: RootDataState) => state.data.streak);

  const date = format(new Date(), "dd-MM-yyyy");

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getStreakThunk({ userId, token, date, goal: userGoal })).unwrap();
  }, [userGoal, userId, token]);

  const handleSetDayDetails = (dayDetails: IDayDetails) => {
    setDayDetails(dayDetails);
  };

  const handleViewDayDetails = () => {
    setAreDetailsVisible(true);
  };

  const hideDayDetails = () => {
    if (areDetailsVisible) {
      setAreDetailsVisible(false);
    }
  };

  return (
    <View style={styles(isPortrait).container}>
      <TouchableOpacity activeOpacity={1} onPress={hideDayDetails}>
        <ScrollView
          contentContainerStyle={
            styles(isPortrait, areDetailsVisible).contentContainer
          }
          contentInset={{ bottom: 64 }}
        >
          <SectionCard>
            <Text style={styles(isPortrait).text}>Streak: {streak}</Text>
          </SectionCard>
          <SectionCard>
            <WeeklyProgressChart
              handleSetDayDetails={handleSetDayDetails}
              handleViewDayDetails={handleViewDayDetails}
            />
          </SectionCard>
          <SectionCard>
            <MonthlyProgressChart />
          </SectionCard>
        </ScrollView>
      </TouchableOpacity>
      {areDetailsVisible && <DayDetails dayDetails={dayDetails} />}
    </View>
  );
};

const styles = (isPortrait: boolean, areDetailsVisible?: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "transparent",
    },
    contentContainer: {
      flexGrow: 1,
      backgroundColor: "transparent",
      gap: isPortrait ? 24 : 0,
      flexDirection: isPortrait ? "column" : "row",
      paddingHorizontal: 16,
      opacity: areDetailsVisible ? 0.5 : 1,
    },
    text: {
      fontSize: 20,
      fontWeight: "bold",
      padding: 12,
      color: colors.darkPrimary,
      textAlign: "center",
    },
  });
