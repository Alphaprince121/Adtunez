"use client";
import { ResponsiveContainer, LineChart, Line, Tooltip,ReferenceLine } from 'recharts';


type ChartData = {
    earning: number;
    averageEarning?: number;
    cumulativeEarnings?: number;
    projectedMonthlyEarnings?: number;
};

const generateChartData = (daysInMonth: number) => {
    return Array.from({ length: daysInMonth }, (_, i) => ({
        earning: (i + 1) * 100, // Example earning per day, adjust as needed
    }));
};

const getCurrentMonthData = () => {
    const today = new Date();
    const currentDay = today.getDate();
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    return { currentDay, lastDayOfMonth };
};

const calculateAverages = (monthlyTarget: number, chartData: ChartData[]) => {
    const dataWithAvg = [...chartData];
    let cumulativeEarnings = 0;

    // Calculate total earnings for the first 7 days
    const first7Days = chartData.slice(0, 7);
    const totalFirst7DaysEarnings = first7Days.reduce((acc, curr) => acc + curr.earning, 0);
    const averageFirst7DaysEarnings = totalFirst7DaysEarnings / 7;

    // Projected earnings for the month based on the 7-day average
    const projectedMonthlyEarnings = averageFirst7DaysEarnings * chartData.length;

    for (let i = 6; i < dataWithAvg.length; i++) {
        const sevenDays = dataWithAvg.slice(i - 6, i + 1);
        const average = sevenDays.reduce((acc, curr) => acc + curr.earning, 0) / sevenDays.length;

        cumulativeEarnings += dataWithAvg[i].earning;

        dataWithAvg[i] = {
            ...dataWithAvg[i],
            averageEarning: average,
            cumulativeEarnings,
            projectedMonthlyEarnings,
        };
    }

    // Required daily earnings to meet the monthly target
    const remainingDays = chartData.length - 7;
    const requiredDailySpend = remainingDays > 0
        ? (monthlyTarget - cumulativeEarnings) / remainingDays
        : 0;

    return { dataWithAvg, requiredDailySpend, cumulativeEarnings, projectedMonthlyEarnings };
};

const monthlyTarget = 10000;  // Set your monthly target here
const { currentDay, lastDayOfMonth } = getCurrentMonthData();
const chartData = generateChartData(lastDayOfMonth);
const { dataWithAvg, requiredDailySpend, cumulativeEarnings, projectedMonthlyEarnings } = calculateAverages(monthlyTarget, chartData);

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: any[] }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        const cumulativeEarnings = data.cumulativeEarnings?.toFixed(2);
        const projectedEarnings = data.projectedMonthlyEarnings?.toFixed(2);
        const percentageOfTarget = data.cumulativeEarnings
            ? ((data.cumulativeEarnings / monthlyTarget) * 100).toFixed(2)
            : null;

        return (
            <div className="bg-white p-2 rounded shadow-lg space-y-3">
                <div className="flex gap-5 border-b border-gray-500 pb-3">
                    <h4 className="text-black text-[16px] leading-[12px] font-[500]">${cumulativeEarnings}</h4>
                </div>
                {percentageOfTarget && (
                    <div className="flex gap-5">
                        <p className="text-[#898D9F] text-[16px] leading-[12px] font-[500]">
                            {percentageOfTarget}% of the target
                        </p>
                    </div>
                )}
            </div>
        );
    }
    return null;
};


const Page = () => {
    const maxEarning = Math.max(...dataWithAvg.map(data => data.earning));
    const budgetPacing = ((cumulativeEarnings / monthlyTarget) * 100).toFixed(2);


    return (
        <div className="mt-10 flex flex-col items-center ">
            <div className="flex items-center justify-center space-x-2 p-4 bg-[#FFE8E8] w-48 mx-auto cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <h3 className="text-xl font-semibold text-gray-800">${dataWithAvg[dataWithAvg.length - 1]?.cumulativeEarnings?.toFixed(2)}</h3>
                <img src="/icons/up-arrow.png" alt="Up Arrow Icon" className="h-5" />
            </div>
            <div className="bg-white  rounded-2xl shadow-2xl mt-0 max-w-lg w-full relative transition-all duration-300 ease-in-out">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <img src="/icons/arrow.png" alt="Dropdown Arrow" className="h-10 w-10" />
                </div>
                <div className="px-4 pt-4 pb-4 border-b border-gray-200">
                    <h1 className="text-2xl font-[500] text-gray-800">Monthly Budget</h1>
                </div>
                <div className="p-4">
                    <div className="px-4 pb-5 flex justify-between">
                        <div className="space-y-4">
                            <div className='space-y-1'>
                                <h1 className="font-medium text-sm leading-5 text-gray-500">Budget Pacing</h1>
                                <h1 className="font-semibold text-gray-900">{budgetPacing}%</h1>
                            </div>
                            <div>
                                <h1 className="font-medium text-sm leading-5 text-gray-500">Monthly Target Budget</h1>
                                <div className="flex items-center space-x-2 mt-1">
                                    <h1 className="text-base leading-5 font-semibold text-gray-900">${monthlyTarget}</h1>
                                    <img src="/icons/edit-icon.png" alt="Edit Icon" className="h-4 w-4 cursor-pointer hover:opacity-80 transition-opacity" />
                                </div>
                            </div>
                        </div>
                        <div className="pr-20 space-y-4">
                            <div className='space-y-1'>
                                <h1 className="font-medium text-sm leading-5 text-gray-500">Required Daily Spend</h1>
                                <h1 className="text-base font-semibold text-gray-900">${requiredDailySpend.toFixed(2)}</h1>
                            </div>
                            <div>
                                <h1 className="font-medium text-sm leading-5 text-gray-500">Budget Cycle Date</h1>
                                <div className="flex items-center space-x-2 mt-1">
                                    <h1 className="text-base leading-5 font-semibold text-gray-900">30</h1>
                                    <img src="/icons/edit-icon.png" alt="Edit Icon" className="h-4 w-4 cursor-pointer hover:opacity-80 transition-opacity" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-64 border overflow-hidden rounded-lg relative pb-14">
                        <div className='flex justify-between px-4 pt-2 border-b-2 pb-2'>
                            <h1>-</h1>
                            <img src="/icons/reload.png" alt="Reload Icon" className="h-6 cursor-pointer hover:rotate-180 transition-transform duration-300" />
                        </div>
                        <div className="flex flex-col h-full p-8 overflow-hidden">
                            <div className="flex h-full">
                                <div className="flex flex-col justify-between items-end text-sm text-black font-semibold pr-4">
                                    {['10,000', '6,000', '3,000', '0'].map((value, i) => (
                                        <span key={i}>{value}</span>
                                    ))}
                                </div>
                                <div className="flex-1 relative">
                                    <div className="absolute inset-0 pt-2 flex flex-col justify-between">
                                        {[10000, 6000, 3000, 0].map((_, i) => (
                                            <div key={i} className="border-b border-gray-300 w-full" />
                                        ))}
                                    </div>
                                    <div className="absolute inset-0 flex items-end justify-end px-3">
                                        {dataWithAvg.filter((_, index) => index === 29).map((data, i) => {
                                            const barHeight = (data.earning / maxEarning) * 100;
                                            return (
                                                <div key={i} className="w-[40px] bg-[#4623E9] rounded-t-md  " style={{ height: `${barHeight}%` }} />
                                            );
                                        })}
                                    </div>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={dataWithAvg} margin={{  right: 20}} className='z-10'>
                                            <Tooltip content={<CustomTooltip />} />
                                             <ReferenceLine y={monthlyTarget}  strokeWidth={2} stroke="#FF6347" />
                                            <Line type="monotone" dataKey="averageEarning" stroke="#04D97F" strokeWidth={3} dot={false} />
                                        </LineChart>
                                    </ResponsiveContainer>


                                    {/* Bar for projected month-end earnings */}
                                    <div className="absolute inset-0 flex items-end justify-end px-3 ">
                                        <div className="w-[40px] bg-[#4623E9] rounded-t-md " style={{ height: `${(projectedMonthlyEarnings / monthlyTarget) * 100}%` }} />
                                    </div>

                                    <div className='pt-4 flex gap-5 cursor-pointer'>
                                        {[
                                            { color: "#FF6666", label: "Target Budget" },
                                            { color: "#FFBF1C", label: "Spend till today" },
                                            { color: "#4623E9", label: "Projected Spend" },
                                        ].map(({ color, label }, i) => (
                                            <div className="flex items-center gap-1" key={i}>
                                                <div
                                                    className="h-3 w-3 rounded-full p-2 relative flex items-center justify-center "
                                                    style={{ backgroundColor: color }}
                                                >
                                                    {/* White circle in the center */}
                                                    <div className="h-2 w-2 rounded-full bg-white absolute" />
                                                </div>
                                                <h1 className="text-[12px] font-semibold text-gray-800">{label}</h1>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex mt-6 gap-2">
                        {[
                            { icon: "/icons/projection.png", label: "Spend Projection" },
                            { icon: "/icons/optimize.png", label: "Optimize budget" },
                            { icon: "/icons/blue-edit.png", label: "Edit Alert" },
                        ].map(({ icon, label }, i) => (
                            <button
                                key={i}
                                className={`bg-[#F3F3FF] flex items-center p-2 rounded-md shadow-sm w-full justify-center ${label === "Edit Alert" ? "text-[#4623E9]" : "text-gray-800"}`}
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

export default Page;
