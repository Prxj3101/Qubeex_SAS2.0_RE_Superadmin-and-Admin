import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LayoutDashboard, Users, GraduationCap, BookOpen, CreditCard } from 'lucide-react';
import Header from '../Shared/Header';
import Sidebar from '../Shared/Sidebar';
import AdminOverview from './AdminOverview';
import BatchManagement from './BatchManagement';
import TeacherManagement from './TeacherManagement';
import SubjectManagement from './SubjectManagement';
import AdminSubscription from './AdminSubscription';

const AdminDashboard = () => {
  const sidebarItems = [
    { name: 'Overview', path: '/admin/', icon: LayoutDashboard, exact: true },
    { name: 'Manage Teachers', path: '/admin/teachers', icon: GraduationCap },
    { name: 'Manage Batches', path: '/admin/batches', icon: Users },
    { name: 'Manage Subjects', path: '/admin/subjects', icon: BookOpen },
    { name: 'Your Subscription', path: '/admin/subscription', icon: CreditCard }
  ];

  // Mock institute data - in real app, get from context/API
  const instituteData = {
    name: 'Demo Institute',
    customization: true,
    plan: 'BASIC'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Added role prop here */}
      <Header 
        role="Admin"
        instituteName={instituteData.name}
        customization={instituteData.customization}
        plan={instituteData.plan}
      />
      <div className="flex h-screen">
        <Sidebar items={sidebarItems} />
        
        <main className="flex-1 overflow-y-auto p-8">
          <Routes>
            <Route path="/" element={<AdminOverview />} />
            <Route path="/teachers" element={<TeacherManagement />} />
            <Route path="/batches" element={<BatchManagement />} />
            <Route path="/subjects" element={<SubjectManagement />} />
            <Route path="/subscription" element={<AdminSubscription />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
