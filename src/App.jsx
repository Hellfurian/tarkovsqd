import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import { Box } from "@chakra-ui/react";
import Callback from './pages/Discord'
import { useEffect, useState } from "react";

import { API_SERVER, WEB_SOCKET, WEB } from "./application";
import usePostStore from "./store/usePostStore";
import useStatusStore from "./store/useStatusStore";


function App() {
  
   const {setPosts } = usePostStore()
   const {setOnline} = useStatusStore()

   const sendNoti = (data) => {
     if (Notification.permission !== 'granted') {
       return
     }
     else {
         const notification = new Notification(data.memo, {
             body: '[Discord] ' + data.nickname + ' ' + '[Map] ' + data.map + ' ' + '[Server] ' + data.server,
         });

         notification.onclick = function () {
             window.open(WEB);
         };
     }
   }
  
   useEffect(() => {
     if (window.Notification) {
       Notification.requestPermission();
     }

     const ws = new WebSocket(WEB_SOCKET)
     ws.onmessage = (message) => {
       const packet = JSON.parse(message.data)
       if (packet.type === "UPDATE") {
         console.log("UPDATE PACKET TIME:" )
         setPosts(packet.data)
         sendNoti(packet.data)
       }
       if (packet.type === "ONLINE") { setOnline(packet.data) }
     }

     return () => {
       ws.close()
     }
   }, [])

   return (
     <Box w={'100%'} >
       <Routes>
         <Route path="/" element={<Main />} />
         <Route path="/discord" element={<Callback />} />
       </Routes>
     </Box>
   );
}

export default App;
