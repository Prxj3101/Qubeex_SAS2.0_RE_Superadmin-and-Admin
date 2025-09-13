import React from 'react';
import { useData } from '../../context/DataContext';
import { Building2, Users, Crown, DollarSign, TrendingUp, Clock } from 'lucide-react';

const Overview = () => {
  const { institutes } = useData();

  const stats = [
    {
      name: 'Total Institutes',
      value: institutes.length,
      icon: Building2,
      change: '+12%',
      changeType: 'increase',
      color: 'blue'
    },
    {
      name: 'Active Subscriptions',
      value: institutes.filter(inst => inst.adminRegistered).length,
      icon: Users,
      change: '+8%',
      changeType: 'increase',
      color: 'emerald'
    },
    {
      name: 'Pro Subscribers',
      value: institutes.filter(inst => inst.plan === 'PRO').length,
      icon: Crown,
      change: '+15%',
      changeType: 'increase',
      color: 'purple'
    },
    {
      name: 'Monthly Revenue',
      value: '$24,500',
      icon: DollarSign,
      change: '+22%',
      changeType: 'increase',
      color: 'amber'
    },
    {
      name: 'Growth Rate',
      value: '18.2%',
      icon: TrendingUp,
      change: '+3.1%',
      changeType: 'increase',
      color: 'green'
    },
    {
      name: 'Pending Registrations',
      value: institutes.filter(inst => !inst.adminRegistered).length,
      icon: Clock,
      change: '-5%',
      changeType: 'decrease',
      color: 'orange'
    }
  ];

  const getIconBg = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      emerald: 'bg-emerald-100 text-emerald-600',
      purple: 'bg-purple-100 text-purple-600',
      amber: 'bg-amber-100 text-amber-600',
      green: 'bg-green-100 text-green-600',
      orange: 'bg-orange-100 text-orange-600'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Overview</h1>
        <p className="text-gray-600 mt-2">Monitor your platform's performance and growth</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getIconBg(stat.color)}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <span className={`text-sm font-medium ${
                stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-2">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {institutes.slice(0, 5).map((institute, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-blue-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{institute.name}</p>
                  <p className="text-xs text-gray-500">
                    {institute.adminRegistered ? 'Admin registered' : 'Awaiting registration'}
                  </p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                institute.plan === 'PRO' 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {institute.plan}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;