import { useEffect } from 'react'
import './index.css'
import requestPermissionAndGetToken from './fcm/messageInit'
import axios from 'axios';

function App() {
  useEffect(() => {
    requestPermissionAndGetToken();
  }, [])
  return (
    <>
      <div className=' flex justify-center items-center h-screen'>
        <button className='bg-black shadow-xl text-white  text-xl px-4 py-2 rounded-full cursor-pointer hover:scale-105'
          onClick={() => {
            if (Notification.permission === 'granted') {
              const url = import.meta.env.VITE_SERVER_URL;
              const currenttoken = localStorage.getItem("fcm_token");
              axios.post(`${url}/devices/register`, {
                "fcm_token": currenttoken,
              }).then((response) => {
                alert("You registered successfully");
              }).catch((error) => {
                console.error("Error sending token to server", error);
              });
            } else {
              alert("Please allow notifications");
            }
          }
          }>
          Subscribe
        </button>
      </div>
    </>
  )
}

export default App
