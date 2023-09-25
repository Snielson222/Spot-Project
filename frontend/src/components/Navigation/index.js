import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import imgSrc from '../../images/FullLogo_Transparent.png'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className='navContainer'>
      <li>
        <NavLink className="home" exact to="/"><img className="logo" alt="logo" src={imgSrc}></img></NavLink>
      </li>
      <ul className='createAndProfileContainer'>

      <li>
        <NavLink className="create" exact to='/spots/new'>Create a New Spot</NavLink>
      </li>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
      </ul>
    </ul>
  );
}

export default Navigation;