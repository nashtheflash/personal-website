'use client'

import { useState } from 'react';
import { useAuth } from '@/lib/firebase/auth-context';
import { updateUserTenant } from '@/lib/firebase/firestore/users';

export default function TestTenantPage() {
  const { user } = useAuth();
  const [tenantId, setTenantId] = useState('0');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const addTenant = async () => {
    if (!user?.email) {
      setMessage('No user email available');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      await updateUserTenant(user.email, tenantId);
      setMessage(`Successfully added tenant "${tenantId}" to your account!`);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Test Tenant Assignment</h1>
      
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <p><strong>Current User:</strong> {user?.email || 'Not logged in'}</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Tenant ID:</label>
          <input
            type="text"
            value={tenantId}
            onChange={(e) => setTenantId(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter tenant ID"
          />
        </div>

        <button
          onClick={addTenant}
          disabled={loading || !user?.email}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Adding Tenant...' : 'Add Tenant to User'}
        </button>

        {message && (
          <div className={`p-3 rounded ${
            message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}>
            {message}
          </div>
        )}
      </div>

      <div className="mt-6 text-sm text-gray-600">
        <p>After adding a tenant, go to <a href="/tenant-dashboard" className="text-blue-600 underline">/tenant-dashboard</a> to test the full system.</p>
      </div>
    </div>
  );
} 