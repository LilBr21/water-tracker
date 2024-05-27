import { createContext, ReactNode, useContext } from "react";
import { format } from "date-fns";
import { useGetUserGoal, useGetDailyProgress } from "../hooks/useData";
import { useAuth } from "./auth-context";
import { DrinkType } from "../components/Modals/AddProgressModal";

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
  const { userData } = useAuth();
  const { userGoal, isGoalLoading, refetchGoal } = useGetUserGoal(
    userData.userId
  );

  const date = format(new Date(), "dd-MM-yyyy");
  const { dailyProgress, refetchDailyProgress } = useGetDailyProgress(
    userData.userId,
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
