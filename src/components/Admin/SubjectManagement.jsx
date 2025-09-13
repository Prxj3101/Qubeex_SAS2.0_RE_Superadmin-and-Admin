import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, BookOpen, Calculator, FlaskRound as Flask, Globe, Palette, Music } from 'lucide-react';

const SubjectManagement = () => {
  const { subjects, addSubject } = useData();
  const [formData, setFormData] = useState({
    name: '',
    icon: 'BookOpen'
  });

  const availableIcons = [
    { name: 'BookOpen', icon: BookOpen, label: 'General' },
    { name: 'Calculator', icon: Calculator, label: 'Mathematics' },
    { name: 'Flask', icon: Flask, label: 'Science' },
    { name: 'Globe', icon: Globe, label: 'Geography' },
    { name: 'Palette', icon: Palette, label: 'Arts' },
    { name: 'Music', icon: Music, label: 'Music' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleIconSelect = (iconName) => {
    setFormData(prev => ({ ...prev, icon: iconName }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addSubject(formData);
    setFormData({
      name: '',
      icon: 'BookOpen'
    });
  };

  const getIcon = (iconName) => {
    const iconData = availableIcons.find(icon => icon.name === iconName);
    return iconData ? iconData.icon : BookOpen;
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Subject Management</h1>
        <p className="text-gray-600 mt-2">Create and manage academic subjects</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Create Subject Form */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New Subject</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Mathematics, Physics, English"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject Icon
              </label>
              <div className="grid grid-cols-3 gap-3">
                {availableIcons.map((iconData) => {
                  const IconComponent = iconData.icon;
                  return (
                    <button
                      key={iconData.name}
                      type="button"
                      onClick={() => handleIconSelect(iconData.name)}
                      className={`p-4 border rounded-lg text-center transition-colors ${
                        formData.icon === iconData.name
                          ? 'border-blue-500 bg-blue-50 text-blue-600'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <IconComponent className="w-6 h-6 mx-auto mb-2" />
                      <span className="text-xs">{iconData.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              disabled={!formData.name}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Subject
            </button>
          </form>
        </div>

        {/* Existing Subjects */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Subject List</h2>
          
          {subjects.length === 0 ? (
            <div className="text-center py-8">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No subjects created yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {subjects.map((subject, index) => {
                const IconComponent = getIcon(subject.icon);
                return (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="ml-3">
                          <h3 className="font-semibold text-gray-900">{subject.name}</h3>
                          <p className="text-sm text-gray-600">
                            Created {new Date(subject.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Assignment Information */}
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Assigned Batches:</p>
                          <p className="font-medium">{subject.batches?.length || 0}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Assigned Teachers:</p>
                          <p className="font-medium">{subject.teachers?.length || 0}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectManagement;