import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router';

export function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <nav id="nav" ref={menuRef}>
            <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <img src="img/menu_icon.png" alt="menu icon" />
            </button>

            <NavLink to="/home" className="home-icon">
                <img src="https://cdn4.iconfinder.com/data/icons/seo-marketing-21/100/customer-512.png" alt="Home" />
            </NavLink>

            <ul className={isMenuOpen ? 'active' : ''}>
                <li className="mobile-only"><NavLink to="/home" onClick={() => setIsMenuOpen(false)}>Home</NavLink></li>
                <li><NavLink to="/lists" onClick={() => setIsMenuOpen(false)}>Lists</NavLink></li>
                <li><NavLink to="/addlog" onClick={() => setIsMenuOpen(false)}>Add Log</NavLink></li>
                <li><NavLink to="loghistory" onClick={() => setIsMenuOpen(false)}>Log History</NavLink></li>
            </ul>
        </nav>
    );
}