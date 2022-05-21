import React from 'react';
import { Logo } from '../components';
import { Link } from 'react-router-dom';
import main from '../assets/images/main.svg';
import LandingWrapper from '../assets/wrappers/LandingPage';

const Landing = () => {
  return (
    <LandingWrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>
            Job <span> Tracking </span> App
          </h1>
          <p>
            I'm baby lomo godard scenester normcore +1 hoodie 90's artisan
            edison bulb. Wolf 90's ramps polaroid VHS. Poutine flexitarian
            flannel, fixie YOLO banjo scenester ennui street art selfies hexagon
            bespoke praxis you probably haven't heard of them woke.
          </p>
          <Link to='/register' className='btn btn-hero'>
            Login/Register
          </Link>
        </div>
        <img src={main} alt='job hunt' className='img main-img' />
      </div>
    </LandingWrapper>
  );
};

export default Landing;
