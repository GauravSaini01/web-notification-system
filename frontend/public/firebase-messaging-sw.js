importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyAvrNVwSH3Ea_YOGYdhT5xdWGiLiSvcpzc",
  authDomain: "fir-assignment-35374.firebaseapp.com",
  projectId: "fir-assignment-35374",
  storageBucket: "fir-assignment-35374.firebasestorage.app",
  messagingSenderId: "772797950483",
  appId: "1:772797950483:web:03243dcc7e1e455f8a6de6",
  measurementId: "G-3KG5CTMP5V"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.data?.title || "Notification";
    const notificationOptions = {
      body: payload.data?.body || "",
      image: payload.data?.image_url || "",
      data: {
        ...payload.data,
        url: payload.data?.action_url || "/",
      },
    };
    
    self.registration.showNotification(title, notificationOptions);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const target = event.notification.data?.url || "/";
  event.waitUntil(clients.openWindow(target));
});

