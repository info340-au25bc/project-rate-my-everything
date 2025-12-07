import React from 'react';
import { NavLink } from 'react-router';
import { getAuth, signOut } from 'firebase/auth';
import { Dropdown } from 'react-bootstrap';

export function NavBar({ onOpenModal }) {
    const handleAddLogClick = () => {
        onOpenModal();
    };

    const auth = getAuth();
    const user = auth.currentUser;

    const handleSignOut = () => {
        signOut(auth);
    };

    return (
        <nav id="nav">
            <Dropdown className="menu-dropdown">
                <Dropdown.Toggle 
                    as="button" 
                    className="menu-toggle"
                    variant="link"
                >
                    <img src="/img/menu_icon.png" alt="menu icon" />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item 
                        as="div" 
                        className="mobile-only"
                    >
                        <NavLink to="/home" className="dropdown-item-link">
                            Home
                        </NavLink>
                    </Dropdown.Item>
                    <Dropdown.Item 
                        as="button" 
                        onClick={handleAddLogClick}
                        className="nav-button"
                    >
                        Add Log
                    </Dropdown.Item>
                    <Dropdown.Item 
                        as="div"
                    >
                        <NavLink to="loghistory" className="dropdown-item-link">
                            Log History
                        </NavLink>
                    </Dropdown.Item>
                    <Dropdown.Item 
                        as="div"
                    >
                        <NavLink to="/lists" className="dropdown-item-link">
                            Lists
                        </NavLink>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <NavLink to="/home" className="home-icon">
                <img src="https://cdn4.iconfinder.com/data/icons/seo-marketing-21/100/customer-512.png" alt="Home" />
            </NavLink>

            <ul className="desktop-menu">
                <li><button onClick={handleAddLogClick} className="nav-button">Add Log</button></li>
                <li><NavLink to="loghistory">Log History</NavLink></li>
                <li><NavLink to="/lists">Lists</NavLink></li>
            </ul>

            {user && (
                <button id='sign-out' onClick={handleSignOut} className="nav-button">
                    Sign Out
                </button>
            )}
        </nav>
    );
}