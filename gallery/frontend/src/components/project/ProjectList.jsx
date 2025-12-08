import React, { useEffect, useState } from 'react'; 
import ProjectService from '../../service/ProjectService.jsx';
import UserService from '../../service/UserService.jsx';
import ProjectCard from './ProjectCard.jsx';
import { Button, SplitButton } from "@fluentui/react-components";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext.jsx";
import PaginatedSection from '../Pagination.jsx';

const ProjectList = ({ variant = "all" }) => {
    const { user, loading } = useUser();
    const [projects, setProjects] = useState([]);
    
    useEffect(() => {
        const fetchProjects = async () => {
             try {
                if (variant === "all") {
                    const response = await ProjectService.getAll();
                    const projects = response.data;
                    projects.sort((a, b) => b.id - a.id);
                    setProjects(projects);
                    return;
                }
            
                switch (user?.type) {
                        case 'Employer': {
                            if (user?.id) {
                                const response = await UserService.getFavourites(user.id);
                                const projects = response.data.map(fav => fav.project);
                                setProjects(projects);
                            }
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

             } catch(e) { console.error(e) }
        }
        if (!loading) fetchProjects();
    }, [user, loading, variant]);

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
            <div className="flex justify-between items-center mb-8 pt-4">
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
            
            <PaginatedSection 
                items={projects} 
                itemsPerPage={12}
                renderItem={(project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                    />
                )}
            />
        </div>
    );
}

export default ProjectList;