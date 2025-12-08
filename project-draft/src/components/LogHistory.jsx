import React, { useState, useMemo, useEffect } from 'react';
import { LogCard } from './LogCard';
import { SearchBar } from './SearchBar';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { Dropdown } from 'react-bootstrap';

export function LogHistory({ onOpenDescriptionModal, onOpenAddToListModal }) {
    const [logs, setLogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('date');
    const [sortOrder, setSortOrder] = useState('desc');

    useEffect(() => {
        const db = getDatabase();
        const allLogsRef = ref(db, 'allLogs');
        
        const unsubscribe = onValue(allLogsRef, (snapshot) => {
            const data = snapshot.val();
            const logsArray = data ? Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            })) : [];
            
            const auth = getAuth();
            const userLogs = logsArray.filter(log => log.userId === auth.currentUser?.uid).reverse();
            
            setLogs(userLogs);
        }, (error) => {
            console.error('Error reading logs:', error);
            setLogs([]);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const filteredAndSortedLogs = useMemo(() => {
        let result = logs;
        if (searchTerm.trim()) {
            const searchLower = searchTerm.toLowerCase();
            result = logs.filter(log => {
                return (
                    log.name.toLowerCase().includes(searchLower) ||
                    (log.category && log.category.toLowerCase().includes(searchLower)) ||
                    (log.rating && log.rating.toString().includes(searchLower))
                );
            });
        }

        const sorted = [...result].sort((a, b) => {
            let aValue, bValue;

            switch (sortBy) {
                case 'name':
                    aValue = a.name?.toLowerCase() || '';
                    bValue = b.name?.toLowerCase() || '';
                    break;
                case 'category':
                    if (!a.category && !b.category) return 0;
                    if (!a.category) return 1;
                    if (!b.category) return -1;
                    aValue = a.category.toLowerCase();
                    bValue = b.category.toLowerCase();
                    break;
                case 'rating':
                    if (a.rating === undefined && b.rating === undefined) return 0;
                    if (a.rating === undefined) return 1;
                    if (b.rating === undefined) return -1;
                    aValue = a.rating;
                    bValue = b.rating;
                    break;
                case 'date':
                default:
                    aValue = a.date ? new Date(a.date).getTime() : 0;
                    bValue = b.date ? new Date(b.date).getTime() : 0;
                    break;
            }

            if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        return sorted;
    }, [logs, searchTerm, sortBy, sortOrder]);

    const logCards = filteredAndSortedLogs.map(log => (
        <LogCard 
            key={log.id} 
            logData={log} 
            onOpenDescriptionModal={onOpenDescriptionModal}
            onOpenAddToListModal={onOpenAddToListModal}
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
                    <div className="sort-controls">
                        <label htmlFor="sort-dropdown">Sort by:</label>
                        <Dropdown>
                            <Dropdown.Toggle variant="light" className="sort-select">
                                {sortBy === 'date' && 'Date'}
                                {sortBy === 'name' && 'Name'}
                                {sortBy === 'category' && 'Category'}
                                {sortBy === 'rating' && 'Rating'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setSortBy('date')}>Date</Dropdown.Item>
                                <Dropdown.Item onClick={() => setSortBy('name')}>Name</Dropdown.Item>
                                <Dropdown.Item onClick={() => setSortBy('category')}>Category</Dropdown.Item>
                                <Dropdown.Item onClick={() => setSortBy('rating')}>Rating</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <button 
                            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                            className="sort-order-btn"
                            aria-label={`Sort order: ${sortOrder === 'asc' ? 'Ascending' : 'Descending'}`}
                            title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                        >
                            {sortOrder === 'asc' ? '↑' : '↓'}
                        </button>
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