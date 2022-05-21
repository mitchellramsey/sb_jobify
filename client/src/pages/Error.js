import { Link } from 'react-router-dom';
import img from '../assets/images/not-found.svg';
import Wrapper from '../assets/wrappers/ErrorPage';

const Error = () => {
  return (
    <Wrapper className='full-page'>
      <div>
        <img src={img} alt='Not Found' />
        <h3>Oh no! Page Not Found</h3>
        <p>We can't seem to find the page you're looking for</p>
        <Link to='/'>Return to Home</Link>
      </div>
    </Wrapper>
  );
};

export default Error;
