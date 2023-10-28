const express = require('express');
const webPush = require('web-push');
const cors = require('cors');
const app = express();
const port = 3001;
app.use(cors());
require('dotenv').config()
const vapidKeys = {
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
};

webPush.setVapidDetails(
  'mailto:your@email.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

app.use(express.json());

app.post('/subscribe', (req, res) => {

  const subscription = req.body;
  

  res.status(201).json({});

  const payload = JSON.stringify("Push notification example!!");

  webPush.sendNotification(subscription, payload)
    .catch((error) => {
      console.error('Push notification error:', error);
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});