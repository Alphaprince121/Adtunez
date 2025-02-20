'use client'

import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Page = () => {
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [activeButton, setActiveButton] = useState<string>("custom");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const toggleDropdown = (dropdown: string) => {
        setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-6">
            {/* Save Button */}
            <button  onClick={() => setIsModalOpen(true)} className="px-5 py-2 rounded-md shadow-md border-2">
                Save View
            </button>

            {/* Modal Container */}
            {isModalOpen && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg w-[420px]">
                {/* Modal Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b">
                    <h1 className="text-lg font-semibold text-gray-800">Save View</h1>
                    <img
                    onClick={() => setIsModalOpen(false)}
                        src="/icons/close.png"
                        alt="Close modal"
                        className="w-5 h-5 cursor-pointer hover:opacity-70 transition"
                    />
                </div>

                {/* Modal Content */}
                <div className="p-4">
                    <div className="border rounded-md flex justify-around p-1 w-full gap-3">
                        {/* Custom View Button */}
                        {["custom", "admin"].map((type) => (
                            <button
                                key={type}
                                aria-pressed={activeButton === type}
                                className={`py-2 px-2 rounded-md w-full cursor-pointer text-center ${activeButton === type ? "border text-[#333333]" : "text-[#898D9F]"
                                    }`}
                                onClick={() => setActiveButton(type)}
                            >
                                <h1 className="font-medium text-[12px] leading-[20px]">
                                    {type === "custom" ? "Create Custom View" : "Admin Default"}
                                </h1>
                            </button>
                        ))}
                    </div>

                    {/* Name Input */}
                    <div className="mt-4 flex flex-col space-y-1">
                        <label className="text-sm font-semibold text-[#898D9F]">Name of the view*</label>
                        <input
                            type="text"
                            className="px-4 py-2 border border-gray-300 rounded-sm focus:outline-none"
                        />
                        {/* Checkbox */}
                        <div className="flex items-center pt-2 gap-2">
                            <input type="checkbox" className="w-4 h-4 accent-[#5C3FF3] cursor-pointer" />
                            <p className="text-sm text-[#898D9F]">Set this as my default view</p>
                        </div>
                    </div>

                    {/* Save For Options */}
                    <div className="mt-3">
                        <h1 className="font-medium text-[12px] leading-[20px] text-[#898D9F]">Save for</h1>
                        <div className="pt-2 flex gap-7 cursor-pointer">
                            {[
                                { color: "#D9D9D9", label: "Me" },
                                { color: "#5C3FF3", label: "Me and my team" },
                            ].map(({ color, label }, index) => (
                                <div className="flex items-center gap-1" key={index}>
                                    <div className="h-3 w-3 rounded-full p-2 relative flex items-center justify-center" style={{ backgroundColor: color }}>
                                        <div className="h-2 w-2 rounded-full bg-white absolute" />
                                    </div>
                                    <h1 className="text-[12px] leading-[20px] font-medium text-[#333333]">{label}</h1>
                                </div>
                            ))}
                        </div>
                    </div>


                    {/* Date Range & Compare With */}

                    {/* What's Included */}
                    <div className="mt-3 h-[380px]">
                        <h1 className="text-[12px] leading-[20px] font-medium text-[#333333]">
                            What’s Included in This View?
                        </h1>

                        <div className="border p-3  rounded-md mt-2">
                            <div className="flex justify-stretch w-full items-start">
                                <div>
                                    <h1 className="text-[12px] leading-[20px] font-medium text-[#898D9F]">Date Range</h1>
                                    <h1 className="text-[12px] leading-[20px] text-[#333333] font-normal">Last 30 days</h1>
                                </div>
                                <div>
                                    <h1 className="text-[12px] leading-[20px] font-medium text-[#898D9F]">Compare With</h1>
                                    <h1 className="text-[12px] leading-[20px] text-[#333333] font-normal">None</h1>
                                </div>
                            </div>

                            {/* Display Settings Dropdown */}
                            <div className="w-full max-w-md border rounded-md mt-3">
                                <div
                                    className="flex justify-between items-center py-2 px-4 cursor-pointer"
                                    onClick={() => toggleDropdown("displaySettings")}
                                >
                                    <h1 className="text-[12px] font-medium leading-[20px] text-[#333333]">Display Settings</h1>
                                    {activeDropdown === "displaySettings" ? (
                                        <IoIosArrowUp size={20} className="text-gray-600" />
                                    ) : (
                                        <IoIosArrowDown size={20} className="text-gray-600" />
                                    )}
                                </div>

                                {activeDropdown === "displaySettings" && (
                                    <div className="px-4 pb-2 space-y-2">
                                        {[
                                            { title: "Columns Shown In The Table", value: "Account Health, Suggestions, Audit Sco... +2 more" },
                                            { title: "Currency", value: "USD" },
                                            { title: "Table Data Sorted By", value: "Cost (arranged in descending order)" },
                                            { title: "Pagination", value: "20 accounts per page" },
                                        ].map(({ title, value }, i) => (
                                            <div key={i} >
                                                <h2 className="text-[12px] leading-[20px] font-medium text-[#898D9F]">{title}</h2>
                                                <p className="text-[#333333] text-[12px] leading-[20px]">{value}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Filters Dropdown */}
                            <div className="w-full max-w-md border rounded-md mt-3">
                                <div
                                    className="flex justify-between items-center py-2 px-4 cursor-pointer"
                                    onClick={() => toggleDropdown("filters")}
                                >
                                    <h1 className="text-[12px] font-medium leading-[20px] text-[#333333]">Filters</h1>
                                    {activeDropdown === "filters" ? (
                                        <IoIosArrowUp size={20} className="text-gray-600" />
                                    ) : (
                                        <IoIosArrowDown size={20} className="text-gray-600" />
                                    )}
                                </div>

                                {activeDropdown === "filters" && (
                                    <div className="px-4 pb-2 space-y-2 ">
                                        {[
                                            { title: "Account Owners", value: "All Owners" },
                                            { title: "Google Ads Network", value: "Search, Search Partners, Display, Cross Network, Youtube" },
                                            { title: "Device Types", value: "Mobile, Desktop, TVs, Tablet, Unknown" },
                                        ].map(({ title, value }, i) => (
                                            <div key={i}>
                                                <h2 className="text-[12px] leading-[20px] font-medium text-[#898D9F]">{title}</h2>
                                                <p className="text-[#333333] text-[12px] leading-[20px]">{value}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex w-full mt-4 gap-4">
                            <button className="w-full py-2 px-5 text-gray-600 text-[14px] leading-[20px] font-semibold border border-gray-300 rounded-md bg-white">
                                Cancel
                            </button>
                            <button className="w-full py-2 px-5 text-white text-[14px] leading-[20px] font-semibold rounded-md bg-[#5C3FF3]">
                                Save
                            </button>
                        </div>
                </div>
            </div>
            )}
        </div>
    );
};

export default Page;
