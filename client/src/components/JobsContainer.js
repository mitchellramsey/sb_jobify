import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getJobs } from '../features/job/jobSlice';
import PageBtnContainer from './PageBtnContainer';
import Loading from './Loading';
import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';

const JobsContainer = () => {
  const dispatch = useDispatch();
  const {
    jobs,
    isLoading,
    numOfPages,
    page,
    totalJobs,
    search,
    searchStatus,
    searchType,
    sort,
  } = useSelector((store) => store.job);
  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch, page, search, searchStatus, searchType, sort]);

  if (isLoading) {
    return <Loading center />;
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No Jobs To Display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && 's'} found
      </h5>
      <div className='jobs'>
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default JobsContainer;
