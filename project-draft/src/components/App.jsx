import {React, useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router';
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import { MainPage } from './MainPage';
import { AddNewLog } from './AddNewLog';
import { Lists } from './Lists';
import { LogHistory } from './LogHistory';
import { DescriptionPage } from './DescriptionPage';

import LOG_DATA from '../data/logs.json';

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

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

    const [logs, setLogs] = useState(() => {
        const saved = localStorage.getItem('rateMyEverythingLogs');
        return saved ? JSON.parse(saved) : [];
    });

    const addLog = (name, category, date, rating, img, review) => {
        const newLog = {name: name, category: category, date: date, rating: rating, review: review, img: img}
        setLogs([...logs, newLog]);
        setIsModalOpen(false);
    }

    useEffect(() => {
        localStorage.setItem('rateMyEverythingLogs', JSON.stringify(logs));
    }, [logs]);

    return (
        <div id="body">
            <header>
                < NavBar onOpenModal={openModal} />
            </header>

            <Routes>
                <Route path="/home" element={<MainPage data={LOG_DATA} onOpenDescriptionModal={openDescriptionModal} />} />
                <Route path="/loghistory" element={<LogHistory data={logs} onOpenDescriptionModal={openDescriptionModal} />} />
                <Route path="/lists" element={<Lists />} />
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

            {isDescriptionModalOpen && selectedLog && (
                <div className="modal-overlay" onClick={closeDescriptionModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeDescriptionModal}>&times;</button>
                        <DescriptionPage logData={selectedLog} />
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