
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { authenticate, login } from '../../store/session';
import {MdStorage} from 'react-icons/md'



import './NavBar.css'
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../auth/SignUpForm';
import { checkIfImageExists } from '../utils';

const NavBar = () => {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const [openDropDown, setOpenDropDown] = useState(false)
  const [openLogin, setOpenLogin] = useState(false)
  const [openSignUp, setOpenSignUp] = useState(false)
  let imgValid;

  if(sessionUser){
    imgValid = checkIfImageExists(sessionUser.profile_pic)
  }
  // console.log(sessionUser)
  const handleDemoLogin = () => {
    dispatch(login("demo@aa.io", "password"))
    setOpenDropDown(false)
  }
  const handleLoginClick = () => {
    setOpenLogin(true)
    setOpenDropDown(false);
  }
  const handleSignUpClick = () => {
    setOpenSignUp(true)
    setOpenDropDown(false)
  }
  return (
    <nav>
      <ul className="nav-links">
        <li>
          <NavLink
            className="inactive"
            to="/"
            exact={true}
            activeClassName="active"
          >
            <div
              className="bearbnb-logo"
              style={{
                backgroundImage: `url("https://m.media-amazon.com/images/I/41io9KLyNaL._AC_SX466_.jpg")`,
              }}
            ></div>
          </NavLink>
        </li>
        <div>
          <NavLink className="inactive" to="/" exact={true}>
            <h1 className="page-name">Bearbnb</h1>
          </NavLink>
        </div>
        <div className="nav-bar-right">
          {sessionUser && (
            <li>
              <NavLink
                className="inactive"
                to="/become-a-host"
                exact={true}
                activeClassName="active"
              >
                Become a host
              </NavLink>
            </li>
          )}
          <li className="nav-login-signup">
            <div
              onClick={() => setOpenDropDown(!openDropDown)}
   
              className={
                openDropDown
                  ? "nav-profile-click open"
                  : "nav-profile-click closed"
              }
            >
              <MdStorage className="nav-pp-logo" />
              <div
                className="nav-profile-pic"
                style={{
                  backgroundImage: `url(${
                    sessionUser && imgValid
                      ? sessionUser.profile_pic
                      : "https://a0.muscache.com/defaults/user_pic-50x50.png?v=3"
                  } )`,
                }}
              ></div>
            </div>
            {openDropDown && (
              <div className="profile-drop-down">
                {!sessionUser ? (
                  <div className="dropdown-inside-loggedout">
                    {/* <NavLink
                      to="/login"
                      className="inactive"
                      exact={true}
                      activeClassName="active"
                      onClick={() => setOpenDropDown(false)}
                    >
                      Login
                    </NavLink> */}
                    <p className="login-p" onClick={handleLoginClick}>
                      Login
                    </p>

                    <p className="login-p" onClick={handleSignUpClick}>
                      Sign Up
                    </p>
                    <p className="inactive" onClick={handleDemoLogin}>
                      Demo
                    </p>
                  </div>
                ) : (
                  <div className="dropdown-inside">
                    <div className="dropdown-content">
                      <NavLink
                        className="inactive"
                        to={`/users/${sessionUser.id}`}
                        onClick={() => setOpenDropDown(false)}
                      >
                        My Profile
                      </NavLink>
                      <NavLink
                        className="inactive"
                        to={`/users/${sessionUser.id}/bookings`}
                        onClick={() => setOpenDropDown(false)}
                      >
                        Trips
                      </NavLink>
                    </div>
                    <div
                      className="logout-btn"
                      onClick={() => setOpenDropDown(false)}
                    >
                      <LogoutButton />
                    </div>
                  </div>
                )}
              </div>
            )}
          </li>
        </div>
      </ul>
      {openLogin && <LoginForm setOpenLogin={setOpenLogin} />}
      {openSignUp && <SignUpForm setOpenSignUp={setOpenSignUp} />}
    </nav>
  );
}

export default NavBar;
