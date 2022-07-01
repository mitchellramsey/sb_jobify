import { useState, useEffect } from 'react';
import { FormRow, Alert } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import {
  displayUserAlert,
  updateUser,
  clearUserAlert,
} from '../../features/user/userSlice';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

const Profile = () => {
  const { user, showAlert, isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);
  const [location, setLocation] = useState(user?.location);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !lastName || !location) {
      dispatch(
        displayUserAlert({
          type: 'danger',
          message: 'Please provide all values!',
        })
      );
      return;
    }

    dispatch(updateUser({ name, email, lastName, location }));
  };

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        dispatch(clearUserAlert());
      }, 3000);
    }
  }, [showAlert, dispatch]);

  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className='form'>
        <h3>Profile</h3>
        {showAlert && <Alert />}

        {/* {name} */}
        <div className='form-center'>
          <FormRow
            labelText='First Name'
            type='text'
            name='name'
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormRow
            type='text'
            name='lastName'
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
            labelText='Last Name'
          />
          <FormRow
            type='email'
            name='email'
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormRow
            type='text'
            name='location'
            value={location}
            handleChange={(e) => setLocation(e.target.value)}
          />
          <button className='btn btn-block' type='submit' disabled={isLoading}>
            {isLoading ? 'Please Wait...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
