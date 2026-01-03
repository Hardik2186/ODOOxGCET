import React from 'react';
import AboutSection from './AboutSection';
import SkillsCard from './SkillsCard';
import CertificationCard from './CertificationCard';

const ResumeView = ({ data, setData, skills, setSkills, certs, setCerts }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Left Column: Editable Professional Bio */}
      <div className="lg:col-span-8">
        <AboutSection data={data} setData={setData} />
      </div>
      
      {/* Right Column: Skills & Certifications */}
      <div className="lg:col-span-4 space-y-6">
        <SkillsCard skills={skills} setSkills={setSkills} />
        <CertificationCard certs={certs} setCerts={setCerts} />
      </div>
    </div>
  );
};

export default ResumeView;  