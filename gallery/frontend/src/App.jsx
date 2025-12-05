import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home.jsx';
import Dashboard from './components/Dashboard.jsx';
import ShowcaseAdd from "./components/showcase/ShowcaseAdd.jsx";
import Login from "./components/Login.jsx";
import Showcase from "./components/showcase/Showcase.jsx";
import ProjectList from "./components/project/ProjectList.jsx";
import ProjectAdd from "./components/project/ProjectAdd.jsx";
import Project from "./components/project/Project.jsx";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/showcases' element={<Dashboard />} />
                <Route path="/showcase/:id" element={<Showcase />} />
                <Route path="/showcase/:id/edit" element={<ShowcaseAdd />} />
                <Route path="/showcase/add" element={<ShowcaseAdd />} />
                <Route path="/login" element={<Login />} />
                <Route path="/project/list" element={<ProjectList />} />
                <Route path="/project/add" element={<ProjectAdd />} />
                <Route path="/project/:id" element={<Project />} />
            </Routes>
        </Router>
    );
};

export default App;