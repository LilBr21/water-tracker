import axios from "axios";

export const setGoal = (goal: number, userId: string) => {
    try {
        axios.put(`https://water-tracker-2c238-default-rtdb.firebaseio.com/goals/${userId}.json`, {
            goal
        })
    } catch (e) {
        console.log(e)
    }
};

export const getUserGoal = async (userId: string) => {
    try {
        const response = await axios.get(`https://water-tracker-2c238-default-rtdb.firebaseio.com/goals/${userId}.json?print=pretty`);
        return response.data.goal;
    } catch (e) {
        console.log(e)
    }
}

export const updateDailyProgress = async (userId: string, date: string, progress: number) => {
    try {
        axios.put(`https://water-tracker-2c238-default-rtdb.firebaseio.com/progress/${userId}/${date}.json`, {
            progress
        })
    } catch (e) {
        console.log(e)
    }
}

export const getDailyProgress = async (userId: string, date: string) => {
    try {
        const response = await axios.get(`https://water-tracker-2c238-default-rtdb.firebaseio.com/progress/${userId}/${date}.json?print=pretty`);
        return response.data.progress;
    } catch (e) {
        console.log(e)
    }
}