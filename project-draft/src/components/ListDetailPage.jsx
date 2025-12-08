import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { getDatabase, ref, onValue, get, set } from 'firebase/database';
import { LogCard } from './LogCard';

export function ListDetailPage({ onOpenDescriptionModal }) {
    const { listId } = useParams();
    const navigate = useNavigate();
    const [listData, setListData] = useState(null);
    const [logs, setLogs] = useState([]);

    const handleRemoveFromList = async (logId) => {
        if (!listId || !logId) return;

        try {
            const db = getDatabase();
            const listRef = ref(db, `allLists/${listId}`);
            
            const listSnapshot = await get(listRef);
            const currentListData = listSnapshot.val();
            
            if (!currentListData || !currentListData.logs) {
                return;
            }

            const updatedLogs = currentListData.logs.filter(id => id !== logId);
            await set(listRef, {
                ...currentListData,
                logs: updatedLogs
            });
        } catch (error) {
            console.error('Error removing log from list:', error);
        }
    };

    useEffect(() => {
        if (!listId) return;

        const db = getDatabase();
        const listRef = ref(db, `allLists/${listId}`);

        const unsubscribe = onValue(listRef, async (snapshot) => {
            if (!snapshot.exists()) {
                return;
            }

            const data = snapshot.val();
            setListData({ id: listId, ...data });

            if (data.logs && data.logs.length > 0) {
                const logPromises = data.logs.map(async (logId) => {
                    const logRef = ref(db, `allLogs/${logId}`);
                    const logSnapshot = await get(logRef);
                    if (logSnapshot.exists()) {
                        return { id: logId, ...logSnapshot.val() };
                    }
                    return null;
                });

                const logResults = await Promise.all(logPromises);
                const validLogs = logResults.filter(log => log !== null);
                setLogs(validLogs);
            } else {
                setLogs([]);
            }
        });

        return () => unsubscribe();
    }, [listId]);

    if (!listData) {
        return (
            <main className="list-detail-main">
                <div className="container py-5">
                    <p>List not found.</p>
                    <button onClick={() => navigate('/lists')} className="btn btn-dark">
                        Back to Lists
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="list-detail-main">
            <div className="container py-5">
                <div className="list-detail-header">
                    <button 
                        onClick={() => navigate('/lists')} 
                        className="back-btn"
                    >
                        ← Back to Lists
                    </button>
                    <h1>{listData.name}</h1>
                    {listData.description && (
                        <p className="list-description">{listData.description}</p>
                    )}
                </div>

                {logs.length === 0 ? (
                    <p className="no-results">No logs in this list yet.</p>
                ) : (
                    <div className="row g-4">
                        {logs.map(log => (
                            <LogCard
                                key={log.id}
                                logData={log}
                                onOpenDescriptionModal={onOpenDescriptionModal}
                                onRemoveFromList={handleRemoveFromList}
                                showAddToList={false}
                                showActions={false}
                                showRemoveFromList={true}
                            />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}

