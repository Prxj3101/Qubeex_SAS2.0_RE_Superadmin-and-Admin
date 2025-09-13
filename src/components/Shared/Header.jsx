import React, { useState } from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header = ({ role }) => {
  const { logout } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const handleConfirmLogout = () => {
    logout();
    setShowModal(false);
  };

  return (
    <div className="w-full bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      {/* Left Side - Logo + Name + Tagline */}
      <div className="flex items-center space-x-3">
        <img src="/QubeExlogo.png" alt="QubeEx Logo" className="w-14 h-14" />
        <div className="flex flex-col">
          <h1 className="text-3xl font-qube font-extrabold text-gray-700">
            QubeEx
          </h1>
          <p
            className="text-lg font-medium mt-0
                       bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500
                       bg-200 bg-clip-text text-transparent animate-shine-gradient"
          >
            An AI-Powered SAS Platform
          </p>
        </div>
      </div>

      {/* Right Side - Role Tag + Logout Icon */}
      <div className="flex items-center space-x-4">
        {/* Role Tag */}
        <span
          className="px-4 py-1 text-lg font-bold rounded-full
                     bg-purple-100 shadow-lg flex items-center space-x-2"
        >
          <span>
            {role === 'SuperAdmin' ? '👑' : role === 'Admin' ? '🏛️' : ''}
          </span>
          <span
            className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500
                       bg-200 bg-clip-text text-transparent animate-shine-gradient"
          >
            {role === 'SuperAdmin'
              ? 'SuperAdmin'
              : role === 'Admin'
              ? 'Admin'
              : role}
          </span>
        </span>

        {/* Only Logout Icon */}
        <button
          onClick={() => setShowModal(true)}
          className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
        >
          <LogOut className="w-6 h-6" />
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80">
            <h2 className="text-lg font-semibold text-gray-800">
              Confirm Sign Out
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Are you sure you want to sign out?
            </p>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
