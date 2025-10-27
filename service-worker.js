// service-worker.js

// This file is a mock service worker for demonstrating push notifications.

// On install, the service worker is installed.
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installed');
  self.skipWaiting(); // Force the waiting service worker to become the active service worker.
});

// On activate, the service worker is activated.
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activated');
  // Take control of all pages under its scope immediately.
  event.waitUntil(clients.claim());
});

// This event listener is for real push notifications from a server.
// For this demo, we are triggering notifications from the client script,
// but this shows how it would be handled in a real application.
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : { title: 'AdSokoni', body: 'You have a new notification.' };
  const title = data.title;
  const options = {
    body: data.body,
    icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzE2YTM0YSI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEycy40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptLTIgMTVsLTUtNSAxLjQxLTEuNDFMMTAgMTQuMTdsNy41OS03LjU5TDE5IDhsLTkgOXoiLz48L3N2Zz4=',
    badge: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzE2YTM0YSI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEycy40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptLTIgMTVsLTUtNSAxLjQxLTEuNDFMMTAgMTQuMTdsNy41OS03LjU5TDE5IDhsLTkgOXoiLz48L3N2Zz4=',
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

// Handle notification click: focus or open the app.
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // If a window for the app is already open, focus it.
      for (const client of clientList) {
        if ('focus' in client) {
          return client.focus();
        }
      }
      // Otherwise, open a new window.
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});
