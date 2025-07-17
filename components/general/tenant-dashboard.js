'use client'

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/firebase/auth-context';
import { useServerAuth, useAuthenticatedApi, useIdToken } from '@/lib/firebase/auth-hooks';

export default function TenantDashboard() {
  const { user, loading } = useAuth();
  const { serverUser, serverTenant, isValidated, hasValidTenant, error } = useServerAuth();
  const makeAuthenticatedRequest = useAuthenticatedApi();
  const idToken = useIdToken();
  
  const [dashboardData, setDashboardData] = useState(null);
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [dashboardError, setDashboardError] = useState(null);
  
  // Debug logging
  useEffect(() => {
    console.log('Server auth state:', {
      serverUser,
      serverTenant,
      isValidated,
      hasValidTenant,
      error
    });
  }, [serverUser, serverTenant, isValidated, hasValidTenant, error]);

  // Auto-fetch dashboard data when tenant is available
  // useEffect(() => {
  //   if (hasValidTenant && serverTenant?.id) {
  //     fetchTenantDashboard(serverTenant.id);
  //   }
  // }, [hasValidTenant, serverTenant?.id]);

  const fetchTenantDashboard = async (tenantId) => {
    if (!tenantId) return;
    
    setDashboardLoading(true);
    setDashboardError(null);
    
    try {
      const data = await makeAuthenticatedRequest(
        `/api/tenant/${tenantId}/dashboard`
      );
      console.log('Tenant dashboard data:', data);
      setDashboardData(data);
      return data;
    } catch (error) {
      console.error('Failed to fetch tenant dashboard data:', error);
      setDashboardError(error.message);
      throw error;
    } finally {
      setDashboardLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading authentication...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Authentication Required</h2>
          <p className="text-gray-600">Please log in to access the tenant dashboard.</p>
        </div>
      </div>
    );
  }

  if (!isValidated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Validating with server...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Authentication Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!hasValidTenant) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-orange-600 mb-4">No Tenant Access</h2>
          <p className="text-gray-600 mb-4">
            Your account ({serverUser?.email}) is not associated with any tenant.
          </p>
          <p className="text-sm text-gray-500">
            Contact your administrator to get tenant access.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Tenant Dashboard</h1>
        
        {/* User Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">User Information</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Email:</span> {serverUser?.email}</p>
              <p><span className="font-medium">UID:</span> {serverUser?.uid}</p>
              <p><span className="font-medium">Email Verified:</span> {serverUser?.emailVerified ? 'Yes' : 'No'}</p>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-700 mb-3">Tenant Information</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Tenant ID:</span> {serverTenant?.id || 'N/A'}</p>
              <p><span className="font-medium">Tenant Name:</span> {serverTenant?.name || 'N/A'}</p>
              <p><span className="font-medium">Status:</span> 
                <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {serverTenant?.status || 'Active'}
                </span>
              </p>
              <button
                onClick={() => {
                  if (idToken) {
                    console.log('ID Token:', idToken);
                    alert('ID Token logged to console!');
                  } else {
                    alert('No ID token available');
                  }
                }}
                className="mt-2 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
              >
                Log ID Token to Console
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Data Section */}
        <div className="bg-green-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-green-700">Dashboard Data</h3>
            <button
              onClick={() => fetchTenantDashboard(serverTenant?.id)}
              disabled={dashboardLoading}
              className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 disabled:opacity-50"
            >
              {dashboardLoading ? 'Loading...' : 'Refresh Dashboard'}
            </button>
          </div>
          
          {dashboardLoading && (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading dashboard data...</p>
            </div>
          )}
          
          {dashboardError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <strong>Error:</strong> {dashboardError}
            </div>
          )}
          
          {dashboardData && !dashboardLoading && (
            <div className="space-y-2">
              <p><span className="font-medium">Status:</span> {dashboardData.success ? 'Success' : 'Failed'}</p>
              <p><span className="font-medium">Last Updated:</span> {dashboardData.lastUpdated ? new Date(dashboardData.lastUpdated).toLocaleString() : 'N/A'}</p>
              <div className="mt-4">
                <h4 className="font-medium text-gray-700 mb-2">Dashboard Content:</h4>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
                  {JSON.stringify(dashboardData.dashboard, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
} 
