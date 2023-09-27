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

  return (
    <div className="logInFormContainer">
      <h1>Log In</h1>
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
        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        <button disabled={disableCheck()} className="logInButton" type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginFormModal;