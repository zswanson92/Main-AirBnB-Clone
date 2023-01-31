import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css';
import CreateSpotButton from "../CreateSpot";
// import { Modal } from '../../context/Modal';
// import EditSpotButton from "../EditSpot";
import { useLocation } from 'react-router-dom'

function ProfileButton({ user, setLogin, setShowModal }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);


  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const location = useLocation();

  const abcde = location.pathname



  return (
    <>
      {/* {user && (abcde === '/' ? <CreateSpotButton /> : null)} */}

      <button onClick={openMenu} className='random-button'>
      <div className="test-bars-div">
        <i className="fas fa-bars fa-2x" />
      </div>
      </button>


      {/* {user ? <EditSpotButton /> : null} */}
      {showMenu && ( user ?
        (<ul className="profile-dropdown">
          <li className="username-li">Username: {user.username}</li>
          <li className="email-li">User email: {user.email}</li>
          <li>
            <button className="the-logout-button" onClick={logout}>Log Out</button>
          </li>
        </ul>) :
        (
        <ul className='two-buttons'>
          <button className="initial-login-button" onClick={() => {
            setLogin(true)
            setShowModal(true)
          }}>Log in</button>
          <button className="initial-signup-button" onClick={() => {
            setLogin(false)
            setShowModal(true)
          }}>Sign up</button>
        </ul>
        )
      )}
    </>
  );
}

export default ProfileButton;
