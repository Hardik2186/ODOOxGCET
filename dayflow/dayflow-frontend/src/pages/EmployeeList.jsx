import React, { useState } from 'react';
import { Search, Plane, Clock, DollarSign, UserPlus, X } from 'lucide-react';
import { adminAPI } from '../lib/api';
// Import the modal you created
import AddEmployeeModal from '../components/profile/AddEmployeeModal';

const EmployeeList = () => {
  // 1. State Management
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  
  // Initial Mock Data
  const [employees, setEmployees] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [employeesError, setEmployeesError] = useState(null);

  // Fetch employees from backend when component mounts
  React.useEffect(() => {
    fetchEmployees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchEmployees = async () => {
    setLoadingEmployees(true);
    setEmployeesError(null);
    try {
      const res = await adminAPI.getEmployees();
      const data = res.data || [];
      // Map backend Employee documents to the UI shape
      const mapped = data.map(e => ({
        id: e._id,
        name: e.personalDetails?.name || e.user?.email || 'Employee',
        role: e.user?.role || e.jobDetails?.designation || 'employee',
        salary: e.jobDetails?.salary ? String(e.jobDetails.salary) : '0',
        checkIn: '-',
        status: 'present'
      }));
      setEmployees(mapped);
    } catch (err) {
      console.error('Error fetching employees', err);
      setEmployeesError(err.message || 'Failed to fetch employees');
    } finally {
      setLoadingEmployees(false);
    }
  };

  // 2. Logic: Filter employees based on search input
  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 3. Logic: Add new employee to the state
  const handleAddEmployee = (newEmpData) => {
    const newEntry = {
      ...newEmpData,
      id: newEmpData.id || Date.now(), // Use server id when available
      status: newEmpData.status || 'present', // Default status for new hires
      checkIn: newEmpData.checkIn || '-'      // Default check-in
    };
    setEmployees(prev => [newEntry, ...prev]);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Show a loading / error state if employees not loaded */}
      {loadingEmployees && (
        <div className="py-6 text-center text-gray-500">Loading employees...</div>
      )}

      {employeesError && (
        <div className="py-6 text-center text-red-400">
          <p className="mb-3">Unable to load employees: {employeesError}</p>
          <div className="flex items-center justify-center gap-3">
            <button onClick={fetchEmployees} className="py-2 px-4 bg-purple-600 text-white rounded">Retry</button>
            <button onClick={() => alert('Start backend: cd dayflow-backend && npm install && npm run dev')} className="py-2 px-4 border rounded">How to start backend</button>
          </div>
        </div>
      )}

      {!loadingEmployees && !employeesError && employees.length === 0 && (
        <div className="py-6 text-center text-gray-500">No employees yet. Create one using the New button.</div>
      )}
      
      {/* --- Action Bar (Search & New Button) --- */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#121212] p-4 rounded-xl border border-white/5 shadow-lg">
        <button 
          onClick={() => setShowModal(true)}
          className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white px-8 py-2.5 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 uppercase tracking-widest shadow-lg shadow-purple-900/20"
        >
          <UserPlus size={18} />
          New
        </button>
        
        <div className="relative w-full max-w-xl group">
          <input 
            type="text" 
            placeholder="Search by name, role, or ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-lg py-2.5 px-10 outline-none focus:border-blue-500/50 text-sm text-white transition-all group-hover:border-white/20" 
          />
          <Search className="absolute left-3 top-3 text-gray-600 group-focus-within:text-blue-500" size={18} />
          {searchTerm && (
            <X 
              className="absolute right-3 top-3 text-gray-500 cursor-pointer hover:text-white" 
              size={18} 
              onClick={() => setSearchTerm('')} 
            />
          )}
        </div>
      </div>

      {/* --- Employee Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((emp) => (
            <div key={emp.id} className="bg-[#121212] border border-white/10 rounded-2xl p-5 hover:border-blue-500/30 hover:bg-[#161616] transition-all group relative overflow-hidden shadow-sm">
              
              {/* Top-Right Status Icon */}
              <div className="absolute top-4 right-4">
                <StatusIcon status={emp.status} />
              </div>
              
              {/* Profile Header */}
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-blue-400 font-bold text-xl">
                  {emp.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg group-hover:text-blue-400 transition-colors">{emp.name}</h3>
                  <p className="text-gray-500 text-xs font-medium uppercase tracking-tighter">{emp.role}</p>
                </div>
              </div>

              {/* Data Grid (Salary & Check-In) */}
              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                <div className="space-y-1">
                  <p className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-gray-600 tracking-wider">
                    <DollarSign size={10} /> Salary
                  </p>
                  <p className="text-sm font-bold text-gray-200">₹{emp.salary}</p>
                </div>
                <div className="space-y-1">
                  <p className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-gray-600 tracking-wider">
                    <Clock size={10} /> Check-In
                  </p>
                  <p className={`text-sm font-bold ${emp.checkIn === '-' ? 'text-gray-700' : 'text-green-500'}`}>
                    {emp.checkIn}
                  </p>
                </div>
              </div>
              
              {/* View Profile Hover Button */}
              <div className="mt-4 pt-4 opacity-0 group-hover:opacity-100 transition-opacity border-t border-white/5">
                <button className="w-full py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] uppercase font-bold tracking-widest text-gray-400 hover:text-white transition-all">
                  View Full Profile
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-[#121212] rounded-2xl border border-dashed border-white/10">
            <p className="text-gray-500 italic">No employees found matching "{searchTerm}"</p>
          </div>
        )}
      </div>

      {/* --- Add New Employee Modal Logic --- */}
      {showModal && (
        <AddEmployeeModal 
          onClose={() => setShowModal(false)} 
          onAdd={handleAddEmployee} 
        />
      )}
    </div>
  );
};

// Helper Component for Status Icons
const StatusIcon = ({ status }) => {
  if (status === 'present') return <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" title="Present" />;
  if (status === 'leave') return <Plane size={14} className="text-blue-400 rotate-45" title="On Leave" />;
  return <div className="w-3 h-3 rounded-full bg-orange-600 shadow-[0_0_10px_#ea580c]" title="Absent" />;
};

export default EmployeeList;