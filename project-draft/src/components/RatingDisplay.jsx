import React from 'react';

export function RatingDisplay({ rating }) {
    const renderStars = () => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                stars.push('❤️');
            } else {
                stars.push('🤍');
            }
        }
        return stars.join('');
    };

    return (
        <span className="rating-display">
            {renderStars()}
        </span>
    );
}

