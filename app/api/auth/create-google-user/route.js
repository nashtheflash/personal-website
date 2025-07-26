import { validateToken } from '@/lib/firebase/tenant-auth';
import { adminDb } from '@/lib/firebase/admin';

export async function POST(request) {
  try {
    const { idToken, userProfile } = await request.json();
    
    if (!idToken) {
      return Response.json({ error: 'ID token is required' }, { status: 400 });
    }
    
    if (!userProfile) {
      return Response.json({ error: 'User profile is required' }, { status: 400 });
    }
    
    // Validate the token
    const userInfo = await validateToken(idToken);
    
    // Check if user already exists in users collection
    const userDocRef = adminDb.collection('users').doc(userInfo.email);
    const userDoc = await userDocRef.get();
    
    if (userDoc.exists) {
      // User already exists, return success
      const existingUser = userDoc.data();
      return Response.json({
        success: true,
        user: existingUser,
        message: 'User already exists'
      });
    }
    
    // Create new user document
    const newUser = {
      first_name: userProfile.firstName || '',
      last_name: userProfile.lastName || '',
      email: userInfo.email,
      tenant: null, // Will need to be assigned by admin
      created_at: new Date(),
      auth_provider: 'google',
      google_id: userProfile.googleId || null
    };
    
    await userDocRef.set(newUser);
    
    return Response.json({
      success: true,
      user: newUser,
      message: 'User created successfully'
    });
    
  } catch (error) {
    console.error('Error creating Google user:', error);
    return Response.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
} 