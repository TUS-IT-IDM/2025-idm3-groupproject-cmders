import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@fluentui/react-components'
import ProjectService from "../../service/ProjectService.jsx";


const ProjectCard = ({ project }) => {
    const handleDelete = () => {
        ProjectService.delete(project.id)
            .then(() => {
                window.location.reload();
            })
            .catch(error => console.error(`Error deleting showcase with id: ${project.id}`, error))
    }

    return (
        <div className="border-2 border-gray-400 rounded-2xl shadow-md overflow-hidden mb-4 break-inside-avoid">
            <img src={`http://localhost:8080/assets/images/projects/${project.heroImage}`} alt={project.title} className="w-full h-auto" />
            <div className="p-4">
                <h3>{project.title}</h3>
                <p>{project.descSummary}</p>
                <br/>
                <p>{project.user.firstName + " " + project.user.lastName}</p>
                <Link to={"/project/" + project.id}>
                    <Button
                        appearance="primary"
                        href={"/project/" + project.id}
                        style={{ backgroundColor: '#6574A2', color: 'white'}}
                    >
                        View
                    </Button>
                </Link>
                <Link to={`/project/${project.id}/edit`}>
                    <Button
                        appearance="outline"
                        href={"/project/" + project.id}
                    >
                        Edit
                    </Button>
                </Link>
                <Button
                    appearance="primary"
                    href={"/project/" + project.id}
                    onClick={handleDelete}
                    style={{ backgroundColor: '#9C0D38', color: 'white'}}
                >
                    Delete
                </Button>
            </div>
        </div>
    );
};

export default ProjectCard;