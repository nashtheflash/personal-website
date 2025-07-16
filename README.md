# Personal Website

A Next.js personal website with multi-tenant authentication using Firebase.

## Multi-Tenant Authentication

This application now includes a complete multi-tenant authentication system using Firebase Admin SDK alongside the existing client-side Firebase SDK.

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
