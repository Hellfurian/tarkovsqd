import {
     modal,
     ModalOverlay,
     ModalContent,
     ModalHeader,
     ModalBody,
     ModalCloseButton,
     VStack,
     Input,
     FormControl,
     Form Label,
     HStack,
     Text,
     Button,
     useToast
   } from '@chakra-ui/react'
import { useState } from 'react'
import MapSelector from './MapSelector'
import RegionSelector from './RegionSelector'
import axios from 'axios'
import { API_SERVER } from '../application'
import PlayTypeSelector from './PlayTypeSelector'


export default function TeamCreateModal ({onClose, isOpen}) {

     const profile = JSON.parse(localStorage.getItem('squadObject'))
    
     const toast = useToast()

     const [nickname, setNickname] = useState("")
     const [map, setMap] = useState("")
     const [server, setServer] = useState("")
     const [type, setType] = useState("")
     const [memo, setMemo] = useState("")

     const validate = () => {
         if (map === "" || map === "Select map") {
             toast({
                 title: 'Please select a map',
                 status: 'warning'
             })
             return false
         }

         if (type === "" || type === "Play Type") {
             toast({
                 title: 'Please select a play type',
                 status: 'warning'
             })
             return false
         }

         if (server === "" || server === "Select Server") {
             toast({
                 title: 'Please select a server',
                 status: 'warning'
             })
             return false
         }

         if (profile === null && nickname === "") {
             toast({
                 title: ‘Please enter your Discord ID’,
                 status: 'warning'
             })
             return false
         }

         if (memo === null || memo === "") {
             toast({
                 title: 'Please write a note',
                 status: 'warning'
             })
             return false
         }
    
         return true
     }

     const customClose = () => {
         setNickname('')
         setMap('')
         setServer('')
         setType('')
         setMemo('')
         onClose()
     }

     const sendCreatePacket = () => {
         if (validate()) {
             const packet = profile !== null ?
             {
                 token: profile.token,
                 map,
                 server,
                 memo,
                 type,
             }
             : {
                 nickname
                 map,
                 server,
                 memo,
                 type,
             }

             axios.post(API_SERVER + '/post', JSON.stringify(packet), {headers: {'Content-Type': 'application/json'}})
             .then(() => {
                 customClose()
             })
             return
         }
     }
    
     return (
         <Modal onClose={customClose} isOpen={isOpen} isCentered>
             <ModalOverlay />
             <ModalContent bgColor={'#121211'}p={'12px 0 12px 0'}>
                 <ModalHeader borderBottom={'1px solid #202020'} pt={3} pb={4} fontSize={'16px'} letterSpacing={'-1px'}>Find someone to join</ModalHeader>
                 <ModalCloseButton />
                 <ModalBody pt={5}>
                     <VStack alignItems={'flex-start'} spacing={8}>
                         <FormControl isRequired>
                             <FormLabel color={'#AEAEB0'} fontSize={'14px'}>Discord ID</FormLabel>
                             <HStack spacing={4}>
                                 {profile && <>
                                     <Input fontSize={'14px'} p={'12px'} borderColor={'#827357'} value={profile.username} w={'180px'} disabled/>
                                     <Text color={'#5865f2'} fontSize={'14px'} letterSpacing={'-1px'}>Squad and Discord are linked!</Text>
                                 </>}
                                 {!profile && <>
                                     <Input fontSize={'14px'} p={'12px'} borderColor={'#827357'} onChange={(e) => setNickname(e.target.value)} value={nickname} w={' 180px'} placeholder='Discord ID' />
                                 </>}
                             </HStack>
                         </FormControl>
                         <HStack spacing={5}>
                             <FormControl>
                                 <FormLabel color={'#AEAEB0'} fontSize={'14px'}>Map</FormLabel>
                                 <MapSelector setter={(e) => setMap(e.target.value)} />
                             </FormControl>
                             <FormControl>
                                 <FormLabel color={'#AEAEB0'} fontSize={'14px'}>Play Type</FormLabel>
                                 <PlayTypeSelector setter={(e) => setType(e.target.value)} />
                             </FormControl>
                             <FormControl>
                                 <FormLabel color={'#AEAEB0'} fontSize={'14px'}>Server</FormLabel>
                                 <RegionSelector setter={(e) => setServer(e.target.value)} />
                             </FormControl>
                         </HStack>
                         <FormControl>
                             <FormLabel color={'#AEAEB0'} fontSize={'14px'}>Memo</FormLabel>
                             <Input onChange={(e) => setMemo(e.target.value)} value={memo} fontSize={'14px'} p={'12px'} borderColor={'#827357'} placeholder={' Someone who will go to rap and have a good time~'} />
                         </FormControl>
                         <Button onClick={sendCreatePacket} w={'100%'} fontSize={'15px'} borderRadius={0} bgColor={'#827357'} letterSpacing={'-1px'}>Register</Button>
                     </VStack>
                 </ModalBody>
             </ModalContent>
         </Modal>
     )
}
