import React from 'react';

const AboutSection = () => {
  const sections = [
    {
      title: "About",
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
    },
    {
      title: "What I love about my job",
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
      title: "My interests and hobbies",
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    }
  ];

  return (
    <div className="bg-[#121212] border border-white/10 rounded-xl p-6 md:p-8 space-y-8">
      {sections.map((sec) => (
        <div key={sec.title} className="space-y-3">
          <h3 className="text-lg font-semibold text-white">{sec.title}</h3>
          <p className="text-gray-400 leading-relaxed text-sm">{sec.content}</p>
        </div>
      ))}
    </div>
  );
};

export default AboutSection;