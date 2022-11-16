import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import icon from '../../randomimages/favicon-32x32.png'
import SignupFormPage from '../SignUpFormPage';
import LoginForm from '../LoginFormModal/LoginForm';
import { Modal } from '../../context/Modal'
import CreateSpotButton from '../CreateSpot';
import EditSpotButton from '../EditSpot';
import SpotsDetails from '../SpotsDetails';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false)
  const [login, setLogin] = useState(true)

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />,
      <EditSpotButton user={sessionUser} />,
      <SpotsDetails user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup" className='signup-button'>Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul>

        <NavLink exact to="/" className='home-button'><a href='logo.png' className='logo'><img className='abcd' src={icon} alt=""/></a></NavLink>

        {isLoaded && (<ProfileButton user={sessionUser}
        setLogin={setLogin}
        setShowModal={setShowModal} />)}

        <SpotsDetails user={sessionUser} />

        {showModal && <Modal onClose={() => setShowModal(false)}>
        {login ? <LoginForm setShowModal={setShowModal} /> : <SignupFormPage setShowModal={setShowModal}/> }
        </Modal>}
    </ul>
  );
}

export default Navigation;
