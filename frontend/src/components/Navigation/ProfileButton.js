import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css';
import CreateSpotButton from "../CreateSpot";
// import { Modal } from '../../context/Modal';


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


  return (
    <>
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />

      </button>

      {user ? <CreateSpotButton /> : null}
      {showMenu && ( user ?
        (<ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>) :
        (
        <ul className='two-buttons'>
          <button onClick={() => {
            setLogin(true)
            setShowModal(true)
          }}>Log In</button>
          <button onClick={() => {
            setLogin(false)
            setShowModal(true)
          }}>Sign Up</button>
        </ul>
        )
      )}
    </>
  );
}

export default ProfileButton;
