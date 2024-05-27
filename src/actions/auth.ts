import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


    export interface IUserData {
        token: string;
        userId: string;
      }

const initialState = {
    token: '',
    userId: '',
} as IUserData;

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authenticate(state, action: PayloadAction<IUserData>) {
            state.token = action.payload.token;
            state.userId = action.payload.userId;
        },
        logout(state) {
            state.token = '';
            state.userId = '';
        },
    },
});

export const { authenticate, logout } = authSlice.actions;
export default authSlice.reducer;