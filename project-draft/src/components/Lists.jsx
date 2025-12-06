import React from 'react';
import { ListCard } from './ListCard';

export function Lists({ onOpenAddListModal }) {
    return (
        <main className="list-body">
            <div className="lists-header">
                <h2>Your Lists</h2>
                <button onClick={onOpenAddListModal} className="button">Create a new list</button>
            </div>

            <ul>
                <li>
                </li>
            </ul>
        </main>
    )
}