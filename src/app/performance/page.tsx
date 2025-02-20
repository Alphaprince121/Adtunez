const page = () => {
    return (
        <div className="min-w-[347px] h-[277px] mx-auto p-5 bg-white rounded-lg shadow-lg space-y-3 mt-20">
            {/* Card Header */}
            <div className="border-b-2 pb-2">
                <h1 className="text-[18px] leading-[20px] font-medium text-[#333333]">Account Performance Reports</h1>
            </div>

            {/* Report List */}
            <div className="space-y-4">
                {[
                    'Executive Annual Report 2025',
                    'Detailed Annual Report',
                    'Executive Summary',
                    'Detailed Monthly Performance Metrics',
                    'Detailed Weekly Performance Data'
                ].map((report, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center "
                    >
                        <h1 className="text-[14px] leading-[21px] font-[400] text-[#898D9F]">{report}</h1>
                        <img src="/icons/report.svg" alt="Report Icon" className="w-4 h-4" />
                    </div>
                ))}
            </div>
            <div className="flex text-[#4623E9] items-center gap-1 ">
                <h1 className="font-semibold text-[14px] leading-[12px] underline">View Report</h1>
                <img src="/icons/right-arrow.png" alt="" className="h-3 w-4 object-contain" />
                </div>
        </div>
    )
}

export default page;
