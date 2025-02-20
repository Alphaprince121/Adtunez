"use client";
import { ResponsiveContainer, LineChart, Line, Tooltip } from 'recharts';
import { styleText } from 'util';

const chartData = [
    { name: 'Day 1', earning: 4000 },
    { name: 'Day 2', earning: 5000 },
    { name: 'Day 3', earning: 8000 },
    { name: 'Day 4', earning: 6000 },
    { name: 'Day 5', earning: 7000 },
    { name: 'Day 6', earning: 6000 },
    { name: 'Day 7', earning: 7000 },
    { name: 'Day 8', earning: 6000 },
    { name: 'Day 9', earning: 11000 },
    { name: 'Day 10', earning: 6000 },
    { name: 'Day 11', earning: 7000 },
    { name: 'Day 12', earning: 5000 },
    { name: 'Day 13', earning: 5000 },
    { name: 'Day 14', earning: 6000 },
    { name: 'Day 15', earning: 8000 },
    { name: 'Day 16', earning: 7000 },
    { name: 'Day 17', earning: 6000 },
    { name: 'Day 18', earning: 5000 },
    { name: 'Day 19', earning: 4000 },
    { name: 'Day 20', earning: 7000 },
    { name: 'Day 21', earning: 8000 },
    { name: 'Day 22', earning: 7000 },
    { name: 'Day 23', earning: 8000 },
    { name: 'Day 24', earning: 7000 },
    { name: 'Day 25', earning: 7000 },
    { name: 'Day 26', earning: 6000 },
    { name: 'Day 27', earning: 4000 },
    { name: 'Day 28', earning: 5000 },
    { name: 'Day 29', earning: 3000 },
    { name: 'Day 30', earning: 2000 },
];

// Calculate the 7-day average for each day, starting from index 6
const calculateAverages = () => {
    let dataWithAvg = [...chartData];
    for (let i = 0; i < dataWithAvg.length; i++) {
        const sevenDays = dataWithAvg.slice(i - 6, i + 1);
        const average = sevenDays.reduce((acc, curr) => acc + curr.earning, 0) / sevenDays.length;
        // @ts-ignore
        dataWithAvg[i].averageEarning = average;
    }
    console.log(dataWithAvg);

    return dataWithAvg;
};

const updatedChartData = calculateAverages();

// Custom Tooltip Component
// @ts-ignore
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        const totalEarning = data.earning;
        const avgEarning = data.averageEarning ? data.averageEarning.toFixed(2) : null;

        return (
            <div className="bg-white p-2 rounded shadow-lg space-y-3 ">
                <div className='flex gap-5 border-b border-gray-500 pb-3'>
                    <h4 className="text-[#898D9F] text-[16px] leading-[12px] font-[500]"> {data.name} Total</h4>
                    <h4 className="text-black text-[16px] leading-[12px] font-[500]"> ${totalEarning}</h4>
                </div>
                {avgEarning && (
                    <div className='flex gap-5'>
                        <p className="text-[#898D9F] text-[16px] leading-[12px] font-[500]">7 Day Avg</p>
                        <p className="text-black text-[16px] leading-[12px] font-[500]">${avgEarning}</p>
                    </div>
                )}
            </div>
        );
    }
    return null;
};

const Page = () => {
    // Calculate the minimum earning value from chartData
    const minEarning = Math.min(...updatedChartData.map(data => data.earning));

    return (
        <div className="mt-3 flex flex-col items-center group ">
            {/* Header Section */}
            <div className="flex items-center justify-center space-x-2 p-4 bg-[#FFE8E8] w-48 mx-auto cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <h3 className="text-xl. font-semibold text-gray-800">$1,543.99</h3>
                <img src="/icons/up-arrow.png" alt="Up Arrow Icon" className="h-5" />
            </div>

            {/* Dropdown Section */}
            <div className="bg-white group-hover:block hidden rounded-2xl shadow-2xl mt-0 min-w-lg w-full relative transition-all duration-300 ease-in-out">
                {/* Centered Arrow */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <img src="/icons/arrow.png" alt="Dropdown Arrow" className="h-10 w-10" />
                </div>

                {/* Cost Section */}
                <div className="flex justify-between px-4 pt-4 items-center pb-4 border-b border-gray-200">
                    <h1 className="text-[18px] font-medium leading-[21px]  text-[#333333]">Avg CPC</h1>
                    <div className="flex items-center space-x-1">
                        <div className="relative flex items-center bg-[#01A25E] bg-opacity-10 p-1 rounded-full cursor-pointer">
                            <div className="h-2 w-2 bg-[#01A25E] opacity-90 rounded-full" />
                        </div>

                        <span className="leading-[18px] text-[#01A25E] text-[16px] font-medium ">Monitoring</span>
                    </div>
                </div>
                <div className="p-4">
                    <div className="pb-6">
                        <div className="mb-4">
                            <h1 className="text-[16px] font-semibold leading-[18px] text-gray-800 mb-1">Last 30 Days</h1>
                            <h3 className="text-[#898D9F] text-[14px] font-medium leading-[18px] mb-1">
                                Actual Avg CPC: <span className="text-gray-900 font-semibold">$1.61</span>
                            </h3>
                        </div>

                        <div className="flex justify-between items-cente">
                            <div>
                                <h1 className="text-[16px] font-semibold leading-[18px] text-gray-800 mb-1">Last 4 weeks</h1>
                                <h3 className="text-[#898D9F] text-[14px] font-medium leading-[18px] mb-1">
                                    Target Avg CPC: <span className=" text-gray-800 font-semibold ">Automatic</span>
                                </h3>
                                <h3 className="text-[#898D9F] text-[14px] font-medium leading-[18px] mb-1">
                                    Actual Avg CPC: <span className="text-gray-800 font-semibold">$1.61</span>
                                </h3>
                            </div>

                            <div className="relative flex items-center justify-center">
                                <button className="px-3 py-1 bg-[#01A25E] bg-opacity-10 leading-[18px] text-[#01A25E] text-[16px] font-medium  rounded-md">
                                    On Target
                                </button>
                            </div>
                        </div>
                    </div>


                    <div className="w-full h-64 p-8 border-2 rounded-lg relative">
                        <div className="flex flex-col h-full">
                            <div className="flex justify-between h-full">
                                <div className="flex flex-col justify-between items-end text-sm text-black font-semibold pr-4">
                                    {["10,000", "6,000", "3,000", "0"].map((value, i) => (
                                        <span key={i}>{value}</span>
                                    ))}
                                </div>

                                <div className="flex-1 relative font-[Inter]">
                                    <div className="absolute inset-0 pt-2 flex flex-col justify-between">
                                        {[10000, 6000, 3000, 0].map((_, i) => (
                                            <div key={i} className="border-b border-gray-300 w-full" />
                                        ))}
                                    </div>

                                    <div className="absolute inset-0 flex items-end justify-around px-3">
                                        {updatedChartData.map((data, i) => {
                                            const barHeight = (data.earning / minEarning) * 100;
                                            return (
                                                <div
                                                    key={i}
                                                    className="w-[9px]  bg-[#e8e8fb]"
                                                    style={{ height: `${barHeight}%` }}
                                                />
                                            );
                                        })}
                                    </div>

                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={updatedChartData} margin={{ top: 20, right: 20, left: 20, bottom: 0 }}>
                                            {/* @ts-ignore */}
                                            <Tooltip content={<CustomTooltip />} />
                                            <Line type="monotone" dataKey="averageEarning" stroke="#FE4D4D" strokeWidth={3} dot={false} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Button Section */}
                    <div className="flex mt-6 gap-2">
                        {[
                            { icon: "/icons/snooze.png", label: "Snooze" },
                            { icon: "/icons/investigate.png", label: "Investigate" },
                            { icon: "/icons/blue-edit.png", label: "Edit Alert" },
                        ].map(({ icon, label }, i) => (
                            <button
                                key={i}
                                className={`bg-[#F3F3FF] flex items-center p-3 rounded-md shadow-sm w-full justify-center ${label === "Edit Alert" ? "text-[#4623E9]" : "text-gray-800"
                                    }`}
                            >
                                <img src={icon} alt="Icon" className="h-4 w-4" />
                                <span className="font-medium text-sm ml-2">{label}</span>
                            </button>
                        ))}
                    </div>


                </div>
            </div>
        </div>
    );
};

export default Page
