import React, { useEffect, useState } from 'react';
import ProjectService from '../../service/ProjectService.jsx';
import ProjectCard from './ProjectCard.jsx';
import { Button, SplitButton } from "@fluentui/react-components";
import { Link } from "react-router-dom";

const ProjectList = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        ProjectService.getAll().then((response) => {
            setProjects(response.data);
        });
    }, []);

    return (
        <div className="mx-32">
            <div className="flex justify-between items-center mb-4">
                <h2>Projects</h2>
                <div className="flex items-center gap-4">
                    <Link to="/project/add">
                        <Button
                            appearance="primary"
                            style={{backgroundColor: '#9C0D38', color: 'white'}}
                        >
                            + Add Project
                        </Button>
                    </Link>
                    <SplitButton>Sort By</SplitButton>
                </div>
            </div>
            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4">
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