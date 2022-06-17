import axios from 'axios';
import React, { useReducer, useContext } from 'react';
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  LOGOUT_USER,
  SETUP_USER_BEGIN,
  SETUP_USER_ERROR,
  SETUP_USER_SUCCESS,
  TOGGLE_SIDEBAR,
} from './constants';
import reducer from './reducer';

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const location = localStorage.getItem('location');

const initialState = {
  alertText: '',
  alertType: '',
  isLoading: false,
  jobLocation: location || '',
  showAlert: false,
  showSidebar: false,
  token: token,
  user: user ? JSON.parse(user) : null,
  userLocation: location || '',
};

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = (payload) => {
    dispatch({ type: DISPLAY_ALERT, payload });
  };
  const clearAlert = () => {
    dispatch({ type: CLEAR_ALERT });
  };
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };
  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('location', location);
  };
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('location');
  };
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const response = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );
      const { user, token, location } = response.data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: {
          user,
          token,
          location,
          type: 'success',
          message: alertText,
        },
      });
      addUserToLocalStorage({
        user,
        token,
        location,
      });
    } catch (err) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: {
          type: 'danger',
          message: err.response.data.msg,
        },
      });
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        clearAlert,
        logoutUser,
        toggleSidebar,
        setupUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
