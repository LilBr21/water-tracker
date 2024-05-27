import { createContext, ReactNode, useContext } from "react";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { useGetUserGoal, useGetDailyProgress } from "../hooks/useData";
import { IUserData } from "../actions/auth";

interface RootState {
  auth: IUserData;
}

export const DataContext = createContext({
  userGoal: 0,
  refetchGoal: () => {},
  dailyProgress: {
    water: 0,
    juice: 0,
    coffee: 0,
  },
  refetchDailyProgress: () => {},
  isGoalLoading: false,
});

export const DataContextProvider = ({ children }: { children: ReactNode }) => {
  const userId = useSelector((state: RootState) => state.auth.userId);

  const { userGoal, isGoalLoading, refetchGoal } = useGetUserGoal(userId);

  const date = format(new Date(), "dd-MM-yyyy");
  const { dailyProgress, refetchDailyProgress } = useGetDailyProgress(
    userId,
    date
  );

  const value = {
    userGoal,
    refetchGoal,
    isGoalLoading,
    dailyProgress,
    refetchDailyProgress,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext);
