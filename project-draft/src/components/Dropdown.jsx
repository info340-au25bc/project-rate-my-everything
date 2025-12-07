import React, { useState, useRef, useEffect } from 'react';

export default function Dropdown({ trigger, items, className = '' }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (item) => {
        if (item.onClick) {
            item.onClick();
        }
        setIsOpen(false);
    };

    return (
        <div className={`card-actions-dropdown ${className}`} ref={dropdownRef}>
            <div onClick={toggleDropdown}>
                {trigger}
            </div>
            {isOpen && (
                <div className="dropdown-menu">
                    {items.map((item, index) => (
                        <button
                            key={index}
                            className="dropdown-item"
                            onClick={() => handleItemClick(item)}
                            disabled={item.disabled}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

