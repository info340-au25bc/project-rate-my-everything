import React from 'react';

export function RatingDisplay({ rating }) {
    const safeRating = typeof rating === 'number' ? Math.max(0, Math.min(5, Math.round(rating))) : 0;
    
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

