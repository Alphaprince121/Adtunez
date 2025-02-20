"use client";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";

const data = [
    { name: "B", value: 25, color: "#01C874" },
    { name: "B", value: 25, color: "#01C874" },
    { name: "B", value: 25, color: "#01C874" },
    { name: "B", value: 25, color: "#01C874" },
    { name: "B", value: 25, color: "#01C874" },
    { name: "B", value: 25, color: "#01C874" },
    { name: "B", value: 25, color: "#01C874" },
    { name: "B", value: 25, color: "#01C874" },
    { name: "B", value: 25, color: "#01C874" },
    { name: "B", value: 25, color: "#01C874" },
    { name: "B", value: 25, color: "#01C874" },
    { name: "B", value: 25, color: "#01C874" },
    { name: "B", value: 25, color: "#01C874" },
    { name: "B", value: 25, color: "#01C874" },
    { name: "B", value: 25, color: "#01C874" },
    { name: "B", value: 25, color: "#01C874" },
    { name: "B", value: 25, color: "#01C874" },
    { name: "B", value: 25, color: "#01C874" },
    { name: "B", value: 25, color: "#01C874" },
    { name: "B", value: 25, color: "#01C874" },
    { name: "B", value: 25, color: "#01C874" },
    { name: "B", value: 25, color: "#01C874" },
    { name: "B", value: 25, color: "#01C874" },
    { name: "B", value: 25, color: "#01C874" },
    { name: "B", value: 25, color: "#01C874" },
    { name: "B", value: 25, color: "#01C874" },
    { name: "B", value: 25, color: "#01C874" },
    { name: "B", value: 25, color: "#E9EDF0" },
    { name: "B", value: 25, color: "#E9EDF0" },
    { name: "B", value: 25, color: "#E9EDF0" },
    { name: "B", value: 25, color: "#E9EDF0" },
    { name: "B", value: 25, color: "#E9EDF0" },
    { name: "B", value: 25, color: "#E9EDF0" },
    { name: "B", value: 25, color: "#E9EDF0" },
    { name: "B", value: 25, color: "#E9EDF0" },
    { name: "B", value: 25, color: "#E9EDF0" },
];

const Page = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="p-3 mx-auto border mt-20 rounded-xl min-w-[366px] h-[337px] shadow-lg bg-white">
            <div className="border-b-2 px-2 pb-2 mb-3 flex justify-between">
                <h1 className="font-medium text-[16px] leading-[20px] text-[#333333]">
                    PPC Audit Score
                </h1>
                <h1 className="font-semibold text-[10px] leading-[15px] text-[#4623E9] cursor-pointer underline">
                    View All Audits
                </h1>
            </div>
            <div className="bg-[#EDFFF7] px-3 py-1.5 rounded-lg mx-auto flex justify-center items-center w-[120px] ">
                <h1 className="font-normal text-xs leading-[18px]">Previous Score: A</h1>
            </div>

            {/* chart area */}
            <div className="relative flex justify-center items-center mt-[88px]">
                <div className="absolute h-[220px] w-[220px] mt-14 rounded-full  flex justify-center">
                    <h1 className="-rotate-90 absolute bottom-[90px] -left-[9px]  text-[#FF0000] text-[16px] font-medium leading-[24px] ">D</h1>
                    <h1 className="-rotate-45 absolute top-[24px] left-8 text-[#FF6636] text-[16px] font-medium leading-[24px]">C</h1>
                    <h1 className="text-[#FFA800] absolute -top-[2px] text-[16px] font-medium leading-[24px]">B</h1>
                    <h1 className="rotate-45 absolute top-[24px] right-7 text-[#01C874] text-[16px] font-medium leading-[24px]">A</h1>
                    <h1 className="rotate-90 absolute bottom-[90px] -right-4 text-[#01A25E] text-[16px] font-medium leading-[24px]">A+</h1>
                </div>
                <div className="absolute h-[145px] w-[145px]  mt-6   flex justify-center">
                    <PieChart width={200} height={200}>
                        <Pie
                            dataKey="value"
                            startAngle={180}
                            endAngle={0}
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={98}
                            outerRadius={100}
                            paddingAngle={4}
                            fill="#8884d8"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </div>

                <div className="flex absolute justify-center mt-20">
                    <PieChart width={200} height={200}>
                        <Pie
                            dataKey="value"
                            startAngle={180}
                            endAngle={0}
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={80}
                            outerRadius={100}
                            paddingAngle={4}
                            fill="#8884d8"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </div>
                <div className="absolute inset-0 mt-6 flex justify-center items-center">
                    <div className="bg-[#04D97F] bg-opacity-20 w-16 h-16 rounded-full flex justify-center items-center">
                        <h1 className="text-3xl leading-[48px] text-[#01C874] font-normal">A</h1>
                    </div>
                </div>

            </div>
            <div className=" mt-16  flex flex-col items-center justify-center gap-4">
                <div className="flex justify-center items-center gap-4">
                    <div className="bg-[#F5F5F5] px-4 py-1 rounded-md ">
                        <h1 className="font-normal text-[11px] leading-[16px] text-[#333333]">Campaign: C</h1>
                    </div>
                    <div className="bg-[#F5F5F5] px-4 py-1 rounded-md">
                        <h1 className="font-normal text-[11px] leading-[16px] text-[#333333]">Ads: A</h1>
                    </div>
                </div>

                <div className="flex justify-center items-center gap-2">
                    <div className="bg-[#F5F5F5] px-4 py-1 rounded-md">
                        <h1 className="font-normal text-[11px] leading-[16px] text-[#333333]">Campaign: C</h1>
                    </div>
                    <div className="bg-[#F5F5F5] px-4 py-1 rounded-md">
                        <h1 className="font-normal text-[11px] leading-[16px] text-[#333333]">Ads: A</h1>
                    </div>
                    <div className="bg-[#F5F5F5] px-4 py-1 rounded-md">
                        <h1 className="font-normal text-[11px] leading-[16px] text-[#333333]">Ads: A</h1>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-1 -mt-2 cursor-pointer">
                    <h1 className="text-[10px] leading-[15px] font-semibold underline text-[#4623E9]">View Report</h1>
                    <img src="/icons/right-arrow.png" alt="right-arrow" className="h-3 w-3" />
                </div>
            </div>

        </div>
    );
};

export default Page;
