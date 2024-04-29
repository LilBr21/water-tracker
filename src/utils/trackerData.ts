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
        console.log(response.data)
        return response.data;
    } catch (e) {
        console.log(e)
    }
}