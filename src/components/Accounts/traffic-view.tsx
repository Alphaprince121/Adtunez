'use client'
import { useState } from "react";

const dropdownOptions = [
    { label: "Traffic View", value: "Traffic View" },
    { label: "Conversions View", value: "Conversions View" },
    { label: "Conv Value View", value: "Conv Value View" },
];

const Page = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Traffic View");

    const handleSelect = (value: string) => {
        setSelectedOption(value);
        setIsDropdownOpen(false);
    };

    return (
        <div className="flex justify-center items-center">
            <div className="flex items-center gap-14">
                <div className="relative flex items-center gap-4">
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="px-[12px] py-2 flex items-center justify-between rounded-md border border-gray-300 text-[#333333] focus:outline-none font-medium text-[12px] leading-[20px] cursor-pointer min-w-[120px] gap-[25px]"
                            aria-expanded={isDropdownOpen}
                            aria-label="Select an option"
                        >
                            {selectedOption}
                            <img
                                src="/icons/down-arrow.png"
                                alt="Dropdown arrow"
                                className="h-2.5 w-2.5 object-contain"
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
        </div>
    );
};

export default Page;
