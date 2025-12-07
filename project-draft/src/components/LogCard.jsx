import React from 'react';
import { RatingDisplay } from './RatingDisplay';
import { getDatabase, ref, remove } from 'firebase/database';
import Dropdown from './Dropdown';

export function LogCard({ logData, onOpenDescriptionModal, showAddToList = true, showActions = false }) {
    const handleDescriptionClick = () => {
        if (onOpenDescriptionModal) {
            onOpenDescriptionModal(logData);
        }
    };

    const handleDelete = async () => {
        if (!logData.id) return;
        
        const confirmDelete = window.confirm(`Are you sure you want to delete "${logData.name}"?`);
        if (!confirmDelete) return;

        try {
            const db = getDatabase();
            const logRef = ref(db, `allLogs/${logData.id}`);
            await remove(logRef);
        } catch (error) {
            console.error('Error deleting log:', error);
            alert('Failed to delete log. Please try again.');
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <div className="col-12 col-md-6 col-lg-4">
            <div className="horizontal-card">
                {showActions && (
                    <div className="card-actions">
                        <button 
                            className="card-action-btn delete-btn" 
                            onClick={handleDelete}
                            title="Delete log"
                        >
                            <i className="bi bi-trash"></i>
                        </button>
                    </div>
                )}
                {logData.img && <img className="card-img-left" src={logData.img} alt="image failed to load" />}
                <div className="card-body">
                    <div className="card-content">
                        <h2 className="card-title">{logData.name}</h2>
                        <p className="card-text">
                            <RatingDisplay rating={logData.rating} />
                        </p>
                        <p className="card-text">{formatDate(logData.date)}</p>
                    </div>
                    <div className="card-buttons">
                        {showAddToList ? (
                            <Dropdown
                                trigger={
                                    <button className="btn btn-dark w-100 view-more-btn">
                                        View More
                                    </button>
                                }
                                items={[
                                    {
                                        label: 'Review Description',
                                        onClick: handleDescriptionClick
                                    },
                                    {
                                        label: 'Add to List',
                                        onClick: () => {
                                        }
                                    }
                                ]}
                            />
                        ) : (
                            <button 
                                className="btn w-100 desc-btn"
                                onClick={handleDescriptionClick}
                            >
                                Review Description
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
