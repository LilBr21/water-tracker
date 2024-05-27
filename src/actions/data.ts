import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getUserGoal } from '../api/trackerData';

export interface DataState {
    userGoal: number;
    isLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: DataState = {
    userGoal: 0,
    isLoading: 'idle',
    error: null,
} as DataState;

export const getUserGoalThunk = createAsyncThunk(
    'data/getUserGoal',
    async (userId: string, { rejectWithValue }: any) => {
        try {
            const response = await getUserGoal(userId);
            console.log(response);
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data)
        }
     
    }
);

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserGoalThunk.pending, (state) => {
                state.isLoading = 'pending';
            })
            .addCase(getUserGoalThunk.fulfilled, (state, action: PayloadAction<number>) => {
                state.userGoal = action.payload;
                state.isLoading = 'succeeded';
            })
            .addCase(getUserGoalThunk.rejected, (state, action) => {
                state.isLoading = 'failed';
                state.error = action.error.message ?? null;
            });
    },
});

export default dataSlice.reducer;