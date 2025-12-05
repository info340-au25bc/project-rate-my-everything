import React from 'react';
import { RatingDisplay } from './RatingDisplay';

export function DescriptionPage({ logData }) {
    if (!logData) {
        return (
            <div className="container">
                <p>No log data available.</p>
            </div>
        );
    }

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <div className="description-page">
            <div className="description-container">
                <div className="description-image-section">
                    <img 
                        className="description-img" 
                        src={logData.img} 
                        alt={logData.name} 
                    />
                </div>
                <div className="description-content-section">
                    <h2 className="description-title">
                        {logData.category} - {logData.name}
                    </h2>
                    <div className="description-rating">
                        <div className="rating-display-wrapper">
                            <RatingDisplay rating={logData.rating} />
                        </div>
                        <p className="rating-date">Logged on {formatDate(logData.date)}</p>
                    </div>
                    <div className="description-text">
                        {logData.review ? (
                            <p className="description-review">{logData.review}</p>
                        ) : (
                            <p className="description-review">No review.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}