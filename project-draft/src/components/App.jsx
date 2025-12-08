import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set, push, get } from 'firebase/database';

import { NavBar } from './NavBar';
import { Footer } from './Footer';
import { MainPage } from './MainPage';
import { AddNewLog } from './AddNewLog';
import { Lists } from './Lists';
import { LogHistory } from './LogHistory';
import { DescriptionPage } from './DescriptionPage';
import { SignInPage } from './SignInPage';
import { AddNewList } from './AddNewList';
import { AddToListModal } from './AddToListModal';
import { ListDetailPage } from './ListDetailPage';

function App() {
    const [user, setUser] = useState(null);
    const [isAddLogModalOpen, setIsAddLogModalOpen] = useState(false);
    const openAddLogModal = () => setIsAddLogModalOpen(true);
    const closeAddLogModal = () => setIsAddLogModalOpen(false);

    const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
    const [selectedLog, setSelectedLog] = useState(null);
    const openDescriptionModal = (logData) => {
        setSelectedLog(logData);
        setIsDescriptionModalOpen(true);
    };
    const closeDescriptionModal = () => {
        setIsDescriptionModalOpen(false);
        setSelectedLog(null);
    };

    const [isAddListModalOpen, setIsAddListModalOpen] = useState(false);
    const openAddListModal = () => setIsAddListModalOpen(true);
    const closeAddListModal = () => setIsAddListModalOpen(false);

    const [isAddToListModalOpen, setIsAddToListModalOpen] = useState(false);
    const [selectedLogForList, setSelectedLogForList] = useState(null);
    const openAddToListModal = (logData) => {
        setSelectedLogForList(logData);
        setIsAddToListModalOpen(true);
    };
    const closeAddToListModal = () => {
        setIsAddToListModalOpen(false);
        setSelectedLogForList(null);
    };

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        }, (error) => {
            console.error('Auth state change error:', error);
        });

        return () => unsubscribe();
    }, []);

    if (!user) {
        return (
            <div id="body">
                <header><NavBar /></header>
                <SignInPage />
                <footer><Footer /></footer>
            </div>
        );
    }

    const addLog = async (name, category, date, rating, img, review) => {
        const auth = getAuth();
        const user = auth.currentUser;
        
        if (!user) {
            alert('You must be signed in to add logs');
            return;
        }
    
        const newLog = {
            name: name,
            category: category,
            date: date,
            rating: rating,
            review: review,
            img: img,
            userId: user.uid,
            userEmail: user.email,
            createdAt: Date.now()
        };
        
        try {
            const db = getDatabase();
            const allLogsRef = ref(db, "allLogs");
            await push(allLogsRef, newLog);
            setIsAddLogModalOpen(false);
        } catch (error) {
            console.error('Error adding log:', error);
            alert('Failed to add log. Please try again.');
        }
    }

    const addList = async (listName, listImg, listDesc) => {
        const auth = getAuth();
        const user = auth.currentUser;
        
        if (!user) {
            alert('You must be signed in to create a list');
            return;
        }

        const newList = {
            name: listName,
            img: listImg,
            description: listDesc,
            logs: [],
            userId: user.uid,
            userEmail: user.email,
            createdAt: Date.now()
        }

        try {
            const db = getDatabase();
            const allListsRef = ref(db, "allLists");
            await push(allListsRef, newList);
            setIsAddListModalOpen(false);
        } catch (error) {
            console.error('Error adding list:', error);
            alert('Failed to create list. Please try again.');
        }
    }

    const addLogToList = async (listId, logId) => {
        const db = getDatabase();
        const listRef = ref(db, `allLists/` + listId);
        
        try {
            const listSnapshot = await get(listRef);
            const listData = listSnapshot.val();
            
            if (!listData) {
                alert('List not found. Please try again.');
                return;
            }
            
            if (!listData.logs) {
                listData.logs = [];
            }
            
            listData.logs.push(logId);
            await set(listRef, listData);
            
            closeAddToListModal();
        } catch (error) {
            console.error('Error adding log to list:', error);
            alert('Failed to add log to list. Please try again.');
        }
    }

    return (
        <div id="body">
            <header>
                < NavBar onOpenModal={openAddLogModal} />
            </header>

            <Routes>
                <Route path="/home" element={<MainPage onOpenDescriptionModal={openDescriptionModal} onOpenAddToListModal={openAddToListModal} />} />
                <Route path="/loghistory" element={<LogHistory onOpenDescriptionModal={openDescriptionModal} onOpenAddToListModal={openAddToListModal} />} />
                <Route path="/lists" element={<Lists onOpenAddListModal={openAddListModal}/>} />
                <Route path="/list/:listId" element={<ListDetailPage onOpenDescriptionModal={openDescriptionModal} />} />
                <Route path="*" element={<Navigate to="/home" />} />
            </Routes>

            {isAddLogModalOpen && (
                <div className="modal-overlay" onClick={closeAddLogModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeAddLogModal}>&times;</button>
                        <AddNewLog addLog={addLog} />
                    </div>
                </div>
            )}

            {isDescriptionModalOpen && selectedLog && (
                <div className="modal-overlay" onClick={closeDescriptionModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeDescriptionModal}>&times;</button>
                        <DescriptionPage logData={selectedLog} />
                    </div>
                </div>
            )}

            {isAddListModalOpen && (
                <div className="modal-overlay" onClick={closeAddListModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <button className="modal-close" onClick={closeAddListModal}>&times;</button>
                        <AddNewList addList={addList} />
                    </div>
                </div>
            )}

            {isAddToListModalOpen && selectedLogForList && (
                <div className="modal-overlay" onClick={closeAddToListModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeAddToListModal}>&times;</button>
                        <AddToListModal 
                            logData={selectedLogForList} 
                            onClose={closeAddToListModal}
                            onAddToList={addLogToList}
                        />
                    </div>
                </div>
            )}

            <footer>
                < Footer />
            </footer>
        </div>
    )
}

export default App;