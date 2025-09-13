import React from 'react';
import { useData } from '../../context/DataContext';
import { Users, GraduationCap, BookOpen, Clock, TrendingUp, UserCheck } from 'lucide-react';

const AdminOverview = () => {
  const { batches, teachers, subjects } = useData();

  const stats = [
    {
      name: 'Total Batches',
      value: batches.length,
      icon: Users,
      change: '+3',
      changeType: 'increase',
      color: 'blue'
    },
    {
      name: 'Total Teachers',
      value: teachers.length,
      icon: GraduationCap,
      change: '+2',
      changeType: 'increase',
      color: 'emerald'
    },
    {
      name: 'Total Subjects',
      value: subjects.length,
      icon: BookOpen,
      change: '+1',
      changeType: 'increase',
      color: 'purple'
    },
    {
      name: 'Active Students',
      value: batches.reduce((sum, batch) => sum + (batch.students || 0), 0),
      icon: UserCheck,
      change: '+15',
      changeType: 'increase',
      color: 'amber'
    },
    {
      name: 'Pending Registrations',
      value: teachers.filter(teacher => !teacher.registered).length,
      icon: Clock,
      change: '-2',
      changeType: 'decrease',
      color: 'orange'
    },
    {
      name: 'Growth Rate',
      value: '12.5%',
      icon: TrendingUp,
      change: '+2.1%',
      changeType: 'increase',
      color: 'green'
    }
  ];

  const getIconBg = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      emerald: 'bg-emerald-100 text-emerald-600',
      purple: 'bg-purple-100 text-purple-600',
      amber: 'bg-amber-100 text-amber-600',
      orange: 'bg-orange-100 text-orange-600',
      green: 'bg-green-100 text-green-600'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Overview</h1>
        <p className="text-gray-600 mt-2">Monitor your institute's performance and activities</p>
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Batches</h2>
          <div className="space-y-4">
            {batches.slice(0, 5).map((batch, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{batch.name}</p>
                    <p className="text-xs text-gray-500">
                      {batch.classTeacher ? `Class Teacher: ${batch.classTeacher}` : 'No class teacher assigned'}
                    </p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{batch.students || 0} students</span>
              </div>
            )) || (
              <div className="text-center py-4">
                <p className="text-gray-500 text-sm">No batches created yet</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Teacher Status</h2>
          <div className="space-y-4">
            {teachers.slice(0, 5).map((teacher, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{teacher.name}</p>
                    <p className="text-xs text-gray-500">{teacher.email}</p>
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
            )) || (
              <div className="text-center py-4">
                <p className="text-gray-500 text-sm">No teachers added yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;