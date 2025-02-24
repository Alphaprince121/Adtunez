"use client";
import { ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';

type ChartData = {
    earning: number;
    averageEarning?: number;
    cumulativeEarnings?: number;
    projectedMonthlyEarnings?: number;
    day: number;
};

const generateChartData = (daysInMonth: number) => {
    return Array.from({ length: daysInMonth }, (_, i) => ({
        day: i + 1,
        earning: (i + 1) * 150, // Placeholder, actual calculation will be modified
    }));
};

const getCurrentMonthData = () => {
    const today = new Date();
    return {
        currentDay: today.getDate(),
        lastDayOfMonth: new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate(),
    };
};

const calculateAverages = (monthlyTarget: number, chartData: ChartData[]) => {
    let dataWithAvg = [...chartData];

    // Calculate first 7 days' earnings
    const first7Days = chartData.slice(0, 7);
    const totalFirst7DaysEarnings = first7Days.reduce((acc, curr) => acc + curr.earning, 0);
    const averageFirst7DaysEarnings = totalFirst7DaysEarnings / 7;

    // Project the remaining days using the average
    for (let i = 7; i < dataWithAvg.length; i++) {
        dataWithAvg[i].earning = Math.round(averageFirst7DaysEarnings);
    }

    // Compute cumulative earnings and projected earnings
    let cumulativeEarnings = 0;
    // @ts-ignore
    dataWithAvg = dataWithAvg.map((item) => {
        if (item.day <= 7) {
            cumulativeEarnings += item.earning;
            return {
                ...item,
                cumulativeEarnings: item.day === 7 ? cumulativeEarnings : null,
                averageEarning: averageFirst7DaysEarnings,
                projectedMonthlyEarnings: averageFirst7DaysEarnings * chartData.length,
            };
        } else {
            cumulativeEarnings += item.earning;
            return {
                ...item,
                cumulativeEarnings,
                averageEarning: averageFirst7DaysEarnings,
                projectedMonthlyEarnings: averageFirst7DaysEarnings * chartData.length,
            };
        }
    });

    return { dataWithAvg, cumulativeEarnings };
};

const monthlyTarget = 9000;
const { currentDay, lastDayOfMonth } = getCurrentMonthData();
const chartData = generateChartData(lastDayOfMonth);
const { dataWithAvg, cumulativeEarnings } = calculateAverages(monthlyTarget, chartData);
const totalEarnings = dataWithAvg.reduce((sum, item) => sum + item.earning, 0);

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: any[] }) => {
    if (active && payload && payload.length && payload[0].payload.day >= 7) {
        const data = payload[0].payload;
        return (
            <div className="bg-white p-2 rounded-md shadow-lg space-y-3">
                <div className="flex gap-5 border-b border-gray-500 pb-3">
                    <h4 className="text-black text-[16px] font-[500]">${data.cumulativeEarnings?.toFixed(2)}</h4>
                </div>
                {data.cumulativeEarnings && (
                    <div className="flex gap-5">
                        <p className="text-[#898D9F] text-[16px] font-[500]">
                            {((data.cumulativeEarnings / monthlyTarget) * 100).toFixed(2)}% of the target
                        </p>
                    </div>
                )}
            </div>
        );
    }
    return null;
};

const Page = () => {
    return (
        <div className="min-w-[532px] w-full flex flex-col items-center">
            <div className="bg-white rounded-md w-full relative">
                <div className="p-3">
                    <div className="border-b-2 pb-2">
                        <h2 className="text-[16px] font-medium text-[#333333]">Projected Spend</h2>
                    </div>
                    <div className="h-[185px] w-full mt-5 flex relative">
                        <div className='flex -rotate-90 ml-16 h-full absolute'>
                            <h1 className='text-[10px] font-medium leading-[15px] text-[#898D9F]'>Projected Spend</h1>
                        </div>
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={dataWithAvg} margin={{ top: 15, right: 30, left: 20, bottom: 0 }}>
                                <XAxis dataKey="day" tick={false} />
                                <YAxis tick={{ fill: "#333333", fontSize: "12px", fontWeight: "700" }} axisLine={true} />
                                <Tooltip content={<CustomTooltip />} />
                                <ReferenceLine y={monthlyTarget} strokeWidth={2} stroke="#FF6347" strokeDasharray="3 3" />
                                <Bar
                                    dataKey="earning"
                                    barSize={50}
                                    fill="#4623E9"
                                    radius={[2, 2, 0, 0]}
                                    // @ts-ignore
                                    data={dataWithAvg.map((item) => ({
                                        ...item,
                                        earning: item.day === lastDayOfMonth ? totalEarnings : 0,
                                    }))}
                                />
                                <Line type="monotone" dataKey="cumulativeEarnings" dot={false} stroke="#04D97F" strokeWidth={3} connectNulls={true} />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-5 cursor-pointer ">
                        {[
                            { color: "#FF6666", label: "Target Budget" },
                            { color: "#FFBF1C", label: "Spend till today" },
                            { color: "#4623E9", label: "Projected Spend" },
                        ].map(({ color, label }, i) => (
                            <div className="flex items-center gap-1" key={i}>
                                <div className="h-4 w-4 rounded-full flex items-center justify-center" style={{ backgroundColor: color }}>
                                    <div className="h-2 w-2 rounded-full bg-white" />
                                </div>
                                <h1 className="text-[10px] font-semibold text-gray-800">{label}</h1>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
