'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface SubmenuItems {
    [key: string]: string[];
}

const DateRangeDropdown = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMainDropdownOpen, setIsMainDropdownOpen] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
    const [selectedOption, setSelectedOption] = useState<string>('Last 30 Days');
    const [offsetEnabled, setOffsetEnabled] = useState<boolean>(false);
    const [offsetDays, setOffsetDays] = useState<number>(1);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const handleOptionSelect = (option: string) => {
        setSelectedOption(option);
        setIsDropdownOpen(false);
        setIsMainDropdownOpen(false);
        setActiveSubmenu(null);
    };

    const submenuItems: SubmenuItems = {
        'Last N days': ['Last 7 days', 'Last 14 days', 'Last 30 days'],
        'Day': ['Today', 'Yesterday', 'Day before yesterday'],
        'Week': ['This Week (Sun - Today)', 'Last Week (Sun - Sat)', 'Weeks before last (Sun - Sat)', 'This Week (Mon - Sun)', 'Last Week (Mon - Sun)', 'Weeks before last (Mon - Sun)'],
        'Month': ['This Month', 'Last Month', 'Last Month Last Year', 'Last 3 Months', 'Last 6 Months', 'Last 12 Months'],
        'Business': ['This Year', 'This Quarter'],
        'Custom': ['Custom Date Range'],
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
                setActiveSubmenu(null);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            {/* Dropdown Button */}
            <button
                onClick={toggleDropdown}
                className="flex items-center justify-start px-[15px] gap-[25px] py-2 border font-medium text-[12px] leading-[20px] rounded-md text-[#333333]"
            >
                {selectedOption}
                <img
                    src="/icons/down-arrow.png"
                    alt=""
                    className="h-2 w-3 object-contain"
                />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
                <div className="absolute mt-2 w-72 bg-white border -left-20 rounded-md shadow-lg z-10 p-4" role="menu">
                    <p className="text-[12px] leading-[16px] font-medium mb-2">Date Range</p>
                    <div className="border-b pb-2 mb-2">
                        {Object.keys(submenuItems).map((menu) => (
                            <div className="relative group" key={menu}>
                                <button
                                    className="flex items-center justify-between px-[12px] gap-[25px] py-2 hover:bg-gray-100 cursor-pointer rounded w-full text-left font-[400] text-[12px] leading-[21px]"
                                    onMouseEnter={() => setActiveSubmenu(menu)}
                                >
                                    {menu}
                                    <img
                                        src="/icons/down-arrow.png"
                                        alt=""
                                        className="h-2 w-3 -rotate-90 object-contain"
                                    />
                                </button>

                                {activeSubmenu === menu && (
                                    <div
                                        className="absolute left-[60%] top-0 ml-2 w-48 z-50 bg-white border rounded-md shadow-lg"
                                        onMouseEnter={() => setActiveSubmenu(menu)}
                                        onMouseLeave={() => setActiveSubmenu(null)}
                                    >
                                        {submenuItems[menu].map((item) => (
                                            <button
                                                key={item}
                                                onClick={() => handleOptionSelect(item)}
                                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded w-full text-left font-[400] text-[12px] leading-[21px]"
                                            >
                                                {item}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Date Info */}
                    <p className="text-[10px] font-medium leading-[20px] text-[#898D9F]"> *7 Jan 2025 (Tue) → 5 Feb 2025 (Wed)</p>
                    <p className="text-[10px] font-medium leading-[20px] text-[#898D9F] mb-3">30 days</p>

                    {/* Offset Toggle */}
                    <div className="flex items-center gap-3 mb-4">
                        <p className="text-[12px] font-medium">Offset by</p>
                        <button
                            onClick={() => setOffsetEnabled(!offsetEnabled)}
                            className={`w-10 h-5 flex items-center rounded-full p-1 ${offsetEnabled ? 'bg-indigo-600' : 'bg-gray-300'}`}
                            >
                            <div
                                className={`w-4 h-4 bg-white rounded-full shadow-md transform ${offsetEnabled ? 'translate-x-5' : 'translate-x-0'}`}
                            />
                        </button>
                    </div>

                    {/* Offset Days Input */}
                    {offsetEnabled && (
                        <div className="flex items-center space-x-2 mb-4">
                            <input
                                type="number"
                                value={offsetDays}
                                onChange={(e) => setOffsetDays(Number(e.target.value))}
                                className="w-14 border rounded-md p-1 text-center"
                            />
                            <span className="text-[12px] font-[400] leading-[21px] ">days</span>
                        </div>
                    )}

                    {/* Info Text */}
                    <div className="flex text-[10px] font-medium leading-[15px] text-[#898D9F] mb-4">
                        <img src='/icons/info.png' alt='info-icon' className="h-4 w-4 mr-1" />
                        Pushing data for this duration will account for any conversion delays.
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between gap-4">
                        <button
                            onClick={() => setIsDropdownOpen(false)}
                            className="px-4 py-3 border rounded-md font-semibold text-[12px] leading-[14px] text-[#898D9F] w-full"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => setIsDropdownOpen(false)}
                            className="px-4 py-3 border rounded-md bg-indigo-600 w-full text-white font-semibold text-[12px] leading-[14px]"
                        >
                            Apply
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DateRangeDropdown;
