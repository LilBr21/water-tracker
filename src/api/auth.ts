import axios from "axios";
import { API_KEY } from '@env';
import AsyncStorage from "@react-native-async-storage/async-storage";

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
        const refreshToken = response.data.refreshToken;
        return { token, userId, refreshToken };
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
            const userId = response.data.localId;
            const token = response.data.idToken;
            const refreshToken = response.data.refreshToken;
            return { token, userId, refreshToken }
        } catch (error) {
            throw new Error('Signin failed');
        }
};

export const exchangeRefreshForIdToken = async (refreshToken: string) => {
    try {
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('refreshToken');
        const response = await axios.post(`https://securetoken.googleapis.com/v1/token?key=${API_KEY}`, {
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        });
        AsyncStorage.setItem('token', response.data.id_token);
        AsyncStorage.setItem('refreshToken', response.data.refresh_token);
        return response.data.id_token;
    } catch (error) {
        throw new Error('Failed to exchange refresh token for id token');
    }
};