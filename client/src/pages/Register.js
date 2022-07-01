import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  displayUserAlert,
  clearUserAlert,
  setupUser,
} from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { Alert, FormRow, Logo } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

const Register = () => {
  const dispatch = useDispatch();
  const { user, isLoading, showAlert } = useSelector((store) => store.user);
  const [values, setValues] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (showAlert) dispatch(clearUserAlert());
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      dispatch(
        displayUserAlert({
          type: 'danger',
          message: 'Please provide all values!',
        })
      );
      return;
    }
    const currentUser = { name, email, password };
    if (isMember) {
      dispatch(
        setupUser({
          currentUser,
          endPoint: 'login',
          alertText: 'Login Successful! Redirecting...',
        })
      );
    } else {
      dispatch(
        setupUser({
          currentUser,
          endPoint: 'register',
          alertText: 'User Created! Redirecting...',
        })
      );
    }
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [user, navigate]);

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        dispatch(clearUserAlert());
      }, 3000);
    }
  }, [showAlert, dispatch]);

  return (
    <Wrapper className='full-page'>
      <form onSubmit={onSubmit} className='form'>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {showAlert && <Alert />}
        {/* Name Input */}
        {!values.isMember && (
          <FormRow
            type='text'
            name='name'
            handleChange={handleChange}
            value={values.name}
          />
        )}
        {/* Email Input */}
        <FormRow
          type='email'
          name='email'
          handleChange={handleChange}
          value={values.email}
        />
        {/* Password Input */}
        <FormRow
          type='password'
          name='password'
          handleChange={handleChange}
          value={values.password}
        />

        <button type='submit' className='btn btn-block' disabled={isLoading}>
          Submit
        </button>
        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button type='button' onClick={toggleMember} className='member-btn'>
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
