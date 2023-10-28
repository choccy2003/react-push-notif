self.addEventListener('push', (event) => {
    const options = {
      body: event.data.text(),
      icon: "./logo192.png"
    };
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
  });
  