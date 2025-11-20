import React from 'react';
import { RecCards } from './RecCards';

export function LogHistory(props) {
    return (
        <main class="container py-5">
            <h1>Log History</h1>
            <RecCards data={props.data} />
        </main>
    )
}