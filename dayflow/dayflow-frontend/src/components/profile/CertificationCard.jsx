import React, { useState } from 'react';
import { Plus, Award, Trash2, X, Calendar, ExternalLink } from 'lucide-react';

const CertificationCard = ({ certs, setCerts }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    issueDate: '',
    credentialId: '',
  });

  const handleAddCert = (e) => {
    e.preventDefault();
    if (formData.name && formData.organization) {
      setCerts([...certs, { ...formData, date: `Issued ${formData.issueDate}` }]);
      setFormData({ name: '', organization: '', issueDate: '', credentialId: '' });
      setIsModalOpen(false);
    }
  };

  return (
    <div className="bg-[#121212] border border-white/10 rounded-xl p-6 shadow-xl relative">
      <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-2">
        <h3 className="text-lg font-medium text-white">Certifications</h3>
      </div>

      <div className="space-y-5 mb-6">
        {certs.map((cert, idx) => (
          <div key={idx} className="flex items-start justify-between group p-3 hover:bg-white/5 rounded-lg transition-all border border-transparent hover:border-white/5">
            <div className="flex gap-4">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Award className="text-blue-500" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-100 font-semibold">{cert.name}</p>
                <p className="text-xs text-blue-400 font-medium">{cert.organization}</p>
                <div className="flex items-center gap-3 mt-1 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1"><Calendar size={10}/> {cert.date}</span>
                  {cert.credentialId && <span>ID: {cert.credentialId}</span>}
                </div>
              </div>
            </div>
            <button 
              onClick={() => setCerts(certs.filter((_, i) => i !== idx))}
              className="opacity-0 group-hover:opacity-100 p-1 text-gray-500 hover:text-red-500 transition-all"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      <button 
        onClick={() => setIsModalOpen(true)}
        className="w-full flex items-center justify-center gap-2 py-2 border border-dashed border-gray-700 rounded-lg text-xs text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all group"
      >
        <Plus size={14} className="group-hover:rotate-90 transition-transform" />
        Add Professional Certification
      </button>

      {/* --- PROFESSIONAL MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#1a1a1a] border border-white/10 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#222]">
              <h4 className="text-lg font-bold text-white">Add Certification</h4>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddCert} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Certificate Name</label>
                <input 
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-blue-500 outline-none"
                  placeholder="e.g. Google UX Design Professional"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Issuing Organization</label>
                <input 
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-blue-500 outline-none"
                  placeholder="e.g. Coursera, Microsoft"
                  value={formData.organization}
                  onChange={e => setFormData({...formData, organization: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Issue Date</label>
                  <input 
                    type="month"
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-blue-500 outline-none"
                    value={formData.issueDate}
                    onChange={e => setFormData({...formData, issueDate: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Credential ID</label>
                  <input 
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-blue-500 outline-none"
                    placeholder="Optional"
                    value={formData.credentialId}
                    onChange={e => setFormData({...formData, credentialId: e.target.value})}
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2 rounded-lg border border-white/10 text-sm font-medium hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-blue-600 text-white text-sm font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20"
                >
                  Save Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificationCard;