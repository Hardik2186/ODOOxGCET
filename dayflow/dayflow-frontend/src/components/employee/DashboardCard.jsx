import React from 'react';
import { ChevronRight } from 'lucide-react';

const DashboardCard = ({ 
  title, 
  icon: Icon, 
  color = 'from-blue-500 to-blue-600', 
  description, 
  onClick 
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
    >
      <div className={`h-2 bg-gradient-to-r ${color}`} />
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg bg-gradient-to-r ${color}`}>
              <Icon className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {title}
              </h3>
              <p className="text-sm text-gray-600">
                {description}
              </p>
            </div>
          </div>
          <ChevronRight 
            className="text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" 
            size={24} 
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
