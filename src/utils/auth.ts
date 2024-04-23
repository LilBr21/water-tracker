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
        
        const token = response.data.idToken;
        return token;
    } catch (error: any) {
        console.log(error.response.status)
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

            const token = response.data.idToken;
        return token;
        } catch (error: any) {
            if (error.response.status === 400) {
                console.log("Invalid email or password");
            } 
        }
};