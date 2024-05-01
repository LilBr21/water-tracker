import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { format } from "date-fns";
import { getUserGoal, getDailyProgress } from "../utils/trackerData";
import { useAuth } from "./auth-context";

export const DataContext = createContext({
  userGoal: 0,
  refetchGoal: () => {},
  dailyProgress: 0,
  refetchDailyProgress: () => {},
});

export const DataContextProvider = ({ children }: { children: ReactNode }) => {
  const [userGoal, setUserGoal] = useState(0);
  const [dailyProgress, setDailyProgress] = useState(0);
  const { userData } = useAuth();

  const setGoal = async () => {
    const goal = await getUserGoal(userData.userId);
    setUserGoal(goal);
  };

  const refetchGoal = () => {
    setGoal();
  };

  const getDailyProgressData = async () => {
    const date = format(new Date(), "dd-MM-yyyy");
    const progress = await getDailyProgress(userData.userId, date);
    setDailyProgress(progress);
  };

  const refetchDailyProgress = () => {
    getDailyProgressData();
  };

  useEffect(() => {
    setGoal();
    getDailyProgressData();
  }, [userData.userId]);

  const value = {
    userGoal,
    refetchGoal,
    dailyProgress,
    refetchDailyProgress,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext);
