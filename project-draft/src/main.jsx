import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router';
import './style.css'
import App from './components/App.jsx'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNgEEKWAELSaSodwpn3kipFPqSZZ4Fwqk",
  authDomain: "rate-my-everything-b8b0b.firebaseapp.com",
  databaseURL: "https://rate-my-everything-b8b0b-default-rtdb.firebaseio.com",
  projectId: "rate-my-everything-b8b0b",
  storageBucket: "rate-my-everything-b8b0b.firebasestorage.app",
  messagingSenderId: "1092185074724",
  appId: "1:1092185074724:web:b79d62b0adb5d2e50ffcb1",
  measurementId: "G-8W3D2N1VHB"
};

// Initialize Firebase
initializeApp(firebaseConfig);

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)