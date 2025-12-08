import React, { useEffect, useState } from 'react';
import ShowcaseService from '../../service/ShowcaseService.jsx';
import ShowcaseCard from './ShowcaseCard.jsx';
import { Button, SplitButton } from "@fluentui/react-components";
import { Link } from "react-router-dom";

const ShowcaseList = () => {
    const [activeShowcases, setActiveShowcases] = useState([]);
    const [upcomingShowcases, setUpcomingShowcases] = useState([]);
    const [pastShowcases, setPastShowcases] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        ShowcaseService.getAll().then((response) => {
            const now = new Date();
            const all = response.data;

            const active = [];
            const upcoming = [];
            const past = [];

            all.forEach(showcase => {
                const start = new Date(showcase.start);
                const end = new Date(showcase.end);

                if (now < start) {
                    upcoming.push(showcase);
                } else if (now > end) {
                    past.push(showcase);
                } else {
                    active.push(showcase);
                }
            });
            
            // Optional: Sort them?
            // Active: closing soonest first?
            active.sort((a, b) => new Date(a.end) - new Date(b.end));
            // Upcoming: starting soonest first
            upcoming.sort((a, b) => new Date(a.start) - new Date(b.start));
            // Past: ended most recently first
            past.sort((a, b) => new Date(b.end) - new Date(a.end));

            setActiveShowcases(active);
            setUpcomingShowcases(upcoming);
            setPastShowcases(past);
            setLoading(false);
        });
    }, []);

    if (loading) return <div>Loading...</div>;

    const renderSection = (title, list) => {
        if (list.length === 0) return null;
        return (
            <div className="mb-12">
                <h3 className="text-2xl font-semibold mb-4 border-b pb-2">{title}</h3>
                <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4">
                    {list.map((showcase) => (
                        <ShowcaseCard
                            key = {showcase.id}
                            showcase = {showcase}
                        />
                    ))}
                </div>
            </div>
        )
    };

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

            {renderSection("Active Showcases", activeShowcases)}
            {renderSection("Upcoming Showcases", upcomingShowcases)}
            {renderSection("Past Showcases", pastShowcases)}
            
            {activeShowcases.length === 0 && upcomingShowcases.length === 0 && pastShowcases.length === 0 && (
                <div>No showcases found.</div>
            )}
        </div>
    );
}

export default ShowcaseList;