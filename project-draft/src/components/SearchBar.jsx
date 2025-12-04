import React, { useState } from 'react';

export function SearchBar({ onSearch }) {
    const [inputValue, setInputValue] = useState('');

    const handleSearch = () => {
        onSearch(inputValue);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="search-bar-container">
            <input
                type="text"
                className="search-input"
                placeholder="Search by name, category, or rating..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
            />
            <button 
                className="search-button"
                onClick={handleSearch}
                type="button"
            >
                Search
            </button>
        </div>
    );
}

