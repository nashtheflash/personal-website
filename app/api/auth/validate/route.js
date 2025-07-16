import { validateToken, getUserTenant, getTenantInfo } from '@/lib/firebase/tenant-auth';

export async function POST(request) {
  try {
    const { idToken } = await request.json();
    
    if (!idToken) {
      return Response.json({ error: 'ID token is required' }, { status: 400 });
    }
    
    // Validate the token
    const userInfo = await validateToken(idToken);
    
    // Get user's tenant information
    const tenantId = await getUserTenant(userInfo.email);
    console.log('User tenant ID:', tenantId);
    
    let tenant = null;
    
    if (tenantId !== null) {
      // Get full tenant information
      tenant = await getTenantInfo(tenantId);
      console.log('Tenant info:', tenant);
    }
    
    const response = {
      user: userInfo,
      tenant,
      tenantId,
      isAuthenticated: true,
    };
    
    console.log('Auth validation response:', response);
    
    return Response.json(response);
    
  } catch (error) {
    console.error('Auth validation error:', error);
    return Response.json(
      { error: 'Authentication failed', isAuthenticated: false },
      { status: 401 }
    );
  }
} 