import { getMessaging, onMessage } from "firebase/messaging";
import firebaseapp from "./appInit";

const messaging = getMessaging(firebaseapp);

onMessage(messaging, (payload) => {
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
    
}
);
