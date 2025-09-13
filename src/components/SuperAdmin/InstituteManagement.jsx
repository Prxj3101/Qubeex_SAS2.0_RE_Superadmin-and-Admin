import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Building2, Edit3, Share2, Save, X, Check, Clock } from 'lucide-react';

const InstituteManagement = () => {
  const { institutes, addInstitute, updateInstitute } = useData();
  const [activeTab, setActiveTab] = useState('add');
  const [selectedInstitute, setSelectedInstitute] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    address: '',
    plan: 'BASIC',
    customization: false,
    logo: null,
    logoPreview: null
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      const file = files[0];
      setFormData(prev => ({ ...prev, logo: file, logoPreview: file ? URL.createObjectURL(file) : null }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addInstitute(formData);
    setFormData({
      name: '',
      email: '',
      contact: '',
      address: '',
      plan: 'BASIC',
      customization: false,
      logo: null,
      logoPreview: null
    });
    setActiveTab('manage');
  };

  const handleEdit = (institute) => {
    setSelectedInstitute(institute);
    setFormData({ ...institute });
    setEditMode(true);
  };

  const handleSave = () => {
    updateInstitute(selectedInstitute.id, formData);
    setEditMode(false);
    setSelectedInstitute({ ...selectedInstitute, ...formData });
  };

  const handleShareLink = (institute) => {
    navigator.clipboard.writeText(institute.shareLink);
    alert('Link copied to clipboard!');
  };

  const handleAdminRegister = (instituteId) => {
    updateInstitute(instituteId, { adminRegistered: true, adminName: 'Demo Admin', status: 'active' });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Institute Management</h1>
        <p className="text-gray-600 mt-2">Add new institutes and manage existing ones</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('add')}
              className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'add' ? 'border-purple-600 text-purple-700 bg-purple-50' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Add Institute
            </button>
            <button
              onClick={() => setActiveTab('manage')}
              className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'manage' ? 'border-purple-600 text-purple-700 bg-purple-50' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Manage Institutes ({institutes.length})
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Add Institute */}
          {activeTab === 'add' && (
            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Institute Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number *</label>
                  <input type="tel" name="contact" value={formData.contact} onChange={handleInputChange} required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                </div>

                {/* Plan Tabs */}
                <div className="mt-4">
                  <span className="block text-sm font-medium text-gray-700 mb-2">Plan *</span>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, plan: 'BASIC' }))}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        formData.plan === 'BASIC'
                          ? 'bg-purple-200 text-black-900 shadow-md'
                          : 'bg-purple-50 text-black-800 hover:bg-purple-200'
                      }`}
                    >
                      Basic
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, plan: 'PRO' }))}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        formData.plan === 'PRO'
                          ? 'bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-black shadow-md'
                          : 'bg-purple-50 text-black-800 hover:bg-yellow-300'
                      }`}
                    >
                      Pro
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Institute Logo</label>
                  <input type="file" accept="image/*" onChange={handleInputChange} className="w-full" />
                  {formData.logoPreview && <img src={formData.logoPreview} alt="Logo Preview" className="mt-2 w-24 h-24 object-cover rounded" />}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea name="address" value={formData.address} onChange={handleInputChange} rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
              </div>

              {/* Customization Toggle */}
              <div className="flex items-center space-x-3 mt-4">
                <span className="text-sm font-medium text-gray-700">Enable Customization Pack</span>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, customization: !prev.customization }))}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 focus:outline-none ${
                    formData.customization
                    ? 'bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 justify-end'
                    : 'bg-gray-300 justify-start'
             }`}
                >
                  <div className="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform"></div>
                </button>
              </div>

              <button type="submit" className="mt-4 w-full py-3 px-6 rounded-lg font-medium text-white
                bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500
                bg-[length:200%_200%] animate-gradient-x
                flex items-center justify-center transition-all duration-500 transform hover:scale-105 hover:brightness-110">
                <Plus className="w-5 h-5 mr-2" /> Create Institute
              </button>
            </form>
          )}

          {/* Manage Institutes */}
          {activeTab === 'manage' && (
            <div className="space-y-4">
              {institutes.length === 0 ? (
                <div className="text-center py-8">
                  <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No institutes added yet</p>
                </div>
              ) : (
                institutes.map((institute) => (
                  <div key={institute.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="p-4 bg-gray-50 flex items-center justify-between cursor-pointer hover:bg-gray-100"
                         onClick={() => setSelectedInstitute(selectedInstitute?.id === institute.id ? null : institute)}>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden bg-gray-100">
                          {institute.logoPreview ? (
                            <img src={institute.logoPreview} alt="Logo" className="w-full h-full object-cover" />
                          ) : (
                            <Building2 className="w-5 h-5 text-purple-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{institute.name}</h3>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              institute.plan === 'PRO' ? 'bg-purple-100 text-purple-800' : 'bg-purple-50 text-purple-800'
                            }`}>
                              {institute.plan}
                            </span>
                            {institute.adminRegistered && <span className="text-xs text-green-600 flex items-center"><Check className="w-3 h-3 mr-1" />Active</span>}
                          </div>
                        </div>
                      </div>
                      {institute.adminName && <p className="text-sm text-gray-600">Admin: {institute.adminName}</p>}
                    </div>

                    {selectedInstitute?.id === institute.id && (
                      <div className="p-6 bg-white border-t border-gray-200 space-y-4">

                        {/* Edit Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Institute Name</label>
                            <input type="text" name="name" value={editMode ? formData.name : institute.name} onChange={handleInputChange} disabled={!editMode} className="w-full px-4 py-3 border border-gray-300 rounded-lg disabled:bg-gray-50" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input type="email" name="email" value={editMode ? formData.email : institute.email} onChange={handleInputChange} disabled={!editMode} className="w-full px-4 py-3 border border-gray-300 rounded-lg disabled:bg-gray-50" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Contact</label>
                            <input type="tel" name="contact" value={editMode ? formData.contact : institute.contact} onChange={handleInputChange} disabled={!editMode} className="w-full px-4 py-3 border border-gray-300 rounded-lg disabled:bg-gray-50" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Plan</label>
                            <select name="plan" value={editMode ? formData.plan : institute.plan} onChange={handleInputChange} disabled={!editMode} className="w-full px-4 py-3 border border-gray-300 rounded-lg disabled:bg-gray-50">
                              <option value="BASIC">Basic</option>
                              <option value="PRO">Pro</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Update Logo</label>
                            <input type="file" accept="image/*" onChange={handleInputChange} disabled={!editMode} className="w-full" />
                            {formData.logoPreview && <img src={formData.logoPreview} alt="Logo Preview" className="mt-2 w-24 h-24 object-cover rounded" />}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                          <textarea name="address" value={editMode ? formData.address : institute.address} onChange={handleInputChange} disabled={!editMode} rows="3" className="w-full px-4 py-3 border border-gray-300 rounded-lg disabled:bg-gray-50" />
                        </div>

                        {/* Customization Toggle */}
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-gray-700">Customization Pack Enabled</span>
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, customization: !prev.customization }))}
                            disabled={!editMode}
                            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 focus:outline-none ${
                              formData.customization
                            ? 'bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 justify-end'
                             : 'bg-gray-300 justify-start'
                         }`}
                          >
                            <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
                          </button>
                        </div>

                        {/* Registration Link */}
                        <div className="p-4 bg-purple-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-purple-900">Registration Link</h4>
                            <button onClick={() => handleShareLink(institute)} className="text-purple-600 hover:text-purple-700 flex items-center text-sm">
                              <Share2 className="w-4 h-4 mr-1" /> Copy Link
                            </button>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center text-sm">
                              <Check className="w-4 h-4 text-green-500 mr-2" />
                              <span className="text-green-700">Link Generated</span>
                            </div>
                            {!institute.adminRegistered ? (
                              <div className="flex items-center text-sm">
                                <Clock className="w-4 h-4 text-amber-500 mr-2" />
                                <span className="text-amber-700">Awaiting Admin Registration</span>
                                <button onClick={() => handleAdminRegister(institute.id)} className="ml-2 text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">Simulate Registration</button>
                              </div>
                            ) : (
                              <div className="flex items-center text-sm">
                                <Check className="w-4 h-4 text-green-500 mr-2" />
                                <span className="text-green-700">Registration Successful</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-3">
                          {editMode ? (
                            <>
                              <button onClick={() => setEditMode(false)} className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                                <X className="w-4 h-4 mr-1 inline" /> Cancel
                              </button>
                              <button onClick={handleSave} className="px-4 py-2 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 text-white rounded-lg flex items-center">
                                <Save className="w-4 h-4 mr-1 inline" /> Save
                              </button>
                            </>
                          ) : (
                            <button onClick={() => handleEdit(institute)} className="px-4 py-2 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 text-white rounded-lg flex items-center justify-center
                                                                    transition-all duration-500 transform hover:scale-105 hover:brightness-110">
                              <Edit3 className="w-4 h-4 mr-1 inline" /> Edit
                            </button>
                          )}
                        </div>

                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstituteManagement;
