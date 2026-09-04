import React, { useEffect, useRef, useState } from 'react';
import '../Style/Navbar.css';
import { Link } from 'react-scroll';
import { List, X } from '@phosphor-icons/react';

const NAV_ITEMS = [
    { to: 'home', label: 'Home' },
    { to: 'about', label: 'About' },
    { to: 'education', label: 'Qualifications' },
    { to: 'experience', label: 'Experience' },
    { to: 'skills', label: 'Skills' },
    { to: 'project', label: 'Projects' },
    { to: 'achievement', label: 'Achievements' },
    { to: 'contact', label: 'Contact' },
];

export default function Navbar() {
    const [active, setActive] = useState('home');
    const [menuOpen, setMenuOpen] = useState(false);
    const observerRef = useRef(null);

    useEffect(() => {
        const sections = NAV_ITEMS
            .map((item) => document.getElementById(item.to))
            .filter(Boolean);

        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActive(entry.target.id);
                    }
                });
            },
            { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
        );

        sections.forEach((section) => observerRef.current.observe(section));
        return () => observerRef.current && observerRef.current.disconnect();
    }, []);

    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <Link className="navbar-mark" to="home" smooth={true} duration={500} onClick={() => setMenuOpen(false)} aria-label="Sonam Bharti">
                    <svg className="navbar-mark-svg" viewBox="0 0 40 40" width="38" height="38" role="img" aria-label="SB logo">
                        <polygon
                            points="20,2 35.6,11 35.6,29 20,38 4.4,29 4.4,11"
                            fill="rgba(34, 201, 160, 0.08)"
                            stroke="#22c9a0"
                            strokeWidth="2"
                            strokeLinejoin="round"
                        />
                        <text x="20" y="21" textAnchor="middle" dominantBaseline="central" className="navbar-mark-letters">
                            SB
                        </text>
                    </svg>
                </Link>

                <ul className="navbar-links">
    {NAV_ITEMS.map((item) => (
                        <li key={item.to}>
                            <Link
                                to={item.to}
                                smooth={true}
                                duration={500}
                                offset={-64}
                                className={active === item.to ? 'is-active' : ''}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <button
                    className="navbar-toggle"
                    onClick={() => setMenuOpen((open) => !open)}
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={menuOpen}
                >
                    {menuOpen ? <X size={22} weight="regular" /> : <List size={22} weight="regular" />}
                </button>
            </div>

            {menuOpen && (
                <ul className="navbar-mobile-menu">
                    {NAV_ITEMS.map((item) => (
                        <li key={item.to}>
                            <Link
                                to={item.to}
                                smooth={true}
                                duration={500}
                                offset={-64}
                                className={active === item.to ? 'is-active' : ''}
                                onClick={() => setMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    );
}
