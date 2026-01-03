import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import ProfileHeader from '..//profile/ProfileHeader';
import ProfileTabs from './profile/ProfileTabs';
import AboutSection from './profile/AboutSection';
import SkillsCard from './profile/SkillsCard';
import CertificationCard from './profile/CertificationCard';
import AttendanceStatus from './ui/AttendanceStatus';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('Private Info');

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 font-sans">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Profile Container */}
        <div className="space-y-6">
          
          {/* Header & Meta Section */}
          <section className="bg-[#121212] border border-white/10 rounded-xl overflow-hidden shadow-sm">
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-medium text-white tracking-tight">My Profile</h2>
                <AttendanceStatus />
              </div>
              <ProfileHeader />
            </div>
          </section>

          {/* Navigation Tabs */}
          <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Bio / About */}
            <div className="lg:col-span-8 space-y-6">
              <AboutSection />
            </div>

            {/* Right Column: Skills & Certs */}
            <div className="lg:col-span-4 space-y-6">
              <SkillsCard />
              <CertificationCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;