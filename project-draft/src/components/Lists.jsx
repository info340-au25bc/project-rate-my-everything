import React from 'react';
import { NavLink } from 'react-router'

export function Lists() {
    return (
        <main className="list-body">
            <div className="lists-header">
                <h2>Your Lists</h2>
                <NavLink to="/addlist" className="button">Add new list</NavLink>
            </div>

            <ul>
                <li>
                    <div className="card horizontal-card">
                        <img src="img/kane.jpg" alt="Kane Hall in the daytime" />
                        <div className="card-text">
                            <h3>UW Campus</h3>
                            <p>5 items</p>
                        </div>
                    </div>
                </li>
            </ul>
        </main>
    )
}