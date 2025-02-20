'use client'
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
    { date: 'Jan 21', clicks: 20, cost: 20 },
    { date: 'Jan 22', clicks: 30, cost: 40 },
    { date: 'Jan 23', clicks: 70, cost: 45 },
    { date: 'Jan 24', clicks: 30, cost: 40 },
    { date: 'Jan 25', clicks: 45, cost: 20 },
    { date: 'Jan 26', clicks: 35, cost: 30 },
    { date: 'Jan 27', clicks: 50, cost: 50 },
    { date: 'Jan 28', clicks: 40, cost: 20 },
    { date: 'Jan 29', clicks: 40, cost: 45 },
    { date: 'Jan 30', clicks: 60, cost: 30 },
    { date: 'Jan 31', clicks: 50, cost: 50 },
];

const dropdownOptions1 = [
    { label: "Traffic View", value: "Traffic View" },
    { label: "Conversions View", value: "Conversions View" },
    { label: "Conv Value View", value: "Conv Value View" },
];

const dropdownOptions2 = [
    { label: "By Date", value: "By Date" },
    { label: "By Campaign", value: "By Campaign" },
    { label: "By Device", value: "By Device" },
];

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white shadow-xl rounded-lg min-w-[250px] p-4">
                <h4 className="text-lg font-semibold text-[#333333] border-b-2">{label}</h4>
                <div>
                    <div className="flex items-center space-x-2 mb-3">
                        <div className="bg-[#4623E9] p-1 rounded-full w-3 h-3"></div>
                        <p className="text-sm text-[#4623E9] flex items-center">
                            <span className="font-medium mr-1">Clicks:</span>
                            <strong>{payload[0].value}</strong>
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="bg-[#FE4D4D] p-1 rounded-full w-3 h-3"></div>
                        <p className="text-sm text-[#FE4D4D] flex items-center">
                            <span className="font-medium mr-1">Cost:</span>
                            <strong>{payload[1].value}</strong>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

const Page = () => {
    const [isDropdown1Open, setIsDropdown1Open] = useState(false);
    const [selectedOption1, setSelectedOption1] = useState("Traffic View");

    const [isDropdown2Open, setIsDropdown2Open] = useState(false);
    const [selectedOption2, setSelectedOption2] = useState("By Date");

    const handleSelect1 = (value: string) => {
        setSelectedOption1(value);
        setIsDropdown1Open(false);
    };

    const handleSelect2 = (value: string) => {
        setSelectedOption2(value);
        setIsDropdown2Open(false);
    };

    return (
        <div className="p-3 min-w-[925px] w-full min-h-[337px] bg-white rounded-md">
            <div className="flex justify-between items-center border-b-2 pb-2">
                {/* Title and Dropdowns */}
                <div className="flex items-center space-x-4">
                    <h1 className="text-[16px] leading-[20px] font-medium text-[#333333]">Metric Comparison</h1>

                    <div className="flex items-center gap-4">
                        {/* First Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdown1Open(!isDropdown1Open)}
                                className="px-[12px] py-2 flex items-center justify-between rounded-md border border-gray-300 text-[#333333] focus:outline-none font-medium text-[12px] leading-[20px] cursor-pointer w-full min-w-[120px] gap-[25px]"
                            >
                                {selectedOption1}
                                <img src="/icons/down-arrow.png" alt="" className="h-2 w-3 object-contain" />
                            </button>
                            {isDropdown1Open && (
                                <div className="absolute mt-1 w-40 bg-white border font-medium border-gray-300 rounded-md shadow-lg z-10">
                                    {dropdownOptions1.map((option) => (
                                        <div
                                            key={option.value}
                                            onClick={() => handleSelect1(option.value)}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[12px] text-[#333333]"
                                        >
                                            {option.label}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <h1 className="text-lg leading-[20px] font-medium text-[#898D9F]">By</h1>

                        {/* Second Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdown2Open(!isDropdown2Open)}
                                className="px-[12px] py-2 flex items-center justify-between rounded-md border border-gray-300 text-[#333333] focus:outline-none font-medium text-[12px] leading-[20px] cursor-pointer w-full min-w-[120px] gap-[25px]"
                            >
                                {selectedOption2}
                                <img src="/icons/down-arrow.png" alt="" className="h-2 w-3 object-contain" />
                            </button>
                            {isDropdown2Open && (
                                <div className="absolute mt-1 w-40 bg-white border font-medium border-gray-300 rounded-md shadow-lg z-10">
                                    {dropdownOptions2.map((option) => (
                                        <div
                                            key={option.value}
                                            onClick={() => handleSelect2(option.value)}
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
                <div className="flex gap-3 items-center">
                    <div className="flex items-center space-x-2">
                        <div className="bg-[#4623E9] h-1.5 w-5 rounded-full"></div>
                        <h1 className="text-[12px] leading-[20px] font-medium text-[#333333]">Clicks</h1>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="bg-[#FE4D4D] h-1.5 w-5 rounded-full"></div>
                        <h1 className="text-[12px] leading-[20px] font-medium text-[#333333]">Cost</h1>
                    </div>
                </div>
            </div>

            {/* Line Chart */}
            <div className="flex justify-center items-center pt-5 h-[250px] w-full">
                <div>
                    <h1 className="-rotate-90 text-[#898D9F] font-medium text-[16px] leading-[15px]">Clicks</h1>
                </div>
                <ResponsiveContainer width={800} height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickLine axisLine />
                        <YAxis yAxisId="left" orientation="left" domain={[0, 'auto']} tickLine={false} axisLine />
                        <YAxis yAxisId="right" orientation="right" domain={[0, 'auto']} tickLine={false} axisLine />
                        <Tooltip content={<CustomTooltip />} />
                        <Line dataKey="clicks" stroke="#4623E9" strokeWidth={2} yAxisId="right" />
                        <Line dataKey="cost" stroke="#FE4D4D" strokeWidth={2} yAxisId="left" />
                    </LineChart>
                </ResponsiveContainer>
                <div>
                    <h1 className="-rotate-90 text-[#898D9F] font-medium text-[16px] leading-[15px]">Cost</h1>
                </div>
            </div>
        </div>
    );
};

export default Page;
