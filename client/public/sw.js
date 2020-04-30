'use strict';
self.addEventListener('push', e => {
  const data = e.data.json();
  console.log(data)
  const options = {
  };
  self.registration.showNotification(data.title, {
    body: `Hey ${data.username}!`,
    icon: 'images/icon.png',
    image: 'images/badge.png',

    requireInteraction: true,

    actions: [
      {action: 'addLocation', title: 'Add location'},
      {action: 'close', title: 'Close'},
    ]
  });
});

self.addEventListener('notificationclose', e => {
  console.log("notificationclose fired");
});

self.addEventListener('notificationclick', function(event) {
  console.log(event.data);
  event.waitUntil(
      clients.openWindow('http://localhost:3001/front/location/')
  );

});

self.addEventListener('pushsubscriptionchange', e => {
  //update subscription on server, but not sure how to get current user id
  // debugger
});

self.onabortpayment = e => {
  // debugger
};
self.onactivate = e => {
  console.log("service worker onactivate fired");
};
self.oncanmakepayment = e => {
  // debugger
};
self.onfetch = e => {
  // debugger
};
self.oninstall = e => {
  console.log("service worker oninstall fired")
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(displayLocationInfo);
  }

  function displayLocationInfo(position) {
    const lng = position.coords.longitude;
    const lat = position.coords.latitude;

    console.log(`longitude: ${ lng } | latitude: ${ lat }`);
  }
};
self.onmessage = e => {
  console.log("service worker onmessage fired", e.data);
};
self.onpaymentrequest = e => {
  // debugger
};
self.onsync = e => {
  // debugger
};
