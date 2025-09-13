import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Building2, Mail, Phone, MapPin, Edit3, Share2, Save, X, Check, Clock } from 'lucide-react';

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
    customization: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
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
      customization: false
    });
    setActiveTab('manage');
  };

  const handleEdit = (institute) => {
    setSelectedInstitute(institute);
    setFormData(institute);
    setEditMode(true);
  };

  const handleSave = () => {
    updateInstitute(selectedInstitute.id, formData);
    setEditMode(false);
    setSelectedInstitute({ ...selectedInstitute, ...formData });
  };

  const handleShareLink = (institute) => {
    navigator.clipboard.writeText(institute.shareLink);
    // In real app, show toast notification
    alert('Link copied to clipboard!');
  };

  const handleAdminRegister = (instituteId) => {
    updateInstitute(instituteId, { 
      adminRegistered: true, 
      adminName: 'Demo Admin',
      status: 'active' 
    });
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
                activeTab === 'add'
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Add Institute
            </button>
            <button
              onClick={() => setActiveTab('manage')}
              className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'manage'
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Manage Institutes ({institutes.length})
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'add' && (
            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Institute Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Plan *
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="plan"
                        value="BASIC"
                        checked={formData.plan === 'BASIC'}
                        onChange={handleInputChange}
                        className="text-blue-600"
                      />
                      <span className="ml-2 text-sm font-medium">Basic</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="plan"
                        value="PRO"
                        checked={formData.plan === 'PRO'}
                        onChange={handleInputChange}
                        className="text-blue-600"
                      />
                      <span className="ml-2 text-sm font-medium">Pro</span>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="customization"
                  checked={formData.customization}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <label className="ml-2 text-sm font-medium text-gray-700">
                  Enable Customization Pack
                </label>
              </div>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Institute
              </button>
            </form>
          )}

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
                    <div 
                      className="p-4 bg-gray-50 flex items-center justify-between cursor-pointer hover:bg-gray-100"
                      onClick={() => setSelectedInstitute(selectedInstitute?.id === institute.id ? null : institute)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{institute.name}</h3>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              institute.plan === 'PRO' 
                                ? 'bg-purple-100 text-purple-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {institute.plan}
                            </span>
                            {institute.adminRegistered && (
                              <span className="text-xs text-green-600 flex items-center">
                                <Check className="w-3 h-3 mr-1" />
                                Active
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      {institute.adminName && (
                        <p className="text-sm text-gray-600">Admin: {institute.adminName}</p>
                      )}
                    </div>

                    {selectedInstitute?.id === institute.id && (
                      <div className="p-6 bg-white border-t border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Institute Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={editMode ? formData.name : institute.name}
                              onChange={handleInputChange}
                              disabled={!editMode}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg disabled:bg-gray-50"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Email
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={editMode ? formData.email : institute.email}
                              onChange={handleInputChange}
                              disabled={!editMode}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg disabled:bg-gray-50"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Contact
                            </label>
                            <input
                              type="tel"
                              name="contact"
                              value={editMode ? formData.contact : institute.contact}
                              onChange={handleInputChange}
                              disabled={!editMode}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg disabled:bg-gray-50"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Plan
                            </label>
                            <select
                              name="plan"
                              value={editMode ? formData.plan : institute.plan}
                              onChange={handleInputChange}
                              disabled={!editMode}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg disabled:bg-gray-50"
                            >
                              <option value="BASIC">Basic</option>
                              <option value="PRO">Pro</option>
                            </select>
                          </div>
                        </div>

                        <div className="mt-6">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Address
                          </label>
                          <textarea
                            name="address"
                            value={editMode ? formData.address : institute.address}
                            onChange={handleInputChange}
                            disabled={!editMode}
                            rows="3"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg disabled:bg-gray-50"
                          />
                        </div>

                        <div className="mt-6 flex items-center">
                          <input
                            type="checkbox"
                            name="customization"
                            checked={editMode ? formData.customization : institute.customization}
                            onChange={handleInputChange}
                            disabled={!editMode}
                            className="h-4 w-4 text-blue-600 rounded"
                          />
                          <label className="ml-2 text-sm font-medium text-gray-700">
                            Customization Pack Enabled
                          </label>
                        </div>

                        {/* Share Link */}
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-blue-900">Registration Link</h4>
                            <button
                              onClick={() => handleShareLink(institute)}
                              className="text-blue-600 hover:text-blue-700 flex items-center text-sm"
                            >
                              <Share2 className="w-4 h-4 mr-1" />
                              Copy Link
                            </button>
                          </div>
                          
                          {/* Tracking Status */}
                          <div className="space-y-2">
                            <div className="flex items-center text-sm">
                              <Check className="w-4 h-4 text-green-500 mr-2" />
                              <span className="text-green-700">Link Generated</span>
                            </div>
                            
                            {!institute.adminRegistered ? (
                              <div className="flex items-center text-sm">
                                <Clock className="w-4 h-4 text-amber-500 mr-2" />
                                <span className="text-amber-700">Awaiting Admin Registration</span>
                                <button
                                  onClick={() => handleAdminRegister(institute.id)}
                                  className="ml-2 text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded"
                                >
                                  Simulate Registration
                                </button>
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
                        <div className="flex justify-end space-x-3 mt-6">
                          {editMode ? (
                            <>
                              <button
                                onClick={() => setEditMode(false)}
                                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                              >
                                <X className="w-4 h-4 mr-1 inline" />
                                Cancel
                              </button>
                              <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                              >
                                <Save className="w-4 h-4 mr-1 inline" />
                                Save
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => handleEdit(institute)}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                              <Edit3 className="w-4 h-4 mr-1 inline" />
                              Edit
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