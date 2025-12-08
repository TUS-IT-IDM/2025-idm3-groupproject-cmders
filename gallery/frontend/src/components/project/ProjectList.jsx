import React, { useEffect, useState, useRef } from 'react'; // Import useRef
import ProjectService from '../../service/ProjectService.jsx';
import UserService from '../../service/UserService.jsx'; // Import UserService
import ProjectCard from './ProjectCard.jsx';
import { Button, SplitButton } from "@fluentui/react-components";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext.jsx";
import { ChevronLeftRegular, ChevronRightRegular } from "@fluentui/react-icons"; // Import icons

const ProjectList = ({ variant = "all" }) => {
    const { user, loading } = useUser();
    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    

    const top = useRef(null);

    useEffect(() => {
        const fetchProjects = async () => {
             // ... existing fetch logic ...
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
                            // Safe check for user.id to avoid 400 bad request
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

    // --- Pagination ---
    const last = currentPage * itemsPerPage;
    const first = last - itemsPerPage;
    const currentProjects = projects.slice(first, last);
    const totalPages = Math.ceil(projects.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        
        // 2. Scroll to the ref
        if (top.current) {
            top.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const getTitle = () => {
         // ... existing logic ...
         if (variant === "all") return "Recently Added Projects";
         switch (user?.type) {
                case 'Student': return "Your Projects";
                case 'Employer': return "Your Liked Projects";
                default: return "Recently Added Projects";
         }
    };

    return (
        <div className="mx-32">
            {/* 3. Attach Ref to the header or container div */}
            <div ref={top} className="flex justify-between items-center mb-8 pt-4">
                <h2>{getTitle()}</h2>
                {/* ... existing header controls ... */}
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
            
            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-3 gap-8 mb-8">
                {currentProjects.map((project) => (
                    <ProjectCard
                        key = {project.id}
                        project = {project}
                    />
                ))}
            </div>

            {projects.length > itemsPerPage && (
                <div className="flex justify-center items-center gap-2 mb-32">
                    <Button 
                        icon={<ChevronLeftRegular />}
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                        appearance="subtle"
                    />
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                            key={page}
                            appearance={currentPage === page ? "primary" : "subtle"}
                            onClick={() => handlePageChange(page)}
                            style={currentPage === page ? { backgroundColor: '#9C0D38', color: 'white' } : {}}
                        >
                            {page}
                        </Button>
                    ))}

                    <Button 
                        icon={<ChevronRightRegular />}
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                        appearance="subtle"
                    />
                </div>
            )}
        </div>
    );
}

export default ProjectList;