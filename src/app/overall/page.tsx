const page = () => {
    return (
        <div className="min-w-lg mx-auto mt-20 bg-white shadow-lg rounded-lg space-y-6">
            {/* Header Section */}
            <div className="flex justify-between items-center border-b p-4">
                <div className="flex items-center space-x-3">
                    <div className="bg-[#D99D04] p-3 text-[16px] leading-[21px] font-medium rounded-full shadow-lg"></div>
                    <h1 className="text-xl font-semibold text-gray-800">Overall Account Health</h1>
                </div>
                <div className="cursor-pointer">
                    <img src="/icons/reload.png" alt="Reload" className="w-7 h-7" />
                </div>
            </div>

            {/* Content Section */}
            <div className="text-center flex flex-col justify-center items-center space-y-4 pb-10 px-20">
                <img src="/icons/overall.png" alt="Overall Health" className="h-[52px] w-[52px]" />
                <h1 className="text-[20px] font-bold leading-[21px] text-[#333333]">Oops! Nothing to Show</h1>
                <p className="text-[#333333] text-opacity-80 text-[16px] leading-[18px] font-small">
                    To refresh and view updated performance data, use the 'Refresh Data' option available at the top-right corner.
                </p>
            </div>
        </div>
    );
}

export default page;
