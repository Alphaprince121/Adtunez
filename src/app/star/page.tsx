"use client";
import React, { useState } from "react";

const Page = () => {
    const [activeStars, setActiveStars] = useState(new Array(5).fill(false));
    const [surroundingStars, setSurroundingStars] = useState(new Array(5).fill(false));

    const handleClick = (index: number) => {
        const newActiveStars = activeStars.map((_, i) => i <= index);
        setActiveStars(newActiveStars);

        const newSurroundingStars = new Array(5).fill(false);
        newSurroundingStars[index] = true;
        setSurroundingStars(newSurroundingStars);

        setTimeout(() => {
            newSurroundingStars[index] = false;
            setSurroundingStars([...newSurroundingStars]);
        }, 700);
    };

    return (
        <div className="mx-auto w-[300px] mt-40 flex justify-between items-center bg-gray-400 p-10 relative cursor-pointer rounded-lg">
            {activeStars.map((isActive, index) => (
                <div key={index} className="relative w-[50px] h-[50px] flex justify-center items-center" onClick={() => handleClick(index)}>
                    {/* Main Star */}
                    <h1 className={`text-[32px] transition-all duration-500 ${isActive ? "text-yellow-400" : "text-gray-300 grayscale"} ${surroundingStars[index] ? "scale-125" : "scale-100"}`}>
                        ⭐
                    </h1>

                    {/* Surrounding Stars - 5 Stars in a Burst Effect */}
                    <h1 className={`text-[8px] absolute top-[17px] left-[17px] transition-all duration-700 ease-out transform ${surroundingStars[index] ? "opacity-100 translate-x-[-12px] translate-y-[-12px] scale-125 rotate-[20deg]" : "opacity-0 translate-x-0 translate-y-0 scale-100 rotate-0"}`}>⭐</h1>

                    <h1 className={`text-[8px] absolute top-[39px] right-[8px] transition-all duration-700 ease-out transform ${surroundingStars[index] ? "opacity-100 translate-x-[12px] translate-y-[-12px] scale-125 rotate-[-20deg]" : "opacity-0 translate-x-0 translate-y-0 scale-100 rotate-0"}`}>⭐</h1>

                    <h1 className={`text-[8px] absolute bottom-[21px] left-[9px] transition-all duration-700 ease-out transform ${surroundingStars[index] ? "opacity-100 translate-x-[-12px] translate-y-[12px] scale-125 rotate-[30deg]" : "opacity-0 translate-x-0 translate-y-0 scale-100 rotate-0"}`}>⭐</h1>

                    <h1 className={`text-[8px] absolute bottom-[8px] right-[29px] transition-all duration-700 ease-out transform ${surroundingStars[index] ? "opacity-100 translate-x-[12px] translate-y-[12px] scale-125 rotate-[-30deg]" : "opacity-0 translate-x-0 translate-y-0 scale-100 rotate-0"}`}>⭐</h1>

                    <h1 className={`text-[8px] absolute top-[20px] left-[35px] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out ${surroundingStars[index] ? "opacity-100 translate-y-[-15px] scale-125 rotate-[45deg]" : "opacity-0 scale-100 rotate-0"}`}>⭐</h1>

                </div>
            ))}
        </div>
    );
};

export default Page;
