import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import imgSrc from '../../images/FullLogo_Transparent.png'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    
    <div className='navContainer'>
      <div className='navBar'>
      <div>
        <NavLink className="home" exact to="/"><img className="logo" alt="logo" src={imgSrc}></img></NavLink>
      </div>
      <div className='createAndProfileContainer'>

      <div>
        <NavLink className="create" exact to='/spots/new'>{sessionUser ? "Create a New Spot" : ""}</NavLink>
      </div>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
      </div>
    </div>
    <div className='searchNav'>
      <label className='searchLabel'>
      <input className='searchInput'></input>
      </label>
    </div>
    </div>
  );
}

export default Navigation;