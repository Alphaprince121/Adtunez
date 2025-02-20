const Page = () => {
    return (
        <div className="p-3 mx-auto border mt-20 rounded-md min-w-[155px]">
            {/* Header Section */}
            <div className="border-b px-2 pb-2 mb-3">
                <h1 className="text-[16px] leading-[20px] font-medium text-[#333333]">Alerts</h1>
            </div>

            {/* Alerts Section */}
            <div className="flex flex-col justify-center items-center text-center">
                <div className="  mb-4">
                    <div className="text-xl font-medium text-[26px] leading-[31px] text-[#4623E9] mb-2">3</div>
                    <div className="text-[14px] font-medium text-[#898D9F] leading-[20px]">Alerts</div>
                </div>

                <div className="flex px-5 py-1 items-center gap-2 bg-[#F5F5F5] rounded-md ">
                    <button className=" font-medium text-[14px] leading-[17px] text-[#4623E9] ">
                        View
                    </button>
                    <img src="/icons/right-arrow.png" alt="Right Arrow" className="h-3 w-3" />
                </div>
            </div>
        </div>
    );
};

export default Page;
