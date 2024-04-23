import axios from "axios";
import { API_KEY } from '@env';

export const createUser = async (email: string, password: string) => {

    try {
        const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, 
        {
            email,
            password,
            returnSecureToken: true,
        });
        console.log(response);
    } catch (error) {
        console.error(error);
    }
};

export const signInUser = async (email: string, password: string) => {
    
        try {
            const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, 
            {
                email,
                password,
                returnSecureToken: true,
            });
            console.log(response);
        } catch (error) {
            console.error(error);
        }
};