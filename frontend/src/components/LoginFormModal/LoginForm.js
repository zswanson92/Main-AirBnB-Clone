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
          // console.log("this is data", data)
          if (data && data.errors) setErrors([data]);
          // console.log('this is errors', errors)
        }
      );
  };

  function firstSet() {
    return setCredential('teamramrod')
  }

  function comboSet() {
    firstSet()
    setPassword('password')
  }

  // console.log("this is errors", errors)

  return (
    <form onSubmit={handleSubmit} className='login-popout'>
      <p className="login-popout-bannertext">Login</p>
      <p className="goofy-welcome">Welcome back to Ultimate ZnB</p>
      {/* <ul className="last-second-error"> */}
      {/* {console.log("this is errors", errors)} */}
      {/* {errors.map((error, idx) => (
        <div className="invalid-cred" key={idx}> • {error.message}</div>
      ))} */}
      {/* {errors.length > 0 ? <p>{errors[0]}</p> : null} */}
      {/* {  console.log("this is errors", errors)} */}
      {/* </ul> */}
      {/* <div className='login-popout-bannertext'>Login</div> */}

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
      <div>{errors.length ? <div style={{color: 'red'}}>Invalid Credentials</div> : <div> &nbsp; </div>}</div>
      <div className="login-continue-div">
      <button type="submit" className="login-continue-button">Continue</button>
      </div>
      <div className="demo-user-div">
        <button type='submit' className="another-demo-user"
          onClick={comboSet}>Log In as Demo User</button>
      </div>
    </form>
  );
}

export default LoginForm;
