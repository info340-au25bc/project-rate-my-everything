import React from 'react';
import { NavLink } from 'react-router';

export function NavBar() {
    return (
        <nav id="nav">
            <ul>
                <li><NavLink to="/home"><img src="https://cdn4.iconfinder.com/data/icons/seo-marketing-21/100/customer-512.png" /></NavLink></li>
                <li><NavLink to="/lists">Lists</NavLink></li>
                <li><NavLink to="/addlog">Add Log</NavLink></li>
                <li><NavLink to="loghistory">Log History</NavLink></li>
            </ul>
        </nav>
    );
}