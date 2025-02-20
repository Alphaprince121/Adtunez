'use client'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const Page = () => {
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

    // Custom tooltip component
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white shadow-xl rounded-lg min-w-[250px] p-4">
                    <h4 className="text-lg font-semibold text-[#333333] border-b-2 pb-2 mb-3">{label}</h4>
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
    return (
        <div className="p-6 min-w-5xl mx-auto bg-white shadow-xl rounded-lg mt-20">
            <div className="flex justify-between items-center border-b-2 pb-6 mb-6">
                {/* Title and Dropdowns */}
                <div className="flex items-center space-x-4">
                    <h1 className="text-[18px] leading-[20px] font-medium text-[#333333]">Metric Comparison</h1>

                    <div className="flex items-center gap-4">
                        <select className="py-1 px-2 border-2 border-gray-300 rounded-md ">
                            <option value="" disabled selected>
                                Clicks
                            </option>
                            <option value="age">Age Groups</option>
                            <option value="gender">Gender</option>
                            <option value="location">Location</option>
                            <option value="income">Income Levels</option>
                            <option value="education">Education Level</option>
                        </select>

                        <h1 className="text-lg leading-[20px] font-medium text-[#898D9F]">By</h1>

                        <select className="py-1 px-2 border-2 border-gray-300 rounded-md">
                            <option value="" disabled selected>
                                Cost
                            </option>
                            <option value="age">Age Groups</option>
                            <option value="gender">Gender</option>
                            <option value="location">Location</option>
                            <option value="income">Income Levels</option>
                            <option value="education">Education Level</option>
                        </select>
                    </div>
                </div>

                {/* Legend for Metrics */}
                <div className="flex gap-3 items-center">
                    <div className="flex items-center space-x-2">
                        <div className="bg-[#4623E9] h-1.5 w-6 rounded-full"></div>
                        <h1 className="text-[15px] leading-[20px] font-medium text-[#333333]">Clicks</h1>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="bg-[#FE4D4D] h-1.5 w-6 rounded-full"></div>
                        <h1 className="text-[15px] leading-[20px] font-medium text-[#333333]">Cost</h1>
                    </div>
                </div>
            </div>

            {/* Line Chart */}
            <div className="flex justify-center items-center h-[400px] w-full">
                <div>
                    <h1 className='-rotate-90 text-[#898D9F] font-medium text-[16px] leading-[15px]'>Click</h1>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickLine={true} axisLine={true} />
                        {/* Left Y-axis for Cost */}
                        <YAxis
                            yAxisId="left"
                            orientation="left"
                            domain={[0, 'auto']}
                            hide={false}
                            tickLine={false}
                            axisLine={true}
                        />
                        {/* Right Y-axis for Clicks */}
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            domain={[0, 'auto']}
                            hide={false}
                            tickLine={false}
                            axisLine={true}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Line
                            dataKey="clicks"
                            stroke="#4623E9"
                            fill="rgba(70, 35, 233, 0.2)"
                            strokeWidth={2}
                            yAxisId="right"
                        />
                        <Line
                            dataKey="cost"
                            stroke="#FE4D4D"
                            fill="rgba(254, 77, 77, 0.2)"
                            strokeWidth={2}
                            yAxisId="left"
                        />
                    </LineChart>
                </ResponsiveContainer>
                <div>
                    <h1 className='-rotate-90 text-[#898D9F] font-medium text-[16px] leading-[15px]'>Cost</h1>
                </div>
            </div>
        </div>
    );
};

export default Page;
