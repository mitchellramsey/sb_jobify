import axios from 'axios';
import React, { useReducer, useContext, useEffect } from 'react';
import {
  CLEAR_ALERT,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_ERROR,
  CREATE_JOB_SUCCESS,
  DISPLAY_ALERT,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  HANDLE_CHANGE,
  LOGOUT_USER,
  SETUP_USER_BEGIN,
  SETUP_USER_ERROR,
  SETUP_USER_SUCCESS,
  TOGGLE_SIDEBAR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
} from './constants';
import reducer from './reducer';

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const location = localStorage.getItem('location');

const initialState = {
  alertText: '',
  alertType: '',
  isLoading: false,
  isEditing: false,
  jobLocation: location || '',
  showAlert: false,
  showSidebar: false,
  token: token,
  user: user ? JSON.parse(user) : null,
  userLocation: location || '',
  editJobId: '',
  position: '',
  company: '',
  jobTypeOptions: ['Full-Time', 'Part-Time', 'Contract', 'Internship'],
  jobType: 'Full-Time',
  statusOptions: ['Interviewing', 'Declined', 'Applied', 'Accepted'],
  status: 'Applied',
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
};

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Axios Auth Fetch
  const authFetch = axios.create({
    baseURL: '/api/v1',
  });

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error.response);
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  //Alerts
  const displayAlert = (payload) => {
    dispatch({ type: DISPLAY_ALERT, payload });
    clearAlert();
  };
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 2000);
  };

  //Sidebar
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  //Local Storage
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

  //AddJob Functions
  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value },
    });
  };

  const clearValues = () => {
    dispatch({
      type: CLEAR_VALUES,
    });
  };

  //Create Job
  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN });
    try {
      const { position, company, jobLocation, jobType, status } = state;
      await authFetch.post('/jobs', {
        company,
        position,
        jobLocation,
        jobType,
        status,
      });
      dispatch({
        type: CREATE_JOB_SUCCESS,
        payload: {
          type: 'success',
          message: 'New Job Created!',
        },
      });
      clearValues();
    } catch (err) {
      if (err.response.status === 401) return;
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: {
          type: 'danger',
          message: err.response.data.msg,
        },
      });
    }
    clearAlert();
  };

  //GetJobs
  const getJobs = async () => {
    let url = '/jobs';

    dispatch({ type: GET_JOBS_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { jobs, totalJobs, numOfPages } = data;
      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: {
          jobs,
          totalJobs,
          numOfPages,
        },
      });
    } catch (err) {
      console.log(err.response);
      logoutUser();
    }
    clearAlert();
  };

  //Updates to User
  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser);
      const { user, location, token } = data;
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: {
          user,
          location,
          token,
          type: 'success',
          msg: 'User Profile Updated!',
        },
      });
      addUserToLocalStorage({ user, location, token });
    } catch (err) {
      if (err.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { type: 'danger', msg: err.response.data.msg },
        });
      }
    }
    clearAlert();
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
    clearAlert();
  };

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearAlert,
        clearValues,
        createJob,
        displayAlert,
        getJobs,
        handleChange,
        logoutUser,
        toggleSidebar,
        setupUser,
        updateUser,
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
