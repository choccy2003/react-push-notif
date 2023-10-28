import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePermission } from './notificationsSlice';

function App() {
  const dispatch = useDispatch();
  const notificationPermission = useSelector((state) => state.notifications.permission);

  const requestNotificationPermission = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          dispatch(updatePermission('granted'));
          
        }
      });
    }
  };

  const subscribeToPush = () => {
    navigator.serviceWorker.ready.then((registration) => {
      registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: 'BLWI8Y_QCnO54NtVfApmlbwVmY_uAfWvGNUZ04YGEOH-xZ26YKu7m-sVdpKfWZxw9f4Frsqb-_2geHv3ynBT6Jk',
      })
      .then((subscription) => {
        console.log(subscription)
        fetch('http://localhost:3001/subscribe', {
          method: 'POST',
          body: JSON.stringify(subscription),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      })
      .catch((error) => {
        console.error('Push subscription error:', error);
      });
    });
  };

  return (
    <div className="App">
      <h1>Push Notification Example</h1>
      <button onClick={requestNotificationPermission}>
        Request Notification Permission
      </button>
      <button onClick={subscribeToPush}>Subscribe to Push Notifications</button>
      <div>Push notification permission is currently {notificationPermission}</div>
    </div>
  );
}

export default App;