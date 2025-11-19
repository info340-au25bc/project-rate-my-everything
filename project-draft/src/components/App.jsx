import React from 'react';
import { Route, Routes } from 'react-router';
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import { MainPage } from './MainPage';

import LOG_DATA from '../data/logs.json';


function App() {
    return (
        <div>
            <header>
                < NavBar />
            </header>

            <Routes>
                <Route path="/" element={<MainPage data={LOG_DATA} />} />
            </Routes>

            <footer>
                < Footer />
            </footer>
        </div>
    )
}

export default App;