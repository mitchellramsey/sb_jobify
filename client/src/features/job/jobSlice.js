import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authFetchCreator } from '../utils/utils';
import { logoutUser } from '../user/userSlice';
const location = localStorage.getItem('location');

const initialState = {
  alertText: '',
  alertType: '',
  company: '',
  editJobId: '',
  isEditing: false,
  isLoading: false,
  jobLocation: location || '',
  jobType: 'Full-Time',
  jobTypeOptions: ['Full-Time', 'Part-Time', 'Contract', 'Internship'],
  jobs: [],
  numOfPages: 1,
  page: 1,
  position: '',
  showAlert: false,
  status: 'Applied',
  statusOptions: ['Interviewing', 'Declined', 'Applied', 'Accepted'],
  totalJobs: 0,
};

export const createJob = createAsyncThunk(
  'job/createJob',
  async (arg, { dispatch, getState }) => {
    try {
      const { job } = getState();
      const { company, position, jobLocation, jobType, status } = job;
      const authFetch = authFetchCreator();
      await authFetch.post('/jobs', {
        company,
        position,
        jobLocation,
        jobType,
        status,
      });
      dispatch(clearValues());
      return {
        type: 'success',
        message: 'New Job Created!',
      };
    } catch (error) {
      return {
        type: 'danger',
        message: error.response.data.msg,
      };
    }
  }
);

export const getJobs = createAsyncThunk('job/getJobs', async () => {
  try {
    const authFetch = authFetchCreator();
    const { data } = await authFetch('/jobs');
    const { jobs, totalJobs, numOfPages } = data;
    return {
      jobs,
      totalJobs,
      numOfPages,
    };
  } catch (error) {
    return {
      type: 'danger',
      message: error.response.data.msg,
    };
  }
});

export const deleteJob = createAsyncThunk(
  'job/deleteJob',
  async (jobId, { dispatch }) => {
    try {
      const authFetch = authFetchCreator();
      await authFetch.delete(`/jobs/${jobId}`);
      dispatch(getJobs());
    } catch (error) {
      logoutUser();
    }
  }
);

export const editJob = createAsyncThunk(
  'job/editJob',
  async (arg, { getState }) => {
    try {
      const { job } = getState();
      const { company, position, jobLocation, jobType, status } = job;

      const authFetch = authFetchCreator();
      await authFetch.patch(`/jobs/${job.editJobId}`, {
        company,
        position,
        jobLocation,
        jobType,
        status,
      });
      clearValues();
      return {
        type: 'success',
        message: 'Job Updated!',
      };
    } catch (error) {
      if (error.response.status === 401) return;
      return {
        type: 'danger',
        message: error.response.data.msg,
      };
    }
  }
);

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    clearValues: (state) => {
      return {
        ...state,
        position: '',
        company: '',
        jobLocation: location || '',
        jobType: 'Full-Time',
        status: 'Applied',
        isEditing: false,
        editJobId: '',
      };
    },
    displayJobAlert: (state, action) => {
      return {
        ...state,
        showAlert: true,
        alertType: action.payload.type,
        alertText: action.payload.message,
      };
    },
    handleJobInput: (state, action) => {
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    },
    clearJobAlert: (state) => {
      return {
        ...state,
        showAlert: false,
        alertType: '',
        alertText: '',
      };
    },
    setEditJob: (state, action) => {
      const job = state.jobs.find((job) => job._id === action.payload.id);
      const { _id, position, company, jobLocation, jobType, status } = job;
      return {
        ...state,
        isEditing: true,
        editJobId: _id,
        position,
        company,
        jobLocation,
        jobType,
        status,
      };
    },
  },
  extraReducers: {
    [createJob.pending]: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [createJob.fulfilled]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: action.payload.type,
        alertText: action.payload.message,
      };
    },
    [createJob.rejected]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: action.payload.type,
        alertText: action.payload.message,
      };
    },
    [getJobs.pending]: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [getJobs.fulfilled]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        jobs: action.payload.jobs,
        totalJobs: action.payload.totalJobs,
        numOfPages: action.payload.numOfPages,
      };
    },
    [getJobs.rejected]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: action.payload.type,
        alertText: action.payload.message,
      };
    },
    [deleteJob.pending]: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [editJob.pending]: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [editJob.fulfilled]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: action.payload.type,
        alertText: action.payload.message,
      };
    },
    [editJob.rejected]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: action.payload.type,
        alertText: action.payload.message,
      };
    },
  },
});

export const {
  clearValues,
  clearJobAlert,
  displayJobAlert,
  handleJobInput,
  setEditJob,
} = jobSlice.actions;
export default jobSlice.reducer;
