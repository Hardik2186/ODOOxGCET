import React from 'react';

const AboutSection = ({ data, setData }) => {
  // Guard clause: Prevents "Cannot read properties of undefined"
  if (!data) return null;

  const updateField = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-white/10 rounded-xl p-8 space-y-10">
      <div className="space-y-2">
        <h3 className="text-lg font-bold dark:text-white">About</h3>
        <textarea 
          value={data.about} // Accessing data safely now
          onChange={(e) => updateField('about', e.target.value)}
          className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/5 rounded-lg p-3 outline-none focus:border-blue-500"
          rows={4}
        />
      </div>
      {/* Repeat for jobLove and interests using data.jobLove and data.interests */}
    </div>
  );
};

export default AboutSection;