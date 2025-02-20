const Page = () => {
    return (
        <div className="min-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-xl space-y-6 mt-20 border border-gray-200">
            {/* Card Header */}
            <div className="border-b pb-4">
                <h1 className="text-2xl font-medium text-[20px] leading-[20px] text-gray-800">Networks</h1>
            </div>

            {/* Content Section */}
            <div className="flex gap-4">
                {/* Colored Bars */}
                <div className="space-y-3 w-full">
                    <div
                        className="grid grid-cols-6 h-12 rounded-md">
                        <div className="bg-[#5C3FF3] h-12 rounded-l-md"></div>
                        <div className="bg-[#745BEB] h-12"></div>
                        <div className="bg-[#A89CF9] h-12"></div>
                        <div className="bg-[#CDC5FA] h-12"></div>
                        <div className="bg-[#E2DDFF] h-12"></div>
                        <div className="bg-[#F3F3FF] h-12 rounded-r-md"></div>
                    </div>

                    <div
                        className="grid grid-cols-6 h-12 rounded-md">
                        <div className="bg-[#5C3FF3] h-12 rounded-l-md"></div>
                        <div className="bg-[#745BEB] h-12"></div>
                        <div className="bg-[#A89CF9] h-12"></div>
                        <div className="bg-[#CDC5FA] h-12"></div>
                        <div className="bg-[#E2DDFF] h-12"></div>
                        <div className="bg-[#F3F3FF] h-12 rounded-r-md"></div>
                    </div>
                    <div className='pt-4 flex gap-5 cursor-pointer'>
                        {[
                            { color: "#5C3FF3", label: "Search" },
                            { color: "#CDC5FA", label: "Partners" },
                            { color: "#A89CF9", label: "Youtube" },
                            { color: "#745BEB", label: "Display" },
                            { color: "#E2DDFF", label: "Google TV" },
                            { color: "#F3F3FF", label: "Cross" },
                        ].map(({ color, label }, i) => (
                            <div className="flex items-center gap-2" key={i}>
                                <div
                                    className="h-3 w-3 rounded-full p-2 relative flex items-center justify-center "
                                    style={{ backgroundColor: color }}
                                >
                                    {/* White circle in the center */}
                                    <div className="h-2 w-2 rounded-full bg-white absolute" />
                                </div>
                                <h1 className="text-[12px] font-semibold text-gray-800">{label}</h1>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dropdowns with Icons */}
                <div className="space-y-3 w-52">
                    {[1, 2].map((item, index) => (
                        <div key={index} className="flex items-center">
                            <select
                                className="w-full h-12 px-3 border-2  border-gray-300 rounded-md text-[#333333] font-medium"
                            >
                                <option value="" disabled selected className="text-gray-400 font-medium">
                                    {index === 0 ? 'Cost' : 'Impr'}
                                </option>
                                <option value="age">Age Groups</option>
                                <option value="gender">Gender</option>
                            </select>
                        </div>
                    ))}
                </div>


            </div>
        </div>
    );
};

export default Page;
