import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LayoutDashboard, Building2, CreditCard } from 'lucide-react';
import Header from '../Shared/Header';
import Sidebar from '../Shared/Sidebar';
import Overview from './Overview';
import InstituteManagement from './InstituteManagement';
import SubscriptionManagement from './SubscriptionManagement';

const SuperAdminDashboard = () => {
  const sidebarItems = [
    { name: 'Overview', path: '/superadmin/', icon: LayoutDashboard, exact: true },
    { name: 'Add & Manage Institutes', path: '/superadmin/institutes', icon: Building2 },
    { name: 'Manage Subscriptions', path: '/superadmin/subscriptions', icon: CreditCard }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Role prop added here */}
      <Header role="SuperAdmin" />
      <div className="flex h-screen">
        <Sidebar items={sidebarItems} />
        
        <main className="flex-1 overflow-y-auto p-8">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/institutes" element={<InstituteManagement />} />
            <Route path="/subscriptions" element={<SubscriptionManagement />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
