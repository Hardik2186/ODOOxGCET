import React from 'react';

const PrivateInfoView = () => {
  return (
    <div className="bg-[#121212] border border-white/10 rounded-xl p-8 shadow-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* Personal Details */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white border-b border-white/10 pb-2">Personal Details</h3>
          <div className="grid grid-cols-1 gap-6">
            <InfoInput label="Date of Birth" type="date" />
            <InfoInput label="Residing Address" placeholder="Enter full address" />
            <InfoInput label="Nationality" placeholder="e.g. Indian" />
            <InfoInput label="Personal Email" type="email" />
            <InfoInput label="Gender" placeholder="Male/Female/Other" />
            <InfoInput label="Marital Status" placeholder="Single/Married" />
            <InfoInput label="Date of Joining" type="date" />
          </div>
        </div>

        {/* Bank Details */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white border-b border-white/10 pb-2">Bank Details</h3>
          <div className="grid grid-cols-1 gap-6">
            <InfoInput label="Account Number" placeholder="0000 0000 0000" />
            <InfoInput label="Bank Name" placeholder="e.g. HDFC Bank" />
            <InfoInput label="IFSC Code" placeholder="HDFC0001234" />
            <InfoInput label="PAN No" placeholder="ABCDE1234F" />
            <InfoInput label="UAN No" placeholder="100XXXXXXXXX" />
            <InfoInput label="Emp Code" placeholder="DC-101" />
          </div>
        </div>

      </div>
    </div>
  );
};

const InfoInput = ({ label, type = "text", placeholder }) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 group">
    <label className="text-sm font-medium text-gray-400 group-hover:text-gray-200 transition-colors">
      {label}
    </label>
    <input 
      type={type}
      placeholder={placeholder}
      className="bg-transparent border-b border-white/10 focus:border-blue-500 outline-none text-white text-sm py-1 md:w-2/3 transition-all"
    />
  </div>
);

export default PrivateInfoView;