import React from "react";
import { LogCard } from './LogCard';

export function RecCards({ data, onOpenDescriptionModal }) {
    const recCards = data.map(log => <LogCard key={log.name} logData={log} onOpenDescriptionModal={onOpenDescriptionModal} />)

    return (
        <div className="rec-log container py-5"> 
            <h2 className="log-title">Daily Recommended Logs</h2>
            <div className="row g-4">
                {recCards}
            </div>
        </div>
    )
}