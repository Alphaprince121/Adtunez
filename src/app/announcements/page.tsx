"use client";

import React, { useState, useCallback } from "react";

const StarRating = () => {
    const [activeStars, setActiveStars] = useState(new Array(5).fill(false));
    const [surroundingStars, setSurroundingStars] = useState(new Array(5).fill(false));

    const handleClick = useCallback((index: number) => {
        setActiveStars((prevActiveStars) => {
            const newActiveStars = [...prevActiveStars];
            const isCurrentlyActive = newActiveStars[index]; // Check if the clicked star is currently active

            if (isCurrentlyActive) {
                // Deactivate this star and all to the rightprevSurroundingStars
                for (let i = index; i < newActiveStars.length; i++) {
                    newActiveStars[i] = false;
                }

                //Also clear surrounding stars since we deactivated
                setSurroundingStars(new Array(5).fill(false)); //Clear surround stars immediately
            } else {
                // Activate this star and all to the left
                for (let i = 0; i < newActiveStars.length; i++) {
                    newActiveStars[i] = i <= index;
                }

                // Set surrounding stars (only if activating)
                setSurroundingStars((prevSurroundingStars) => {
                    const newSurroundingStars = new Array(5).fill(false);
                    newSurroundingStars[index] = true;
                    return newSurroundingStars;
                });

                // time out for surrounding stars
                setTimeout(() => {
                    setSurroundingStars((prevSurroundingStars) => {
                        const newSurroundingStars = [...prevSurroundingStars];
                        newSurroundingStars[index] = false;
                        return newSurroundingStars;
                    });
                }, 700);
            }

            return newActiveStars;
        });
    }, []);

    return (
        <div className="bg-[#F3F3FF] p-[18px] flex justify-center items-center relative">
            <div className="flex absolute -mt-10">
                {activeStars.map((isActive, index) => (
                    <div key={index} className="relative flex justify-center items-center cursor-pointer" onClick={() => handleClick(index)}>

                        {/*Main star  */}
                        <h1 className={`text-[30px] transition-all duration-500 ${isActive ? "text-yellow-400" : "text-gray-300 grayscale"} ${surroundingStars[index] ? "scale-125" : "scale-100"}`}>
                            ⭐
                        </h1>

                        {/* Surrounding Stars */}
                        <h1 className={`text-[8px] absolute top-[15px] left-[15px] transition-all duration-700 ease-out transform ${surroundingStars[index] ? "opacity-100 translate-x-[-12px] translate-y-[-12px] scale-125 rotate-[35deg]" : "opacity-0 translate-x-0 translate-y-0 scale-100 rotate-0"}`}>⭐</h1>

                        <h1 className={`text-[8px] absolute top-[37px] right-[8px] transition-all duration-700 ease-out transform ${surroundingStars[index] ? "opacity-100 translate-x-[12px] translate-y-[-12px] scale-125 rotate-[-35deg]" : "opacity-0 translate-x-0 translate-y-0 scale-100 rotate-0"}`}>⭐</h1>

                        <h1 className={`text-[8px] absolute bottom-[20px] left-[9px] transition-all duration-700 ease-out transform ${surroundingStars[index] ? "opacity-100 translate-x-[-12px] translate-y-[12px] scale-125 rotate-[45deg]" : "opacity-0 translate-x-0 translate-y-0 scale-100 rotate-0"}`}>⭐</h1>

                        <h1 className={`text-[8px] absolute bottom-[7px] right-[27px] transition-all duration-700 ease-out transform ${surroundingStars[index] ? "opacity-100 translate-x-[12px] translate-y-[12px] scale-125 rotate-[-45deg]" : "opacity-0 translate-x-0 translate-y-0 scale-100 rotate-0"}`}>⭐</h1>

                        <h1 className={`text-[8px] absolute top-[18px] left-[33px] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out ${surroundingStars[index] ? "opacity-100 translate-y-[-15px] scale-125 rotate-[45deg]" : "opacity-0 scale-100 rotate-0"}`}>⭐</h1>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Announcements = () => {
    const [selectedOption, setSelectedOption] = useState("All Announcements");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const announcementsData = [
        {
            id: 1,
            title: "AI-Powered Ad Optimization is Here!",
            date: "Feb 10, 2025",
            description:
                "Struggling with constant manual adjustments? Say hello to our brand-new AI-powered ad optimization tool! This advanced feature automatically analyzes your ad performance in real-time, identifies patterns, and suggests actionable improvements to help you achieve better results with minimal effort.",
            body:
                "Whether it's adjusting bids, refining targeting, or reallocating budget, our AI ensures your ads perform at their peak. 🚀 Let AI do the heavy lifting while you focus on scaling your business.",
            link: "Read More ",
        },
        {
            id: 2,
            title: "Bulk Edits Just Got Easier!",
            date: "Feb 08, 2025",
            description:
                "Managing multiple campaigns across different accounts can be tedious, but not anymore! Our latest Bulk Edit feature allows you to make sweeping changes to bids, budgets, and keywords across all your campaigns with a single click. No more repetitive adjustments—just seamless optimization at scale.",
            body:
                "Whether you're updating seasonal promotions or testing new strategies, you can now save hours of manual work and improve efficiency like never before.☑️ Stay ahead of the competition with smarter, faster campaign management",
            link: "Read More ",
        },
    ];

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        setIsDropdownOpen(false);
    };

    return (
        <div className="font-sans antialiased bg-gray-50 text-[#333333]">
            <div className="mx-auto bg-white rounded-lg shadow-md overflow-hidden max-h-[750px] max-w-[408px]">
                {/* Header */}
                <div className="flex items-center justify-between bg-white p-3 border-b">
                    <h2 className="text-[14px] leading-[24px] font-medium">Announcements</h2>
                    <img src="/icons/close.png" alt="close-icon" className="h-5" />
                </div>

                {/* Dropdown */}
                <div className="relative p-4">
                    <button
                        onClick={toggleDropdown}
                        className="border text-[#333333] font-medium text-[12px] leading-[20px] py-1 px-4 rounded inline-flex items-center gap-4"
                    >
                        <span>{selectedOption}</span>
                        <img
                            src="/icons/down-arrow.png"
                            className={`h-[7px] transition-transform duration-300 ${isDropdownOpen ? "-rotate-180" : ""}`}
                        />
                    </button>

                    {isDropdownOpen && (
                        <ul className="absolute mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-[10px] w-[167px] text-[#333333] hover:bg-gray-100"
                                    onClick={() => handleOptionClick("All Announcements")}
                                >
                                    All Announcements
                                </a>
                            </li>
                        </ul>
                    )}
                </div>

                {/* Announcement Cards */}
                <div className="px-4">
                    {announcementsData.map((announcement) => (
                        <div key={announcement.id} className="rounded-md overflow-hidden mb-4">
                            <div className="px-4 py-2 bg-gradient-to-r from-[#9E6DEE] to-[#4623E9] text-white flex items-center justify-between">
                                <div className="flex items-center">
                                    <img src="/icons/speaker.png" alt="speaker-icon" className="h-4 mr-2" />
                                    <h3 className="text-[12px] leading-[18px] font-semibold">{announcement.title}</h3>
                                </div>
                                <span className="bg-[#FFFFFF] text-[#5C3FF3] text-[10px] leading-[20px] font-medium px-2 rounded-md uppercase">
                                    New
                                </span>
                            </div>
                            <div className="px-4 py-3 border-r border-l border-[#F3F3FF]">
                                <p className="text-[#333333] text-opacity-80 text-[10px] leading-[20px] font-medium">
                                    Published on: {announcement.date}
                                </p>
                                <p className="text-[#898D9F] leading-[15px] text-[10px] font-normal mt-2">
                                    {announcement.description}
                                </p>
                                <p className="text-[#898D9F] leading-[15px] text-[10px] font-normal mt-2">
                                    {announcement.body}
                                </p>
                                <div className="flex items-center mt-2 gap-1">
                                    <a href="#" className="text-[#4623E9] font-semibold text-[10px] leading-[15px] inline-block">
                                        {announcement.link}
                                    </a>
                                    <img src="/icons/right-arrow.png" alt="" className="h-3 w-3" />
                                </div>
                            </div>

                            {/* Star Rating System */}
                            <StarRating />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Announcements;
