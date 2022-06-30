import { FormRow, FormRowSelect, Alert } from '../../components';
import {
  createJob,
  clearValues,
  clearJobAlert,
  displayJobAlert,
  handleJobInput,
} from '../../features/job/jobSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

const AddJob = () => {
  const dispatch = useDispatch();
  const {
    company,
    isEditing,
    jobLocation,
    jobType,
    jobTypeOptions,
    position,
    showAlert,
    status,
    statusOptions,
  } = useSelector((state) => state.job);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      dispatch(
        displayJobAlert({
          type: 'danger',
          message: 'Please provide all values',
        })
      );
    }
    if (isEditing) {
      return;
    }
    dispatch(createJob());
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleJobInput({ name, value }));
  };

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        dispatch(clearJobAlert());
      }, 3000);
    }
  }, [showAlert, dispatch]);
  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'Edit Job' : 'Add Job'}</h3>
        {showAlert && <Alert />}

        <div className='form-center'>
          <FormRow
            type='text'
            name='position'
            value={position}
            handleChange={handleChange}
          />
          <FormRow
            type='text'
            name='company'
            value={company}
            handleChange={handleChange}
          />
          <FormRow
            type='text'
            labelText='location'
            name='jobLocation'
            value={jobLocation}
            handleChange={handleChange}
          />
          <FormRowSelect
            name='status'
            value={status}
            handleChange={handleChange}
            list={statusOptions}
          />
          <FormRowSelect
            labelText='type'
            name='jobType'
            value={jobType}
            handleChange={handleChange}
            list={jobTypeOptions}
          />
          <div className='btn-container'>
            <button
              className='btn btn-block submit-btn'
              type='submit'
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              className='btn btn-block clear-btn'
              onClick={(e) => {
                e.preventDefault();
                dispatch(clearValues());
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
