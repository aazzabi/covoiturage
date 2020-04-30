// In production, we register a service worker to serve assets from local cache.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on the "N+1" visit to a page, since previously
// cached resources are updated in the background.

// To learn more about the benefits of this model, read https://goo.gl/KwvDNy.
// This link also includes instructions on opting out of this behavior.

const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === "[::1]" ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export default function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    const publicUrl = new URL("http://localhost:3001/");
    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener("load", () => {
    });
    const swUrl = `http://localhost:3001/sw.js`;
    registerValidSW(swUrl);
  }
}

function registerValidSW(swUrl) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        installingWorker.onstatechange = () => {
          if (installingWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              console.log("New content is available; please refresh.");
            } else {
              console.log("Content is cached for offline use.");
            }
          } else if (installingWorker.state === "activated") {
            let sub;
            let user;
              const token = localStorage.getItem("jwtToken");
              registration.pushManager
              .getSubscription()
              .then(subscription => {
                sub = subscription;
                fetch(`http://localhost:3000/users/profile`, {
                  method: "GET",
                      headers: {
                          'Content-Type': 'application/json',
                          'Accept': 'application/json',
                          'Authorization': `Bearer ${token}`
              }
                })
                  .then(res => {
                      console.log("zzzazaaz");

                      res.json()
                      .then(data => { user = data; })
                      .then(() => {
                        if (sub) {
                          const body = JSON.stringify({ sub, user });
                          console.log(body);
                          fetch(
                            `http://localhost:3000/api/push/subscribe`,
                            {
                              method: "POST",
                              body,
                              headers: { "content-type": "application/json" }
                            }
                          );
                        } else {
                          registration.pushManager
                            .subscribe({
                              userVisibleOnly: true,
                              applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
                            })
                            .then(sub => {
                              const body = JSON.stringify({ sub, user });

                              fetch(
                                `http://localhost:3000/api/push/subscribe`,
                                {
                                  method: "POST",
                                  body,
                                  headers: { "content-type": "application/json" }
                                }
                              )
                              .then(() => {
                                const worker = new Worker(swUrl);
                                setInterval(() => {
                                  navigator.geolocation.getCurrentPosition(pos => {
                                    worker.postMessage({
                                      lat: pos.coords.latitude,
                                      lng: pos.coords.longitude,
                                      user
                                    });
                                  });
                                }, 60000);
                              });
                            })
                            .catch(console.log);
                        }
                      })
                      .catch(console.log);
                  })
                  .catch(console.log);
              })
              .catch(console.log);
          }
        };
      };
    })
    .catch(error => {
      console.error("Error during service worker registration:", error);
    });
}

function checkValidServiceWorker(swUrl) {
  fetch(swUrl)
    .then(response => {
      if (
        response.status === 404 ||
        response.headers.get("content-type").indexOf("javascript") === -1
      ) {
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        registerValidSW(swUrl);
      }
    })
    .catch(() => {
      console.log(
        "No internet connection found. App is running in offline mode."
      );
    });
}

export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister().then(() => console.log("unregistered service worker"));
    });
  }
}

const publicVapidKey =
  "BFtr-zLwB1QwRVtoG8AzL72ICVStkAO9_rtuDMLsRjfZFMz2XuvSFpjjDD1aOeE9Vpm542q5USaU6RE4QaGKSlo";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
