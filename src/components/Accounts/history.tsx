const Page = () => {
    return (
        <div className="min-w-[400px] w-full h-[277px] p-3  bg-white rounded-md space-y-5 border-gray-200">
            {/* Card Header */}
            <div className="border-b-2 pb-2">
                <h1 className="text-[16px] font-medium leading-[20px] text-[#333333]">Change History</h1>
            </div>

            {/* Summary Section */}
            <div className="flex justify-between items-center">
                {/* Left Section */}
                <div className="flex items-end space-x-4">
                    <div className="px-5 py-2 rounded-lg border-2  flex items-center justify-center">
                        <h1 className="text-[#4623E9]  text-4xl">0</h1>
                    </div>
                    <div className="flex justify-end">
                        <h1 className="text-[14px] leading-[21px] font-normal text-[#333333]">
                            Changes made in <br />
                            <span className=" font-semibold">Last 30 Days</span>
                        </h1>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center bg-[#F3F3FF] px-4 py-1 rounded-md cursor-pointer">
                    <h1 className="text-[#4623E9] font-medium  text-[12px] leading-[17px] mr-1">View Details</h1>
                    <img src="/icons/right-arrow.png" alt="Right Arrow" className="h-2 w-2" />
                </div>
            </div>

            {/* Categories Section */}
            <div>
                <h1 className="font-semibold text-[12px] leading-[16px] pt-2 text-[#333333]">Top 3 Categories of Changes:</h1>
            </div>

            <div className="space-y-3 ">
                {[
                    { category: "Ad Changes", count: 0 },
                    { category: "Audience Changes", count: 0 },
                    { category: "Auto-Applied Changes", count: 0 }
                ].map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center"
                    >
                        <h1 className="text-[#333333] text-[12px] leading-[18px]">{item.category}</h1>
                        <h1 className="text-[#333333] text-[12px] leading-[18px] font-normal">{item.count}</h1>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Page;
