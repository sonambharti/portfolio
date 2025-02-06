import React from 'react';
import '../Style/Navbar.css';
import { Link } from 'react-scroll';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { byPrefixAndName } from '@awesome.me/kit-KIT_CODE/icons'    
export default function Navbar() {
    return (
        <div className="navbar">
            <ul>
                <li><Link to="home" smooth={true} duration={500}>Home</Link></li>
                <li><Link to="about" smooth={true} duration={500}>About</Link></li>
                <li><Link to="education" smooth={true} duration={500}>Qualifications</Link></li>
                <li><Link to="experience" smooth={true} duration={500}>Experience</Link></li>
                <li><Link to="skills" smooth={true} duration={500}>Skills</Link></li>
                <li><Link to="project" smooth={true} duration={1000}>Projects</Link></li>
                <li><Link to="achievement" smooth={true} duration={500}>Achievements</Link></li>
                {/* <li><Link to="extras" smooth={true} duration={500}>Extra</Link></li> */}
                <li><Link to="contact" smooth={true} duration={1200}>Contact</Link></li>
            </ul>
            {/* <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#experience">Experience</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#achievements">Achievements</a></li>
                <li><a href="#extras">Extra</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul> */}
            {/* <FontAwesomeIcon icon="fa-solid fa-user" /> */}
            {/* <div className="navbar-icon">
                <img src="icon.png" alt="profile" />
            </div> */}
        </div>
    )
}