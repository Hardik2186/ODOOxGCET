import React from 'react';

const AboutSection = ({ data, setData }) => {
  const updateField = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-[#121212] border border-white/10 rounded-xl p-6 md:p-8 space-y-10 shadow-sm">
      <SectionItem 
        label="About" 
        value={data.about} 
        onUpdate={(val) => updateField('about', val)} 
      />
      <SectionItem 
        label="What I love about my job" 
        value={data.jobLove} 
        onUpdate={(val) => updateField('jobLove', val)} 
      />
      <SectionItem 
        label="My interests and hobbies" 
        value={data.interests} 
        onUpdate={(val) => updateField('interests', val)} 
      />
    </div>
  );
};

const SectionItem = ({ label, value, onUpdate }) => (
  <div className="group space-y-3">
    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
      {label}
      <span className="text-[10px] text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-tighter">(Click to edit)</span>
    </h3>
    <textarea
      value={value}
      onChange={(e) => onUpdate(e.target.value)}
      className="w-full bg-transparent text-gray-400 text-sm leading-relaxed resize-none border border-transparent hover:border-white/5 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 rounded-lg p-2 transition-all outline-none"
      rows={4}
    />
  </div>
);

export default AboutSection;