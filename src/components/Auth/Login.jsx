import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const trimmedEmail = email.trim();

    if (trimmedEmail === 'superadmin@qubex.com' && password === 'admin123') {
      login({
        email: trimmedEmail,
        role: 'superadmin',
        name: 'Super Admin',
        id: 'superadmin'
      });
      setTimeout(() => navigate('/superadmin'), 0);
    } else if (trimmedEmail === 'admin@institute.com' && password === 'admin123') {
      login({
        email: trimmedEmail,
        role: 'admin',
        name: 'Institute Admin',
        id: 'admin1',
        instituteId: 'inst1'
      });
      setTimeout(() => navigate('/admin'), 0);
    } else {
      setError('Invalid credentials');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-purple-50 flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center mb-6">
        <img src="/QubeExlogo.png" alt="QubeEx Logo" className="w-20 h-20 mb-2" />
        <h1 className="text-4xl font-qube font-extrabold text-gray-700 mb-1">QubeEx</h1>
        <p className="text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 bg-200 bg-clip-text text-transparent animate-shine-gradient">
          An AI-Powered SAS Platform
        </p>
      </div>

      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">{error}</div>}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full pl-11 pr-11 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-lg font-medium text-white
                       bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500
                       bg-[length:200%_200%] animate-gradient-x
                       transition-all duration-500 transform hover:scale-105 hover:brightness-110
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg text-xs text-gray-600">
          <p><strong>SuperAdmin:</strong> superadmin@qubex.com / admin123</p>
          <p><strong>Admin:</strong> admin@institute.com / admin123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
