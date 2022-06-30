import axios from 'axios';
import React, { useReducer, useContext } from 'react';
import { GET_JOBS_BEGIN, GET_JOBS_SUCCESS } from './constants';
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
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        getJobs,
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
