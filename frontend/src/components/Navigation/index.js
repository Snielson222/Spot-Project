import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import imgSrc from "../../images/FullLogo_Transparent.png";
import { useParams } from "react-router-dom";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const param = useParams();
  console.log("🚀 ~ Navigation ~ param:", param);

  return (
    <div className="navContainer">
      <div className="navBar">
        <NavLink className="home" exact to="/">
          <img className="logo" alt="logo" src={imgSrc}></img>
        </NavLink>
        <div className="middleNav">
          <a href="https://snielson222.github.io/">Portfolio</a>
          <a href="https://github.com/Snielson222">Github</a>
          <a href="https://www.linkedin.com/in/steven-nielson-5b7a3729a/">Linkedin</a>
        </div>
        <div className="createAndProfileContainer">
          {sessionUser && (
            <NavLink className="create" exact to="/spots/new">
              Create a New Spot
            </NavLink>
          )}
          {isLoaded && (
            <ProfileButton user={sessionUser} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
