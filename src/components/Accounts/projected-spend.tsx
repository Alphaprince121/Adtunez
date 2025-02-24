"use client";
import { ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';

// Chart data and calculations
type ChartData = {
    earning: number;
    averageEarning?: number;
    cumulativeEarnings?: number;
    projectedMonthlyEarnings?: number;
    day: number;
};


const generateChartData = (daysInMonth: number) => {
    return Array.from({ length: daysInMonth }, (_, i) => ({
        day: i + 1,  // Add day index (1-based)
        earning: (i + 50) * 10, // Example earning per day
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

const monthlyTarget = 14600;  // Set your monthly target here
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
        <div className="min-w-[532px] w-full justify-center flex flex-col items-center  ">
            <div className="bg-white  rounded-md  w-full   relative">
                <div className=" space-y-2">

                    <div className=' rounded-md p-3 overflow-hidden'>
                        <div className="flex justify-between  border-b-2 pb-2 ">
                            <h2 className="text-[16px] leading-[20px] font-medium text-[#333333]">Projected Spend</h2>
                        </div>
                        <div className="relative">
                            <div className="flex flex-col h-full p-3">
                                <div className="flex h-[185px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <ComposedChart data={dataWithAvg} margin={{ top: 20, right: 30, left: 0, bottom: 5 }} >
                                            <XAxis dataKey="day" tick={false} />
                                            <YAxis tick={{ fill: "#333333", fontSize: "12px", fontWeight: "700" }} />
                                            <Tooltip content={<CustomTooltip />} />
                                            <ReferenceLine y={monthlyTarget} strokeWidth={2} stroke="#FF6347" strokeDasharray="3 3" />


                                            <Bar dataKey="earning" barSize={50} fill="#4623E9" radius={[2, 2, 0, 0]}
                                                // @ts-ignore
                                                data={dataWithAvg.map((item) => ({
                                                    ...item,
                                                    earning: item.day === lastDayOfMonth ? totalEarnings : 0, //totalEarning is calculate from the dataWithAvg
                                                }))} />
                                            <Line type="monotone" top={40} dot={false} dataKey="cumulativeEarnings" stroke="#04D97F" strokeWidth={3} connectNulls={true} />

                                        </ComposedChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex justify-center gap-5 cursor-pointer">
                                    {[
                                        { color: "#FF6666", label: "Target Budget" },
                                        { color: "#FFBF1C", label: "Spend till today" },
                                        { color: "#4623E9", label: "Projected Spend" },
                                    ].map(({ color, label }, i) => (
                                        <div className="flex items-center gap-1" key={i}>
                                            <div
                                                className="h-4 w-4 rounded-full flex items-center justify-center"
                                                style={{ backgroundColor: color }}
                                            >
                                                {/* White circle in the center */}
                                                <div className="h-2 w-2 rounded-full bg-white" />
                                            </div>
                                            <h1 className="text-[10px] font-semibold text-gray-800">{label}</h1>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
