import { GET_JOBS_BEGIN, GET_JOBS_SUCCESS } from './constants';

const reducer = (state, action) => {
  switch (action.type) {
    case GET_JOBS_BEGIN:
      return {
        ...state,
        isLoading: true,
        showAlert: false,
      };
    case GET_JOBS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jobs: action.payload.jobs,
        totalJobs: action.payload.totalJobs,
        numOfPages: action.payload.numOfpages,
      };
    default:
      throw new Error(`no such action :${action.type}`);
  }
};

export default reducer;
