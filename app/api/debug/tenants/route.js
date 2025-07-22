// import { adminDb } from '@/lib/firebase/admin';
//
// export async function GET() {
//   try {
//     const tenantsSnapshot = await adminDb.collection('tenants').get();
//     const tenants = [];
//     
//     tenantsSnapshot.forEach((doc) => {
//       tenants.push({
//         id: doc.id,
//         data: doc.data()
//       });
//     });
//     
//     console.log('All tenants:', tenants);
//     
//     return Response.json({
//       count: tenants.length,
//       tenants: tenants
//     });
//     
//   } catch (error) {
//     console.error('Error fetching tenants:', error);
//     return Response.json(
//       { error: 'Failed to fetch tenants', details: error.message },
//       { status: 500 }
//     );
//   }
// } 
