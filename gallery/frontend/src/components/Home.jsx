import React, { useEffect, useState } from 'react'
import Navbar from "./Navbar.jsx";
import {
    Carousel,
    CarouselSlider,
    CarouselCard,
    CarouselNavContainer,
    CarouselNav,
    CarouselNavButton
} from "@fluentui/react-carousel"
import { Button } from "@fluentui/react-components";
import { FolderRegular, LeafTwoRegular, ConnectedRegular } from "@fluentui/react-icons";
import ShowcaseService from "../service/ShowcaseService.jsx";
import { Link } from "react-router-dom";

const Home = () => {
    const [showcases, setShowcases] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        ShowcaseService.getAll()
            .then(response => {
                setShowcases(response.data);
            });
    }, []);

    useEffect(() => {
        if (showcases.length === 0) return;

        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % showcases.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [showcases.length]);

    return (
        <>
            <Navbar />

            {/*---- Carousel ----*/}
            <Carousel
                activeIndex={activeIndex}
                onActiveIndexChange={(e, data) => setActiveIndex(data.index)}
                groupSize={1}
                circular
                className="h-[80vh] relative">
                <CarouselSlider className="h-full">
                    {showcases.map((showcase, index) => (
                        <CarouselCard key={index} index={index} className="relative h-full w-full">
                            <img
                                src={`http://localhost:8080/assets/images/showcases/${showcase.heroImage}`}
                                alt={showcase.title}
                                className="w-full h-full object-cover object-center"
                            />
                            <div className="absolute inset-0 bg-black/20 z-0"></div>
                            <div className="absolute left-1/2 bottom-1/8 -translate-x-1/2 z-10 flex flex-col items-center text-center">
                                <h1 className="!text-white">
                                    {showcase.title}
                                </h1>
                                <Link to={`/showcase/${showcase.id}`}>
                                    <Button
                                        appearance="primary"
                                        style={{backgroundColor: '#6574A2', color: 'white'}}
                                    >
                                        Browse this showcase
                                    </Button>
                                </Link>
                            </div>
                        </CarouselCard>
                    ))}
                </CarouselSlider>

                <CarouselNavContainer
                    className="absolute bottom-4 w-full z-20"
                    prev={{
                        "aria-label": "Previous slide",
                        className: "!bg-white/50 hover:!bg-white"
                    }}
                    next={{
                        "aria-label": "Next slide",
                        className: "!bg-white/50 hover:!bg-white"
                    }}
                >
                    <CarouselNav>
                        {(_, index) => (
                            <CarouselNavButton aria-label={`Go to slide ${index + 1}`} />
                        )}
                    </CarouselNav>
                </CarouselNavContainer>
            </Carousel>

            {/*---- Mission Statement Section ----*/}
            <div className="flex mx-32 gap-8 h-[35vh]">
                <div className="flex flex-col justify-center items-center flex-1">
                    <FolderRegular className="text-5xl" />
                    <h2>Projects</h2>
                    <p className="text-center">
                        Our mission is to provide a stage where students can showcase their creativity, skills, and innovative projects to a global audience.
                    </p>
                </div>
                <div className="flex flex-col justify-center items-center flex-1">
                    <LeafTwoRegular className="text-5xl" />
                    <h2>Connect</h2>
                    <p className="text-center">
                        We are a dynamic platform proudly offered by TUS, dedicated to empowering students and bridging the gap between education and industry.                    </p>
                </div>
                <div className="flex flex-col justify-center items-center flex-1">
                    <ConnectedRegular className="text-5xl" />
                    <h2>Network</h2>
                    <p className="text-center">
                        If you're an employer seeking the brightest minds, TUS Gallery is your trusted partner on this exciting educational and professional adventure.                    </p>
                </div>
            </div>

            {/*---- Recent Projects Section ----*/}
        </>
    );
};

export default Home;