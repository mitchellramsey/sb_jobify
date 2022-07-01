import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authFetchCreator } from '../utils/utils';
import { logoutUser } from '../user/userSlice';

const initialState = {
  stats: {},
  monthlyApplications: [],
  isLoading: false,
  showAlert: false,
};

export const showStats = createAsyncThunk(
  'stats/showStats',
  async (arg, { dispatch }) => {
    try {
      const authFetch = authFetchCreator();
      const { data } = await authFetch('/jobs/stats');
      return {
        stats: data.defaultStats,
        monthlyApps: data.monthlyApplications,
      };
    } catch (error) {
      dispatch(logoutUser());
    }
  }
);

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {},
  extraReducers: {
    [showStats.pending]: (state) => {
      return {
        ...state,
        isLoading: true,
        showAlert: false,
      };
    },
    [showStats.fulfilled]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        stats: action.payload.stats,
        monthlyApplications: action.payload.monthlyApps,
      };
    },
  },
});
export default statsSlice.reducer;
