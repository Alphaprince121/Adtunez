"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";

const data = [
    { name: "Keyword with Conversions", value: 15, color: "#04D97F" },
    { name: "Other Keywords", value: 85, color: "#D9F9E0" },
];

const RADIAN = Math.PI / 180;
// @ts-ignore
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 1;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <svg>
            <defs>
                <filter id="circle-shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="black" floodOpacity="0.3" />
                </filter>
            </defs>

            <g>
                <circle cx={x} cy={y} r="10" fill="white" filter="url(#circle-shadow)" />
                <text
                    x={x}
                    y={y}
                    fill="black"
                    textAnchor="middle"
                    fontSize="7"
                    fontWeight="bold"
                    dominantBaseline="central"
                >
                    {`${(percent * 100).toFixed(0)}%`}
                </text>
            </g>
        </svg>

    );
};

const Page = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div className="p-4 mx-auto border mt-20 rounded-md min-w-[481px] h-[248px] shadow-lg bg-white">
            {/* Header */}
            <div className="border-b-2 pb-2">
                <h1 className="font-medium leading-[20px] text-[16px] text-[#333333]">Quick Insights</h1>
            </div>


            {/* Info Text */}
            <div className=" flex justify-between items-center mt-1">

                <p className="text-[12px] text-[#333333] mt-4 leading-[18px] font-normal">
                    Only 5 of 120 <span className="font-semibold">4% active keywords </span> have received <span className="font-semibold"> conversions.</span>
                </p>
                <img
                    src="/icons/download.png"
                    alt="Download Icon"
                    className="h-[18px] w-[18px] cursor-pointer hover:opacity-80"
                />
            </div>


            {/* Chart & Legend Section */}
            <div className="flex items-center justify-between mt-2 w-full ">
                {isClient && (
                    <PieChart width={250} height={100}>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={23}
                            outerRadius={49}
                            label={renderCustomizedLabel}
                            labelLine={false}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                )}

                {/* Legend */}
                <div className=' flex flex-col gap-3 cursor-pointer'>
                    {[
                        { color: "#04D97F", label: "Keyword with Conversions" },
                        { color: "#D9F9E0", label: "Other Keywords" },
                    ].map(({ color, label }, i) => (
                        <div className="flex items-center  gap-1" key={i}>
                            <div
                                className="h-[10px] w-[10px] rounded-full p-2 relative flex items-center justify-center "
                                style={{ backgroundColor: color }}
                            >
                                {/* White circle in the center */}
                                <div className="h-[7px] w-[7px] rounded-full bg-white absolute" />
                            </div>
                            <h1 className="text-[10px] leading-[15px] font-[400] text-gray-800">{label}</h1>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-center items-center gap-4 mt-4 ">
                <img src="/icons/blue-left-arrow.png" alt="" className="h-[24px] w-[24px] " />
                <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, index) => (
                        <div
                            key={index}
                            className={`rounded-full ${index === 2 ? "bg-[#4623E9] p-1.5" : "bg-[#F3F3FF] p-1"
                                } transition duration-300 ease-in-out hover:scale-110`}
                        ></div>
                    ))}
                </div>
                <img src="/icons/blue-right-arrow.png" alt="" className="h-[24px] w-[24px]" />

            </div>

        </div>
    );
};

export default Page;
