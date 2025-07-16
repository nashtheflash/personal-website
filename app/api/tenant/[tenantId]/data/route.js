import { withTenantAuth } from '@/lib/firebase/tenant-auth';
import { adminDb } from '@/lib/firebase/admin';

async function handler(req, res) {
  try {
    const { tenantId } = req;
    const { user } = req;
    
    return res.status(200).json({
      success: true,
      tenantId,
      user: user.email,
      message: 'Tenant access validated successfully'
    });
    
  } catch (error) {
    console.error('Error in tenant handler:', error);
    return res.status(500).json({
      error: 'Failed to process request'
    });
  }
}

// Wrap the handler with tenant authentication middleware
export const GET = withTenantAuth(handler);
export const POST = withTenantAuth(handler); 