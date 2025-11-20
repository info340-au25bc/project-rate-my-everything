import React from 'react';

export function Lists(props) {
    return (
        <main>
            <div className="lists-header">
                <h2>Your Lists</h2>
                <a href="add-list.html" class="button">Add New List</a>
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