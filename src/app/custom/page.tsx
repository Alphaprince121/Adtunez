'use client';
import { useState, useEffect, useRef } from "react";
import Calendar from '../../app/calendar/page';

const Page: React.FC = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string>("Compare with");
    const [showCustomDiv, setShowCustomDiv] = useState<boolean>(false);
    const [showFromCalendar, setShowFromCalendar] = useState<boolean>(false);
    const [showToCalendar, setShowToCalendar] = useState<boolean>(false);
    const [customStartDate, setCustomStartDate] = useState<Date | null>(null);
    const [customEndDate, setCustomEndDate] = useState<Date | null>(null);
    const [error, setError] = useState<string | null>(null);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const today = new Date(); // Get today's date

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
                setShowCustomDiv(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsDropdownOpen(false);
                setShowCustomDiv(false);
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    const formatDate = (date: Date | null): string => {
        if (!date) return "Select Date";
        return date.toLocaleDateString("en-GB"); // Format: DD/MM/YYYY
    };

    const handleFromDateChange = (date: Date) => {
        setCustomStartDate(date);
        setShowFromCalendar(false);
        setError(null);
    };

    const handleToDateChange = (date: Date) => {
        setCustomEndDate(date);
        setShowToCalendar(false);
        setError(null);
    };

    useEffect(() => {
        if (customStartDate && customEndDate) {
            if (customStartDate >= customEndDate) {
                setError("Start date should be less than end date!");
            } else if (customStartDate > today || customEndDate > today) {
                setError("Dates cannot be in the future!");
            } else {
                setError(null);
            }
        }
    }, [customStartDate, customEndDate]);

    const handleApply = () => {
        if (!customStartDate || !customEndDate) {
            setError("Both start and end dates must be selected.");
        } else {
            setSelectedOption(`${formatDate(customStartDate)} - ${formatDate(customEndDate)}`);
            setIsDropdownOpen(false);
            setShowCustomDiv(false);
            setError(null);
        }
    };

    return (
        <div className="flex justify-center items-center mt-20">
            <div className="flex items-center gap-14">
                <div className="relative flex items-center gap-4">
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => {
                                setIsDropdownOpen((prev) => !prev);
                                if (showCustomDiv) {
                                    setShowCustomDiv(false);
                                }
                            }}
                            className="px-3 py-2 flex items-center justify-between rounded-md border border-gray-300 text-[#898D9F] focus:outline-none font-medium text-[12px] leading-[20px] cursor-pointer min-w-[100px] gap-[25px]"
                            aria-expanded={isDropdownOpen}
                            aria-label="Select an option"
                        >
                            {selectedOption}
                            <img
                                src="/icons/down-arrow.png"
                                alt="Dropdown arrow"
                                className="h-2 w-3 object-contain"
                            />
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute mt-1 w-52 bg-white border border-gray-300 rounded-lg z-10">
                                <div className="p-2 ">
                                    <h1 className="cursor-pointer font-normal text-[12px] hover:bg-gray-100 p-2 leading-[21px]" onClick={() => {
                                        setSelectedOption("None");
                                        setCustomStartDate(null);
                                        setCustomEndDate(null);
                                        setIsDropdownOpen(false);
                                        setShowCustomDiv(false);
                                    }}>
                                        None
                                    </h1>
                                    <h1 className="cursor-pointer font-normal text-[12px] hover:bg-gray-100 p-2 leading-[21px]" onClick={() => {
                                        setSelectedOption("Previous Period");
                                        setCustomStartDate(null);
                                        setCustomEndDate(null);
                                        setIsDropdownOpen(false);
                                        setShowCustomDiv(false);
                                    }}>
                                        Previous Period
                                    </h1>
                                    <h1 className="cursor-pointer font-normal text-[12px] hover:bg-gray-100 p-2 leading-[21px]" onClick={() => {
                                        setSelectedOption("Custom");
                                        setShowCustomDiv(true);
                                        setIsDropdownOpen(false);
                                    }}>
                                        Custom
                                    </h1>
                                </div>
                            </div>
                        )}

                        {showCustomDiv && (
                            <div className="absolute mt-1 w-56 bg-white border border-gray-300 rounded-lg z-10 p-4 space-y-3">
                                <h1 className="text-[#333333] font-medium text-[12px] leading-[20px]">From</h1>
                                <div className="border flex justify-between items-center p-2 rounded-md relative">
                                    <h1 className="font-medium text-[12px] leading-[20px]">{formatDate(customStartDate)}</h1>
                                    <img
                                        src="/icons/calender.png"
                                        alt="calendar-icon"
                                        className="h-4 cursor-pointer"
                                        onClick={() => {
                                            setShowFromCalendar((prev) => !prev);
                                            setShowToCalendar(false);
                                        }}
                                    />
                                    {showFromCalendar && (
                                        <div className="absolute top-10 -left-10 rounded-md z-10">
                                            <Calendar onDateChange={handleFromDateChange} selectedDate={customStartDate} />
                                        </div>
                                    )}
                                </div>

                                <h1 className="text-[#333333] font-medium text-[12px] leading-[20px]">To</h1>
                                <div className="border flex justify-between items-center p-2 rounded-md relative">
                                    <h1 className="font-medium text-[12px] leading-[20px]">{formatDate(customEndDate)}</h1>
                                    <img
                                        src="/icons/calender.png"
                                        alt="calendar-icon"
                                        className="h-4 cursor-pointer"
                                        onClick={() => {
                                            setShowToCalendar((prev) => !prev);
                                            setShowFromCalendar(false);
                                        }}
                                    />
                                    {showToCalendar && (
                                        <div className="absolute top-10 -left-10 rounded-md z-10">
                                            <Calendar onDateChange={handleToDateChange} selectedDate={customEndDate} />
                                        </div>
                                    )}
                                </div>

                                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

                                <button
                                    onClick={handleApply}
                                    disabled={!!error}
                                    className={`w-full mt-3 py-2 px-4 font-semibold text-[14px] leading-[20px] rounded-md 
                                        ${error ? 'bg-gray-300 text-black' : 'bg-[#5C3FF3] text-white'}`}>
                                    Apply
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
