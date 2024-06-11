import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { exchangeRefreshForIdToken } from '../api/auth';


    export interface IUserData {
        token: string;
        userId: string;
        refreshToken: string;
      }

const initialState = {
    token: '',
    userId: '',
    refreshToken: '',
} as IUserData;

export const exchangeTokenForRefreshThunk = createAsyncThunk<string, string>(
 'auth/exchangeTokenForRefresh',
    async (token, { rejectWithValue }) => {
    try {
        const newToken = await exchangeRefreshForIdToken(token);
        return newToken;
    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authenticate(state, action: PayloadAction<IUserData>) {
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            state.refreshToken = action.payload.refreshToken;
        },
        logout(state) {
            state.token = '';
            state.userId = '';
            state.refreshToken = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(exchangeTokenForRefreshThunk.fulfilled, (state, action) => {
                state.token = action.payload;
            })
            .addCase(exchangeTokenForRefreshThunk.rejected, (state, action) => {
                state.token = '';
            });
    },
});

export const { authenticate, logout } = authSlice.actions;
export default authSlice.reducer;