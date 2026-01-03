import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

const SkillsCard = ({ skills, setSkills }) => {
  const [inputValue, setInputValue] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleAddSkill = () => {
    if (inputValue.trim() && !skills.includes(inputValue.trim())) {
      setSkills([...skills, inputValue.trim()]);
      setInputValue('');
      setShowInput(false);
    }
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-[#121212] border border-white/10 rounded-xl p-6">
      <h3 className="text-lg font-medium text-white mb-6 border-b border-white/10 pb-2">Skills</h3>
      <div className="flex flex-wrap gap-2 mb-6">
        {skills.map((skill, idx) => (
          <span key={idx} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-medium group">
            {skill}
            <X size={12} className="cursor-pointer hover:text-white opacity-60 group-hover:opacity-100" onClick={() => removeSkill(idx)} />
          </span>
        ))}
      </div>

      {showInput ? (
        <div className="flex gap-2">
          <input 
            autoFocus
            className="bg-black/40 border border-white/10 rounded px-3 py-1 text-xs outline-none focus:border-blue-500 transition-colors"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
          />
          <button onClick={handleAddSkill} className="text-blue-500 text-xs font-bold uppercase">Add</button>
        </div>
      ) : (
        <button onClick={() => setShowInput(true)} className="flex items-center gap-2 text-xs text-gray-500 hover:text-white transition-colors group">
          <div className="p-1 border border-dashed border-gray-600 rounded group-hover:border-white"><Plus size={12}/></div>
          Add Skills
        </button>
      )}
    </div>
  );
};

export default SkillsCard;