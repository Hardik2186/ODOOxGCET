import { Award, Plus } from 'lucide-react';

const CertificationCard = () => {
  return (
    <div className="bg-[#121212] border border-white/10 rounded-xl p-6">
      <h3 className="text-lg font-medium text-white mb-4 border-b border-white/10 pb-2">Certifications</h3>
      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-3">
          <Award className="text-blue-500" size={18} />
          <div>
            <p className="text-sm text-gray-200 font-medium">AWS Certified Developer</p>
            <p className="text-[10px] text-gray-500 uppercase">Issued Jan 2024</p>
          </div>
        </div>
      </div>
      <button className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors group">
        <div className="p-1 border border-dashed border-gray-600 rounded group-hover:border-white">
          <Plus size={12} />
        </div>
        Add Certification
      </button>
    </div>
  );
};

export default CertificationCard;