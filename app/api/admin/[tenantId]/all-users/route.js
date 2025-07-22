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

        // Get all users data from Firestore
        const usersRef = adminDb.collection('users');
        const usersQuery = await usersRef.get();

        if (usersQuery.empty) {
            return Response.json({
                success: true,
                tenantId,
                user: userInfo.email,
                users: [],
                totalUsers: 0
            });
        }

        const users = usersQuery.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return Response.json({
            success: true,
            tenantId,
            user: userInfo.email,
            users,
            totalUsers: users.length
        });

    } catch (error) {
        console.error('Error fetching all users:', error);
        return Response.json(
            { error: 'Failed to fetch all users' },
            { status: 500 }
        );
    }
} 


