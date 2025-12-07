import React from 'react';
import { RatingDisplay } from './RatingDisplay';
import { getDatabase, ref, remove } from 'firebase/database';

export function ListCard({ listData }) {
    const handleDelete = async () => {
        if (!listData.id) return;
        
        const confirmDelete = window.confirm(`Are you sure you want to delete "${listData.name}"?`);
        if (!confirmDelete) return;

        try {
            const db = getDatabase();
            const listRef = ref(db, `allLists/${listData.id}`);
            await remove(listRef);
        } catch (error) {
            console.error('Error deleting list:', error);
            alert('Failed to delete log. Please try again.');
        }
    };

    return (
        <div className="col-12 col-md-6 col-lg-4">
            <div className="horizontal-card">
                <div className="card-actions">
                    <button 
                        className="card-action-btn delete-btn" 
                        onClick={handleDelete}
                        title="Delete list"
                    >
                        <i className="bi bi-trash"></i>
                    </button>
                </div>
                {listData.img && <img className="card-img-left" src={listData.img} alt="image failed to load" />}
                <div className="card-body">
                    <div className="card-content">
                        <h2 className="card-title">{listData.name}</h2>
                        <p className="card-text">{listData.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
