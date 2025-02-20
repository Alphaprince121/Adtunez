"use client";
import { ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';

// Chart data and calculations
type ChartData = {
    earning: number;
    averageEarning?: number;
    cumulativeEarnings?: number;
    projectedMonthlyEarnings?: number;
    day: number; // include day in the type definition
};


const generateChartData = (daysInMonth: number) => {
    return Array.from({ length: daysInMonth }, (_, i) => ({
        day: i + 1,  // Add day index (1-based)
        earning: (i + 1) * 100, // Example earning per day
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

const monthlyTarget = 30000;  // Set your monthly target here
const { currentDay, lastDayOfMonth } = getCurrentMonthData();
const chartData = generateChartData(lastDayOfMonth);
const { dataWithAvg, requiredDailySpend, cumulativeEarnings, projectedMonthlyEarnings } = calculateAverages(monthlyTarget, chartData);
const totalEarnings = dataWithAvg.reduce((sum, item) => sum + item.earning, 0);

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: any[] }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        const cumulativeEarnings = data.cumulativeEarnings?.toFixed(2);
        const projectedEarnings = data.projectedMonthlyEarnings?.toFixed(2);
        const percentageOfTarget = data.cumulativeEarnings
            ? ((data.cumulativeEarnings / monthlyTarget) * 100).toFixed(2)
            : null;

        return (
            <div className="bg-white p-2 rounded-md shadow-lg space-y-3">
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
    const minEarning = Math.min(...dataWithAvg.map(data => data.earning));
    const budgetPacing = ((cumulativeEarnings / monthlyTarget) * 100).toFixed(2);

    return (
        <div className="mt-10 max-w-[450px] justify-center mx-auto flex flex-col items-center  ">
            <div className="bg-white border rounded-md w-[150px] mx-auto p-2 shadow-xl text-center text-black">
                <h3 className="text-[16px] font-semibold">${dataWithAvg[dataWithAvg.length - 1]?.cumulativeEarnings?.toFixed(2)}</h3>
            </div>
            <div className="bg-white border rounded-md shadow-xl w-full  mx-auto relative">
                <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2">
                    <img src="/icons/arrow.png" alt="Dropdown Arrow" className="h-12 w-12 transform rotate-180 hover:scale-110 transition-all duration-300" />
                </div>
                <div className="px-3 pt-2 pb-1">
                    <h1 className="text-[14px] font-medium leading-[21px] text-[#333333]">Monthly Budget </h1>
                </div>
                <div className="p-3 space-y-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <h2 className="text-[12px] font-medium leading-[18px] text-[#898D9F]">Budget Pacing</h2>
                                <h3 className="text-[12px] leading-[18px] font-semibold text-[#FE4D4D]">{budgetPacing}%</h3>
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-[12px] font-medium leading-[18px] text-[#898D9F]">Monthly Target Budget</h2>
                                <div className="flex items-center space-x-2 mt-2">
                                    <h3 className="text-[12px] font-semibold text-[#333333]">${monthlyTarget}</h3>
                                    <img src="/icons/edit-icon.png" alt="Edit Icon" className="h-[12px] w-[12px] cursor-pointer hover:opacity-80 transition-opacity duration-300" />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <h2 className="text-[12px] font-medium leading-[18px] text-[#898D9F]">Required Daily Spend</h2>
                                <h3 className="text-[12px] leading-[18px] font-semibold text-[#333333]">${requiredDailySpend.toFixed(2)}</h3>
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-[12px] font-medium leading-[18px] text-[#898D9F]">Budget Cycle Date</h2>
                                <div className="flex items-center space-x-2 mt-2">
                                    <h3 className="text-[12px] leading-[18px] font-semibold text-[#333333]">30</h3>
                                    <img src="/icons/edit-icon.png" alt="Edit Icon" className="h-[12px] w-[12px] cursor-pointer hover:opacity-80 transition-opacity duration-300" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='border rounded-md overflow-hidden'>
                        <div className="flex justify-between p-3 border-b border-gray-300">
                            <h2 className="text-[12px] leading-[18px] font-medium text-[#333333]">Earnings Overview</h2>
                            <img src="/icons/reload.png" alt="Reload Icon" className="h-5 cursor-pointer hover:rotate-180 transition-transform duration-300" />
                        </div>
                        <div className="relative">
                            <div className="flex flex-col h-full p-3">
                                <div className="flex h-[180px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <ComposedChart data={dataWithAvg} margin={{ top: 20, right: 30, left: 0, bottom: 5 }} >
                                            <XAxis dataKey="day" tick={false} />
                                            <YAxis tick={{ fill: "#333333", fontSize:"12px", fontWeight:"700" }} />
                                            <Tooltip content={<CustomTooltip />} />
                                            <ReferenceLine y={monthlyTarget} strokeWidth={2} stroke="#FF6347" strokeDasharray="7 7" />

                                            <Line type="monotone" dot={false} dataKey="cumulativeEarnings" stroke="#04D97F" strokeWidth={2} connectNulls={true}/>

                                            

                                            <Bar dataKey="earning" barSize={50} fill="#4623E9" radius={[2, 2, 0, 0]}
                                                // @ts-ignore
                                                data={dataWithAvg.map((item) => ({
                                                    ...item,
                                                    earning: item.day === lastDayOfMonth ? totalEarnings : 0, //totalEarning is calculate from the dataWithAvg
                                                }))} />
                                                
                                        </ComposedChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className='  flex justify-center gap-5 cursor-pointer'>
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
                                                <h1 className="text-[10px] font-semibold text-gray-800">{label}</h1>
                                            </div>
                                        ))}
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
                                <span className="font-medium text-[12px] leading-[17px] ml-2">{label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
