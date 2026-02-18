// ═══════════════════════════════════════════════════════════════════════════
// Service Worker Registration
// ═══════════════════════════════════════════════════════════════════════════

export function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW registered:", registration.scope);

          // Check for updates periodically
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing;
            newWorker.addEventListener("statechange", () => {
              if (
                newWorker.state === "activated" &&
                navigator.serviceWorker.controller
              ) {
                console.log("New content available; please refresh.");
              }
            });
          });
        })
        .catch((error) => {
          console.log("SW registration failed:", error);
        });
    });
  }
}
