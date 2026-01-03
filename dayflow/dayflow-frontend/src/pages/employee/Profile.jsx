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
  FileText,
  IdCard,
  Download,
  Trash2,
  CheckCircle
} from 'lucide-react';
import EmployeeSidebar from '../../components/employee/Sidebar';
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
  const [documents, setDocuments] = useState({
    resume: null,
    governmentId: null,
  });
  const [uploadingDoc, setUploadingDoc] = useState(null);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

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

  const handleDocumentUpload = async (e, docType) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingDoc(docType);
    try {
      const formDataDoc = new FormData();
      formDataDoc.append('file', file);
      formDataDoc.append('type', docType);
      
      await employeeAPI.uploadDocument(formDataDoc);
      setDocuments({ ...documents, [docType]: file });
      alert(`✅ ${docType === 'resume' ? 'Resume' : 'Government ID'} uploaded successfully!`);
      fetchProfile();
    } catch (error) {
      console.error('Error uploading document:', error);
      alert('Failed to upload document');
    } finally {
      setUploadingDoc(null);
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
      alert('✅ Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setFormData({
      phone: profile?.phone || '',
      address: profile?.address || '',
    });
    setPhotoPreview(profile?.profilePhoto || null);
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
    <div className="min-h-screen bg-gray-50">
      <EmployeeSidebar userName={user?.name} />

      {/* Main Content */}
      <main className="lg:ml-64 p-4 lg:p-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600 mt-2">Manage your personal and professional information</p>
          </div>
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-all"
            >
              <Edit2 size={18} />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-semibold"
              >
                <X size={18} />
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold transition-all"
              >
                <Save size={18} />
                Save Changes
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile Card - Left Side */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="text-center">
                {/* Profile Photo */}
                <div className="relative inline-block mb-4">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Profile"
                      className="w-48 h-48 rounded-full object-cover border-4 border-blue-600 shadow-lg"
                    />
                  ) : (
                    <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-6xl font-bold shadow-lg">
                      {profile?.name?.charAt(0) || 'E'}
                    </div>
                  )}
                  {editing && (
                    <label className="absolute bottom-2 right-2 bg-blue-600 text-white p-3 rounded-full cursor-pointer hover:bg-blue-700 shadow-lg transition-all">
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
                <p className="text-gray-600 text-sm mt-1">{profile?.email || 'email@company.com'}</p>
                <p className="text-gray-500 text-xs mt-2 bg-gray-100 inline-block px-3 py-1 rounded-full">
                  ID: {profile?.employeeId || 'N/A'}
                </p>

                {/* Quick Stats */}
                <div className="mt-6 space-y-3">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-gray-600 text-xs">Department</p>
                    <p className="font-semibold text-gray-900">{profile?.department || 'N/A'}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-gray-600 text-xs">Job Title</p>
                    <p className="font-semibold text-gray-900">{profile?.jobTitle || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details - Right Side */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Tabs */}
              <div className="border-b border-gray-200 bg-gray-50">
                <nav className="flex overflow-x-auto">
                  {[
                    { id: 'personal', label: 'Personal Info', icon: '👤' },
                    { id: 'work', label: 'Work Info', icon: '💼' },
                    { id: 'salary', label: 'Salary Info', icon: '💰' },
                    { id: 'documents', label: 'Documents', icon: '📄' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-6 py-4 font-medium whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'border-b-2 border-blue-600 text-blue-600 bg-white'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <span className="mr-2">{tab.icon}</span>{tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {/* Personal Information Tab */}
                {activeTab === 'personal' && (
                  <div className="space-y-6">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                        <User size={18} />
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profile?.name || ''}
                        disabled
                        className="w-full px-4 py-3 border rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed font-medium"
                      />
                      <p className="text-xs text-gray-500 mt-2">⚠️ Contact admin to change</p>
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                        <Phone size={18} />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={!editing}
                        className={`w-full px-4 py-3 border rounded-lg font-medium transition-all ${
                          editing 
                            ? 'bg-white border-blue-300 focus:ring-2 focus:ring-blue-500' 
                            : 'bg-gray-100 text-gray-600 cursor-not-allowed'
                        }`}
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                        <MapPin size={18} />
                        Address
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        disabled={!editing}
                        rows={4}
                        className={`w-full px-4 py-3 border rounded-lg font-medium transition-all ${
                          editing 
                            ? 'bg-white border-blue-300 focus:ring-2 focus:ring-blue-500' 
                            : 'bg-gray-100 text-gray-600 cursor-not-allowed'
                        }`}
                        placeholder="Street Address, City, State, ZIP"
                      />
                    </div>
                  </div>
                )}

                {/* Work Information Tab */}
                {activeTab === 'work' && (
                  <div className="space-y-6">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                        <Briefcase size={18} />
                        Job Title
                      </label>
                      <input
                        type="text"
                        value={profile?.jobTitle || 'N/A'}
                        disabled
                        className="w-full px-4 py-3 border rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed font-medium"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                        <Building2 size={18} />
                        Department
                      </label>
                      <input
                        type="text"
                        value={profile?.department || 'N/A'}
                        disabled
                        className="w-full px-4 py-3 border rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed font-medium"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                        <User size={18} />
                        Manager
                      </label>
                      <input
                        type="text"
                        value={profile?.manager || 'N/A'}
                        disabled
                        className="w-full px-4 py-3 border rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed font-medium"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-3 block">Date of Joining</label>
                      <input
                        type="text"
                        value={profile?.dateOfJoining ? new Date(profile.dateOfJoining).toLocaleDateString() : 'N/A'}
                        disabled
                        className="w-full px-4 py-3 border rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed font-medium"
                      />
                    </div>
                  </div>
                )}

                {/* Salary Information Tab */}
                {activeTab === 'salary' && (
                  <div className="space-y-6">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                      <span className="text-2xl">🔒</span>
                      <div>
                        <p className="font-semibold text-red-900">Read-Only Information</p>
                        <p className="text-sm text-red-700 mt-1">
                          Salary information cannot be edited. Contact HR for any queries.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                          <DollarSign size={18} />
                          Base Salary
                        </label>
                        <input
                          type="text"
                          value={`$${(profile?.salary?.baseSalary || 0).toLocaleString()}`}
                          disabled
                          className="w-full px-4 py-3 border rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed font-bold text-lg"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-3 block">Bonus</label>
                        <input
                          type="text"
                          value={`$${(profile?.salary?.bonus || 0).toLocaleString()}`}
                          disabled
                          className="w-full px-4 py-3 border rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed font-medium"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-3 block">Allowances</label>
                        <input
                          type="text"
                          value={`$${(profile?.salary?.allowances || 0).toLocaleString()}`}
                          disabled
                          className="w-full px-4 py-3 border rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed font-medium"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-3 block">Deductions</label>
                        <input
                          type="text"
                          value={`$${(profile?.salary?.deductions || 0).toLocaleString()}`}
                          disabled
                          className="w-full px-4 py-3 border rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed font-medium"
                        />
                      </div>
                    </div>

                    <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-300 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">Net Monthly Salary</p>
                      <p className="text-4xl font-bold text-green-700">
                        ${(
                          (profile?.salary?.baseSalary || 0) +
                          (profile?.salary?.bonus || 0) +
                          (profile?.salary?.allowances || 0) -
                          (profile?.salary?.deductions || 0)
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}

                {/* Documents Tab */}
                {activeTab === 'documents' && (
                  <div className="space-y-6">
                    {/* Resume */}
                    <div className="border-2 border-dashed border-blue-300 rounded-xl p-6 hover:bg-blue-50 transition-all">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-blue-100 rounded-lg">
                            <FileText className="text-blue-600" size={32} />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-lg">Resume</p>
                            <p className="text-sm text-gray-600">PDF or Document file</p>
                          </div>
                        </div>
                        {profile?.resume && (
                          <CheckCircle className="text-green-500" size={24} />
                        )}
                      </div>

                      {profile?.resume ? (
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-white p-3 rounded-lg border">
                            <p className="text-sm font-medium text-gray-900">resume.pdf</p>
                            <p className="text-xs text-gray-500">Uploaded on Jan 1, 2026</p>
                          </div>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                            <Download className="text-blue-600" size={20} />
                          </button>
                          {editing && (
                            <button className="p-2 hover:bg-red-100 rounded-lg transition-all">
                              <Trash2 className="text-red-600" size={20} />
                            </button>
                          )}
                        </div>
                      ) : (
                        <label className="flex items-center justify-center gap-2 cursor-pointer p-4 bg-white border rounded-lg hover:bg-blue-50 transition-all">
                          <Upload size={20} className="text-blue-600" />
                          <span className="text-blue-600 font-medium">Upload Resume</span>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => handleDocumentUpload(e, 'resume')}
                            disabled={uploadingDoc === 'resume'}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>

                    {/* Government ID */}
                    <div className="border-2 border-dashed border-green-300 rounded-xl p-6 hover:bg-green-50 transition-all">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-green-100 rounded-lg">
                            <IdCard className="text-green-600" size={32} />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-lg">Government ID</p>
                            <p className="text-sm text-gray-600">Passport, License, or ID Card</p>
                          </div>
                        </div>
                        {profile?.governmentId && (
                          <CheckCircle className="text-green-500" size={24} />
                        )}
                      </div>

                      {profile?.governmentId ? (
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-white p-3 rounded-lg border">
                            <p className="text-sm font-medium text-gray-900">government_id.pdf</p>
                            <p className="text-xs text-gray-500">Uploaded on Jan 1, 2026</p>
                          </div>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                            <Download className="text-green-600" size={20} />
                          </button>
                          {editing && (
                            <button className="p-2 hover:bg-red-100 rounded-lg transition-all">
                              <Trash2 className="text-red-600" size={20} />
                            </button>
                          )}
                        </div>
                      ) : (
                        <label className="flex items-center justify-center gap-2 cursor-pointer p-4 bg-white border rounded-lg hover:bg-green-50 transition-all">
                          <Upload size={20} className="text-green-600" />
                          <span className="text-green-600 font-medium">Upload Government ID</span>
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleDocumentUpload(e, 'governmentId')}
                            disabled={uploadingDoc === 'governmentId'}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
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
