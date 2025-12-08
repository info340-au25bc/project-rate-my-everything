import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { LogCard } from './LogCard';

export function RecCards({ onOpenDescriptionModal, onOpenAddToListModal }) {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const db = getDatabase();
        const auth = getAuth();
        const allLogsRef = ref(db, 'allLogs');
        
        const unsubscribe = onValue(allLogsRef, (snapshot) => {
            const data = snapshot.val();
            const currentUserId = auth.currentUser?.uid;
            
            let logsArray = data ? Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            })) : [];
            
            if (currentUserId) {
                logsArray = logsArray.filter(log => log.userId !== currentUserId);
            }
            
            logsArray.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
            const newestNine = logsArray.slice(0, 9);
            
            setLogs(newestNine);
        }, (error) => {
            console.error('Error reading logs:', error);
            setLogs([]);
        });

        return () => unsubscribe();
    }, []);

    const recCards = logs.map(log => (
        <LogCard 
            key={log.id} 
            logData={log}
            showActions={false}
            onOpenDescriptionModal={onOpenDescriptionModal}
            onOpenAddToListModal={onOpenAddToListModal}
        />
    ));

    return (
        <div className="rec-log container py-5"> 
            <h2 className="log-title">Daily Recommended Logs</h2>
            <div className="row g-4">
                {recCards.length > 0 ? (
                    recCards
                ) : (
                    <p>No recommendations available yet.</p>
                )}
            </div>
        </div>
    )
}