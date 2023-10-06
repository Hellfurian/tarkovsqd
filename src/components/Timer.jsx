import { Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"

export default function Timer ({time}) {

     const [txt, setTxt] = useState();

     const apiTime = new Date(time);
     useEffect(() => {
         setInterval(() => {
             const currentTime = new Date();
             const diff = currentTime - apiTime;

             const elapsedSeconds = Math.floor(diff / 1000);
    
             if (elapsedSeconds < 60) {
                 setTxt(elapsedSeconds + 'seconds ago')
             }
             else if (elapsedSeconds < 3600) {
                 const min = Math.floor(elapsedSeconds / 60)
                 setTxt(min + 'minutes ago')
             }
             else {
                 const hour = Math.floor(elapsedSeconds / 3600)
                 setTxt(hour + 'hour ago')
             }
         }, 1000)
     }, [])

     return (
         <>
             {time &&
                 <Text color={'gray'}>
                     {txt}
                 </Text>}
         </>
     )
}
