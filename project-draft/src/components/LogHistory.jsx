import React from 'react';
import { LogCard } from './LogCard';

export function LogHistory({ data }) {
    console.log(data);
    const logCards = data.map(log => <LogCard key={log.name} logData={log} />)
    
    return (
        <main>
            <div className="rec-log container py-5"> 
                <h1>Log History</h1>
                <div className="row g-4">
                    {logCards}
                </div>
            </div>
        </main>
    )
}