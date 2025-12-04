import {React, useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router';
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import { MainPage } from './MainPage';
import { AddNewLog } from './AddNewLog';
import { AddNewList } from './AddNewList';
import { LogHistory } from './LogHistory';
import { Lists } from './Lists';

import SAMPLE_LOGS from '../data/logs.json'


function App() {
    // for add log modal window
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [logs, setLogs] = useState(() => {
        const saved = localStorage.getItem('rateMyEverythingLogs');
        return saved ? JSON.parse(saved) : [];
    });

    const addLog = (name, category, date, rating, img, review) => {
        const newLog = {name: name, category: category, date: date, rating: rating, review: review, img: img}
        setLogs([...logs, newLog]);
        setIsModalOpen(false);
    }

    //for keeping log history data after page refresh
    useEffect(() => {
        localStorage.setItem('rateMyEverythingLogs', JSON.stringify(logs));
    }, [logs]);


    return (
        <div id="body">
            <header>
                < NavBar onOpenModal={openModal} />
            </header>

            <Routes>
                <Route path="/home" element={<MainPage data={SAMPLE_LOGS} />} />
                <Route path="/loghistory" element={<LogHistory data={logs}/>} />
                <Route path="/lists" element={<Lists />} />
                <Route path="/addlist" element={<AddNewList />} />
                <Route path="*" element={<Navigate to="/home" />} />
            </Routes>

            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>&times;</button>
                        <AddNewLog addLog={addLog} />
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