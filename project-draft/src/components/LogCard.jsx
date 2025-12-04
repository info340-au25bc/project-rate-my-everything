import React from 'react';
import { RatingDisplay } from './RatingDisplay';

export function LogCard({ logData, onOpenDescriptionModal }) {
    const handleDescriptionClick = () => {
        if (onOpenDescriptionModal) {
            onOpenDescriptionModal(logData);
        }
    };

    return (
        <div className="col-12 col-md-6 col-lg-4">
            <div className="card horizontal-card card h-100">
                <img className="card-img-left" src={logData.img} alt="image failed to load" />
                <div className="card-body d-flex flex-column text-center justify-content-center">
                    <h2 className="card-title fs-5 fs-md-4">{logData.category} - {logData.name}</h2>
                    <p className="card-text fs-6 fs-md-5">
                        <RatingDisplay rating={logData.rating} />
                    </p>
                    <p className="card-text fs-6 fs-md-5">Logged on {logData.date}</p>
                    <button 
                        className="btn btn-dark w-100 desc-btn"
                        onClick={handleDescriptionClick}
                    >
                        Review Description
                    </button>
                    <button className="btn btn-dark w-100 add-list">Add to List</button>
                </div>
            </div>
        </div>
    )
}