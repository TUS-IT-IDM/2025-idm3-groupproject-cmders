import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@fluentui/react-components'
import { Heart24Filled, Heart24Regular } from "@fluentui/react-icons";
import UserService from "../../service/UserService.jsx";
import AuthService from "../../service/AuthService.jsx";


const EmployerCard = ({ project }) => {
    const [favourite, setFavourite] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        AuthService.getSession()
            .then(response => setUser(response.data))
            .catch(() => {
                window.location.href = "/login";
            })
    }, []);

    const handleFavourite = () => {
        setFavourite(!favourite);
        UserService.favourite(user, project);
    }

    return (
        <div className="border-2 border-gray-400 rounded-2xl shadow-md overflow-hidden mb-4 break-inside-avoid">
            <img src={`http://localhost:8080/assets/images/projects/${project.heroImage}`} alt={project.title} className="w-full h-auto" />
            <div className="p-4">
                <h3>{project.title}</h3>
                <p>{project.descSummary}</p>
                <br/>
                <p>{project.user.firstName + " " + project.user.lastName}</p>
                <div className="flex gap-4">
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
                    <Button
                        icon={favourite ? <Heart24Filled /> : <Heart24Regular />}
                        aria-label="Favourite"
                        onClick={handleFavourite}
                    />
                </div>
            </div>
        </div>
    );
};

export default EmployerCard;