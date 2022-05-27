import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, FormRow, Logo } from '../components';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/RegisterPage';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const navigate = useNavigate();
  const { user, isLoading, showAlert, displayAlert, clearAlert, registerUser } =
    useAppContext();

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (showAlert) clearAlert();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert({
        type: 'danger',
        message: 'Please provide all values!',
      });
      return;
    }
    const currentUser = { name, email, password };
    if (isMember) {
      console.log('already a member');
    } else {
      registerUser(currentUser);
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
