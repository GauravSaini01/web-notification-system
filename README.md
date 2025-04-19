# 📣 Web Notification System

A lightweight, real-time web notification service that delivers browser push notifications using **Firebase Cloud Messaging (FCM)** and **RabbitMQ**. This system enables users to subscribe to notifications through a web interface and receive messages triggered by backend events.

---

## 🛠️ Installation and Setup Instructions

Follow these steps to set up the project locally:

### 1. Fork the Repository

First, fork the repository to your GitHub account.

### 2. Clone the Repository

Clone your forked repository to your local machine:

```bash
git clone https://github.com/your-username/web-notification-system.git
cd web-notification-system
```

---

### 3. Firebase Setup

#### a. Create a Firebase Project
- Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.

#### b. Configure the Frontend
- In **Project Settings → General**, register a new web app.
- Copy the configuration object and add it to `frontend/src/utils/firebase-config.js` and `frontend/public/firebase-messaging-sw.js`:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET_ID"
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};
```

- In **Firebase Cloud Messaging**, generate a **Web Push certificate (VAPID key)**.
- Copy the `.env.example` file and rename it to `.env`:

```bash
cp .env.example .env
```

- Update VAPID key in your `.env` file:

```bash
VAPID_KEY=YOUR_VAPID_KEY
```

This ensures the VAPID key is securely loaded from the `.env` file.

#### c. Configure the Backend and Worker
- In **Project Settings → Service Accounts**, generate a new private key and download the JSON credentials file.
- Replace all the .env variables in your .env file according to the values in your `backend/firebase-credentials.json`.

---

### 4. Run with Docker Compose

Make sure Docker is installed and running. Then, start the services:

```bash
docker-compose up --build
```

This will launch:
- RabbitMQ with the management UI.
- FastAPI backend for API handling.
- Background worker for sending FCM notifications.

---
### 5. Open the Application
Navigate to the `frontend` directory and run:

```bash
cd frontend
npm install
npm run dev
```

This will start the frontend application locally, and you can access it in your browser at:

```
http://localhost:5173
```

This will allow you to test the frontend in a development environment while the backend and worker are running with Docker Compose.

---