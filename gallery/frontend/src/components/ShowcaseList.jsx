import React, { useEffect, useState } from 'react';
import ShowcaseService from '../service/ShowcaseService.jsx';
import ShowcaseCard from './ShowcaseCard.jsx';
import { Button, SplitButton } from "@fluentui/react-components";
import { Link } from "react-router-dom";

const ShowcaseList = () => {
    const [showcases, setShowcases] = useState([]);

    useEffect(() => {
        ShowcaseService.getAll().then((response) => {
            setShowcases(response.data);
        });
    }, []);

    return (
        <div className="mx-32">
            <div className="flex justify-between items-center mb-4">
                <h2>Showcases</h2>
                <div className="flex items-center gap-4">
                    <Link to="/showcase/add">
                        <Button
                            appearance="primary"
                            style={{backgroundColor: '#9C0D38', color: 'white'}}
                        >
                            + Add Showcase
                        </Button>
                    </Link>
                    <SplitButton>Sort By</SplitButton>
                </div>
            </div>
            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4">
                {showcases.map((showcase) => (
                    <ShowcaseCard
                        key = {showcase.id}
                        showcase = {showcase}
                    />
                ))}
            </div>
        </div>
    );
}

export default ShowcaseList;