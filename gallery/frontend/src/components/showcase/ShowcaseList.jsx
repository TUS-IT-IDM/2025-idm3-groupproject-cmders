import React, { useEffect, useState} from 'react';
import ShowcaseService from '../../service/ShowcaseService.jsx';
import { Button, SplitButton } from "@fluentui/react-components";
import { Link } from "react-router-dom";
import PaginatedSection from "../Pagination.jsx";
import ShowcaseCard from "./ShowcaseCard.jsx"; // Ensure this is imported

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
        
            active.sort((a, b) => new Date(a.end) - new Date(b.end));
            upcoming.sort((a, b) => new Date(a.start) - new Date(b.start));
            past.sort((a, b) => new Date(b.end) - new Date(a.end));

            setActiveShowcases(active);
            setUpcomingShowcases(upcoming);
            setPastShowcases(past);
            setLoading(false);
        });
    }, []);

    if (loading) return <div>Loading...</div>;

    const renderShowcaseCard = (showcase) => (
        <ShowcaseCard key={showcase.id} showcase={showcase} />
    );

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

            <PaginatedSection 
                title="Active Showcases" 
                items={activeShowcases} 
                renderItem={renderShowcaseCard}
            />
            <PaginatedSection 
                title="Upcoming Showcases" 
                items={upcomingShowcases} 
                renderItem={renderShowcaseCard}
            />
            <PaginatedSection 
                title="Past Showcases" 
                items={pastShowcases} 
                renderItem={renderShowcaseCard}
            />
        
            {activeShowcases.length === 0 && upcomingShowcases.length === 0 && pastShowcases.length === 0 && (
                <div>No showcases found.</div>
            )}
        </div>
    );
}

export default ShowcaseList;