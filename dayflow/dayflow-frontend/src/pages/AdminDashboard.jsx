import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import EmployeeList from './EmployeeList';

// Profile Sub-components
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileTabs from '../components/profile/ProfileTabs';
import ResumeView from '../components/profile/ResumeView';
import PrivateInfoView from '../components/profile/PrivateInfoView';
import SalaryInfoView from '../components/profile/SalaryInfoView';

const AdminDashboard = () => {
  // Navigation State
  const [currentView, setCurrentView] = useState('profile'); // 'employees' or 'profile'
  const [activeTab, setActiveTab] = useState('Resume');

  // Global Sync State
  const [profileImage, setProfileImage] = useState(null);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);

  // Resume Data State
  const [resumeData, setResumeData] = useState({
    about: "Senior Developer with 5+ years of experience in MERN stack.",
    jobLove: "I love solving complex architectural problems and mentoring juniors.",
    interests: "Open source contributing, hiking, and digital art."
  });

  const [skills, setSkills] = useState(['React', 'Node.js', 'Tailwind CSS']);
  const [certs, setCerts] = useState([
    { name: 'Full Stack Open', organization: 'University of Helsinki', date: 'Issued 2024' }
  ]);

  const toggleAttendance = () => {
    if (!isCheckedIn) {
      setCheckInTime(new Date());
    } else {
      setCheckInTime(null);
    }
    setIsCheckedIn(!isCheckedIn);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 font-sans selection:bg-blue-500/30 pb-20">
      
      {/* NAVBAR WITH ALL LINKS */}
      <Navbar 
        profileImage={profileImage} 
        isCheckedIn={isCheckedIn} 
        onToggleAttendance={toggleAttendance}
        onViewChange={setCurrentView}
        currentView={currentView}
        checkInTime={checkInTime}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* VIEW 1: EMPLOYEE DIRECTORY */}
        {currentView === 'employees' && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <EmployeeList />
          </div>
        )}

        {/* VIEW 2: INDIVIDUAL PROFILE */}
        {currentView === 'profile' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <section className="bg-[#121212] border border-white/10 rounded-xl p-6 md:p-8 shadow-2xl">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-medium text-white tracking-tight">My Profile</h2>
                <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full border border-white/5">
                  <div className={`w-2.5 h-2.5 rounded-full ${isCheckedIn ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-red-500'}`} />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    {isCheckedIn ? 'Present' : 'Offline'}
                  </span>
                </div>
              </div>
              <ProfileHeader image={profileImage} setImage={setProfileImage} />
            </section>

            <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="transition-all duration-300">
              {activeTab === 'Resume' && (
                <ResumeView 
                  data={resumeData} setData={setResumeData} 
                  skills={skills} setSkills={setSkills} 
                  certs={certs} setCerts={setCerts} 
                />
              )}
              {activeTab === 'Private Info' && <PrivateInfoView />}
              {activeTab === 'Salary Info' && <SalaryInfoView />}
              {activeTab === 'Security' && (
                <div className="bg-[#121212] border border-white/10 rounded-xl p-20 text-center border-dashed">
                   <p className="text-gray-500 italic">Security settings are managed by Admin.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;