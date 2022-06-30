import Wrapper from '../assets/wrappers/BigSidebar';
import { useSelector } from 'react-redux';
import NavLinks from './NavLinks';
import Logo from './Logo';

const BigSidebar = () => {
  const { showSidebar } = useSelector((store) => store.user);
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? 'sidebar-container' : 'sidebar-container show-sidebar'
        }
      >
        <div className='content'>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
