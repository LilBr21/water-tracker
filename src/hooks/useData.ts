import { useQuery, useMutation } from "@tanstack/react-query";
import { getUserGoal, getDailyProgress, updateDailyProgress, setGoal } from "../api/trackerData";
import { format } from "date-fns";

export const useGetUserGoal = (userId: string) => {
    const { data: userGoal = 0, isLoading: isGoalLoading, error, refetch: refetchGoal } = useQuery({
        queryKey: ['userGoal', userId], 
        queryFn: () => getUserGoal(userId),
        initialData: 0, 
    });

    if (error) {
        console.error('Error fetching user goal:', error);
    }

    return { userGoal, isGoalLoading, error, refetchGoal };
};

export const useGetDailyProgress = (userId: string, date: string) => {
    const { data: dailyProgress, isLoading: isProgressLoading, error, refetch: refetchDailyProgress } = useQuery({
        queryKey: ['dailyProgress', userId, date], 
        queryFn: () => getDailyProgress(userId, date),
        initialData: 0, 
    });

    if (error) {
        console.error('Error fetching daily progress:', error);
    }

    return { dailyProgress, isProgressLoading, error, refetchDailyProgress };
}

interface IUpdateDailyProgressProps {
    userId: string;
    date: string;
    progress: number;
  }
  
  export const useUpdateDailyProgress = () => {
    const { mutateAsync: updateProgress, error } = useMutation({
     mutationFn: ({ userId, date, progress }: IUpdateDailyProgressProps) => updateDailyProgress(userId, date, progress)
  });
  
    return { updateProgress, error};
  };

  interface ISetGoalProps {
    goal: number;
    userId: string;
  }

  export const useSetGoal = () => {
    const { mutateAsync: setUserGoal, error } = useMutation({
     mutationFn: ({ goal, userId }: ISetGoalProps) => setGoal(goal, userId)
  });
  
    return { setUserGoal, error};
  }