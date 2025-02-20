'use client';

import { useState, useRef, useEffect } from 'react';

const dropdown1Options = [
    { label: 'Cost', value: 'Cost' },
    { label: 'Age Group', value: 'Age Group' },
    { label: 'Gender', value: 'Gender' },
];

const dropdown2Options = [
    { label: 'Impr', value: 'impr' },
    { label: 'Age Group', value: 'Age Group' },
    { label: 'Gender', value: 'Gender' },
];

const colorLabels = [
    { color: '#5C3FF3', label: 'Desktop' },
    { color: '#745BEB', label: 'Mobile' },
    { color: '#A89CF9', label: 'Tablet' },
    { color: '#CDC5FA', label: 'Tv' },
    { color: '#E2DDFF', label: 'Others' },
    { color: '#F3F3FF', label: 'Unknown' },
];

const Page = () => {
    const [selectedOption1, setSelectedOption1] = useState('Cost');
    const [selectedOption2, setSelectedOption2] = useState('impr');
    const [dropdown1Open, setDropdown1Open] = useState(false);
    const [dropdown2Open, setDropdown2Open] = useState(false);
    const dropdown1Ref = useRef<HTMLDivElement>(null);
    const dropdown2Ref = useRef<HTMLDivElement>(null);
    const Dropdown2Ref = useRef<HTMLDivElement>(null);
    const [isDropdownAbove, setIsDropdownAbove] = useState<boolean>(false);

    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdown1Ref.current &&
            !dropdown1Ref.current.contains(event.target as HTMLElement)
        ) {
            setDropdown1Open(false);
        }
        if (
            dropdown2Ref.current &&
            !dropdown2Ref.current.contains(event.target as HTMLElement)
        ) {
            setDropdown2Open(false);
        }
    };

    useEffect(() => {
        const checkDropdownPosition = () => {
            if (dropdown2Ref.current && Dropdown2Ref.current) {
                const selectRect = dropdown2Ref.current.getBoundingClientRect();
                const dropdownRect = Dropdown2Ref.current.getBoundingClientRect();
                const spaceBelow = window.innerHeight - selectRect.bottom;

                if (spaceBelow < dropdownRect.height) {
                    setIsDropdownAbove(true);
                } else {
                    setIsDropdownAbove(false);
                }
            }
        };

        checkDropdownPosition();
        window.addEventListener("resize", checkDropdownPosition);

        return () => {
            window.removeEventListener("resize", checkDropdownPosition);
        };
    }, [dropdown2Open]);

    return (
        <div className="min-w-[646px] w-full h-[192px] p-3 bg-white rounded-md space-y-3">
            {/* Card Header */}
            <div className="border-b pb-4">
                <h1 className="font-medium text-[16px] leading-[20px] text-gray-800">Devices</h1>
            </div>

            {/* Content Section */}
            <div className="flex gap-4">
                {/* Colored Bars */}
                <div className="space-y-3 w-full">
                    {[...Array(2)].map((_, idx) => (
                        <div key={idx} className="grid grid-cols-6 h-10 rounded-md">
                            {colorLabels.map(({ color }, index) => (
                                <div
                                    key={index}
                                    className={`h-[37px] ${index === 0 ? 'rounded-l-md' : ''} ${index === colorLabels.length - 1 ? 'rounded-r-md' : ''
                                        }`}
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
                    ))}

                    {/* Color Legend */}
                    <div className="flex gap-5 cursor-pointer">
                        {colorLabels.map(({ color, label }, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full flex items-center justify-center relative" style={{ backgroundColor: color }}>
                                    <div className="h-2 w-2 rounded-full bg-white absolute" />
                                </div>
                                <h1 className="text-[12px] font-normal text-[#333333]">{label}</h1>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dropdown Menus */}
                <div className="flex flex-col gap-3">
                    {/* Dropdown 1 */}
                    <div className="relative" ref={dropdown1Ref}>
                        <button
                            onClick={() => setDropdown1Open(!dropdown1Open)}
                            aria-expanded={dropdown1Open}
                            className="px-[12px] py-2 flex items-center justify-between rounded-md border border-gray-300 text-[#333333] focus:outline-none font-medium text-[12px] leading-[20px] cursor-pointer min-w-[120px] gap-[25px]"
                        >
                            {selectedOption1}
                            <img src="/icons/down-arrow.png" alt="Dropdown arrow" className="h-2 w-3 object-contain" />
                        </button>
                        {dropdown1Open && (
                            <div className="absolute w-32 bg-white border font-medium border-gray-300 rounded-md shadow-lg z-10">
                                {dropdown1Options.map((option) => (
                                    <div
                                        key={option.value}
                                        onClick={() => {
                                            setSelectedOption1(option.value);
                                            setDropdown1Open(false);
                                        }}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[12px] text-[#333333]"
                                    >
                                        {option.label}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Dropdown 2 */}
                    <div className="relative" ref={dropdown2Ref}>
                        <button
                            onClick={() => setDropdown2Open(!dropdown2Open)}
                            aria-expanded={dropdown2Open}
                            className="px-[12px] py-2 flex items-center justify-between rounded-md border border-gray-300 text-[#333333] focus:outline-none font-medium text-[12px] leading-[20px] cursor-pointer min-w-[120px] gap-[25px]"
                        >
                            {selectedOption2}
                            <img src="/icons/down-arrow.png" alt="Dropdown arrow" className="h-2 w-3 object-contain" />
                        </button>
                        {dropdown2Open && (
                            <div ref={Dropdown2Ref} className="absolute mt-1 w-32 bg-white border font-medium border-gray-300 rounded-md shadow-lg z-10" style={{
                                top: isDropdownAbove ? `auto` : "100%",
                                bottom: isDropdownAbove ? "110%" : "auto"
                            }}  >
                                {dropdown2Options.map((option) => (
                                    <div
                                        key={option.value}
                                        onClick={() => {
                                            setSelectedOption2(option.value);
                                            setDropdown2Open(false);
                                        }}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[12px] text-[#333333]"
                                    >
                                        {option.label}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
