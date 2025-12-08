import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@fluentui/react-components'
import ProjectService from "../../service/ProjectService.jsx";
import {EditRegular, Heart24Filled, Heart24Regular} from "@fluentui/react-icons";
import {DeleteRegular} from "@fluentui/react-icons";
import {useUser} from "../../context/UserContext.jsx";
import AuthService from "../../service/AuthService.jsx";
import UserService from "../../service/UserService.jsx";


const ProjectCard = ({ project }) => {
    const { user, loading } = useUser();
    const [favourite, setFavourite] = useState(false);

    const handleDelete = () => {
        ProjectService.delete(project.id)
            .then(() => {
                window.location.reload();
            })
            .catch(error => console.error(`Error deleting showcase with id: ${project.id}`, error))
    }

    useEffect(() => {
        const checkStatus = async () => {
            if (!user) return;

            try {
                const favourites = await UserService.getFavourites(user);
                const isFavourite = favourites.data.some(favourite => favourite.project.id === project.id);
                setFavourite(isFavourite);
            } catch (error) {
                console.error("Error checking favourite status", error);
            }
        }

        checkStatus();
    }, [project.id, user]);

    const handleFavourite = async () => {
        // Optimistic update
        const newFavouriteStatus = !favourite;
        setFavourite(newFavouriteStatus);

        try {
            if (newFavouriteStatus) {
                await UserService.favourite(user, project);
            } else {
                await UserService.unfavourite(user, project);
            }
        } catch (error) {
            console.error("Failed to toggle favourite", error);
            // Revert on failure
            setFavourite(!newFavouriteStatus);
        }
    }

    if (loading) return <div>Loading...</div>;

    return (
        <div className="border-2 border-gray-400 rounded-2xl shadow-md overflow-hidden mb-4 break-inside-avoid">
            <img src={`http://localhost:8080/assets/images/projects/${project.heroImage}`} alt={project.title} className="w-full h-auto" />
            <div className="p-4">
                <h3>{project.title}</h3>
                <p>{project.descSummary}</p>
                <p><strong>by {project.user.firstName + " " + project.user.lastName}</strong></p>
                <div className="mt-4 gap-2 flex justify-start items-center w-full">
                    {/*Everyone can view*/}
                    <Link to={"/project/" + project.id}>
                        <Button
                            appearance="primary"
                            href={"/project/" + project.id}
                            style={{ backgroundColor: '#6574A2', color: 'white'}}
                        >
                            View
                        </Button>
                    </Link>
                    <div className="flex-1"></div>
                    {/*Student & Admin can edit*/}
                    {(project.user.id === user?.id || user?.type === 'Admin') &&  <Link to={`/project/${project.id}/edit`}>
                        <Button
                            appearance="outline"
                            href={"/project/" + project.id}
                            icon={<EditRegular className="size-4" />}
                        />
                    </Link>}
                    {/*Student & Admin can delete*/}
                    {(project.user.id === user?.id || user?.type === 'Admin') && <Button
                        appearance="outline"
                        href={"/project/" + project.id}
                        onClick={handleDelete}
                        icon={<DeleteRegular className="size-4" />}
                    />}
                    {/*Employer can favourite*/}
                    {user?.type === 'Employer' && <Button
                        icon={favourite ? <Heart24Filled className="size-4" /> : <Heart24Regular className="size-4" />}
                        aria-label="Favourite"
                        onClick={handleFavourite}
                    />}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;