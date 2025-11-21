import React from 'react';
import { Route, Routes, Navigate } from 'react-router';
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import { MainPage } from './MainPage';
import { AddNewLog } from './AddNewLog';
import { AddNewList } from './AddNewList';
import { LogHistory } from './LogHistory';
import { Lists } from './Lists';

import LOG_DATA from '../data/logs.json';


function App() {
    return (
        <div id="body">
            <header>
                < NavBar />
            </header>

            <Routes>
                <Route path="/home" element={<MainPage data={LOG_DATA} />} />
                <Route path="/loghistory" element={<LogHistory data={LOG_DATA}/>} />
                <Route path="/lists" element={<Lists />} />
                <Route path="/addlog" element={<AddNewLog />} />
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