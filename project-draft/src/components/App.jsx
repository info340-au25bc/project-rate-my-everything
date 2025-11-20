import React from 'react';
import { Route, Routes } from 'react-router';
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import { MainPage } from './MainPage';
import { AddNewLog } from './AddNewLog';
import { AddNewList } from './AddNewList';
import { LogHistory } from './LogHistory';

import LOG_DATA from '../data/logs.json';


function App() {
    return (
        <div>
            <header>
                < NavBar />
            </header>

            <Routes>
                <Route path="" element={<MainPage data={LOG_DATA} />} />
                <Route path="/addlog" element={<AddNewLog />} />
                <Route path="/addlist" element={<AddNewList />} />
                <Route path="/loghistory" element={<LogHistory data={LOG_DATA}/>} />
            </Routes>

            <footer>
                < Footer />
            </footer>
        </div>
    )
}

export default App;