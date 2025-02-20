"use client";

import { useState } from "react";

const Page = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const items = [
        { id: 1, name: "2nd AMEN EDC (158-325-6548)", icon: "/icons/drive.png" },
        { id: 2, name: "3rd AMEN EDC (123-456-7890)", icon: "/icons/drive.png" },
        { id: 3, name: "4th AMEN EDC (987-654-3210)", icon: "/icons/drive.png" }
    ];

    // Filtered list based on search input
    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-w-[419px] h-auto mx-auto p-4 mt-20 bg-white rounded-lg shadow-md">
            <div className="flex justify-between w-full">
                {/* Search Bar */}
                <div className="flex items-center border-2 border-gray-300 rounded-lg px-3 py-2 w-full">
                    <img src="/icons/search.png" alt="Search" className="w-4 h-4 mr-2" />
                    <input
                        type="search"
                        placeholder="Search by account"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="outline-none bg-transparent w-full text-gray-700 placeholder-gray-500"
                    />
                </div>

                {/* Icon Button */}
                <div className="ml-3 flex items-center justify-center p-2 px-3 border-2 rounded-md">
                    <img src="/icons/amen.png" alt="Icon" className="w-[31px] h-[31px] object-contain" />
                </div>
            </div>

            {/* Filtered List */}
            <div className="space-y-3 mt-6">
                {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                        <div key={item.id} className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <img src={item.icon} alt="" className="h-[14px]" />
                                <h1 className="font-medium text-[16px] leading-[20px] text-[#898D9F]">
                                    {item.name}
                                </h1>
                            </div>
                            <div>
                                <img src="/icons/star.png" alt="" className="h-[17px]" />
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 mt-3">No results found</p>
                )}
            </div>
        </div>
    );
};

export default Page;
