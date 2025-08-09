// BARPLAS Portal - Service Worker para PWA
const CACHE_NAME = 'barplas-portal-v1.0.0'
const OFFLINE_URL = '/offline.html'

const STATIC_CACHE_URLS = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
]

const RUNTIME_CACHE_URLS = [
  '/productos.json'
]

// Instalación del Service Worker
self.addEventListener('install', event => {
  console.log('BARPLAS PWA: Service Worker instalando...')
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('BARPLAS PWA: Cacheando archivos estáticos')
        return cache.addAll(STATIC_CACHE_URLS)
      })
      .then(() => {
        return self.skipWaiting()
      })
  )
})

// Activación del Service Worker
self.addEventListener('activate', event => {
  console.log('BARPLAS PWA: Service Worker activando...')
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('BARPLAS PWA: Eliminando cache antigua:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    }).then(() => {
      return self.clients.claim()
    })
  )
})

// Interceptar requests para estrategia de cache
self.addEventListener('fetch', event => {
  // Solo manejar requests GET
  if (event.request.method !== 'GET') return

  const url = new URL(event.request.url)
  
  // Manejar navegación (HTML)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Si la respuesta es válida, actualizar cache y retornar
          if (response.status === 200) {
            const responseClone = response.clone()
            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, responseClone))
          }
          return response
        })
        .catch(() => {
          // Si falla, intentar desde cache
          return caches.match(event.request)
            .then(response => {
              return response || caches.match(OFFLINE_URL)
            })
        })
    )
    return
  }

  // Manejar assets estáticos (JS, CSS, imágenes)
  if (url.pathname.includes('/assets/') || 
      url.pathname.endsWith('.js') ||
      url.pathname.endsWith('.css') ||
      url.pathname.endsWith('.png') ||
      url.pathname.endsWith('.jpg') ||
      url.pathname.endsWith('.svg')) {
    
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          if (response) {
            return response
          }
          
          return fetch(event.request)
            .then(response => {
              if (response.status === 200) {
                const responseClone = response.clone()
                caches.open(CACHE_NAME)
                  .then(cache => cache.put(event.request, responseClone))
              }
              return response
            })
        })
    )
    return
  }

  // Manejar datos JSON (productos, clientes, etc)
  if (url.pathname.endsWith('.json') || url.pathname.includes('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response.status === 200) {
            const responseClone = response.clone()
            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, responseClone))
          }
          return response
        })
        .catch(() => {
          return caches.match(event.request)
        })
    )
    return
  }
})

// Manejo de mensajes desde la app principal
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

// Push Notifications para pedidos urgentes
self.addEventListener('push', event => {
  console.log('BARPLAS PWA: Push notification recibida')
  
  const options = {
    body: event.data ? event.data.text() : 'Nuevo pedido recibido',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver pedido',
        icon: '/icon-pedido.png'
      },
      {
        action: 'close',
        title: 'Cerrar',
        icon: '/icon-close.png'
      }
    ]
  }
  
  event.waitUntil(
    self.registration.showNotification('BARPLAS Portal', options)
  )
})

// Manejar clicks en notificaciones
self.addEventListener('notificationclick', event => {
  console.log('BARPLAS PWA: Notification click recibido')
  
  event.notification.close()
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/pedidos')
    )
  }
})

// Background Sync para sincronizar datos offline
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync-pedidos') {
    console.log('BARPLAS PWA: Sincronizando pedidos en background')
    
    event.waitUntil(
      // Aquí se implementaría la lógica de sincronización
      // con la base de datos cuando vuelva la conexión
      syncPedidos()
    )
  }
})

async function syncPedidos() {
  try {
    // Implementar lógica de sincronización de pedidos
    console.log('BARPLAS PWA: Sincronización de pedidos completada')
  } catch (error) {
    console.error('BARPLAS PWA: Error en sincronización:', error)
  }
}

console.log('BARPLAS PWA: Service Worker cargado correctamente')