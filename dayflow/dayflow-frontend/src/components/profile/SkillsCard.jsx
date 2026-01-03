import { Plus } from 'lucide-react';

const SkillsCard = () => {
  const skills = ['React.js', 'Tailwind CSS', 'Node.js', 'UI Design', 'Figma'];

  return (
    <div className="border border-white/10 rounded-xl p-6 bg-[#161616]">
      <h3 className="text-lg font-medium text-white mb-4 border-b border-white/10 pb-2">Skills</h3>
      <div className="flex flex-wrap gap-2 mb-6">
        {skills.map(skill => (
          <span 
            key={skill} 
            className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-full text-xs font-medium hover:bg-blue-500/20 transition-all cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
      <button className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors group">
        <div className="p-1 border border-dashed border-gray-600 rounded group-hover:border-white">
          <Plus size={12} />
        </div>
        Add Skills
      </button>
    </div>
  );
};

export default SkillsCard;