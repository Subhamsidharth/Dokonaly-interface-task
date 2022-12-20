import React,{useContext} from 'react';
import {NavLink,useNavigate} from 'react-router-dom';
import './Header.css';
import { AuthContext } from '../../context/auth-context';

export const Header = () => {

  const auth = useContext(AuthContext);

  const navigate = useNavigate();
  const logOutHandler = () => {
    auth.logout();
    // navigate('/signin');
  }
  return (
    <section className='header-section'>
            <div><NavLink className="nav-link" to="/userprofile">Profile</NavLink></div>
            <div><NavLink className="nav-link" onClick={logOutHandler} to="/signin">Logout</NavLink></div>
    </section>
  )
}
