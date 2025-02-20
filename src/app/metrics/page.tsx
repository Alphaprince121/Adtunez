'use client'
import { useState, useRef } from "react";

const metricsData = [
    {
        title: "Impr.",
        value: "6,914",
        change: "10%",
        trend: "up" as "up",
        chartIcon: "/icons/imp-search.png",
        chartSrc: "/icons/green-chart.png",
        trendIconSrc: "/icons/imp-up.png",
        trendText: "vs Previous Period",
        chartColor: "text-[#4623E9]",
        iconColor: "text-opacity-80",
    },
    {
        title: "Clicks",
        value: "183",
        change: "10%",
        trend: "down" as "down",
        chartIcon: "/icons/cursor.png",
        chartSrc: "/icons/red-chart.png",
        trendIconSrc: "/icons/imp-down.png",
        trendText: "vs Previous Period",
        chartColor: "text-[#4623E9]",
        iconColor: "text-opacity-80",
    },
    {
        title: "Cost",
        value: "$1,319",
        change: "8%",
        trend: "down" as "down",
        chartIcon: "/icons/cost.png",
        chartSrc: "/icons/gray-chart.png",
        trendIconSrc: "/icons/imp-down.png",
        trendText: "vs Previous Period",
        chartColor: "text-[#4623E9]",
        iconColor: "text-opacity-80",
    },
    {
        title: "Avg CPC",
        value: "$7.21",
        change: "10%",
        trend: "up" as "up",
        chartIcon: "/icons/avg.png",
        chartSrc: "/icons/green-chart.png",
        trendIconSrc: "/icons/imp-up.png",
        trendText: "vs Previous Period",
        chartColor: "text-[#4623E9]",
        iconColor: "text-opacity-80",
    },
    {
        title: "CTR",
        value: "2.6",
        change: "10%",
        trend: "up" as "up",
        chartIcon: "/icons/imp-search.png",
        chartSrc: "/icons/green-chart.png",
        trendIconSrc: "/icons/imp-up.png",
        trendText: "vs Previous Period",
        chartColor: "text-[#4623E9]",
        iconColor: "text-opacity-80",
    },
    {
        title: "Conv.",
        value: "9",
        change: "10%",
        trend: "down" as "down",
        chartIcon: "/icons/conv.png",
        chartSrc: "/icons/red-chart.png",
        trendIconSrc: "/icons/imp-down.png",
        trendText: "vs Previous Period",
        chartColor: "text-[#4623E9]",
        iconColor: "text-opacity-80",
    },
]

type MetricCardProps = {
    title: string;
    value: string;
    change: string;
    trend: "up" | "down";
    chartSrc: string;
    chartIcon: string;
    trendIconSrc: string;
    trendText: string;
    chartColor: string;
    iconColor: string;
};

const MetricCard = ({
    title,
    value,
    change,
    trend,
    chartSrc,
    chartIcon,
    trendText,
    chartColor,
    iconColor,
    isLast,
}: MetricCardProps & { isLast: boolean }) => {
    return (
        <div className={`space-y-2 w-[220px] ${!isLast ? 'border-r-2 pr-[18px]' : ''} flex-shrink-0`}>
            <div className="flex items-center gap-3">
                <img src={chartIcon} alt="" className="h-[18px] w-[18px]" />
                <h1 className={`font-medium text-[14px] leading-[21px] text-[#333333] ${iconColor}`}>{title}</h1>
            </div>
            <div className="flex justify-between items-center">
                <h1 className={`font-medium text-[26px] leading-[32px] ${chartColor}`}>{value}</h1>
                <img src={chartSrc} alt="" className="h-[42px] w-[90px] " />
            </div>
            <div className="flex gap-3 items-center">
                <div className="flex gap-2 items-center">
                    <img src={trend === "up" ? "/icons/imp-up.png" : "/icons/imp-down.png"} alt="" className="w-[20px] h-[20px]" />
                    <h1 className="font-medium text-[12px] leading-[20px] text-[#333333]">{change}</h1>
                </div>
                <h1 className="font-medium text-[12px] leading-[20px] text-[#7F8D9C]">{trendText}</h1>
            </div>
        </div>
    );
};

const Page = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const metricsContainerRef = useRef<HTMLDivElement>(null);

    const scrollToIndex = (index: number) => {
        if (metricsContainerRef.current) {
            const itemWidth = metricsContainerRef.current.children[0].clientWidth;
            metricsContainerRef.current.scrollTo({
                left: itemWidth * index,
                behavior: "smooth",
            });
        }
    };

    const handleLeftClick = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex > 0 ? prevIndex - 2 : prevIndex;
            scrollToIndex(newIndex);
            return newIndex;
        });
    };

    const handleRightClick = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex < metricsData.length - 2 ? prevIndex + 2 : prevIndex;
            scrollToIndex(newIndex);
            return newIndex;
        });
    };

    return (
        <div className="min-w-[1136px] mx-auto px-6 py-5 bg-[#FFFFFF] rounded-xl shadow-lg space-y-8 mt-20 border border-gray-200">
            {/* Card Header */}
            <div className="border-b-2 pb-3 flex justify-between items-center">
                <div>
                    <h1 className="text-[18px] font-medium leading-[22px] text-[#333333]">Performance Metrics</h1>
                </div>
                <div className="flex gap-5">
                    <img onClick={handleLeftClick} src="/icons/blue-left-arrow.png" alt="" className="h-[36px] w-[36px] cursor-pointer" />
                    <img onClick={handleRightClick} src="/icons/blue-right-arrow.png" alt="" className="h-[36px] w-[36px] cursor-pointer" />
                </div>
            </div>

            <div className="flex overflow-hidden gap-[20px] py-4" ref={metricsContainerRef}>
                {metricsData.map((metric, index) => (
                    <MetricCard
                        key={index}
                        {...metric}
                        isLast={index === metricsData.length - 1}
                    />
                ))}
            </div>
        </div>
    );
};

export default Page;
