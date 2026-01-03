import React, { useState, useRef } from 'react';
import { Pencil, Camera } from 'lucide-react';

const ProfileHeader = () => {
  // 1. State to hold the image URL
  const [image, setImage] = useState(null);
  // 2. Reference to the hidden file input
  const fileInputRef = useRef(null);

  // Handle the file selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set the preview URL
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger the hidden file input when clicking the edit button
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col md:flex-row gap-12 items-start">
      {/* Avatar Section */}
      <div className="relative group mx-auto md:mx-0">
        <div 
          className="w-40 h-40 rounded-full bg-[#2a1b1b] border-2 border-white/10 flex items-center justify-center overflow-hidden transition-all group-hover:border-blue-500/50 cursor-pointer"
          onClick={triggerFileInput}
        >
          {image ? (
            <img src={image} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <Camera size={32} className="text-white/10 group-hover:text-blue-400 transition-colors" />
          )}
        </div>

        {/* Hidden File Input */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleImageChange} 
          accept="image/*" 
          className="hidden" 
        />

        {/* Edit Button */}
        <button 
          onClick={triggerFileInput}
          className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-500 p-2 rounded-full shadow-lg transition-transform active:scale-95 z-10"
        >
          <Pencil size={16} className="text-white" />
        </button>
      </div>

      {/* Info Grid */}
      <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-white tracking-tight border-b-2 border-white/10 pb-2 mb-8">
            Alex Rivera
          </h1>
          <div className="space-y-4">
            <Field label="Login ID" value="EMP_12345" />
            <Field label="Email" value="alex.design@company.com" />
            <Field label="Mobile" value="+1 (555) 000-1234" />
          </div>
        </div>

        <div className="space-y-4 md:mt-20">
          <Field label="Company" value="TechFlow Solutions" />
          <Field label="Department" value="Product Design" />
          <Field label="Manager" value="Sarah Jenkins" />
          <Field label="Location" value="Remote / New York" />
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, value }) => (
  <div className="group">
    <label className="text-[10px] uppercase tracking-[0.15em] text-gray-500 font-bold block mb-1">
      {label}
    </label>
    <div className="text-gray-300 border-b border-white/5 pb-1 group-hover:border-white/20 transition-colors">
      {value}
    </div>
  </div>
);

export default ProfileHeader;