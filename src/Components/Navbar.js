import React from 'react';
import '../Style/Navbar.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { byPrefixAndName } from '@awesome.me/kit-KIT_CODE/icons'    
export default function Navbar() {
    return (
        <div className="navbar">
            
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#experience">Experience</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#achievements">Achievements</a></li>
                <li><a href="#extras">Extra</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
            {/* <FontAwesomeIcon icon="fa-solid fa-user" /> */}
            {/* <div className="navbar-icon">
                <img src="icon.png" alt="profile" />
            </div> */}
        </div>
    )
}