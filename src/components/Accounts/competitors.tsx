'use client'
import { useState } from "react";

const dropdownOptions = [
    { label: "Competing Keywords", value: "Competing Keywords" },
    { label: "Conversions View", value: "Conversions View" },
    { label: "Conv Value View", value: "Conv Value View" }
];

type Competitor = {
    name: string;
    score: number;
    increase: number;
    reportIcon: string;
    increaseIcon: string;
};

const competitors: Competitor[] = [
    {
        name: "Integrityheadandair.com",
        score: 30,
        increase: 30,
        reportIcon: "/icons/report.png",
        increaseIcon: "/icons/green-up.png"
    },
    {
        name: "BestCoolingSolutions.net",
        score: 45,
        increase: 15,
        reportIcon: "/icons/report.png",
        increaseIcon: "/icons/green-up.png"
    },
    {
        name: "AirComfortPro.org",
        score: 25,
        increase: 10,
        reportIcon: "/icons/report.png",
        increaseIcon: "/icons/green-up.png"
    },
    {
        name: "Integrityheadandair.com",
        score: 30,
        increase: 30,
        reportIcon: "/icons/report.png",
        increaseIcon: "/icons/green-up.png"
    },
    {
        name: "BestCoolingSolutions.net",
        score: 45,
        increase: 15,
        reportIcon: "/icons/report.png",
        increaseIcon: "/icons/green-up.png"
    },
    {
        name: "AirComfortPro.org",
        score: 25,
        increase: 10,
        reportIcon: "/icons/report.png",
        increaseIcon: "/icons/green-up.png"
    }
];

const CompetitorCard = ({ name, score, increase, reportIcon, increaseIcon }: Competitor) => (
    <div className="border border-gray-300 p-2 rounded-md bg-white w-full min-w-[245px] h-[64px] space-y-1">
        <div className="flex items-center justify-between">
            <h1 className="text-[12px] font-medium leading-[18px] text-[#333333]">{name}</h1>
            <img src={reportIcon} alt="Report Icon" className="h-[14px] w-[14px]" />
        </div>
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <span className="text-[12px] font-medium leading-[18px] text-[#333333]">{score}</span>
                <div className="flex items-center gap-1 text-green-500 font-medium">
                    <img src={increaseIcon} alt="Increase Icon" className="h-3 w-2" />
                    <span className="text-[12px] leading-[20px] font-medium">{increase} more</span>
                </div>
            </div>
            <button className="bg-[#F3F3FF] px-4 py-1 rounded-md text-[#4623E9] text-[12px] leading-[17px] font-medium">
                View Metrics
            </button>
        </div>
    </div>
);

const Page = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Competing Keywords");

    const handleSelect = (value: string) => {
        setSelectedOption(value);
        setIsDropdownOpen(false);
    };

    return (
        <div className="min-w-[850px] w-full h-[248px] p-3 bg-white rounded-md space-y-2.5">
            {/* Card Header */}
            <div className="flex justify-between items-center border-b pb-2">
                <h1 className="text-[16px] font-medium text-[#333333] leading-[20px]">Top Competitors</h1>
                <div className="relative flex items-center gap-4">
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="px-[12px] py-2 flex items-center justify-between rounded-md border border-gray-300 text-[#333333] focus:outline-none font-medium text-[12px] leading-[20px] cursor-pointer min-w-[120px] gap-[25px]"
                        >
                            {selectedOption}
                            <img
                                src="/icons/down-arrow.png"
                                alt="Dropdown Arrow"
                                className="h-2 w-3 object-contain"
                            />
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute mt-1 w-40 bg-white border font-medium border-gray-300 rounded-md shadow-lg z-10">
                                {dropdownOptions.map((option) => (
                                    <div
                                        key={option.value}
                                        onClick={() => handleSelect(option.value)}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[12px] text-[#333333]"
                                    >
                                        {option.label}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Competitor Cards */}
            <div className="grid grid-cols-3 gap-4">
                {competitors.map((competitor, index) => (
                    <CompetitorCard key={index} {...competitor} />
                ))}
            </div>

            {/* Footer Link */}
            <div className="flex items-center gap-1 cursor-pointer text-[#4623E9] font-semibold text-[12px] leading-[15px]">
                <span className="underline">See 228 More</span>
                <img src="/icons/right-arrow.png" alt="Arrow" className="h-[9.5px] w-[9px]" />
            </div>
        </div>
    );
};

export default Page;
