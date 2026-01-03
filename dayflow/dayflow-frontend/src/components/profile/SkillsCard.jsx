import React from 'react';
import { Plus } from 'lucide-react';

const SkillsCard = () => {
  const skills = [
    { id: 1, name: 'Energetic Woodcock', color: 'bg-blue-500/10 text-blue-400 border-blue-500/30' },
    { id: 2, name: 'Luminous Raven', color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' },
    { id: 3, name: 'Actual Rook', color: 'bg-green-500/10 text-green-400 border-green-500/30' },
  ];

  return (
    <div className="bg-[#121212] border border-white/10 rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-medium text-white mb-6 border-b border-white/10 pb-2">Skills</h3>
      <div className="flex flex-wrap gap-3 mb-8">
        {skills.map((skill) => (
          <div key={skill.id} className={`px-4 py-1.5 rounded-lg border text-xs font-semibold ${skill.color}`}>
            {skill.name}
          </div>
        ))}
      </div>
      <button className="flex items-center gap-3 text-sm text-gray-500 hover:text-white transition-colors">
        <div className="p-1 border border-dashed border-gray-600 rounded">
          <Plus size={14} />
        </div>
        <span>Add Skills</span>
      </button>
    </div>
  );
};

export default SkillsCard; // Crucial for fixing the error