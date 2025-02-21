<div className="absolute mt-1 w-56 bg-white border border-gray-300 rounded-lg shadow-lg z-10 p-4 space-y-3">
                                <h1 className="text-[#333333] font-medium text-[12px] leading-[20px]">From</h1>
                                <div className="border flex justify-between items-center p-2 rounded-md relative">
                                    <h1 className="font-medium text-[12px] leading-[20px]">{formatDate(customStartDate)}</h1>
                                    <img 
                                        src="/icons/calender.png" 
                                        alt="calendar-icon" 
                                        className="h-4 cursor-pointer" 
                                        onClick={() => setShowFromCalendar((prev) => !prev)} 
                                    />
                                    {showFromCalendar && (
                                        <div className="absolute top-10 left-0 rounded-md z-10">
                                            <Calendar onDateChange={handleFromDateChange} selectedDate={customStartDate} />
                                        </div>
                                    )}
                                </div>

                                <h1 className="text-[#333333] font-medium text-[12px] leading-[20px]">To</h1>
                                <div className="border flex justify-between items-center p-2 rounded-md relative">
                                    <h1 className="font-medium text-[12px] leading-[20px]">{formatDate(customEndDate)}</h1>
                                    <img 
                                        src="/icons/calender.png" 
                                        alt="calendar-icon" 
                                        className="h-4 cursor-pointer" 
                                        onClick={() => setShowToCalendar((prev) => !prev)} 
                                    />
                                    {showToCalendar && (
                                        <div className="absolute top-10 left-0  rounded-md z-10">
                                            <Calendar onDateChange={handleToDateChange} selectedDate={customEndDate} />
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={handleApply}
                                    className="w-full mt-3 py-2 px-4 bg-[#5C3FF3] font-semibold text-[14px ] leading-[20px] text-white rounded-md"
                                >
                                    Apply
                                </button>
                            </div>