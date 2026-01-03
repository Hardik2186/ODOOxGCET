import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileTabs from '../components/profile/ProfileTabs';
import AboutSection from '../components/profile/AboutSection';
import SkillsCard from '../components/profile/SkillsCard';
import CertificationCard from '../components/profile/CertificationCard';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('Resume');
  const [profileImage, setProfileImage] = useState(null);
  
  // State for editable Resume content
  const [resumeData, setResumeData] = useState({
    about: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    jobLove: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    interests: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  });

  // State for Lists
  const [skills, setSkills] = useState(['Energetic Woodcock', 'Luminous Raven', 'Actual Rook']);
  const [certs, setCerts] = useState([{ name: 'AWS Certified Developer', date: 'ISSUED JAN 2024' }]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 font-sans selection:bg-blue-500/30">
      <Navbar profileImage={profileImage} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Identity Section */}
        <section className="bg-[#121212] border border-white/10 rounded-xl p-6 md:p-8 shadow-2xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-medium text-white tracking-tight">My Profile</h2>
            <div className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-full border border-white/5">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Online</span>
            </div>
          </div>
          <ProfileHeader image={profileImage} setImage={setProfileImage} />
        </section>

        {/* Navigation Tabs */}
        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content Render Logic */}
        {activeTab === 'Resume' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Left Column: Editable Text */}
            <div className="lg:col-span-8">
              <AboutSection data={resumeData} setData={setResumeData} />
            </div>
            
            {/* Right Column: Dynamic Lists */}
            <div className="lg:col-span-4 space-y-6">
              <SkillsCard skills={skills} setSkills={setSkills} />
              <CertificationCard certs={certs} setCerts={setCerts} />
            </div>
          </div>
        ) : (
          <div className="bg-[#121212] border border-white/10 rounded-xl p-20 text-center">
            <p className="text-gray-500 italic">Content for {activeTab} is currently being prepared.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;