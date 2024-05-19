import axios from "axios";
import { format } from "date-fns";

export const setGoal = async (goal: number, userId: string) => {
    try {
        axios.put(`https://water-tracker-2c238-default-rtdb.firebaseio.com/goals/${userId}.json`, {
            goal
        })
    } catch (error) {
        throw new Error(`Failed to set user goal, ${error}`);
    }
};

export const getUserGoal = async (userId: string) => {
    try {
        const response = await axios.get(`https://water-tracker-2c238-default-rtdb.firebaseio.com/goals/${userId}.json?print=pretty`);
        return response.data.goal ?? 0;
    } catch (error) {
        throw new Error(`Failed to fetch user goal, ${error}`);
    }
}

export const updateDailyProgress = async (userId: string, date: string, progress: number) => {
    console.log(userId, date, progress)
    try {
        axios.put(`https://water-tracker-2c238-default-rtdb.firebaseio.com/progress/${userId}/${date}.json`, {
            progress
        })
    } catch (error) {
        throw new Error(`Failed to update daily progress, ${error}`);
    }
}

export const getDailyProgress = async (userId: string, date: string) => {
    try {
        const response = await axios.get(`https://water-tracker-2c238-default-rtdb.firebaseio.com/progress/${userId}/${date}.json?print=pretty`);
        return response.data ? response.data.progress : 0;
    } catch (error) {
        throw new Error(`Failed to fetch daily progress, ${error}`);
    }
}

export const getWeeklyProgress = async (userId: string) => {
    try {
        const today = new Date();
        const weekDays = [];
    
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            weekDays.push(format(date, 'dd-MM-yyyy'));
        }
        
        const weeklyProgress = [];
    
        for (const day of weekDays) {
                const progress = await getDailyProgress(userId, day); 
                weeklyProgress.push(progress ?? 0);
        }
    
        return weeklyProgress;
    } catch (error) {
        throw new Error(`Failed to fetch weekly progress, ${error}`);
    }
}