import React from 'react';
import {Link} from 'react-router';
import './Header.css';

export const Header = () => {
  return (
    <section className='header-section'>
        
            <div>Profile</div>
            <ul>
                <li>users</li>
                <li>change password</li>
                <li>logout</li>
            </ul>
    
    </section>
  )
}
