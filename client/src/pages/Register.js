import { useState, useEffect } from 'react';
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
  const { isLoading, showAlert, displayAlert, clearAlert } = useAppContext();

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
    }
    console.log(values);
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

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

        <button type='submit' className='btn btn-block'>
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
