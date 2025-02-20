import React from 'react';

type Competitor = {
    name: string;
    score: number;
    increase: number;
    reportIcon: string;
    increaseIcon: string;
};

const competitors: Competitor[] = [
    {
        name: "Integrityheadandair.com",
        score: 30,
        increase: 30,
        reportIcon: "/icons/report.png",
        increaseIcon: "/icons/green-up.png"
    },
    {
        name: "BestCoolingSolutions.net",
        score: 45,
        increase: 15,
        reportIcon: "/icons/report.png",
        increaseIcon: "/icons/green-up.png"
    },
    {
        name: "AirComfortPro.org",
        score: 25,
        increase: 10,
        reportIcon: "/icons/report.png",
        increaseIcon: "/icons/green-up.png"
    },
    {
        name: "Integrityheadandair.com",
        score: 30,
        increase: 30,
        reportIcon: "/icons/report.png",
        increaseIcon: "/icons/green-up.png"
    },
    {
        name: "BestCoolingSolutions.net",
        score: 45,
        increase: 15,
        reportIcon: "/icons/report.png",
        increaseIcon: "/icons/green-up.png"
    },
    {
        name: "AirComfortPro.org",
        score: 25,
        increase: 10,
        reportIcon: "/icons/report.png",
        increaseIcon: "/icons/green-up.png"
    }
];

const CompetitorCard = ({ name, score, increase, reportIcon, increaseIcon }: Competitor) => (
    <div className="border  border-gray-300 p-2 rounded-md bg-white w-[245px] h-[64px] space-y-1">
        <div className="flex items-center justify-between ">
            <h1 className="text-[12px] font-medium leading-[18px] text-[#333333]">{name}</h1>
            <img src={reportIcon} alt="Report Icon" className="h-[14px] w-[14px]" />
        </div>
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <span className="text-[12px] font-medium leading-[18px] text-[#333333]">{score}</span>
                <div className="flex items-center gap-1 text-green-500 font-medium">
                    <img src={increaseIcon} alt="Increase Icon" className="h-3 w-2" />
                    <span className="text-[12px] leading-[20px] font-medium">{increase} more</span>
                </div>
            </div>
            <button className="bg-[#F3F3FF] px-4 py-1 rounded-md text-[#4623E9] text-[10px] leading-[17px] font-medium">
                View Metrics
            </button>
        </div>
    </div>
);

const Page = () => (
    <div className="min-w-[850px] h-[248px] mx-auto p-4 bg-white rounded-md shadow-md space-y-3 mt-16 border border-gray-200">
        {/* Card Header */}
        <div className="flex justify-between items-center border-b pb-3">
            <h1 className="text-[16px] font-mediuim text-[#333333] leading-[20px]">Top Competitors</h1>
            <select className="py-1 px-3 border border-gray-300 rounded-md text-[12px] leading-[20px] font-medium text-[#333333] text-opacity-80">
                <option value="" disabled selected>Competing Keywords</option>
                <option className='text-[12px] font-medium leading-[20px] text-[#333333]' value="age">Age Groups</option>
                <option className='text-[12px] font-medium leading-[20px] text-[#333333]' value="gender">Gender</option>
                <option className='text-[12px] font-medium leading-[20px] text-[#333333]' value="location">Location</option>
                <option className='text-[12px] font-medium leading-[20px] text-[#333333]' value="income">Income Levels</option>
                <option className='text-[12px] font-medium leading-[20px] text-[#333333]' value="education">Education Level</option>
            </select>
        </div>

        {/* Competitor Cards */}
        <div className="grid grid-cols-3 gap-4">
            {competitors.map((competitor, index) => (
                <CompetitorCard key={index} {...competitor} />
            ))}
        </div>

        {/* Footer Link */}
        <div className="flex items-center gap-1 cursor-pointer text-[#4623E9] font-semibold text-[10px] leading-[15px]">
            <span className="underline">See 228 More</span>
            <img src="/icons/right-arrow.png" alt="Arrow" className="h-[9.5px] w-[9px]" />
        </div>
    </div>
);

export default Page;
