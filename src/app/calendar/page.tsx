'use client'

import React, { useState, useEffect } from 'react';

interface CalendarProps {
    selectedDate: Date | null;
    onDateChange: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateChange }) => {
    const [currentDate, setCurrentDate] = useState(selectedDate || new Date());
    const [showYearPicker, setShowYearPicker] = useState(false);


    useEffect(() => {
        if (selectedDate) {
            setCurrentDate(selectedDate);
        }
    }, [selectedDate]);

    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    const handlePreviousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handleYearClick = (year: number) => {
        setCurrentDate(new Date(year, currentDate.getMonth(), 1));
        setShowYearPicker(false);
    };

    const renderYearPicker = () => {
        const currentYear = new Date().getFullYear();
        const years = Array.from({ length: 100 }, (_, i) => currentYear - 49 + i); // Show only past and current years

        return (
            <div className="grid grid-cols-4 gap-2 p-2 h-[220px] overflow-y-auto">
                {years.map((year) => (
                    <div
                        key={year}
                        className={`p-2 text-center cursor-pointer rounded-lg hover:bg-[#F3F3FF] font-poppins text-[14px] ${year > currentYear ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        onClick={() => {
                            if (year <= currentYear) {
                                handleYearClick(year);
                            }
                        }}
                    >
                        {year}
                    </div>
                ))}
            </div>
        );
    };


    const renderDays = () => {
        const days = [];
        const firstDayOfWeek = (startOfMonth.getDay() || 7) - 1; // Adjust for Monday start
        const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        const daysInPreviousMonth = new Date(previousMonth.getFullYear(), previousMonth.getMonth() + 1, 0).getDate();

        // Add previous month's dates
        if (firstDayOfWeek > 0) {
            for (let i = firstDayOfWeek - 1; i >= 0; i--) {
                const day = daysInPreviousMonth - i;
                days.push(
                    <div
                        key={`prev-${day}`}
                        className="p-2 text-center text-[#808080] cursor-pointer hover:bg-[#F3F3FF] rounded-md text-[14px] font-poppins"
                        onClick={() => {
                            const date = new Date(previousMonth.getFullYear(), previousMonth.getMonth(), day);
                            onDateChange(date);
                            setCurrentDate(date);
                        }}
                    >
                        {day}
                    </div>
                );
            }
        }

        // Add current month's dates
        for (let day = 1; day <= daysInMonth; day++) {
            const isSelected =
                selectedDate &&
                selectedDate.toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();

            days.push(
                <div
                    key={`current-${day}`}
                    className={`p-2 ${(new Date(currentDate.getFullYear(), currentDate.getMonth(), day) > new Date()) && "opacity-50"} text-center rounded-md cursor-pointer font-normal text-[#333333] text-[14px] leading-[15px] font-poppins ${isSelected ? 'bg-[#5C3FF3] text-white' : 'hover:bg-[#F3F3FF]'
                        }`}
                    onClick={() => {
                        if (new Date(currentDate.getFullYear(), currentDate.getMonth(), day) <= new Date()) {
                            console.log("new Date(currentDate.getFullYear(), currentDate.getMonth(), day) :", new Date(currentDate.getFullYear(), currentDate.getMonth(), day))
                            onDateChange(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))
                        }
                    }
                    }
                >
                    {day}
                </div>
            );
        }

        // Add next month's dates
        const totalCells = days.length;
        const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
        for (let i = 1; i <= remainingCells; i++) {
            const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i);
            days.push(
                <div
                    key={`next-${i}`}
                    className={`p-2 text-center text-[#808080] ${(nextMonth > new Date()) && "opacity-50"} cursor-pointer  rounded-lg text-[14px]`}
                    onClick={() => {
                        if (nextMonth <= new Date()) {
                            console.log("nextMonth :", nextMonth)
                            onDateChange(nextMonth);
                            setCurrentDate(nextMonth);
                        }
                    }}
                >
                    {i}
                </div>
            );
        }

        return days;
    };
    return (
        <div className="w-80 p-4 bg-white border rounded-md ">
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={() => setShowYearPicker(!showYearPicker)}
                    className="p-1 text-[#333333] flex items-center font-poppins text-[14px] leading-[16px] font-[400]"
                >
                    {currentDate.toLocaleString('default', { month: 'short' })} {currentDate.getFullYear()}
                    <svg className="ml-2" width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.96315 5.07812L11.346 0.416428H0.580291L5.96315 5.07812Z" fill="#5C3FF3" />
                    </svg>
                </button>
                {!showYearPicker && (
                    <div className="flex items-center gap-[10px]">
                        <button onClick={handlePreviousMonth} className="p-1">
                            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.21387 11.0649L1.73168 6.23797L6.21387 1.411" stroke="#5C3FF3" strokeWidth="1.37913" strokeLinecap="round" />
                            </svg>
                        </button>
                        <button onClick={handleNextMonth} className="p-1">
                            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.41895 1.41113L5.90113 6.2381L1.41895 11.0651" stroke="#5C3FF3" strokeWidth="1.37913" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
            {showYearPicker ? (
                renderYearPicker()
            ) : (
                <div className="grid grid-cols-7 gap-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                        <div key={day} className="font-normal text-[12px] font-poppins text-[#3C3C43] leading-[12px] text-opacity-60 text-center">
                            {day}
                        </div>
                    ))}
                    {renderDays()}
                </div>
            )}
        </div>
    );
};

export default Calendar;
