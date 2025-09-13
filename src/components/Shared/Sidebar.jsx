import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ items }) => {
  return (
    <div className="w-64 bg-white text-gray-800 shadow-xl flex flex-col h-full overflow-y-auto">
      <nav className="mt-8 px-4 flex-1">
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                end={item.exact}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-purple-100 text-purple-700 shadow-md scale-[1.02] font-semibold"
                      : "text-gray-600 hover:bg-purple-50 hover:text-purple-700"
                  }`
                }
              >
                <item.icon
                  className={`w-6 h-6 transition-colors duration-200 ${
                    // purple icon if active
                    window.location.pathname.startsWith(item.path)
                      ? "text-purple-600"
                      : "text-gray-600 group-hover:text-purple-600"
                  }`}
                />
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
