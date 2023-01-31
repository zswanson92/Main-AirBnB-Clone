import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import icon from '../../randomimages/logo-no-background.png'
import SignupFormPage from '../SignUpFormPage';
import LoginForm from '../LoginFormModal/LoginForm';
import { Modal } from '../../context/Modal'
import CreateSpotButton from '../CreateSpot';
// import EditSpotButton from '../EditSpot';
// import SpotsDetails from '../SpotsDetails';
import SearchBar from '../SearchBar/SearchBar';


function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false)
  const [login, setLogin] = useState(true)

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />

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
    <div className='header-div'>
      <div className='home-img-div'>
        <NavLink exact to="/" className='home-button'><a href='logo.png' className='logo'><img className='abcd' src={icon} alt="" /></a></NavLink>
      </div>

      <div><SearchBar /></div>

      <div>{sessionUser ? <CreateSpotButton /> : ""}</div>

      <div>
        {isLoaded && (<ProfileButton user={sessionUser}
          setLogin={setLogin}
          setShowModal={setShowModal} />)}
      </div>


      {showModal && <Modal onClose={() => setShowModal(false)}>
        <div>
          {login ? <LoginForm setShowModal={setShowModal} /> : <SignupFormPage setShowModal={setShowModal} />}
        </div>
      </Modal>}

    </div>
  );
}

export default Navigation;
