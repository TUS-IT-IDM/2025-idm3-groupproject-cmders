import React from 'react';
import Navbar from './Navbar.jsx';
import { 
    LocationRegular, 
    CallRegular, 
    MailRegular, 
    BuildingRegular 
} from '@fluentui/react-icons';

const Contact = () => {
    const campuses = [
        {
            name: "Athlone Campus",
            address: "University Road, Athlone, Co. Westmeath, N37 HD68",
            phone: "+353 090 646 8000",
            email: "reception.midlands@tus.ie"
        },
        {
            name: "Moylish Campus",
            address: "Moylish Park, Limerick V94 EC5T",
            phone: "+353 61 293000",
            email: "Reception.Midwest@tus.ie"
        },
        {
            name: "Clare Street Campus",
            address: "Limerick School of Art & Design, Clare Street, Limerick, V94 KX22",
            phone: "+353 61 293870",
            email: "LSAD@tus.ie"
        },
        {
            name: "Clonmel Campus",
            address: "TUS Clonmel Digital Campus, Cashel Road, Clonmel, Co. Tipperary, E91 D896",
            phone: "+353 504 28000",
            email: "LSAD@tus.ie"
        },
        {
            name: "Ennis Campus",
            address: "TUS Ennis Campus, Bindon Street, Ennis, Co. Clare, V95 DP96",
            phone: "+353 61 293559",
            email: null
        },
        {
            name: "Thurles Campus",
            address: "TUS Thurles Campus, Nenagh Road, Thurles, Co. Tipperary, E41 PC92",
            phone: "+353 504 28000",
            email: "Reception.Midwest@tus.ie"
        }
    ];

    return (
        <>
            <Navbar />
            
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-[#6574A2] to-[#5B6E99] text-white py-20">
                <div className="mx-8 md:mx-32">
                    <div className="flex flex-col items-center text-center">
                        <BuildingRegular className="text-6xl md:text-7xl mb-4" />
                        <h1 className="!text-white text-center">Contact Us</h1>
                        <p className="text-center text-lg md:text-xl max-w-4xl mx-auto mt-4 leading-relaxed">
                            Get in touch with Technological University of the Shannon across our six campuses
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-8 md:mx-32 my-16">
                
                {/* Campus Cards Grid */}
                <section>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {campuses.map((campus, index) => (
                            <div 
                                key={index}
                                className="border-2 border-gray-400 rounded-2xl shadow-md p-8 bg-white hover:shadow-lg transition-shadow duration-300"
                            >
                                <h2 className="text-[#6574A2] mb-6 text-center">{campus.name}</h2>
                                
                                {/* Address */}
                                <div className="mb-4 flex items-start gap-3">
                                    <LocationRegular className="text-2xl text-[#6574A2] flex-shrink-0 mt-1" />
                                    <p className="text-base leading-relaxed text-gray-700">
                                        {campus.address}
                                    </p>
                                </div>

                                {/* Phone */}
                                <div className="mb-4 flex items-start gap-3">
                                    <CallRegular className="text-2xl text-[#6574A2] flex-shrink-0 mt-1" />
                                    <a 
                                        href={`tel:${campus.phone.replace(/\s/g, '')}`}
                                        className="text-base leading-relaxed text-gray-700 hover:text-[#6574A2] transition-colors duration-200"
                                    >
                                        {campus.phone}
                                    </a>
                                </div>

                                {/* Email */}
                                {campus.email && (
                                    <div className="flex items-start gap-3">
                                        <MailRegular className="text-2xl text-[#6574A2] flex-shrink-0 mt-1" />
                                        <a 
                                            href={`mailto:${campus.email}`}
                                            className="text-base leading-relaxed text-gray-700 hover:text-[#6574A2] transition-colors duration-200 break-all"
                                        >
                                            {campus.email}
                                        </a>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </>
    );
};

export default Contact;