import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import EmployeeList from './EmployeeList';
import AttendanceView from '../components/profile/AttendanceView';
import TimeOffView from '../components/profile/TimeOffView';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileTabs from '../components/profile/ProfileTabs';
import ResumeView from '../components/profile/ResumeView';
import PrivateInfoView from '../components/profile/PrivateInfoView';
import SalaryInfoView from '../components/profile/SalaryInfoView';

const AdminDashboard = () => {
  const [currentView, setCurrentView] = useState('profile');
  const [activeTab, setActiveTab] = useState('Resume');
  
  // State for Resume (Fixes the 'about' undefined error)
  const [resumeData, setResumeData] = useState({
    about: "Senior Developer with 5+ years experience.",
    jobLove: "Solving complex architectural challenges.",
    interests: "Open source and hiking."
  });

  const [skills, setSkills] = useState(['React', 'Node.js', 'MongoDB', 'AWS']);
  const [certs, setCerts] = useState(['AWS Solutions Architect', 'Certified Kubernetes Administrator']);

  const [profileImage, setProfileImage] = useState(null);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);

  const toggleAttendance = () => {
    setIsCheckedIn(!isCheckedIn);
    setCheckInTime(!isCheckedIn ? new Date() : null);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-300 pb-20">
      <Navbar 
        profileImage={profileImage} 
        isCheckedIn={isCheckedIn} 
        onToggleAttendance={toggleAttendance}
        onViewChange={setCurrentView}
        currentView={currentView}
        checkInTime={checkInTime}
      />
      
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {currentView === 'attendance' && <AttendanceView />}
        {currentView === 'timeoff' && <TimeOffView />}
        {currentView === 'employees' && <EmployeeList />}

        {currentView === 'profile' && (
          <div className="space-y-6">
            <section className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-white/10 rounded-xl p-8 shadow-sm">
              <ProfileHeader image={profileImage} setImage={setProfileImage} />
            </section>

            <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="transition-all duration-300">
              {/* Correctly passing 'data' prop here */}
              {activeTab === 'Resume' && <ResumeView data={resumeData} setData={setResumeData} skills={skills} setSkills={setSkills} certs={certs} setCerts={setCerts} />}
              {activeTab === 'Private Info' && <PrivateInfoView />}
              {activeTab === 'Salary Info' && <SalaryInfoView />}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;