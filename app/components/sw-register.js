// 'use client'
//
// import { useEffect } from 'react'
//
// export function ServiceWorkerRegister() {
//   useEffect(() => {
//     if ('serviceWorker' in navigator) {
//       window.addEventListener('load', async () => {
//         try {
//           // Unregister any existing service workers first
//           const registrations = await navigator.serviceWorker.getRegistrations()
//           for (let registration of registrations) {
//             await registration.unregister()
//             console.log('Unregistered old service worker')
//           }
//           
//           // Clear all caches
//           const cacheNames = await caches.keys()
//           await Promise.all(cacheNames.map(name => caches.delete(name)))
//           console.log('Cleared all caches')
//           
//           // Register new service worker with different filename
//           const registration = await navigator.serviceWorker.register('/sw-v2.js', { 
//             updateViaCache: 'none',
//             scope: '/'
//           })
//           
//           console.log('SW v2 registered: ', registration)
//           
//           // Force immediate update
//           await registration.update()
//           
//           // Listen for updates
//           registration.addEventListener('updatefound', () => {
//             console.log('Service Worker update found')
//           })
//           
//           // Listen for controller change
//           navigator.serviceWorker.addEventListener('controllerchange', () => {
//             console.log('Service Worker controller changed')
//             window.location.reload()
//           })
//           
//         } catch (registrationError) {
//           console.log('SW registration failed: ', registrationError)
//         }
//       })
//     }
//   }, [])
//
//   return null
// } 
