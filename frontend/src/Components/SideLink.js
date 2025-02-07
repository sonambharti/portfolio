// Footer.js
import React from 'react';
import '../Style/SideLink.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TbBrandLinkedinFilled } from "react-icons/tb";
import { BiLogoMediumSquare } from "react-icons/bi";
import { SiLeetcode } from "react-icons/si";
import { SiGeeksforgeeks } from "react-icons/si";
import { BiLogoGithub } from "react-icons/bi";
import { MdMail } from "react-icons/md";
// import { faLinkedin, faMedium, faGithub } from '@fortawesome/free-brands-svg-icons';
// import { faEnvelope, faCode, faLaptopCode } from '@fortawesome/free-solid-svg-icons';

export default function SideLink() {
    return (
        <footer className="sidelink">
            <div className="left">
                <ul>
                    <li><a className='link-a' href="https://linkedin.com/in/sonam-bharti-213127178" target="_blank" rel="noopener noreferrer"><TbBrandLinkedinFilled /></a></li>
                    <li><a className='link-a' href="https://medium.com/@sonam.iitjammu2023" target="_blank" rel="noopener noreferrer"><BiLogoMediumSquare /></a></li>
                    <li><a className='link-a' href="https://leetcode.com/u/2021pcs2040/" target="_blank" rel="noopener noreferrer"><SiLeetcode /></a></li>
                    <li><div className='left-sideline'></div></li>
                </ul>
            </div>
            <div className="right">
                <ul>
                    <li><a className='link-a' href="https://www.geeksforgeeks.org/user/sonam_bharti/" target="_blank" rel="noopener noreferrer"><SiGeeksforgeeks /></a></li>
                    <li><a className='link-a' href="mailto:sonam.iitjammu2023@gmail.com" target="_blank" rel="noopener noreferrer"><MdMail /></a></li>
                    {/* <li><a className='link' href="mailto:sonam.iitjammu2023@gmail.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faEnvelope} /></a></li> */}
                    <li><a className='link-a' href="https://github.com/sonambharti" target="_blank" rel="noopener noreferrer"><BiLogoGithub /></a></li>
                    <li><div className='right-sideline'></div></li>
                </ul>
            </div>
        </footer>
    )
}