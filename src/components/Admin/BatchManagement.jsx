import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Users, User, BookOpen } from 'lucide-react';

const BatchManagement = () => {
  const { batches, teachers, subjects, addBatch } = useData();
  const [formData, setFormData] = useState({
    name: '',
    classTeacher: '',
    subjects: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubjectChange = (subjectId, teacherId) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.map(sub => 
        sub.subjectId === subjectId 
          ? { ...sub, teacherId }
          : sub
      ).concat(
        prev.subjects.find(sub => sub.subjectId === subjectId) 
          ? [] 
          : [{ subjectId, teacherId }]
      )
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addBatch(formData);
    setFormData({
      name: '',
      classTeacher: '',
      subjects: []
    });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Batch Management</h1>
        <p className="text-gray-600 mt-2">Create and manage student batches</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Create Batch Form */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New Batch</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Batch Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Class 10A, Grade 12 Science"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Class Teacher
              </label>
              <select
                name="classTeacher"
                value={formData.classTeacher}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a teacher</option>
                {teachers.map(teacher => (
                  <option key={teacher.id} value={teacher.name}>
                    {teacher.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subjects & Teachers
              </label>
              <div className="space-y-3">
                {subjects.map(subject => (
                  <div key={subject.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <BookOpen className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="font-medium text-gray-900">{subject.name}</span>
                    </div>
                    <select
                      onChange={(e) => handleSubjectChange(subject.id, e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Assign Teacher</option>
                      {teachers.map(teacher => (
                        <option key={teacher.id} value={teacher.id}>
                          {teacher.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
                {subjects.length === 0 && (
                  <p className="text-gray-500 text-sm">No subjects available. Create subjects first.</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={!formData.name}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Batch
            </button>
          </form>
        </div>

        {/* Existing Batches */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Existing Batches</h2>
          
          {batches.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No batches created yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {batches.map((batch, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{batch.name}</h3>
                    <span className="text-sm text-gray-500">{batch.students || 0} students</span>
                  </div>
                  
                  {batch.classTeacher && (
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <User className="w-4 h-4 mr-2" />
                      Class Teacher: {batch.classTeacher}
                    </div>
                  )}
                  
                  {batch.subjects && batch.subjects.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-700 mb-2">Subjects:</p>
                      <div className="space-y-1">
                        {batch.subjects.map((subject, subIndex) => {
                          const subjectName = subjects.find(s => s.id === subject.subjectId)?.name;
                          const teacherName = teachers.find(t => t.id === subject.teacherId)?.name;
                          return (
                            <div key={subIndex} className="text-sm text-gray-600 flex items-center">
                              <BookOpen className="w-3 h-3 mr-2" />
                              {subjectName} {teacherName && `- ${teacherName}`}
                            </div>
                          );
                        })}
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

export default BatchManagement;