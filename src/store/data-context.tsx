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
});

export const DataContextProvider = ({ children }: { children: ReactNode }) => {
  const [userGoal, setUserGoal] = useState(0);
  const { userData } = useAuth();

  const setGoal = async () => {
    const goal = await getUserGoal(userData.userId);
    setUserGoal(goal);
  };

  useEffect(() => {
    console.log("useEffect");
    setGoal();
  }, [userData.userId]);

  const value = {
    userGoal,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext);
