'use client';
import { useState } from "react";

const Page = () => {
    const [activeTab, setActiveTab] = useState<'search' | 'words'>("search");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [openNestedDropdown, setOpenNestedDropdown] = useState<string | null>(null);
    const [selectedOption, setSelectedOption] = useState('Click');

    const handleSelect = (option: string) => {
        setSelectedOption(option);
        setIsDropdownOpen(false);
        setOpenNestedDropdown(null);
    };

    const dropdownOptions = [
        { label: 'Click', value: 'Click' },
        { label: 'Impression', value: 'Impression' },
        {
            label: 'Conversion', value: 'Conversion',
            nestedOptions: [
                { label: 'Purchases/Sale', value: 'Purchases/Sale' },
                { label: 'Sign-ups', value: 'Sign-ups' },
                { label: 'Views of a key page', value: 'Views of a key page' },
                { label: 'Phone call leads', value: 'Phone call leads' },
                { label: 'Contacts', value: 'Contacts' },
                { label: 'Submit lead form', value: 'Submit lead form' },
                { label: 'Downloads', value: 'Downloads' },
                { label: 'Leads', value: 'Leads' }
            ]
        },
        { label: 'Cost', value: 'Cost' }
    ];

    const data = {
        search: [
            "PPC management", "Online advertising tools", "Conversion tracking software",
            "PPC management software", "Paid ads management software", "PPC automation",
            "Google Ads automation tool", "How to create an app", "AI PPC software",
            "AI powered ad optimization", "PPC campaign management tool", "AI PPC software"
        ],
        words: [
            "Keywords", "Campaign", "Conversion tracking software", "Budget", "Automation",
            "Performance", "Reporting", "Tracking", "Conversion", "Targeting", "Competitors",
            "Engagement", "Impression", "Platforms", "Social", "PPC", "Metrics", "Clicks", "Bidding",
            "Reports", "Insights"
        ]
    };

    return (
        <div className="min-w-[844px] w-full h-[320px] p-3 rounded-md bg-white">
            <div className="flex justify-between items-center pb-2 border-b-2">
                <div>
                    <h1 className="text-[16px] font-medium leading-[20px] text-[#333333]">Searches</h1>
                </div>
                <div className="flex items-center gap-14">
                    <div className="relative flex items-center gap-4">
                        <p className="text-[12px] font-medium leading-[20px] text-[#898D9F]">Sort by</p>
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="px-[12px] flex items-center justify-between py-2 rounded-md border border-gray-300 text-[#333333]  focus:outline-none font-medium text-[12px] leading-[20px] cursor-pointer min-w-[80px] gap-[25px]">
                                {selectedOption}
                                <img src="/icons/down-arrow.png" alt="" className="h-2.5 w-2.5 object-contain" />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute mt-1 w-32 bg-white border font-medium border-gray-300 rounded-md shadow-lg z-10">
                                    {dropdownOptions.map((option) => (
                                        <div key={option.value} onMouseEnter={() => option.nestedOptions && setOpenNestedDropdown(option.value)} onMouseLeave={() => option.nestedOptions && setOpenNestedDropdown(null)}>
                                            {option.nestedOptions ? (
                                                <div className="relative">
                                                    <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[12px] text-[#333333] flex justify-between items-center font-medium">
                                                        {option.label}
                                                        <img src="/icons/down-arrow.png" alt="arrow-icon" className="w-2 h-1 inline-block ml-2 -rotate-90" />
                                                    </div>
                                                    {openNestedDropdown === option.value && (
                                                        <div className="absolute -left-[216px] px-4 -top-16 mt-0 ml-2 w-52 bg-white border border-gray-300 rounded-md shadow-lg">
                                                            <div className="py-2 border-b">
                                                                <h1 className="font-medium text-[12px]">All</h1>
                                                            </div>
                                                            <div>
                                                                <h1 className="text-[12px] font-medium text-[#898D9F] pt-2">Conversion Categories</h1>
                                                            </div>
                                                            {option.nestedOptions.map((nested) => (
                                                                <div
                                                                    key={nested.value}
                                                                    onClick={() => handleSelect(nested.value)}
                                                                    className="px-2 py-2 hover:bg-gray-100 cursor-pointer text-[12px] text-[#333333]">
                                                                    {nested.label}
                                                                </div>
                                                            ))}
                                                            <div className="border-t pb-2">
                                                                <h1 className="text-[#898D9F] text-[12px] font-medium">Conversion action</h1>
                                                                <div className="mt-2 px-2">
                                                                    <h1 className="text-[12px] text-[#333333]">Submit lead form</h1>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <div
                                                    onClick={() => handleSelect(option.value)}
                                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[12px] text-[#333333]">
                                                    {option.label}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="cursor-pointer">
                        <img src="/icons/three-dots.png" alt="Options" className="h-4" />
                    </div>
                </div>
            </div>

            <div className="my-2 font-medium text-[14px] leading-[21px] text-[#333333]">
                <p>Top searches and words within searches where people saw your ads</p>
                <div className="flex max-w-[270px] gap-2 border rounded-md p-1 mt-3">
                    <div
                        className={`w-full text-center p-2 rounded-md cursor-pointer ${activeTab === "search" ? "border text-[#333333]" : "text-[#898D9F]"}`}
                        onClick={() => setActiveTab("search")}
                    >
                        <h1 className="font-medium">Search</h1>
                    </div>
                    <div
                        className={`w-full text-center p-2 rounded-md cursor-pointer ${activeTab === "words" ? "border text-[#333333]" : "text-[#898D9F]"}`}
                        onClick={() => setActiveTab("words")}
                    >
                        <h1 className="font-medium">Words</h1>
                    </div>
                </div>
            </div>

            <div className="mt-2">
                <div className="flex flex-wrap gap-3 ">
                    {data[activeTab].map((item, index) => (
                        <div key={index} className="group relative">

                            <h1
                                key={index}
                                className="bg-[#F5F5F5] py-2 px-3 cursor-pointer rounded-md text-sm text-[#333333] font-medium text-[12px] leading-[17px]"
                            >
                                {item}
                            </h1>
                            <div className="hidden group-hover:block -left-32 absolute shadow-lg z-50 bg-white w-[370px] p-4 rounded-md">
                                <div className="flex justify-between items-center border px-3 py-2 rounded-md mb-4">
                                    <div className="flex gap-3">
                                        <img src="/icons/google.svg" alt="" />
                                        <h1 className="text-sm font-semibold text-gray-800">Online Advertising tools</h1>
                                    </div>
                                    <img src="/icons/search.png" alt="search icon" className="h-4 w-4" />
                                </div>


                                <div className="border-b pb-3 mb-4">
                                    <h2 className="text-[12px] text-[#333333] font-medium">Triggered by your keyword: <span className="font-bold text-[#4623E9]">Online Advertising tools</span></h2>
                                    <p className="text-[12px] font-medium text-[#898D9F]">(Phrase match) +2 more</p>
                                </div>


                                <div className="flex gap-20 mb-4">
                                    <div className="space-y-2">
                                        <h3 className="text-[12px] font-medium text-[#898D9F]">Impression</h3>
                                        <h3 className="text-[12px] font-medium text-[#898D9F]">Click</h3>
                                    </div>
                                    <div className="space-y-2 text-right">
                                        <h3 className="text-sm font-semibold text-gray-800">8</h3>
                                        <h3 className="text-sm font-semibold text-gray-800">1</h3>
                                    </div>
                                </div>


                                <div className="flex justify-between w-full gap-2">
                                    <button className="w-full p-2 bg-[#F3F3FF] font-medium text-[12px] text-[#4623E9] rounded-md text-xs">Add as a keyword</button>
                                    <button className="w-full p-2 bg-[#F3F3FF] font-medium text-[12px] text-[#4623E9] rounded-md text-xs">Add as a negative keyword</button>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-3 flex justify-between">
                <div className="flex items-center gap-1 cursor-pointer">
                    <h1 className="font-semibold text-[12px] leading-[15px] text-[#4623E9] underline">All Searches</h1>
                    <img src="/icons/right-arrow.png" alt="right-arrow" className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2">
                    <img src="/icons/circle-left-arrow.png" alt="left-arrow" className="h-6 cursor-pointer" />
                    <h1 className="text-[#898D9F] text-[12px] font-medium leading-[16px] text-opacity-60">1/2</h1>
                    <img src="/icons/circle-right-arrow.png" alt="right-arrow" className="h-6 cursor-pointer" />
                </div>
            </div>
        </div>
    );
};

export default Page;