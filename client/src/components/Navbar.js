import { useState } from 'react';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar, logoutUser } from '../features/user/userSlice';
import { removeUserFromLocalStorage } from '../features/utils/utils';
import Logo from './Logo';
import Wrapper from '../assets/wrappers/Navbar';

const Navbar = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [showLogout, setShowLogout] = useState(false);
  const logoutUserClick = () => {
    dispatch(logoutUser());
    removeUserFromLocalStorage();
  };
  return (
    <Wrapper>
      <div className='nav-center'>
        <button
          className='toggle-btn'
          onClick={() => dispatch(toggleSidebar())}
        >
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className='logo-text'>Dashboard</h3>
        </div>

        <div className='btn-container'>
          <button className='btn' onClick={() => setShowLogout(!showLogout)}>
            <FaUserCircle />
            {user && user.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
            <button className='dropdown-btn' onClick={logoutUserClick}>
              Log Out
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
