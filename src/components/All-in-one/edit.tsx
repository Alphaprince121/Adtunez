import React from 'react';

interface EditOptionsProps {
  title: string;
  options?: { icon: string; label: string }[];
  onClose: () => void;
  children: React.ReactNode
}

const EditOptions: React.FC<EditOptionsProps> = ({ title, options, onClose, children }) => {
  return (
    <div className="border-2 rounded-md mt-2 p-3 bg-white w-64 z-20">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b-2 border-gray-200 rounded-t-lg">
        <h2 className="text-[14px] font-medium leading-[21px] text-[#333333]">{title}</h2>
        <button onClick={onClose} className="text-gray-600 hover:text-red-500 transition duration-200">
          <img src="/icons/close.png" alt="close-icon" className="h-[21px] w-[21px] object-contain" />
        </button>
      </div>

      {/* Options */}
      <div className='pt-2'>
      {children}
      </div>
    </div>
  );
};

export default EditOptions;
