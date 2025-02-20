"use client";

import { useState } from "react";
import Edit from "../All-in-one/edit";

const Page = () => {
    const [showEdit, setShowEdit] = useState(false);

    return (
        <div className="flex justify-center items-center mx-auto mt-20">
            <div className="flex gap-6 bg-white rounded-md border-2 border-gray-200 py-2 px-7 relative">
                {/* Resize Icon */}
                <div>
                    <img src="/icons/size.png" alt="resize-icon" className="w-5 h-5 object-contain" />
                </div>

                {/* Edit Icon with Click Event */}
                <div className="relative">
                    <div onClick={() => setShowEdit(!showEdit)} className="cursor-pointer">
                        <img src="/icons/edit.png" alt="edit-icon" className="w-5 h-5 object-contain" />
                    </div>

                    {/* Show Edit Component When Clicked */}
                    {showEdit && (
                        <div className="absolute z-10 -left-20">
                            <Edit
                                title="Edit Options"
                                onClose={() => setShowEdit(false)}
                            >
                                {[
                                    { icon: "/icons/edit.png", label: "Manage accounts in bulk" },
                                    { icon: "/icons/increase.png", label: "Increase font size" }
                                ].map((option, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center space-x-2  text-gray-700 hover:bg-gray-100 mt-1 p-1 rounded-md cursor-pointer transition duration-200"
                                    >
                                        <img src={option.icon} alt={`${option.label}-icon`} className="h-4 w-4 object-contain" />
                                        <span className="text-[12px] leading-[21px] font-normal">{option.label}</span>
                                    </div>
                                ))}
                            </Edit>
                        </div>
                    )}

                </div>

                {/* Download Icon */}
                <div>
                    <img src="/icons/gray-download.png" alt="download-icon" className="w-5 h-5 object-contain" />
                </div>

                {/* Group Icon */}
                <div>
                    <img src="/icons/group.png" alt="group-icon" className="w-5 h-5 object-contain" />
                </div>
            </div>
        </div>
    );
};

export default Page;
