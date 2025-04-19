import { getMessaging, getToken } from "firebase/messaging";
import firebaseapp from "./appInit";

const key = import.meta.env.VAPID_KEY;

const messaging = getMessaging(firebaseapp);

function getAndRegisterFCMToken() {
    getToken(messaging, { vapidKey: key }).then((newToken) => {
        if (newToken) {
            localStorage.setItem("fcm_token", newToken);
        }
        else {
            console.log("No registration token available. Request permission to generate one.");
        }
    }
    ).catch((err) => {
        console.error("An error occurred while retrieving token. ", err);
    });
}
function requestPermissionAndGetToken() {
    if (Notification.permission === "granted") {
        getAndRegisterFCMToken();
      } else if (Notification.permission === "default") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            getAndRegisterFCMToken();
          } else {
            alert("You need to allow notifications to receive them.");
          }
        });
      } else {
        alert("You have blocked notifications. Please enable them in your browser settings.");
      }
}

export default requestPermissionAndGetToken;