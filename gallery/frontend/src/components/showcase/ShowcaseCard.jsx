import React from 'react';
import { Link } from "react-router-dom";
import { Button } from '@fluentui/react-components'
import ShowcaseService from "../../service/ShowcaseService.jsx";
import {DeleteRegular, EditRegular} from "@fluentui/react-icons";

const ShowcaseCard = ({ showcase }) => {
    const handleDelete = () => {
        ShowcaseService.delete(showcase.id)
            .then(() => {
                window.location.reload();
            })
            .catch(error => console.error(`Error deleting showcase with id: ${showcase.id}`, error))
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-UK', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    return (
        <div className="border-2 border-gray-400 rounded-2xl shadow-md overflow-hidden mb-4 break-inside-avoid">
            <img src={`http://localhost:8080/assets/images/showcases/${showcase.heroImage}`} alt={showcase.title} className="w-full h-auto" />
            <div className="p-4">
                <h3>{showcase.title}</h3>
                <p>{showcase.description}</p>
                <br/>
                <p>{formatDate(showcase.start)} - {formatDate(showcase.end)}</p>
                <p>{showcase.status}</p>
                <div className="flex">
                    <Link to={"/showcase/" + showcase.id}>
                        <Button
                            appearance="primary"
                            href={"/showcase/" + showcase.id}
                            style={{ backgroundColor: '#6574A2', color: 'white'}}
                        >
                            View
                        </Button>
                    </Link>
                    <div className="flex-1"></div>
                    <Link to={`/showcase/${showcase.id}/edit`}>
                        <Button
                            appearance="outline"
                            href={"/showcase/" + showcase.id}
                            icon={<EditRegular className="size-4" />}
                        />
                    </Link>
                    <Button
                        appearance="outline"
                        href={"/showcase/" + showcase.id}
                        onClick={handleDelete}
                        icon={<DeleteRegular className="size-4" />}
                    />
                </div>
            </div>
        </div>
    );
};

export default ShowcaseCard;