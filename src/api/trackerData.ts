import axios from "axios";
import { DrinkType } from "../interfaces/drinks";
import { parse, subDays, format, getMonth, getYear } from 'date-fns';


export const setGoal = async (goal: number, userId: string, token: string) => {
    try {
        const response = axios.put(`https://water-tracker-2c238-default-rtdb.firebaseio.com/goals/${userId}.json?auth=${token}`, {
            goal
        })
        return response
    } catch (error) {
        throw new Error(`Failed to set user goal, ${error}`);
    }
};

export const getUserGoal = async (userId: string, token: string) => {
    try {
        const response = await axios.get(`https://water-tracker-2c238-default-rtdb.firebaseio.com/goals/${userId}.json?print=pretty&auth=${token}`);
        const data = response.data;
        if (!data) {
            return 0;
        }
        return data.goal ?? 0;
    } catch (error) {
        throw new Error(`Failed to fetch user goal, ${error}`);
    }
}

export const updateDailyProgress = async (userId: string, year: string, month: string, date: string, progress: number, drink_type: DrinkType, token: string) => {
    try {
        const response = axios.put(`https://water-tracker-2c238-default-rtdb.firebaseio.com/progress/${userId}/${year}/${month}/${date}/${drink_type}.json?auth=${token}`, {
            progress,
        })
        return response;
    } catch (error) {
        throw new Error(`Failed to update daily progress, ${error}`);
    }
}

export const getDailyProgress = async (userId: string, year: string, month: string, date: string, token: string) => {
    try {
        const response = await axios.get(`https://water-tracker-2c238-default-rtdb.firebaseio.com/progress/${userId}/${year}/${month}/${date}.json?print=pretty&auth=${token}`);
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
    } catch (error: any) {
        throw new Error(`Failed to fetch daily progress, ${error}`);
    }
}

export const getStreak = async (userId: string, token: string, date: string, goal: number) => {
    try {
        let streak = 0;
        let currentDate = parse(`${date}`, 'dd-MM-yyyy', new Date());

        while (true) {
            const formattedDate = format(currentDate, 'dd-MM-yyyy');
            const year = getYear(currentDate).toString();
            const month = getMonth(currentDate).toString();

            const response = await getDailyProgress(userId, year, month, formattedDate, token);
            const data = response;

            const totalDrinks = data.water + data.juice + data.coffee;

            if (totalDrinks >= goal) {
                streak++;
                currentDate = subDays(currentDate, 1);
            } else {
                break;
            }
        }

        return streak;
    } catch (error) {
        throw new Error(`Failed to fetch streak, ${error}`);
    }
}

export const getMonthlyProgress = async (userId: string, year: string, month: string, token: string) => {
    try {
        const response = await axios.get(`https://water-tracker-2c238-default-rtdb.firebaseio.com/progress/${userId}/${year}/${month}.json?print=pretty&auth=${token}`);
        const data = response.data;

        if (!data) {
            return null;
        }

        return data;
    } catch (error) {
        throw new Error(`Failed to fetch monthly progress, ${error}`);
    }
}

