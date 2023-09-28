import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  function disableCheck() {
    if (password.length < 6|| credential.length < 4) {
      return true
    }
    return false
  }

  function demoUser() {
    dispatch(sessionActions.login({ credential: "Bear", password: "violet"}))
    closeModal()
  }

  return (
    <div className="logInFormContainer">
      <h1>Log In</h1>
      <p>{Object.values(errors)}</p>
      <form className="formLogIn" onSubmit={handleSubmit}>
        <label className="usernameContainer">
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            placeholder="Username or Email"
          />
        </label>
        <label className="passwordContainer">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </label>
        <button onClick={demoUser}>Demo User</button>
        <button disabled={disableCheck()} className="logInButton" type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginFormModal;