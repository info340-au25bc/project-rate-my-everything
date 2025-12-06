import React, { useState, useMemo, useEffect } from 'react';
import { LogCard } from './LogCard';
import { SearchBar } from './SearchBar';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';

export function LogHistory({ onOpenDescriptionModal }) {
    const [logs, setLogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Subscribe to Firebase Realtime Database
    useEffect(() => {
        const db = getDatabase();
        const allLogsRef = ref(db, 'allLogs');

        setIsLoading(true);
        
        const unsubscribe = onValue(allLogsRef, (snapshot) => {
            const data = snapshot.val();
            // Convert to object
            const logsArray = data ? Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            })) : [];
            
            // Filter by current user
            const auth = getAuth();
            const userLogs = logsArray.filter(log => log.userId === auth.currentUser?.uid).reverse();
            

            setLogs(userLogs);
            setIsLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const filteredLogs = useMemo(() => {
        if (!searchTerm.trim()) {
            return logs;
        }

        const searchLower = searchTerm.toLowerCase();
        return logs.filter(log => {
            return (
                log.name.toLowerCase().includes(searchLower) ||
                log.category.toLowerCase().includes(searchLower) ||
                log.rating.toString().includes(searchLower)
            );
        });
    }, [logs, searchTerm]);

    const logCards = filteredLogs.map(log => (
        <LogCard 
            key={log.id} 
            logData={log} 
            onOpenDescriptionModal={onOpenDescriptionModal}
            showAddToList={true}
            showActions={true}
        />
    ));
    
    return (
        <main className="log-history-main">
            <div className="rec-log container py-5"> 
                <div className="log-history-header">
                    <h1>Log History</h1>
                    <div className="search-bar-wrapper">
                        <SearchBar onSearch={handleSearch} />
                    </div>
                </div>
                {isLoading ? (
                    <p className="no-results">Loading logs...</p>
                ) : logCards.length > 0 ? (
                    <div className="row g-4">
                        {logCards}
                    </div>
                ) : (
                    <p className="no-results">No logs found matching your search.</p>
                )}
            </div>
        </main>
    )
}