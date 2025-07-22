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

        if (tenantId != 0) {
            return Response.json({ error: 'User not god-mode' }, { status: 403 });
        }

        // Get all tenats data from Firestore
        const tenantRef = adminDb.collection('tenants');
        const tenantQuery = await tenantRef.get();

        if (tenantQuery.empty) {
            return Response.json({
                success: true,
                tenantId,
                user: userInfo.email,
                tenants: [],
                totalUsers: 0
            });
        }

        const tenants = tenantQuery.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return Response.json({
            success: true,
            tenantId,
            user: userInfo.email,
            tenants,
            totalTenants: tenants.length
        });

    } catch (error) {
        console.error('Error fetching all tenants:', error);
        return Response.json(
            { error: 'Failed to fetch all tenant' },
            { status: 500 }
        );
    }
} 



