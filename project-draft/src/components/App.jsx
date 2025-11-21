import {React, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router';
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import { MainPage } from './MainPage';
import { AddNewLog } from './AddNewLog';
import { AddNewList } from './AddNewList';
import { LogHistory } from './LogHistory';
import { Lists } from './Lists';


function App() {
    const [logs, setLogs] = useState(() => {
        const saved = localStorage.getItem('rateMyEverythingLogs');
        return saved ? JSON.parse(saved) : [];
    });

    function addLog(name, category, rating, review, img) {
        const newLog = {name: name, category: category, rating: rating, review: review, img: img}
        setLogs([...logs, newLog]);
    }

    return (
        <div id="body">
            <header>
                < NavBar />
            </header>

            <Routes>
                <Route path="/home" element={<MainPage data={logs} />} />
                <Route path="/loghistory" element={<LogHistory data={logs}/>} />
                <Route path="/lists" element={<Lists />} />
                <Route path="/addlog" element={<AddNewLog prop={addLog}/>} />
                <Route path="/addlist" element={<AddNewList />} />
                <Route path="*" element={<Navigate to="/home" />} />
            </Routes>

            <footer>
                < Footer />
            </footer>
        </div>
    )
}

export default App;