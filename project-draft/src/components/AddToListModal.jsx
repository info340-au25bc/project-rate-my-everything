import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { Dropdown } from 'react-bootstrap';

export function AddToListModal({ logData, onClose, onAddToList }) {
    const [lists, setLists] = useState([]);
    const [selectedListId, setSelectedListId] = useState(null);
    const [selectedListName, setSelectedListName] = useState('Select a List');

    useEffect(() => {
        const db = getDatabase();
        const allListsRef = ref(db, 'allLists');
        const auth = getAuth();
        
        const unsubscribe = onValue(allListsRef, (snapshot) => {
            const data = snapshot.val();
            const listsArray = data ? Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            })) : [];
            
            const userLists = listsArray.filter(list => list.userId === auth.currentUser?.uid);
            setLists(userLists);
        });

        return () => unsubscribe();
    }, []);

    const handleListSelect = (listId, listName) => {
        setSelectedListId(listId);
        setSelectedListName(listName);
    };

    const handleAddToList = () => {
        if (selectedListId && logData && logData.id) {
            onAddToList(selectedListId, logData.id);
        }
    };

    if (!logData) return null;

    return (
        <div className="add-to-list-modal">
            <h2>Add "{logData.name}" to a List</h2>
            {lists.length === 0 ? (
                <p>You don't have any lists yet. Create one first!</p>
            ) : (
                <div className="list-dropdown-container">
                    <Dropdown onSelect={(eventKey, e) => {
                        const [listId, listName] = eventKey.split('|');
                        handleListSelect(listId, listName);
                    }}>
                        <Dropdown.Toggle variant="outline-dark" id="dropdown-basic" className="w-100">
                            {selectedListName}
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="w-100">
                            {lists.map(list => (
                                <Dropdown.Item 
                                    key={list.id} 
                                    eventKey={`${list.id}|${list.name}`}
                                >
                                    {list.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    {selectedListId && (
                        <button className="btn btn-dark w-100 mt-3" onClick={handleAddToList}>
                            Add to List
                        </button>
                    )}
                </div>
            )}
            <button className="close-btn mt-3" onClick={onClose}>Cancel</button>
        </div>
    );
}

