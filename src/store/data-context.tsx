import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { getUserGoal } from "../utils/trackerData";
import { useAuth } from "./auth-context";

export const DataContext = createContext({
  userGoal: 0,
  refetchGoal: () => {},
});

export const DataContextProvider = ({ children }: { children: ReactNode }) => {
  const [userGoal, setUserGoal] = useState(0);
  const { userData } = useAuth();

  const setGoal = async () => {
    const goal = await getUserGoal(userData.userId);
    console.log(goal, userData.userId);
    setUserGoal(goal);
  };

  const refetchGoal = () => {
    setGoal();
  };

  useEffect(() => {
    console.log("useEffect");
    setGoal();
  }, [userData.userId]);

  const value = {
    userGoal,
    refetchGoal,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext);
