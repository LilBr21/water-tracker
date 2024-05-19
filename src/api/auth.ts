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
        const userId = response.data.localId;
        const token = response.data.idToken;
        return { token, userId };
    } catch (error) {
        throw new Error('Signup failed');
    }
};

export const signIn = async (email: string, password: string) => {
    
        try {
            const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, 
            {
                email,
                password,
                returnSecureToken: true,
            });
            console.log(response.data.localId, response.data.idToken)
            const userId = response.data.localId;
            const token = response.data.idToken;
            return { token, userId }
        } catch (error) {
            console.log('here??')
            throw new Error('Signin failed');
        }
};