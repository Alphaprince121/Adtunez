"use client";

import React, { useState, useEffect, useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

// Define Types
interface AgeGroups {
    "18-21": number;
    "22-25": number;
    "26-30": number;
    "31-35": number;
    "36-40": number;
    "41-45": number;
    "46-55": number;
    "56-70": number;
}


// Define the structure of age group data
interface GenderData {
    gender: "Male" | "Female";
    ageGroups: AgeGroups;
}


// Define gender data structure
const combinedData: GenderData[] = [
    { gender: "Male", ageGroups: { "18-21": 1110, "22-25": 700, "26-30": 720, "31-35": 1700, "36-40": 440, "41-45": 440, "46-55": 140, "56-70": 740 } },
    { gender: "Female", ageGroups: { "18-21": 50, "22-25": 100, "26-30": 1220, "31-35": 208, "36-40": 100, "41-45": 500, "46-55": 800, "56-70": 700 } }
];

// Dropdown options for metrics selection
const dropdownOptions = [
    { label: "Click", value: "Click" },
    { label: "Impression", value: "Impression" },
    { label: "CTR", value: "CTR" },
    { label: "Cost", value: "Cost" },
    {
        label: "Conversion", value: "Conversion",
        nestedOptions: [
            { label: "Purchases/Sale", value: "Purchases/Sale" },
            { label: "Sign-ups", value: "Sign-ups" },
            { label: "Views of a key page", value: "Views of a key page" },
            { label: "Phone call leads", value: "Phone call leads" },
            { label: "Contacts", value: "Contacts" },
            { label: "Submit lead form", value: "Submit lead form" },
            { label: "Downloads", value: "Downloads" },
            { label: "Leads", value: "Leads" },
        ],
    },
    {
        label: "Cost/Conv", value: "Cost/Conv",
        nestedOptions: [
            { label: "Purchases/Sale", value: "Purchases/Sale" },
            { label: "Sign-ups", value: "Sign-ups" },
            { label: "Views of a key page", value: "Views of a key page" },
            { label: "Phone call leads", value: "Phone call leads" },
            { label: "Contacts", value: "Contacts" },
            { label: "Submit lead form", value: "Submit lead form" },
            { label: "Downloads", value: "Downloads" },
            { label: "Leads", value: "Leads" },
        ],
    },
    { label: "Conv.rate", value: "Conv.rate" },
    { label: "Conv value/cost", value: "Conv value/cost" },
    { label: "Interaction rate", value: "Interaction rate" },
    { label: "Interactions", value: "Interactions" },
];


// Section options for displaying different charts
const sectionOptions = [
    { label: "Gender", value: "gender" },
    { label: "Gender & Age", value: "gender-age" },
    { label: "Age", value: "age" },
];

// Extract age groups
const ageGroups: (keyof AgeGroups)[] = Object.keys(combinedData[0].ageGroups) as (keyof AgeGroups)[];

// Calculate totals for each gender
const calculatedData = combinedData.map(({ gender, ageGroups }) => ({
    gender,
    total: Object.values(ageGroups).reduce((acc, val) => acc + val, 0),
    ageGroups,
}));

// Get max values for scaling
const maxTotal = Math.max(...calculatedData.map(d => d.total));
const maxAgeValues: Record<string, number> = calculatedData.reduce((acc, { gender, ageGroups }) => {
    acc[gender] = Math.max(...Object.values(ageGroups));
    return acc;
}, {} as Record<string, number>);

// Convert combinedData into age-centric format for AgeChart
const ageData = ageGroups.map((ageGroup) => ({
    ageGroup,
    value: combinedData.reduce((sum, { ageGroups }) => sum + ageGroups[ageGroup], 0),
}));

// Color Mapping
const colorScale = ["bg-[#F3F3FF]", "bg-[#E2E2FF]", "bg-[#CFCFFF]", "bg-[#C5C5FF]", "bg-[#5C3FF3]"];
const getColor = (gender: "Male" | "Female", value: number): string => {
    if (value === 0) return "bg-gray-100";
    const maxAgeValue = maxAgeValues[gender];
    return colorScale[Math.floor((value / maxAgeValue) * (colorScale.length - 1))];
};


// Component to display gender-based bar chart
const GenderChart = () => (
    <div className="w-full  relative">
        <div className="absolute border-r-2 border-[#898D9F] top-[11.5px] left-[17px] h-[78%] flex flex-col justify-around  pr-[5px]">
            <span className="text-end text-[12px] font-medium leading-[20px] text-[#898D9F]" >Male</span>
            <span className="text-end text-[12px] font-medium leading-[20px] text-[#898D9F]" >Female</span>
        </div>
        <ResponsiveContainer width="100%" height={105}>
            <BarChart layout="vertical" data={calculatedData} margin={{ top: 10, right: 30, left: 65, bottom: 10 }}>
                <XAxis type="number" domain={[0, maxTotal]} hide />
                <YAxis hide={true} type="category" width={5} axisLine={true} />
                <Bar dataKey="total" fill="#5735eb" barSize={40} radius={[0, 5, 5, 0]} />
            </BarChart>
        </ResponsiveContainer>
    </div>
);


// Component to display gender and age based chart
const GenderAgeChart = () => {
    const maleData = calculatedData.filter(({ gender }) => gender === "Male");
    const femaleData = calculatedData.filter(({ gender }) => gender === "Female");

    return (
        <div className="flex relative flex-col items-center mt-4">
            {/* Vertical separator */}
            <div className="absolute border-r-2 border-[#898D9F] border-opacity-50 left-[68px] h-[76%] flex flex-col justify-around pr-[2px]"></div>

            {/* Grid Container */}
            <div className="grid-container grid grid-cols-[auto_repeat(8,minmax(2rem,1fr))] gap-1 items-center">
                {/* Male Section */}
                <div className="contents">
                    {maleData.map(({ gender, ageGroups }) => (
                        <div key={gender} className="contents">
                            <div className="text-[#898D9F] text-[12px] pl-2  font-medium text-end px-2">{gender}</div>

                            {/* Grid for Age Groups (Applying animation here) */}
                            {Object.entries(ageGroups).map(([age, value]) => (
                                <div
                                    key={age}
                                    className={`w-[38px] h-[38px] rounded-md ${getColor(gender, value)} opacity-0 animate-slideUp`}
                                />
                            ))}
                        </div>
                    ))}
                </div>

                {/* Female Section */}
                <div className="contents">
                    {femaleData.map(({ gender, ageGroups }) => (
                        <div key={gender} className="contents">
                            <div className="text-[#898D9F] text-[12px] pl-2 font-medium text-end px-2">{gender}</div>

                            {/* Grid for Age Groups (Applying animation here) */}
                            {Object.entries(ageGroups).map(([age, value]) => (
                                <div
                                    key={age}
                                    className={`w-[38px] h-[38px] rounded-md ${getColor(gender, value)} opacity-0 animate-slideDown`}
                                />
                            ))}
                        </div>
                    ))} 
                </div>

                <div className="text-transparent">-</div>

                {/* Age Labels */}
                {ageGroups.map((age) => (
                    <div key={age} className="text-center text-[#898D9F] text-[11px] leading-[20px] font-medium">{age}</div>
                ))}
            </div>
        </div>
    );
};





// Component to display age-based bar chart
const AgeChart = () => (
    <div className="flex justify-center -mb-5">
        <BarChart width={370} height={130} data={ageData} barSize={45} >
            <XAxis
                dataKey="ageGroup"
                tick={{ fill: "#898D9F" }}
                axisLine={false}
                tickLine={false}
                className="text-center text-[#898D9F] text-[11px] leading-[20px] font-medium"
            />
            <Bar dataKey="value" fill="#5A48E8" radius={[5, 5, 5, 5]} left={50} />
        </BarChart>
    </div>
);

// Dropdown Component
const Dropdown = ({ selectedOption, setSelectedOption }: { selectedOption: string; setSelectedOption: (value: string) => void }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [openNestedDropdown, setOpenNestedDropdown] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
                setOpenNestedDropdown(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (option: string) => {
        setSelectedOption(option);
        setIsDropdownOpen(false);
        setOpenNestedDropdown(null);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="px-[12px] flex items-center justify-between py-2 rounded-md border border-gray-300 text-[#333333] font-medium text-[12px] leading-[20px] w-full min-w-[90px] gap-[25px]"
            >
                {selectedOption}
                <img src="/icons/down-arrow.png" alt="arrow" className="h-2.5 w-2.5 object-contain" />
            </button>
            {isDropdownOpen && (
                <div className="absolute mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                    {dropdownOptions.map((option) => (
                        <div
                            key={option.value}
                            onMouseEnter={() => option.nestedOptions && setOpenNestedDropdown(option.value)}
                            onMouseLeave={() => option.nestedOptions && setOpenNestedDropdown(null)}
                        >
                            {option.nestedOptions ? (
                                <div className="relative">
                                    <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm flex justify-between items-center">
                                        {option.label}
                                        <img src="/icons/down-arrow.png" alt="arrow" className="w-2.5 h2.5 -rotate-90" />
                                    </div>
                                    {openNestedDropdown === option.value && (
                                        <div className="absolute px-2 left-full -top-28 w-52 bg-white border border-gray-300 rounded-md shadow-lg">
                                            <div className="py-2 border-b">
                                                <h1 className="font-medium text-sm">All</h1>
                                            </div>
                                            {option.nestedOptions.map((nested) => (
                                                <div
                                                    key={nested.value}
                                                    onClick={() => handleSelect(nested.value)}
                                                    className="px-2 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                                >
                                                    {nested.label}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div onClick={() => handleSelect(option.value)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">
                                    {option.label}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// Page Component


const Page = () => {
    const [activeTab, setActiveTab] = useState<"Gender" | "Gender & Age" | "Age">("Gender");
    const [selectedOption, setSelectedOption] = useState("Click");
    const [isThreeDotsOpen, setIsThreeDotsOpen] = useState(false);

    const toggleThreeDotsDropdown = () => {
        setIsThreeDotsOpen(!isThreeDotsOpen);
    };


    return (
        <div className="min-w-[447px] w-full h-[320px]  bg-white rounded-md  p-3 space-y-3 ">
            <div className="flex justify-between items-center border-b-2 pb-2 relative">
                <h1 className="text-[15px] font-medium leading-[20px] text-[#333333]">Demographics</h1>
                <div className="flex items-center gap-8">
                    <Dropdown selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
                    <img
                        src="/icons/three-dots.png"
                        alt="three-dots"
                        className="h-4 cursor-pointer relative"
                        onClick={toggleThreeDotsDropdown}
                    />
                    {isThreeDotsOpen && (
                        <div className="absolute top-8 mt-2 bg-white w-72 rounded-lg border-2 p-4 z-50">
                            <h1 className="text-[12px] leading-[20px] text-[#898D9F] font-medium">Card Options</h1>
                            <div className="border-b-2 p-2">
                                <h1 className="text-[14px] font-normal text-[#333333] cursor-pointer">Download card data (.csv)</h1>
                                <h1 className="text-[14px] font-normal text-[#333333] cursor-pointer">Download as image (.png)</h1>
                            </div>
                            <h1 className="text-[12px] leading-[20px] text-[#898D9F] font-medium mt-1">Help improve Overview pages. Was this information useful?</h1>
                            <div className="space-y-2 px-2 mt-2">
                                <h1 className="text-[14px] font-normal text-[#333333] cursor-pointer">yes</h1>
                                <h1 className="text-[14px] font-normal text-[#333333] cursor-pointer">No</h1>
                                <h1 className="text-[14px] font-normal text-[#333333] cursor-pointer">Leave written feedback</h1>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Dynamic Section */}



            <div className="w-full min-w-lg mx-auto mt-20">
                <div className="flex border w-full rounded-lg p-1">
                    {["Gender", "Gender & Age", "Age"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as "Gender" | "Gender & Age" | "Age")}
                            className={`flex-1 px-4 py-2 w-full rounded-md text-sm font-medium  ${activeTab === tab ? "border w-full text-[#333333] font-semibold" : "text-gray-400"
                                }`}
                        >
                            {tab}</button>
                    ))}
                </div>

                <div className="mt-4 w-full">
                    {activeTab === "Gender" && <GenderChart />}
                    {activeTab === "Gender & Age" && <GenderAgeChart />}
                    {activeTab === "Age" && <AgeChart />}
                </div>
            </div>


            <div className="pt-2">
                <h1 className="text-[12px] font-normal leading-[20px] pb-3 text-[#333333]">Based on 74% of your clicks with known gender.</h1>
                <div className="flex  items-center gap-1 cursor-pointer">
                    <h1 className="font-semibold text-[12px] leading-[15px] underline">Demographics</h1>
                    <img src="/icons/right-arrow.png" alt="arrow" className="h-3 w-4 object-contain" />
                </div>
            </div>
        </div>
    );
};

export default Page;
