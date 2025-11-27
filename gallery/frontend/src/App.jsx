import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home.jsx';
import Dashboard from './components/Dashboard.jsx';
import ShowcaseAdd from "./components/ShowcaseAdd.jsx";
import Login from "./components/Login.jsx";
import Showcase from "./components/Showcase.jsx";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/showcases' element={<Dashboard />} />
                <Route path="/showcase/:id" element={<Showcase />} />
                <Route path="/showcase/add" element={<ShowcaseAdd />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
};

export default App;