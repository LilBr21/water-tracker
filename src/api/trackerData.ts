import axios from "axios";
import { DrinkType } from '../components/Modals/AddProgressModal';

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
        const data = response.data;

        if (!data) {
            return 0;
        }
        return response.data.goal ?? 0;
    } catch (error) {
        throw new Error(`Failed to fetch user goal, ${error}`);
    }
}

export const updateDailyProgress = async (userId: string, date: string, progress: number, drink_type: DrinkType) => {
    try {
        axios.put(`https://water-tracker-2c238-default-rtdb.firebaseio.com/progress/${userId}/${date}/${drink_type}.json`, {
            progress,
        })
    } catch (error) {
        throw new Error(`Failed to update daily progress, ${error}`);
    }
}

export const getDailyProgress = async (userId: string, date: string) => {
    try {
        const response = await axios.get(`https://water-tracker-2c238-default-rtdb.firebaseio.com/progress/${userId}/${date}.json?print=pretty`);
        const data = response.data;

        // Check if data is null or undefined and return default values
        if (!data) {
            return { water: 0, juice: 0, coffee: 0 };
        }

        return {
            water: data.water?.progress ?? 0,
            juice: data.juice?.progress ?? 0,
            coffee: data.coffee?.progress ?? 0,
        };
    } catch (error) {
        throw new Error(`Failed to fetch daily progress, ${error}`);
    }
}

