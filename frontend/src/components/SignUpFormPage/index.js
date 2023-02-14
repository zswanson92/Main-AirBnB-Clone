import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';
// import LoginForm from "../LoginFormModal"

function SignupFormPage({ setShowModal }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);


  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
        .then(() => setShowModal(false))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Passwords do not match.']);
  };

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleEmail = event => {
    if (!isValidEmail(event.target.value)) {
      let err = []
      err.push('Email is invalid');
      setErrors(err)
    }
    else {
      setErrors([]);
    }

    setEmail(event.target.value);
  };

  function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  function emailSet() {
    return setEmail(makeid(8) + "@test.com")
  }

  function usernameSet() {
    return setUsername(makeid(8))
  }

  function firstnameSet() {
    return setFirstName(makeid(8))
  }

  function lastnameSet() {
    return setLastName(makeid(8))
  }

  function passwordSet() {
    return setPassword("password")
  }

  function comboSet() {
    emailSet()
    usernameSet()
    firstnameSet()
    lastnameSet()
    passwordSet()
    setConfirmPassword("password")
  }


  return (
    <form className='signup-popout' onSubmit={handleSubmit}>
      <p className="signup-popout-bannertext">Sign up</p>
      <p className='corny-pr-line'>Join the Ultimate ZnB family</p>
      <div>
        <input
          placeholder="Email"
          className="signup-form-input"
          type="text"
          value={email}
          onChange={handleEmail}
          required
        />
        {email.length > 0 && !isValidEmail(email) ? <div style={{ fontSize: '15px', marginLeft: '4em', color: 'red' }}>Not a valid email address.</div> : <div> &nbsp; </div>}
      </div>
      <div>
        <input
          placeholder="Username"
          className="signup-form-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {username.length > 25 ? <div style={{ fontSize: '15px', marginLeft: '1em', color: 'red' }}>Username must be 25 characters or less.</div> : <div> &nbsp; </div>}
      </div>
      <div>
        <input
          placeholder="First Name"
          className="signup-form-input"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        {firstName.length > 30 ? <div style={{ fontSize: '15px', marginLeft: '1em', color: 'red' }}>Username must be 30 characters or less.</div> : <div> &nbsp; </div>}
      </div>
      <div>
        <input
          placeholder="Last Name"
          className="signup-form-input"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        {lastName.length > 30 ? <div style={{ fontSize: '15px', marginLeft: '1em', color: 'red' }}>Username must be 30 characters or less.</div> : <div> &nbsp; </div>}
      </div>
      <div>
        <input
          placeholder="Password"
          className='signup-form-input'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div> &nbsp; </div>
      </div>
      <div>
        <input
          placeholder="Confirm Password"
          className="signup-form-input"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {/* {confirmPassword.length && confirmPassword !== password ? <div style={{fontSize: '15px',  marginLeft: '3em', color: 'red'}}>Your passwords do not match.</div> : <div> &nbsp; </div>} */}

      </div>
      {errors.length > 0 && (
        <div className="signup-errors-div">
          {errors.map((error, idx) => (
            <div key={idx}>{error}</div>
          ))}
        </div>
      )}
      <button className='signup-form-button' type="submit">Sign Up</button>
      <button className='signup-form-button' onClick={comboSet}>Log in as demo user</button>
    </form>
  );
}

export default SignupFormPage;
