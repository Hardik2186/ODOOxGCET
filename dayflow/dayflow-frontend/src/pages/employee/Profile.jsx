import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Phone, 
  MapPin, 
  Briefcase, 
  Building2, 
  DollarSign, 
  Upload,
  Edit2,
  Save,
  X,
  ArrowLeft,
  FileText,
  IdCard
} from 'lucide-react';
import { employeeAPI } from '../../lib/api';

const EmployeeProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState({
    phone: '',
    address: '',
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await employeeAPI.getProfile();
      setProfile(response.data);
      setFormData({
        phone: response.data.phone || '',
        address: response.data.address || '',
      });
      setPhotoPreview(response.data.profilePhoto || null);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    try {
      // Upload photo if changed
      if (photoFile) {
        const formDataPhoto = new FormData();
        formDataPhoto.append('photo', photoFile);
        await employeeAPI.uploadProfilePhoto(formDataPhoto);
      }

      // Update profile data
      await employeeAPI.updateProfile(formData);
      
      setEditing(false);
      fetchProfile();
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setFormData({
      phone: profile.phone || '',
      address: profile.address || '',
    });
    setPhotoPreview(profile.profilePhoto || null);
    setPhotoFile(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/employee/dashboard')}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeft size={24} />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                <p className="text-sm text-gray-600">View and manage your information</p>
              </div>
            </div>
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <Edit2 size={18} />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  <X size={18} />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Photo */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-center">
                <div className="relative inline-block">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Profile"
                      className="w-40 h-40 rounded-full object-cover border-4 border-blue-500"
                    />
                  ) : (
                    <div className="w-40 h-40 rounded-full bg-blue-500 flex items-center justify-center text-white text-4xl font-bold">
                      {profile?.name?.charAt(0) || 'E'}
                    </div>
                  )}
                  {editing && (
                    <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600">
                      <Upload size={20} />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mt-4">
                  {profile?.name || 'Employee Name'}
                </h2>
                <p className="text-gray-600">{profile?.email || 'email@example.com'}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Employee ID: {profile?.employeeId || 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Profile Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg">
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex">
                  <button
                    onClick={() => setActiveTab('personal')}
                    className={`px-6 py-4 font-medium ${
                      activeTab === 'personal'
                        ? 'border-b-2 border-blue-500 text-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Personal Info
                  </button>
                  <button
                    onClick={() => setActiveTab('work')}
                    className={`px-6 py-4 font-medium ${
                      activeTab === 'work'
                        ? 'border-b-2 border-blue-500 text-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Work Info
                  </button>
                  <button
                    onClick={() => setActiveTab('salary')}
                    className={`px-6 py-4 font-medium ${
                      activeTab === 'salary'
                        ? 'border-b-2 border-blue-500 text-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Salary Info
                  </button>
                  <button
                    onClick={() => setActiveTab('documents')}
                    className={`px-6 py-4 font-medium ${
                      activeTab === 'documents'
                        ? 'border-b-2 border-blue-500 text-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Documents
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {/* Personal Information Tab */}
                {activeTab === 'personal' && (
                  <div className="space-y-6">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <User size={18} />
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profile?.name || ''}
                        disabled
                        className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                      />
                      <p className="text-xs text-gray-500 mt-1">Contact admin to change</p>
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Phone size={18} />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={!editing}
                        className={`w-full px-4 py-2 border rounded-lg ${
                          editing ? 'bg-white' : 'bg-gray-100 cursor-not-allowed'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <MapPin size={18} />
                        Address
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        disabled={!editing}
                        rows={3}
                        className={`w-full px-4 py-2 border rounded-lg ${
                          editing ? 'bg-white' : 'bg-gray-100 cursor-not-allowed'
                        }`}
                      />
                    </div>
                  </div>
                )}

                {/* Work Information Tab */}
                {activeTab === 'work' && (
                  <div className="space-y-6">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Briefcase size={18} />
                        Job Title
                      </label>
                      <input
                        type="text"
                        value={profile?.jobTitle || 'N/A'}
                        disabled
                        className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Building2 size={18} />
                        Department
                      </label>
                      <input
                        type="text"
                        value={profile?.department || 'N/A'}
                        disabled
                        className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <User size={18} />
                        Manager
                      </label>
                      <input
                        type="text"
                        value={profile?.manager || 'N/A'}
                        disabled
                        className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2">Date of Joining</label>
                      <input
                        type="text"
                        value={profile?.dateOfJoining ? new Date(profile.dateOfJoining).toLocaleDateString() : 'N/A'}
                        disabled
                        className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                      />
                    </div>
                  </div>
                )}

                {/* Salary Information Tab */}
                {activeTab === 'salary' && (
                  <div className="space-y-6">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                      <p className="text-sm text-yellow-800">
                        <strong>Note:</strong> Salary information is read-only. Contact HR for any changes.
                      </p>
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <DollarSign size={18} />
                        Base Salary
                      </label>
                      <input
                        type="text"
                        value={`$${profile?.salary?.baseSalary?.toLocaleString() || '0'}`}
                        disabled
                        className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed font-semibold"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2">Bonus</label>
                      <input
                        type="text"
                        value={`$${profile?.salary?.bonus?.toLocaleString() || '0'}`}
                        disabled
                        className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2">Deductions</label>
                      <input
                        type="text"
                        value={`$${profile?.salary?.deductions?.toLocaleString() || '0'}`}
                        disabled
                        className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                      />
                    </div>

                    <div className="border-t pt-4">
                      <label className="text-sm font-medium text-gray-700 mb-2">Net Salary</label>
                      <input
                        type="text"
                        value={`$${(
                          (profile?.salary?.baseSalary || 0) +
                          (profile?.salary?.bonus || 0) -
                          (profile?.salary?.deductions || 0)
                        ).toLocaleString()}`}
                        disabled
                        className="w-full px-4 py-2 border rounded-lg bg-green-50 text-green-700 cursor-not-allowed font-bold text-lg"
                      />
                    </div>
                  </div>
                )}

                {/* Documents Tab */}
                {activeTab === 'documents' && (
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="text-blue-500" size={24} />
                          <div>
                            <p className="font-medium">Resume</p>
                            <p className="text-sm text-gray-600">Uploaded resume document</p>
                          </div>
                        </div>
                        <button className="text-blue-500 hover:text-blue-600">View</button>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <IdCard className="text-green-500" size={24} />
                          <div>
                            <p className="font-medium">Government ID</p>
                            <p className="text-sm text-gray-600">Identity verification document</p>
                          </div>
                        </div>
                        <button className="text-blue-500 hover:text-blue-600">View</button>
                      </div>
                    </div>

                    {editing && (
                      <div className="border-2 border-dashed rounded-lg p-6 text-center">
                        <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                        <p className="text-sm text-gray-600">Upload new document</p>
                        <input type="file" className="mt-2" />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployeeProfile;
