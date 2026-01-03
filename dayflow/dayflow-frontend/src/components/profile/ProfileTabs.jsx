const ProfileTabs = ({ activeTab, setActiveTab }) => {
  const tabs = ['Resume', 'Private Info', 'Salary Info'];
  return (
    <div className="flex border-b border-white/10">
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-8 py-3 text-sm font-medium transition-all ${
            activeTab === tab 
            ? 'text-white border-b-2 border-blue-500 bg-white/5' 
            : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};
export default ProfileTabs;