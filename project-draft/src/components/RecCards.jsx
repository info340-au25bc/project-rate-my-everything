import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { LogCard } from './LogCard';

export function RecCards({ onOpenDescriptionModal }) {
    const [logs, setLogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const db = getDatabase();
        const auth = getAuth();
        const allLogsRef = ref(db, 'allLogs');
        
        const unsubscribe = onValue(allLogsRef, (snapshot) => {
            const data = snapshot.val();
            const currentUserId = auth.currentUser?.uid;
            
            // Convert Firebase object to array
            let logsArray = data ? Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            })) : [];
            
            // Filter out current user's logs
            if (currentUserId) {
                logsArray = logsArray.filter(log => log.userId !== currentUserId);
            }
            
            // Sort by createdAt and take top 3
            logsArray.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
            const newestThree = logsArray.slice(0, 3);
            
            setLogs(newestThree);
            setIsLoading(false);
        }, (error) => {
            console.error('Error reading logs:', error);
            setLogs([]);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const recCards = logs.map(log => (
        <LogCard 
            key={log.id} 
            logData={log}
            showActions={false}
            onOpenDescriptionModal={onOpenDescriptionModal} 
        />
    ));

    return (
        <div className="rec-log container py-5"> 
            <h2 className="log-title">Daily Recommended Logs</h2>
            <div className="row g-4">
                {isLoading ? (
                    <p>Loading recommendations...</p>
                ) : recCards.length > 0 ? (
                    recCards
                ) : (
                    <p>No recommendations available yet.</p>
                )}
            </div>
        </div>
    )
}