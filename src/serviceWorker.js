/* eslint-disable no-restricted-globals */
let deferredPrompt;

export function register(config) {
  const swUrl = `${process.env.PUBLIC_URL}/sw.js`;

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register(swUrl).then(reg => {
        console.log('Service worker registered.', reg);
      });

      window.addEventListener('beforeinstallprompt', event => {
        event.preventDefault();
        console.log('PWA beforeinstallprompt');
        deferredPrompt = event;
      });
    });
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}

// This could be any event we like
setTimeout(() => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(result => {
      if (result.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }

      deferredPrompt = null;
    });
  }
}, 2000);
