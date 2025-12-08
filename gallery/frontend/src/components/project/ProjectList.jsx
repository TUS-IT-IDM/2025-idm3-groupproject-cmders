import React, { useEffect, useState } from 'react';
import ProjectService from '../../service/ProjectService.jsx';
import UserService from '../../service/UserService.jsx'; // Import UserService
import ProjectCard from './ProjectCard.jsx';
import { Button, SplitButton } from "@fluentui/react-components";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext.jsx";

// Accept a 'variant' prop: "dashboard" or "public" (default)
const ProjectList = ({ variant = "all" }) => {
    const { user, loading } = useUser();
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // All Projects: Show all projects, sorted by the newest first
                if (variant === "all") {
                    const response = await ProjectService.getAll();
                    const projects = response.data;
                    projects.sort((a, b) => b.id - a.id);
                    setProjects(projects);
                    return;
                }

                switch (user?.type) {
                    case 'Employer': {
                        const response = await UserService.getFavourites(user);
                        const projects = response.data.map(fav => fav.project);
                        setProjects(projects);
                        break;
                    }
                    case 'Student': {
                        const response = await ProjectService.getAll();
                        const projects = response.data.filter(p => p.user.id === user.id);
                        setProjects(projects);
                        break;
                    }
                    default: {
                        return
                    }
                }
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        if (!loading) {
            fetchProjects();
        }
    }, [user, loading, variant]); // Add variant to dependencies

    if (loading) return <div>Loading...</div>;

    const getTitle = () => {
        if (variant === "all") return "Recently Added Projects";

        switch (user?.type) {
            case 'Student': return "Your Projects";
            case 'Employer': return "Your Liked Projects";
            default: return "Recently Added Projects";
        }
    };

    return (
        <div className="mx-32">
            <div className="flex justify-between items-center mb-8">
                <h2>{getTitle()}</h2>
                <div className="flex items-center gap-4">
                    {user?.type === "Student" && <Link to="/project/add">
                        <Button
                            appearance="primary"
                            style={{backgroundColor: '#9C0D38', color: 'white'}}
                        >
                            + Add Project
                        </Button>
                    </Link>}
                    <SplitButton>Sort By</SplitButton>
                </div>
            </div>
            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-3 gap-8 mb-32">
                {projects.map((project) => (
                    <ProjectCard
                        key = {project.id}
                        project = {project}
                    />
                ))}
            </div>
        </div>
    );
}

export default ProjectList;