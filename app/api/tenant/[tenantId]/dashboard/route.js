import { validateToken, validateTenantAccess } from '@/lib/firebase/tenant-auth';
import { adminDb } from '@/lib/firebase/admin';

export async function GET(request, { params }) {
  try {
    const { tenantId } = params;
    
    // Get the authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return Response.json({ error: 'No valid authorization header' }, { status: 401 });
    }

    const idToken = authHeader.split('Bearer ')[1];
    
    // Validate the token
    const userInfo = await validateToken(idToken);
    
    if (!tenantId) {
      return Response.json({ error: 'Tenant ID is required' }, { status: 400 });
    }
    
    // Validate tenant access
    const hasAccess = await validateTenantAccess(userInfo.email, tenantId);
    
    if (!hasAccess) {
      return Response.json({ error: 'Access denied to this tenant' }, { status: 403 });
    }
    
    // Get dashboard data from Firestore
    const dashboardRef = adminDb.collection('dashboards').doc(tenantId);
    const dashboardDoc = await dashboardRef.get();
    
    if (!dashboardDoc.exists) {
      return Response.json({
        error: 'Dashboard not found for this tenant'
      }, { status: 404 });
    }
    
    const dashboardData = dashboardDoc.data();
    
    return Response.json({
      success: true,
      tenantId,
      user: userInfo.email,
      dashboard: dashboardData,
      lastUpdated: dashboardDoc.updateTime?.toDate?.() || null
    });
    
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return Response.json({
      error: 'Failed to fetch dashboard data'
    }, { status: 500 });
  }
} 