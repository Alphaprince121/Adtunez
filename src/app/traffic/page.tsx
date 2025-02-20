

const page = () => {
    return (
        <div className="flex justify-center items-center mt-40">
            <select className="py-1 px-2 border-2 border-gray-300 rounded-md font-medium text-[12px] leading-[20px] ">
                <option value="" disabled selected>
                    Traffic View
                </option>
                <option>Conversions View</option>
                <option>Conv Value View</option>
                <option>Traffic View</option>
            </select>
        </div>
    )
}

export default page
