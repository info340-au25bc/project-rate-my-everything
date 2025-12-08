import React from 'react';
import { RatingDisplay } from './RatingDisplay';
import { getDatabase, ref, remove } from 'firebase/database';
import DropdownButton from './DropdownButton';

export function LogCard({ logData, onOpenDescriptionModal, onOpenAddToListModal, onRemoveFromList, showAddToList = true, showActions = false, showRemoveFromList = false }) {
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

    const handleRemoveFromList = async () => {
        if (!logData.id || !onRemoveFromList) return;
        onRemoveFromList(logData.id);
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return '';
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return date.toLocaleDateString('en-US', options);
        } catch (error) {
            console.error('Error formatting date:', error);
            return '';
        }
    };

    if (!logData) {
        return null;
    }

    return (
        <div className="col-12 col-md-6 col-lg-4">
            <div className="horizontal-card">
                {(showActions || showRemoveFromList) && (
                    <div className="card-actions">
                        {showActions && (
                            <button 
                                className="card-action-btn delete-btn" 
                                onClick={handleDelete}
                                aria-label={`Delete ${logData.name}`}
                                title="Delete log"
                            >
                                <i className="bi bi-trash"></i>
                            </button>
                        )}
                        {showRemoveFromList && (
                            <button 
                                className="card-action-btn remove-from-list-action-btn" 
                                onClick={handleRemoveFromList}
                                title="Remove from list"
                            >
                                <i className="bi bi-x-circle"></i>
                            </button>
                        )}
                    </div>
                )}
                {logData.img && <img className="card-img-left" src={logData.img} alt="image failed to load" />}
                <div className="card-body">
                    <div className="card-content">
                        <h2 className="card-title">{logData.name || 'Untitled'}</h2>
                        {logData.category && <p className="card-text">{logData.category}</p>}
                        <p className="card-text">
                            <RatingDisplay rating={logData.rating || 0} />
                        </p>
                        <p className="card-text">{formatDate(logData.date)}</p>
                    </div>
                    <div className="card-buttons">
                        {showAddToList ? (
                            <DropdownButton
                                items={[
                                    {
                                        label: 'Review Description',
                                        onClick: handleDescriptionClick
                                    },
                                    {
                                        label: 'Add to List',
                                        onClick: () => {
                                            if (onOpenAddToListModal) {
                                                onOpenAddToListModal(logData);
                                            }
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
