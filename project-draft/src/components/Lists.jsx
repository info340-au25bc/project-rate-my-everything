import React, { useState, useEffect } from 'react';
import { ListCard } from './ListCard';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';

export function Lists({ onOpenAddListModal }) {
    const [lists, setLists] = useState([]);

    useEffect(() => {
        const db = getDatabase();
        const allListsRef = ref(db, 'allLists');
        
        const unsubscribe = onValue(allListsRef, (snapshot) => {
            const data = snapshot.val();
            const listsArray = data ? Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            })) : [];
            
            const auth = getAuth();
            const userLists = listsArray.filter(list => list.userId === auth.currentUser?.uid).reverse();
            
            setLists(userLists);
        }, (error) => {
            console.error('Error reading lists:', error);
            setLists([]);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const listCards = lists.map(list => (
        <ListCard 
            key={list.id} 
            listData={list} 
        />
    ));

    return (
        <main className="list-body">
            <div className="lists-header">
                <h2>Your Lists</h2>
                <button onClick={onOpenAddListModal} className="search-button">Create a new list</button>
            </div>
            {listCards.length > 0 ? (
                <div className="row g-4" style={{ width: '100%', padding: '0 1rem' }}>
                    {listCards}
                </div>
            ) : (
                <p className="no-results">No lists yet. Create your first list!</p>
            )}
        </main>
    )
}