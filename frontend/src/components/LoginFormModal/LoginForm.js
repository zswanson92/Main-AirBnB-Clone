import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginFormModal.css'

function LoginForm({ setShowModal }) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
    .then(() => setShowModal(false))
    .catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className='login-popout'>

      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      {/* <div className='login-popout-bannertext'>Login</div> */}
      <p className="login-popout-bannertext">Login</p>
      <p className="goofy-welcome">Welcome back to Ultimate ZnB</p>
      {/* <label className="username-label">
        Username or Email */}
        <input
          className="username-input"
          type="text"
          value={credential}
          placeholder="Username or Email"
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      {/* </label> */}
      {/* <label className="password-label">
        Password */}
        <input
          className='password-input'
          type="password"
          value={password}
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      {/* </label> */}
      <button type="submit" className="login-continue-button">Continue</button>
    </form>
  );
}

export default LoginForm;
