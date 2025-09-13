import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};

export const DataProvider = ({ children }) => {
  const [institutes, setInstitutes] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [batches, setBatches] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const addInstitute = (institute) => {
    const newInstitute = {
      ...institute,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      shareLink: `${window.location.origin}/register/${Date.now()}`,
      adminRegistered: false,
      adminName: null
    };
    setInstitutes(prev => [...prev, newInstitute]);
    return newInstitute;
  };

  const addTeacher = (teacher) => {
    const newTeacher = {
      ...teacher,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      shareLink: `${window.location.origin}/teacher-register/${Date.now()}`,
      registered: false,
      batches: [],
      subjects: []
    };
    setTeachers(prev => [...prev, newTeacher]);
    return newTeacher;
  };

  const addBatch = (batch) => {
    const newBatch = {
      ...batch,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      students: 0
    };
    setBatches(prev => [...prev, newBatch]);
    return newBatch;
  };

  const addSubject = (subject) => {
    const newSubject = {
      ...subject,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      batches: [],
      teachers: []
    };
    setSubjects(prev => [...prev, newSubject]);
    return newSubject;
  };

  return (
    <DataContext.Provider value={{
      institutes, teachers, batches, subjects,
      addInstitute, addTeacher, addBatch, addSubject,
      setInstitutes, setTeachers, setBatches, setSubjects
    }}>
      {children}
    </DataContext.Provider>
  );
};
