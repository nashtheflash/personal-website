import { adminDb } from '@/lib/firebase/admin';

export async function GET(request, { params }) {
  try {
    const tenantId = params.id;
    console.log('Checking for tenant ID:', tenantId);
    
    const tenantDocRef = adminDb.collection('tenants').doc(tenantId);
    const tenantDoc = await tenantDocRef.get();
    
    if (tenantDoc.exists) {
      const tenantData = tenantDoc.data();
      console.log('Tenant found:', tenantData);
      
      return Response.json({
        exists: true,
        id: tenantId,
        data: tenantData
      });
    } else {
      console.log('Tenant not found');
      
      return Response.json({
        exists: false,
        id: tenantId,
        message: 'Tenant document does not exist'
      });
    }
    
  } catch (error) {
    console.error('Error checking tenant:', error);
    return Response.json(
      { error: 'Failed to check tenant', details: error.message },
      { status: 500 }
    );
  }
} 