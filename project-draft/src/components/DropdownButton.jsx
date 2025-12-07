import React from 'react';
import { Dropdown } from 'react-bootstrap';

export default function DropdownButton({ items, className = '' }) {
    const handleItemClick = (item) => {
        if (item.onClick) {
            item.onClick();
        }
    };

    return (
        <Dropdown className={`card-actions-dropdown` + className}>
            <Dropdown.Toggle 
                as="button" 
                variant="dark" 
                className="btn btn-dark w-100 view-more-btn"
            >
                View More
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {items.map((item, index) => (
                    <Dropdown.Item
                        key={index}
                        onClick={() => handleItemClick(item)}
                        disabled={item.disabled}
                    >
                        {item.label}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}

