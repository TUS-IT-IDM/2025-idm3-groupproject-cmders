import React from 'react';
import Navbar from './Navbar.jsx';
import { 
    AppsListRegular, 
    BriefcaseRegular, 
    HatGraduationRegular, 
    PeopleTeamRegular 
} from '@fluentui/react-icons';

const About = () => {
    return (
        <>
            <Navbar />
            
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-[#6574A2] to-[#5B6E99] text-white py-20">
                <div className="mx-8 md:mx-32">
                    <h1 className="!text-white text-center">About MOSAIC by TUS</h1>
                    <p className="text-center text-lg md:text-xl max-w-4xl mx-auto mt-4 leading-relaxed">
                        A platform designed to showcase the exceptional talent and creativity of TUS students
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-8 md:mx-32 my-16">
                
                {/* Section 1: About MOSAIC - Full Width Card */}
                <section className="mb-16">
                    <div className="border-2 border-gray-400 rounded-2xl shadow-md p-8 md:p-12 bg-white">
                        <div className="flex flex-col items-center text-center mb-6">
                            <AppsListRegular className="text-6xl md:text-7xl text-[#6574A2] mb-4" />
                            <h2 className="text-[#6574A2]">Showcasing Innovation</h2>
                        </div>
                        <div className="space-y-4 text-base md:text-lg leading-relaxed">
                            <p>
                                Welcome to MOSAIC by TUS, a platform designed to showcase the exceptional talent and creativity of TUS students. Here, the diverse and inspiring projects from across the university come together, forming a vibrant digital mosaic of innovation and skill.
                            </p>
                            <p>
                                MOSAIC by TUS provides a dedicated space for students to proudly display their academic and personal projects, transforming their hard work into a visible, shareable portfolio. For the wider TUS community, it is a place to celebrate achievements and see how ideas move from classroom concepts to real outcomes.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Section 2: Employers */}
                <section className="mb-16">
                    <div className="border-2 border-gray-400 rounded-2xl shadow-md p-8 md:p-12 bg-white">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="flex-shrink-0 flex justify-center md:justify-start w-full md:w-auto">
                                <BriefcaseRegular className="text-6xl md:text-7xl text-[#6574A2]" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-[#6574A2] mb-4">Connecting Employers with Emerging Talent</h2>
                                <div className="space-y-4 text-base md:text-lg leading-relaxed">
                                    <p>
                                        At the heart of MOSAIC by TUS is an opportunity for employers and industry partners to discover future talent.
                                    </p>
                                    <p>
                                        By browsing curated showcases and individual student projects, employers gain insight into the skills, creativity, and problem‑solving abilities of TUS students. Whether you are looking for fresh perspectives, specific technical capabilities, or innovative thinkers, MOSAIC by TUS offers a clear window into the potential of our graduates.
                                    </p>
                                    <p>
                                        As the platform evolves, we aim to make it easier for employers to engage with the work and profiles that are most relevant to them. The quality and variety of projects presented here are intended to support conversations around internships, graduate roles, and collaborations.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3: Students */}
                <section className="mb-16">
                    <div className="border-2 border-gray-400 rounded-2xl shadow-md p-8 md:p-12 bg-white">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="flex-shrink-0 flex justify-center md:justify-start w-full md:w-auto">
                                <HatGraduationRegular className="text-6xl md:text-7xl text-[#6574A2]" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-[#6574A2] mb-4">A Showcase Space for Students</h2>
                                <div className="space-y-4 text-base md:text-lg leading-relaxed">
                                    <p>
                                        MOSAIC by TUS gives students a dedicated stage to share their work beyond the classroom.
                                    </p>
                                    <p>
                                        From design and development to research and creative projects, students can present their work in context, demonstrate their process, and highlight the skills they are most proud of. Showcases curated by lecturers bring together related projects under shared themes, helping students gain visibility and helping viewers discover work by area of interest.
                                    </p>
                                    <p>
                                        This platform is a step towards helping students bridge the gap between academic work and the expectations of the professional world.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 4: Community */}
                <section className="mb-16">
                    <div className="border-2 border-gray-400 rounded-2xl shadow-md p-8 md:p-12 bg-white">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="flex-shrink-0 flex justify-center md:justify-start w-full md:w-auto">
                                <PeopleTeamRegular className="text-6xl md:text-7xl text-[#6574A2]" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-[#6574A2] mb-4">Celebrating Our Community</h2>
                                <div className="space-y-4 text-base md:text-lg leading-relaxed">
                                    <p>
                                        MOSAIC by TUS also exists for family, friends, and the wider TUS community who want to follow and celebrate student achievements.
                                    </p>
                                    <p>
                                        By exploring the showcases and projects on display, visitors can see the breadth of what TUS students are creating, support their journeys, and share their pride in the work being done across the university.
                                    </p>
                                    <p>
                                        Together, these perspectives—students, employers, lecturers, and supporters—form the mosaic that gives the platform its name.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </>
    );
};

export default About;
