import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authFetchCreator, addUserToLocalStorage } from '../utils/utils';
import axios from 'axios';

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const userLocation = localStorage.getItem('location');

const initialState = {
  alertText: '',
  alertType: '',
  isLoading: false,
  showAlert: false,
  showSidebar: false,
  token: token,
  user: user ? JSON.parse(user) : null,
  userLocation: userLocation || '',
};

export const setupUser = createAsyncThunk(
  'user/setupUser',
  async ({ currentUser, endPoint, alertText }, thunkAPI) => {
    try {
      const response = await axios.post(`api/v1/auth/${endPoint}`, currentUser);
      const { user, token, location } = response.data;
      addUserToLocalStorage({ user, token, location });
      return {
        user,
        token,
        location,
        type: 'success',
        message: alertText,
      };
    } catch (error) {
      return {
        type: 'danger',
        message: error.response.data.msg,
      };
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (currentUser, thunkAPI) => {
    const authFetch = authFetchCreator();
    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser);
      const { user, location, token } = data;
      addUserToLocalStorage({ user, token, location });
      return {
        user,
        token,
        location,
        type: 'success',
        message: 'User Profile Updated!',
      };
    } catch (error) {
      return {
        type: 'danger',
        message: error.response.data.msg,
      };
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      return {
        ...state,
        showSidebar: !state.showSidebar,
      };
    },
    logoutUser: (state) => {
      return {
        ...state,
        user: null,
        token: null,
        userLocation: '',
        jobLocation: '',
      };
    },
    displayUserAlert: (state, action) => {
      return {
        ...state,
        showAlert: true,
        alertType: action.payload.type,
        alertText: action.payload.message,
      };
    },
    clearUserAlert: (state) => {
      return {
        ...state,
        showAlert: false,
        alertType: '',
        alertText: '',
      };
    },
  },
  extraReducers: {
    [setupUser.pending]: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [setupUser.fulfilled]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: action.payload.type,
        alertText: action.payload.message,
        user: action.payload.user,
        token: action.payload.token,
        userLocation: action.payload.location,
        jobLocation: action.payload.location,
      };
    },
    [setupUser.rejected]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: action.payload.type,
        alertText: action.payload.message,
      };
    },
    [updateUser.pending]: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [updateUser.fulfilled]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        user: action.payload.user,
        userLocation: action.payload.location,
        jobLocation: action.payload.location,
        showAlert: true,
        alertType: action.payload.type,
        alertText: action.payload.message,
      };
    },
    [updateUser.rejected]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: action.payload.type,
        alertText: action.payload.msg,
      };
    },
  },
});

export const { toggleSidebar, logoutUser, displayUserAlert, clearUserAlert } =
  userSlice.actions;
export default userSlice.reducer;
