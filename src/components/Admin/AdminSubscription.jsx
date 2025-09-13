import React from 'react';
import { Crown, Calendar, CreditCard, CheckCircle, ArrowUp } from 'lucide-react';
import { format, addMonths } from 'date-fns';

const AdminSubscription = () => {
  // Mock subscription data - in real app, get from API
  const subscriptionData = {
    plan: 'BASIC',
    status: 'active',
    startDate: new Date('2024-01-15'),
    expiryDate: addMonths(new Date('2024-01-15'), 1),
    nextPayment: addMonths(new Date(), 1),
    amount: 49,
    paymentHistory: [
      { date: new Date('2024-01-15'), amount: 49, status: 'paid' },
      { date: new Date('2023-12-15'), amount: 49, status: 'paid' },
      { date: new Date('2023-11-15'), amount: 49, status: 'paid' }
    ]
  };

  const isPro = subscriptionData.plan === 'PRO';
  const isExpiringSoon = new Date(subscriptionData.expiryDate) - new Date() < 7 * 24 * 60 * 60 * 1000;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Subscription</h1>
        <p className="text-gray-600 mt-2">Manage your institute's subscription plan</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Current Plan */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  isPro ? 'bg-purple-100' : 'bg-blue-100'
                }`}>
                  {isPro ? (
                    <Crown className="w-6 h-6 text-purple-600" />
                  ) : (
                    <CreditCard className="w-6 h-6 text-blue-600" />
                  )}
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold text-gray-900">{subscriptionData.plan} Plan</h2>
                  <p className="text-gray-600">${subscriptionData.amount}/month</p>
                </div>
              </div>
              
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                subscriptionData.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                <CheckCircle className="w-4 h-4 inline mr-1" />
                {subscriptionData.status.charAt(0).toUpperCase() + subscriptionData.status.slice(1)}
              </span>
            </div>

            {/* Subscription Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Calendar className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Start Date</p>
                <p className="font-semibold">{format(subscriptionData.startDate, 'MMM dd, yyyy')}</p>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Calendar className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Expiry Date</p>
                <p className="font-semibold">{format(subscriptionData.expiryDate, 'MMM dd, yyyy')}</p>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <CreditCard className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Next Payment</p>
                <p className="font-semibold">{format(subscriptionData.nextPayment, 'MMM dd, yyyy')}</p>
              </div>
            </div>

            {/* Expiry Warning */}
            {isExpiringSoon && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <p className="text-amber-800 text-sm">
                  ⚠️ Your subscription expires on {format(subscriptionData.expiryDate, 'MMM dd, yyyy')}. 
                  Renew now to avoid service interruption.
                </p>
              </div>
            )}

            {/* Plan Features */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Plan Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Unlimited Batches</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Up to 50 Teachers</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Basic Analytics</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Email Support</span>
                </div>
                {isPro && (
                  <>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700">Advanced Analytics</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700">Priority Support</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700">Custom Branding</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700">API Access</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              {!isPro && (
                <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center">
                  <ArrowUp className="w-5 h-5 mr-2" />
                  Upgrade to Pro
                </button>
              )}
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors">
                Renew Subscription
              </button>
            </div>
          </div>
        </div>

        {/* Payment History */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment History</h3>
          
          <div className="space-y-4">
            {subscriptionData.paymentHistory.map((payment, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">${payment.amount}</p>
                  <p className="text-sm text-gray-600">{format(payment.date, 'MMM dd, yyyy')}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  payment.status === 'paid' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {payment.status}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Paid:</span>
              <span className="font-semibold text-gray-900">
                ${subscriptionData.paymentHistory.reduce((sum, p) => sum + p.amount, 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSubscription;