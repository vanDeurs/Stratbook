import React from 'react';
import '../styles/index.css';
import {NavLink} from 'react-router-dom';

export const Header = ({props}) => {
    return(
        <nav>
            <div className="navWrapper">
                <div className="navContainer">
                    <NavLink to='/' className='navLink'>Home</NavLink>
                </div>
            </div>
        </nav>
    )
}
    