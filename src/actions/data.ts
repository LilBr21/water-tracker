import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getUserGoal, getDailyProgress, getMonthlyProgress, updateDailyProgress, setGoal } from '../api/trackerData';
import { DrinkType } from '../interfaces/drinks';

interface IDailyProgress {
    water: number;
    juice: number;
    coffee: number;
}

interface Progress {
  progress: number;
}

interface MonthlyProgress {
  [date: string]: {
      [beverage: string]: Progress;
  };
}

export interface DataState {
    userGoal: number;
    monthlyProgress: MonthlyProgress | null;
    dailyProgress: IDailyProgress;
    isGoalLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
    isMonthlyProgressLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
    isDailyProgressLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
    isUpdateProgressLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null | number;
}

const initialState: DataState = {
    userGoal: 0,
    dailyProgress: {
        water: 0,
        juice: 0,
        coffee: 0,
    },
    monthlyProgress: null,
    isGoalLoading: 'idle',
    isDailyProgressLoading: 'idle',
    isUpdateProgressLoading: 'idle',
    error: null,
} as DataState;

export const setGoalThunk = createAsyncThunk<number, { goal: number; userId: string, token: string }>(
    'data/setGoal',
    async ({ goal, userId, token }, { rejectWithValue }) => {
      try {
        const response = await setGoal(goal, userId, token);
        return response.data;
      } catch (err: any) {
        return rejectWithValue(err.response.data);
      }
    }
  );
  
  export const getUserGoalThunk = createAsyncThunk<number, { userId: string, token: string }>(
    'data/getUserGoal',
    async ({ userId, token }, { rejectWithValue }) => {
      try {
        const response = await getUserGoal(userId, token);
        if (response === undefined) {
            return 0;
        }
        return response;
      } catch (err: any) {
        return rejectWithValue(err.response.data);
      }
    }
  );
  
  export const getDailyProgressThunk = createAsyncThunk<IDailyProgress, { userId: string; year: string; month: string; date: string, token: string }>(
    'data/getDailyProgress',
    async ({ userId, year, month, date, token }, { rejectWithValue }) => {
      try {
        const response = await getDailyProgress(userId, year, month, date, token);
        return response;
      } catch (err: any) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const getMonthlyProgressThunk = createAsyncThunk<MonthlyProgress, { userId: string; year: string; month: string, token: string }>(
    'data/getMonthlyProgress',
    async ({ userId, year, month, token }, { rejectWithValue }) => {
      try {
        const response = await getMonthlyProgress(userId, year, month, token);
        return response;
      } catch (err: any) {
        return rejectWithValue(err.response.data);
      }
    }
  )
  
  export const updateDailyProgressThunk = createAsyncThunk<
  { drink_type: DrinkType; progress: number },
  { userId: string; year: string, month: string, date: string; progress: number; drink_type: DrinkType, token: string }
>(
  'data/updateDailyProgress',
  async ({ userId, year, month, date, progress, drink_type, token }, { rejectWithValue }) => {
    try {
      const response = await updateDailyProgress(userId, year, month, date, progress, drink_type, token);
      return { drink_type, progress };
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(setGoalThunk.pending, (state) => {
                state.isGoalLoading = 'pending';
            })
            .addCase(setGoalThunk.fulfilled, (state, action: PayloadAction<any>) => {
                state.userGoal = action.payload;
                state.isGoalLoading = 'succeeded';
            })
            .addCase(setGoalThunk.rejected, (state, action) => {
                state.isGoalLoading = 'failed';
                state.error = action.error.message ?? null;
            })
            .addCase(getUserGoalThunk.pending, (state) => {
                state.isGoalLoading = 'pending';
            })
            .addCase(getUserGoalThunk.fulfilled, (state, action: PayloadAction<number>) => {
                state.userGoal = action.payload;
                state.isGoalLoading = 'succeeded';
            })
            .addCase(getUserGoalThunk.rejected, (state, action) => {
                state.isGoalLoading = 'failed';
                state.error = action.error.message ?? null;
            })
            .addCase(getMonthlyProgressThunk.pending, (state) => {
                state.isMonthlyProgressLoading = 'pending';
            })
            .addCase(getMonthlyProgressThunk.fulfilled, (state, action: PayloadAction<any>) => {
                state.monthlyProgress = action.payload;
                state.isMonthlyProgressLoading = 'succeeded';
            })
            .addCase(getMonthlyProgressThunk.rejected, (state, action) => {
                state.isMonthlyProgressLoading = 'failed';
                state.error = action.error.message ?? null;
            })
            .addCase(getDailyProgressThunk.pending, (state) => {
                state.isDailyProgressLoading = 'pending';
            })
            .addCase(getDailyProgressThunk.fulfilled, (state, action: PayloadAction<any>) => {
                state.dailyProgress = action.payload;
                state.isDailyProgressLoading = 'succeeded';
            })
            .addCase(getDailyProgressThunk.rejected, (state, action) => {
                state.isDailyProgressLoading = 'failed';
                state.error = action.error.message ?? null;
            })
            .addCase(updateDailyProgressThunk.pending, (state) => {
                state.isUpdateProgressLoading = 'pending';
            })
            .addCase(updateDailyProgressThunk.fulfilled, (state, action: PayloadAction<{ drink_type: DrinkType; progress: number }>) => {
                const { drink_type, progress } = action.payload;
                state.dailyProgress[drink_type] += progress;
                state.isUpdateProgressLoading = 'succeeded';
              })
            .addCase(updateDailyProgressThunk.rejected, (state, action) => {
                state.isDailyProgressLoading = 'failed';
                state.error = action.error.message ?? null;
            });
    },
});

export default dataSlice.reducer;