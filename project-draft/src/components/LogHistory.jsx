import React, { useState, useMemo } from 'react';
import { LogCard } from './LogCard';
import { SearchBar } from './SearchBar';

export function LogHistory({ data, onOpenDescriptionModal }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const filteredLogs = useMemo(() => {
        if (!searchTerm.trim()) {
            return data;
        }

        const searchLower = searchTerm.toLowerCase();
        return data.filter(log => {
            return (
                log.name.toLowerCase().includes(searchLower) ||
                log.category.toLowerCase().includes(searchLower) ||
                log.rating.toString().includes(searchLower)
            );
        });
    }, [data, searchTerm]);

    const logCards = filteredLogs.map(log => (
        <LogCard 
            key={log.name} 
            logData={log} 
            onOpenDescriptionModal={onOpenDescriptionModal}
            showAddToList={false}
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
                {logCards.length > 0 ? (
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