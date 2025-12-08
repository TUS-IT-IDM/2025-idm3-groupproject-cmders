import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home.jsx';
import Dashboard from './components/Dashboard.jsx';
import ShowcaseAdd from "./components/showcase/ShowcaseAdd.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Showcase from "./components/showcase/Showcase.jsx";
import ProjectList from "./components/project/ProjectList.jsx";
import ProjectAdd from "./components/project/ProjectAdd.jsx";
import Project from "./components/project/Project.jsx";
import ProfileSettings from "./components/ProfileSettings.jsx";
import Footer from "./components/footer.jsx";
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';

const App = () => {
    return (
        <Router>
            <div className="min-h-screen flex flex-col">
                {/* Main content area */}
                <main className="flex-1">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path='/dashboard' element={<Dashboard />} />
                        <Route path='/profile-settings' element={<ProfileSettings />} />
                        <Route path="/showcase/:id" element={<Showcase />} />
                        <Route path="/showcase/:id/edit" element={<ShowcaseAdd />} />
                        <Route path="/showcase/add" element={<ShowcaseAdd />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/project/list" element={<ProjectList />} />
                        <Route path="/project/add" element={<ProjectAdd />} />
                        <Route path="/project/:id" element={<Project />} />
                        <Route path="/project/:id/edit" element={<ProjectAdd />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </Router>
    );
};

export default App;