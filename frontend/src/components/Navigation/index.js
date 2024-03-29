import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import imgSrc from "../../images/FullLogo_Transparent.png";
import { useParams } from "react-router-dom";


function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const param = useParams()
  console.log("🚀 ~ Navigation ~ param:", param)
  

  return (
    <div className="navContainer">
      <div className="navBar">
        <div>
          <NavLink className="home" exact to="/">
            <img className="logo" alt="logo" src={imgSrc}></img>
          </NavLink>
        </div>
        <div className="middleNav">
          <a href="https://snielson222.github.io/">Portfolio</a>
          <br></br>
          <a href="https://github.com/Snielson222">Github</a>
          <br></br>
          <a href="https://www.linkedin.com/in/steven-nielson-5b7a3729a/">Linkedin</a>
        </div>
        <div className="createAndProfileContainer">
          <div>
            <NavLink className="create" exact to="/spots/new">
              {sessionUser ? "Create a New Spot" : ""}
            </NavLink>
          </div>
          {isLoaded && (
            <li>
              <ProfileButton user={sessionUser} />
            </li>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
