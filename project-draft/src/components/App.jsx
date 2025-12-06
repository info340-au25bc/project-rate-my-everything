import {React, useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set, push } from 'firebase/database';

import { NavBar } from './NavBar';
import { Footer } from './Footer';
import { MainPage } from './MainPage';
import { AddNewLog } from './AddNewLog';
import { Lists } from './Lists';
import { LogHistory } from './LogHistory';
import { DescriptionPage } from './DescriptionPage';
import { SignInPage } from './SignInPage';
import { AddNewList } from './AddNewList';

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

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
        
        const db = getDatabase();
        const allLogsRef = ref(db, "allLogs");
        await push(allLogsRef, newLog);
        setIsAddLogModalOpen(false);
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
            userId: user.uid,
            userEmail: user.email,
            createdAt: Date.now()
        }

        const db = getDatabase();
        const allListsRef = ref(db, "allLists");
        await push(allListsRef, newList);
        setIsAddListModalOpen(false);
    }

    return (
        <div id="body">
            <header>
                < NavBar onOpenModal={openAddLogModal} />
            </header>

            <Routes>
                <Route path="/home" element={<MainPage onOpenDescriptionModal={openDescriptionModal} />} />
                <Route path="/loghistory" element={<LogHistory onOpenDescriptionModal={openDescriptionModal} />} />
                <Route path="/lists" element={<Lists onOpenAddListModal={openAddListModal}/>} />
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

            <footer>
                < Footer />
            </footer>
        </div>
    )
}

export default App;