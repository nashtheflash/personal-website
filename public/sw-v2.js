// Service Worker for Firebase Auth caching - v2 file
const CACHE_NAME = 'firebase-auth-cache-v5'

self.addEventListener('install', (event) => {
  console.log('Service Worker v5 installing from sw-v2.js...')
  event.waitUntil(
    caches.open(CACHE_NAME).then(() => {
      console.log('Cache opened successfully')
    })
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = request.url
  const method = request.method
  
  // console.log('SW v2 fetch event:', method, url)
  
  // CRITICAL: Handle POST requests first and NEVER cache them
  if (method === 'POST') {
    console.log('POST request detected, passing through without caching:', url)
    event.respondWith(fetch(request))
    return
  }
  
  // Handle GET requests for Firebase
  if ((url.includes('firebase') || url.includes('identitytoolkit')) && method === 'GET') {
    console.log('Processing GET Firebase request:', url)
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            console.log('Returning cached response for:', url)
            return cachedResponse
          }
          
          return fetch(request).then((networkResponse) => {
            // Only cache successful responses
            if (networkResponse.status === 200) {
              console.log('Caching successful response for:', url)
              cache.put(request, networkResponse.clone())
            }
            return networkResponse
          }).catch((error) => {
            console.log('Fetch failed for:', url, error)
            return new Response('Network error', { status: 500 })
          })
        })
      })
    )
  }
  
  // For all other requests, don't intercept at all
  // This ensures we don't interfere with any other requests
})

self.addEventListener('activate', (event) => {
  console.log('Service Worker v5 activating from sw-v2.js...')
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    }).then(() => {
      console.log('Service Worker v5 activated successfully')
      // Claim all clients immediately
      return self.clients.claim()
    })
  )
}) 
