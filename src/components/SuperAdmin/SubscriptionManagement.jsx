import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Crown, Building2, Calendar, CreditCard, DollarSign } from 'lucide-react';
import { format } from 'date-fns';

const SubscriptionManagement = () => {
  const { institutes } = useData();
  const [selectedPlan, setSelectedPlan] = useState('all');

  const basicInstitutes = institutes.filter(inst => inst.plan === 'BASIC');
  const proInstitutes = institutes.filter(inst => inst.plan === 'PRO');

  const generatePaymentInfo = (institute) => ({
    lastPayment: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    nextPayment: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000),
    amount: institute.plan === 'PRO' ? 99 : 49,
    status: Math.random() > 0.1 ? 'active' : 'pending'
  });

  const filteredInstitutes = selectedPlan === 'all' ? institutes : 
    selectedPlan === 'basic' ? basicInstitutes : proInstitutes;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Subscription Management</h1>
        <p className="text-gray-600 mt-2">Monitor and manage institute subscriptions</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Basic Subscribers</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{basicInstitutes.length}</p>
              <p className="text-sm text-blue-600 mt-1">$49/month each</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pro Subscribers</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{proInstitutes.length}</p>
              <p className="text-sm text-purple-600 mt-1">$99/month each</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Crown className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                ${(basicInstitutes.length * 49) + (proInstitutes.length * 99)}
              </p>
              <p className="text-sm text-green-600 mt-1">+12% vs last month</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setSelectedPlan('all')}
              className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                selectedPlan === 'all'
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              All Subscriptions ({institutes.length})
            </button>
            <button
              onClick={() => setSelectedPlan('basic')}
              className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                selectedPlan === 'basic'
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Basic Plan ({basicInstitutes.length})
            </button>
            <button
              onClick={() => setSelectedPlan('pro')}
              className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                selectedPlan === 'pro'
                  ? 'border-purple-500 text-purple-600 bg-purple-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Pro Plan ({proInstitutes.length})
            </button>
          </nav>
        </div>

        <div className="p-6">
          {filteredInstitutes.length === 0 ? (
            <div className="text-center py-8">
              <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No institutes found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredInstitutes.map((institute) => {
                const paymentInfo = generatePaymentInfo(institute);
                return (
                  <div key={institute.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{institute.name}</h3>
                          <p className="text-sm text-gray-600">{institute.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          institute.plan === 'PRO' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {institute.plan}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          paymentInfo.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {paymentInfo.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Last Payment</p>
                          <p className="font-medium">{format(paymentInfo.lastPayment, 'MMM dd, yyyy')}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Next Payment</p>
                          <p className="font-medium">{format(paymentInfo.nextPayment, 'MMM dd, yyyy')}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <CreditCard className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Amount</p>
                          <p className="font-medium">${paymentInfo.amount}/month</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <DollarSign className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Total Paid</p>
                          <p className="font-medium">${paymentInfo.amount * Math.floor(Math.random() * 12 + 1)}</p>
                        </div>
                      </div>
                    </div>

                    {paymentInfo.status === 'pending' && (
                      <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <p className="text-sm text-amber-800">
                          Payment overdue. Last payment was on {format(paymentInfo.lastPayment, 'MMM dd, yyyy')}
                        </p>
                      </div>
                    )}
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

export default SubscriptionManagement;