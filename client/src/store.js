import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import jobReducer from './features/job/jobSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    job: jobReducer,
  },
});
