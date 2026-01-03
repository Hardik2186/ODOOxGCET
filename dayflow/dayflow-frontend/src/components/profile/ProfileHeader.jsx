import { Pencil } from 'lucide-react';

const ProfileHeader = () => {
  const infoFields = [
    { label: 'Login ID', value: 'EMP_12345' },
    { label: 'Email', value: 'alex.design@company.com' },
    { label: 'Mobile', value: '+1 (555) 000-1234' },
  ];

  const companyFields = [
    { label: 'Company', value: 'TechFlow Solutions' },
    { label: 'Department', value: 'Product Design' },
    { label: 'Manager', value: 'Sarah Jenkins' },
    { label: 'Location', value: 'Remote / New York' },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
      {/* Avatar Section */}
      <div className="relative group">
        <div className="w-32 h-32 rounded-full border-2 border-white/10 bg-[#2a1b1b] flex items-center justify-center overflow-hidden transition-all group-hover:border-blue-500/50">
           <Pencil className="text-white/20 w-8 h-8 group-hover:text-blue-400 transition-colors" />
        </div>
        <button className="absolute bottom-1 right-1 bg-blue-600 p-1.5 rounded-full hover:bg-blue-500 transition-colors shadow-lg">
          <Pencil size={14} className="text-white" />
        </button>
      </div>

      {/* Info Grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4 w-full">
        <div>
          <h1 className="text-3xl font-bold text-white mb-6 border-b border-white/10 pb-2 inline-block min-w-[200px]">
            Alex Rivera
          </h1>
          <div className="space-y-4">
            {infoFields.map(field => (
              <div key={field.label}>
                <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">{field.label}</p>
                <p className="text-sm text-gray-300 border-b border-white/5 pb-1">{field.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 md:mt-16">
          {companyFields.map(field => (
            <div key={field.label}>
              <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">{field.label}</p>
              <p className="text-sm text-gray-300 border-b border-white/5 pb-1">{field.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;