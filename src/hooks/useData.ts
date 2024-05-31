import { useQuery, useMutation } from "@tanstack/react-query";
import { getUserGoal, getDailyProgress, updateDailyProgress, setGoal } from "../api/trackerData";
import { DrinkType } from "../components/Modals/AddProgressModal";

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