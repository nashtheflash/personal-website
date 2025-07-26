# Personal Website

A Next.js personal website with multi-tenant authentication using Firebase.

## Multi-Tenant Authentication

This application now includes a complete multi-tenant authentication system using Firebase Admin SDK alongside the existing client-side Firebase SDK.

### Authentication Methods

The application supports multiple authentication methods:

1. **Email/Password Authentication** - Traditional email and password login
2. **Google OAuth Authentication** - Sign in with Google accounts
3. **Multi-tenant Support** - Users are assigned to specific tenants with access control

### Google Auth Integration

Google Authentication has been integrated into the existing authentication system. Users can now sign in or sign up using their Google accounts.

#### Features

- **Seamless Integration**: Works with existing multi-tenant system
- **Account Selection**: Forces Google account selection for better UX
- **Profile Information**: Automatically extracts user profile data from Google
- **Token Management**: Uses Firebase ID tokens for server-side validation
- **Error Handling**: Comprehensive error handling for authentication failures
- **User Creation**: Automatically creates user entries in Firestore users collection
- **Tenant Assignment**: Handles users without tenant access gracefully

#### Multi-Tenant User Creation

When users sign up with Google Auth:

1. **User Authentication**: User authenticates with Google
2. **Profile Extraction**: User profile data is extracted from Google
3. **Firestore Entry**: User document is created in the `users` collection with:
   - `first_name` and `last_name` from Google profile
   - `email` from Google account
   - `tenant: null` (needs admin assignment)
   - `auth_provider: 'google'`
   - `google_id` for reference
   - `created_at` timestamp
4. **Token Management**: Firebase ID token is set as cookie
5. **Access Control**: User is redirected based on tenant access

#### User Access States

- **Admin Users** (tenant ID 0): Access to admin dashboard
- **Tenant Users** (assigned tenant): Access to client dashboard
- **No Tenant Access**: Shows "Access Pending" screen with contact admin option

#### Configuration

1. **Firebase Console Setup**:
   - Go to Firebase Console → Authentication → Sign-in method
   - Enable Google provider
   - Add your authorized domains
   - Configure OAuth consent screen if needed

2. **Environment Variables** (already configured):
   ```bash
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   ```

#### Usage

The Google Auth buttons are available on both login and sign-up pages:

- **Login Page**: `/partners` - "Login with Google" button
- **Sign-up Page**: `/signup` - "Sign up with Google" button

#### Components

- `lib/firebase/auth-utils.js` - Google Auth utility functions
- `app/components/general/login.js` - Login component with Google Auth
- `app/components/general/sign-up.js` - Sign-up component with Google Auth
- `app/components/auth/no-tenant-access.js` - Component for users without tenant access
- `app/api/auth/create-google-user/route.js` - API endpoint for creating user entries

#### Server-Side Integration

Google Auth users are automatically integrated with the existing tenant system:

- User tokens are validated server-side using Firebase Admin SDK
- Tenant access control works the same for Google Auth users
- All existing API routes and hooks work seamlessly
- User entries are created in Firestore users collection
- Admin can assign tenants to Google Auth users through existing admin interface

#### Admin Workflow

1. **User signs up with Google**: Creates entry in users collection with `tenant: null`
2. **Admin receives notification**: User appears in admin dashboard
3. **Admin assigns tenant**: Uses existing user management interface
4. **User gains access**: Can now access tenant-specific features

### Architecture

- **Client-side Firebase SDK**: Handles user authentication (login, logout, session management)
- **Server-side Firebase Admin SDK**: Validates tokens and enforces tenant access control
- **API Routes**: Protected endpoints that require tenant authentication
- **React Hooks**: Custom hooks for managing authentication state and making authenticated requests

### Key Components

#### Server-Side (Admin SDK)
- `lib/firebase/admin.js` - Firebase Admin SDK initialization
- `lib/firebase/tenant-auth.js` - Token validation and tenant access control
- `app/api/auth/validate/route.js` - Server-side authentication validation
- `app/api/tenant/[tenantId]/data/route.js` - Example protected API route

#### Client-Side (Firebase SDK)
- `lib/firebase/auth-context.js` - React context for authentication state
- `lib/firebase/auth-hooks.js` - Custom hooks for authentication and API calls
- `components/general/tenant-dashboard.js` - Example tenant dashboard component

### Environment Variables

Add these to your `.env.local` file:

```bash
# Existing Firebase config (client-side)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# New Firebase Admin SDK config (server-side)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_service_account_email
FIREBASE_PRIVATE_KEY=your_private_key
```

### Getting Firebase Admin SDK Credentials

1. Go to Firebase Console → Project Settings → Service Accounts
2. Click "Generate new private key"
3. Download the JSON file
4. Extract the values for the environment variables above

### Usage

#### Basic Authentication
```javascript
import { useAuth } from '@/lib/firebase/auth-context';

function MyComponent() {
  const { user, loading, isAuthenticated } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Please log in</div>;
  
  return <div>Welcome, {user.email}!</div>;
}
```

#### Server-Side Validation
```javascript
import { useServerAuth } from '@/lib/firebase/auth-hooks';

function MyComponent() {
  const { serverUser, serverTenant, hasValidTenant } = useServerAuth();
  
  if (!hasValidTenant) return <div>No tenant access</div>;
  
  return <div>Tenant: {serverTenant}</div>;
}
```

#### Making Authenticated API Calls
```javascript
import { useAuthenticatedApi } from '@/lib/firebase/auth-hooks';

function MyComponent() {
  const makeAuthenticatedRequest = useAuthenticatedApi();
  
  const fetchData = async () => {
    try {
      const data = await makeAuthenticatedRequest(
        `/api/tenant/${tenantId}/data?tenantId=${tenantId}`
      );
      console.log(data);
    } catch (error) {
      console.error('API call failed:', error);
    }
  };
}
```

#### Creating Protected API Routes
```javascript
import { withTenantAuth } from '@/lib/firebase/tenant-auth';

async function handler(req, res) {
  // req.user contains validated user info
  // req.tenantId contains the validated tenant ID
  
  const data = await getTenantSpecificData(req.tenantId);
  return res.json(data);
}

export const GET = withTenantAuth(handler);
```

### Data Structure

#### Users Collection
```javascript
{
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "tenant": "tenant-123"
}
```

#### Tenants Collection
```javascript
{
  "id": "tenant-123",
  "name": "Acme Corp",
  "status": "active"
}
```

### Security Features

- **Token Validation**: All API requests validate Firebase ID tokens server-side
- **Tenant Isolation**: Users can only access data from their assigned tenant
- **Automatic Validation**: Client-side hooks automatically validate with server
- **Error Handling**: Comprehensive error handling for authentication failures

### Demo

Visit `/tenant-dashboard` to see the multi-tenant system in action.

## Development

```bash
npm install
npm run dev
```

## Building

```bash
npm run build
npm start
```
