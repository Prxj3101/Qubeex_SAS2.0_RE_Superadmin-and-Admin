import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, GraduationCap, Mail, Phone, Share2, User, Check, Clock } from 'lucide-react';

const TeacherManagement = () => {
  const { teachers, addTeacher } = useData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    teacherId: '',
    contact: '',
    photo: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTeacher(formData);
    setFormData({
      name: '',
      email: '',
      teacherId: '',
      contact: '',
      photo: null
    });
  };

  const handleShareLink = (teacher) => {
    navigator.clipboard.writeText(teacher.shareLink);
    alert('Registration link copied to clipboard!');
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Teacher Management</h1>
        <p className="text-gray-600 mt-2">Add and manage teaching staff</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Create Teacher Form */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Create Teacher Profile</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teacher Photo
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <User className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to upload photo</p>
                </label>
                {formData.photo && (
                  <p className="text-sm text-green-600 mt-2">{formData.photo.name}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teacher Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter teacher name"
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
                placeholder="Enter email address"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teacher ID *
              </label>
              <input
                type="text"
                name="teacherId"
                value={formData.teacherId}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter unique teacher ID"
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
                placeholder="Enter contact number"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Teacher Profile
            </button>
          </form>
        </div>

        {/* Existing Teachers */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Teacher Profiles</h2>
          
          {teachers.length === 0 ? (
            <div className="text-center py-8">
              <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No teachers added yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {teachers.map((teacher, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="ml-3">
                        <h3 className="font-semibold text-gray-900">{teacher.name}</h3>
                        <p className="text-sm text-gray-600">ID: {teacher.teacherId}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      teacher.registered 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {teacher.registered ? 'Active' : 'Pending'}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="w-4 h-4 mr-2" />
                      {teacher.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      {teacher.contact}
                    </div>
                  </div>

                  {/* Share Link Section */}
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-blue-900 text-sm">Registration Status</h4>
                      <button
                        onClick={() => handleShareLink(teacher)}
                        className="text-blue-600 hover:text-blue-700 flex items-center text-sm"
                      >
                        <Share2 className="w-4 h-4 mr-1" />
                        Copy Link
                      </button>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center text-xs">
                        <Check className="w-3 h-3 text-green-500 mr-1" />
                        <span className="text-green-700">Profile Created</span>
                      </div>
                      
                      {!teacher.registered ? (
                        <div className="flex items-center text-xs">
                          <Clock className="w-3 h-3 text-amber-500 mr-1" />
                          <span className="text-amber-700">Awaiting Registration</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-xs">
                          <Check className="w-3 h-3 text-green-500 mr-1" />
                          <span className="text-green-700">Registration Complete</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Teaching Assignments */}
                  {teacher.batches && teacher.batches.length > 0 && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 mb-1">Teaching Assignments:</p>
                      <div className="text-xs text-gray-600">
                        {teacher.batches.map((batch, bIndex) => (
                          <div key={bIndex}>{batch}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherManagement;