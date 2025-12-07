import { React, useState, useEffect } from 'react';
import { ListCard } from './ListCard';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';

export function Lists({ onOpenAddListModal }) {
    const [lists, setLists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Subscribe to Firebase Realtime Database
    useEffect(() => {
        const db = getDatabase();
        const allListsRef = ref(db, 'allLists');
    
        setIsLoading(true);
        
        const unsubscribe = onValue(allListsRef, (snapshot) => {
            const data = snapshot.val();
            // Convert to object
            const listsArray = data ? Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            })) : [];
            
            // Filter by current user
            const auth = getAuth();
            const userLists = listsArray.filter(list => list.userId === auth.currentUser?.uid).reverse();
            
            setLists(userLists);
            setIsLoading(false);
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
            {isLoading ? (
                <p className="no-results">Loading lists...</p>
            ) : listCards.length > 0 ? (
                <div className="row g-4" style={{ width: '100%', padding: '0 1rem' }}>
                    {listCards}
                </div>
            ) : (
                <p className="no-results">No lists yet. Create your first list!</p>
            )}
        </main>
    )
}