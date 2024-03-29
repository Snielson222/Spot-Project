import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { Link, useHistory } from "react-router-dom";
import './Navigation.css'
function ProfileButton({ user }) {
  const history = useHistory()
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = (e) => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push("/");
  };

  const ulClassName = "profile-dropdown " + (showMenu ? "" : "hidden");
  

  return (
    <>
    <div className="profileBox">
      <button className="profileButtonButton" onClick={openMenu}>
      <i class="fa fa-bars fa-2x" id="userlines" aria-hidden="true"></i>
      <i className="fas fa-user-circle fa-2x" id="usercircle"/>
      </button>
    </div>
      <ul className={ulClassName} 
      ref={ulRef}>
        {user ? (
          
          <>
            <li>Hello, {user.firstName}</li>
            <li>{user.username}</li>
            <li>{user.firstName} {user.lastName}</li>
            <li>{user.email}</li>
            
              <li className="manageSpots"><Link className='manageLink' exact to='/spots/current'>Manage Spots</Link></li>
              <button className="manageSpotsButton" onClick={logout}>Log Out</button>
            
          </>
          
        ) : (
          <div className="menuOpen">
            
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
            <br></br>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            
            <span>________________</span>
            <label>
            Gift Cards
            <button
            style={{ display: "none" }}
            className="menulinks"
            onClick={() => alert("Gift Cards Feature in Development...")}
            >
            
          </button>
            </label>
            <br></br>
            <label>
            Airbnb Your Home
          <button
          style={{ display: "none" }}
            className="menulinks"
            onClick={() => alert("Airbnb Your Home Feature in Development...")}
            >
            
          </button>
            </label>
            <br></br>
            <label>
            Help Center
          <button
          style={{ display: "none" }}
            className="menulinks"
            onClick={() => alert("Help Center Feature In Development...")}
            >
           
          </button>
            </label>
            </div>
          
        )}
      </ul>
    </>
  );
}

export default ProfileButton;