import React from 'react';
import {NavLink} from 'react-router-dom';
import './Header.css';

export const Header = () => {
  return (
    <section className='header-section'>
            <div>Profile</div>
            <ul>
                <li><NavLink to="/users">Users</NavLink></li>
                <li><NavLink to="/changepassword">Change Password</NavLink></li>
                <li><NavLink to="/signup">Logout</NavLink></li>
            </ul>
    </section>
  )
}
