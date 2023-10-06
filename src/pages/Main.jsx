import {
     Box,
     container,
     HStack,
     Button,
     Table,
     Thead,
     body,
     Tr,
     Th,
     td,
     TableContainer,
     Avatar,
     VStack,
     Text,
     useDisclosure;
     Image,
     useToast,
     Tooltips,
     Center
} from "@chakra-ui/react";

import Header from "../components/Header";
import MapSelector from "../components/MapSelector";
import RegionSelector from "../components/RegionSelector";
import TeamCreateModal from "../components/TeamCreateModal";
import LoginModal from "../components/LoginModal";
import usePostStore from "../store/usePostStore";

import strip from '../resource/strip.png'
import bg from '../resource/bg.png'
import kr from '../resource/kr.png'
import us from '../resource/us.png'
import jp from '../resource/jp.png'
import rs from '../resource/rs.png'
import reset from '../resource/reset.svg'

import gun from '../resource/icon/gun.png'
import money from '../resource/icon/money.png'
import boss from '../resource/icon/boss.png'
import quest from '../resource/icon/quest.png'


import PlayTypeSelector from "../components/PlayTypeSelector";
import { useEffect } from "react";
import { API_SERVER } from "../application";
import axios from "axios";
import useFilterStore from "../store/useFilterStore";

export default function Main() {

     const toast = useToast()
     const loginModal = useDisclosure()
     const teamModal = useDisclosure()

     const {posts, initPosts} = usePostStore()
     const {map, server, type} = useFilterStore()

     const openModal = () => {
         const token = localStorage.getItem('squadObject')

         if (token === null) {
             loginModal.onOpen()
             return
         }

         teamModal.onOpen()
     }

     const handleCopyClipBoard = (e) => {
         try {
             navigator.clipboard.writeText(e.target.innerHTML)
             toast({
                 title: ‘Discord ID has been copied’,
                 status: 'info'
             })
         }
         catch (error) { alert('Clipboard copy failed.') }
     };

     const searchQueryGenerator = () => {
         const query = new URLSearchParams()
         if (map !== null) { query.append("map", map) }
         if (server !== null) { query.append("server", server) }
         if (type !== null) { query.append("type", type) }
         return query.toString()
     }

     const onResetFilterClick = () => {
         axios.get(API_SERVER + '/post').then(res => { initPosts(res.data.content) })
     }
    
     useEffect(() => {
         console.log(API_SERVER + '/post?' + searchQueryGenerator())
         axios.get(API_SERVER + '/post?' + searchQueryGenerator()).then(res => { initPosts(res.data.content) })
     }, [map, server, type])

     return (
     <Box w={'100%'} bgColor={'black'} backgroundImage={bg} backgroundSize={'cover'} backgroundRepeat={'no-repeat'} backgroundAttachment={'fixed'} pb={'400px '}>
         <LoginModal onClose={loginModal.onClose} isOpen={loginModal.isOpen} teamModalOpen={teamModal.onOpen} />
         <TeamCreateModal onClose={teamModal.onClose} isOpen={teamModal.isOpen} />
         <Header />
         <Container maxW={'1200px'} mt={8}>
             {/* <Box w={'100%'} p={'18px 24px 18px 24px'} bgColor={'#151515'} border={'1px solid #9a886650'}>
                 <VStack alignItems={'flex-start'} spacing={3}>
                     <Text fontSize={'18px'} letterSpacing={'-1px'} fontWeight={'bold'} color={'#9A8866'}>Notice</Text>
                     <Text fontSize={'15px'}>
                         Filtering functions (map, server) have been added. <br/>
                         You can quickly copy your Discord ID by clicking on your user profile. <br/>
                     </Text>
                 </VStack>
             </Box> */}
             <HStack justifyContent={'space-between'} pt={5}>
                 <HStack spacing={4}>
                     <Tooltip fontSize={'12px'} label={'Reset Filter'}>
                         <Box bgColor={'#121211'} border={'1px solid #9A8866'} cursor={'pointer'} onClick={onResetFilterClick}>
                             <Image p={'6px'} src={reset} h={'38px'} w={'39px'} />
                         </Box>
                     </Tooltip>
                     <MapSelector isFilter={true} />
                     <PlayTypeSelector isFilter={true} />
                     <RegionSelector isFilter={true} />
                 </HStack>
                 <Button fontSize={'14px'} bgColor={'#9A8866'} color={'#29241D'} borderRadius={0} fontWeight={'bold'} letterSpacing={'-1px'} onClick={openModal} >Find team members</Button>
             </HStack>
             <Box bgColor={'#171715'} mt={6}>
                 <TableContainer w={'100%'}>
                     <Table>
                         <Thead bgImage={strip}>
                             <Tr>
                                 <Th textShadow={'1px 1px 1px rgba(0,0,0,.004)'} w={'250px'} fontSize={'11px'} color={'#9A8866'}>Discord</Th >
                                 <Th textShadow={'1px 1px 1px rgba(0,0,0,.004)'} w={'180px'} fontSize={'11px'} color={'#9A8866'}>map</Th>
                                 <Th textShadow={'1px 1px 1px rgba(0,0,0,.004)'} w={'200px'} color={'#9A8866'}>Server</Th>
                                 <Th textShadow={'1px 1px 1px rgba(0,0,0,.004)'} fontSize={'11px'} color={'#9A8866'} w={'450px'}>Memo</Th>
                                 <Th textShadow={'1px 1px 1px rgba(0,0,0,.004)'} fontSize={'11px'} color={'#9A8866'}>Registration time</Th>
                             </Tr>
                         </Thead>
                         <Tbody>
                             {posts && posts.map(p =>
                             <Tr fontSize={'12px'} bgColor={'#151515'}>
                                 <Td>
                                     <HStack spacing={2}>
                                         <Avatar size={'sm'} src={p.avatar_url} />
                                         <VStack spacing={0} alignItems={'flex-start'}>
                                             <Tooltip fontSize={'10px'} label={'Copy ID'}>
                                                 <Text color={'#9A8866'} cursor={'pointer'} onClick={handleCopyClipBoard}>{p.nickname}</Text>
                                             </Tooltip>
                                             {p.verify === true ? <Text color={'#5865f2'} fontSize={'10px'} letterSpacing={'-1px'}>Discord Verified</Text>
                                             : <Text color={'gray'} fontSize={'10px'} letterSpacing={'-1px'}>Discord not authenticated</Text>}
                                         </VStack>
                                     </HStack>
                                 </Td>

                                 <Td color={'#AEAEB0'} fontWeight={'bold'}>{p.map}</Td>
                                
                                 {p.type === "" && <Td color={'gray'}>Unspecified</Td>}
                                 {p.type === "Farming" &&
                                     <Td color={'gold'}>
                                         <Tooltip bgColor={'#9a8866'} color={'#373128'} fontSize={'12px'} label={'Farming-focused play'}>
                                             <Image ml={2} src={money} h={'24px'} w={'24px'} filter={'opacity(0.5) drop-shadow(0 0 0 yellow)'}/></Tooltip ></Td>}
                                 {p.type === "Boss run" &&
                                     <Td color={'crimson'}>
                                         <Tooltip bgColor={'#9a8866'} color={'#373128'} fontSize={'12px'} label={'Aim only for the boss'}>
                                             <Image ml={2} src={boss} h={'24px'} w={'26px'} filter={'opacity(0.5) drop-shadow(0 0 0 red)'}/></Tooltip ></Td>}
                                 {p.type === "Engagement" &&
                                     <Td color={'crimson'}>
                                         <Tooltip bgColor={'#9a8866'} color={'#373128'} fontSize={'12px'} label={'Combat-oriented play'}>
                                             <Image ml={2} src={gun} h={'24px'} w={'24px'} filter={'opacity(0.5) drop-shadow(0 0 0 red)'}/></Tooltip ></Td>}
                                 {p.type === "Quest" &&
                                     <Td color={'crimson'}>
                                         <Tooltip bgColor={'#9a8866'} color={'#373128'} fontSize={'12px'} label={'Quest-oriented play'}>
                                             <Image ml={2} src={quest} h={'24px'} w={'24px'} filter={'opacity(0.5) drop-shadow(0 0 0 #9a8866)'}/></ Tooltip></Td>}
        
                                 {p.server === 'Korea' && <Td>
                                     <HStack><Image w={'18px'} h={'18px'} src={kr} /><Text color={'#AEAEB0'}>{p.server}</Text></HStack> </Td>}
                                 {p.server === 'North America' && <Td color={'#AEAEB0'}>
                                     <HStack><Image w={'18px'} h={'18px'} src={us} /><Text color={'#AEAEB0'}>{p.server}</Text></HStack> </Td>}
                                 {p.server === 'Japan' && <Td color={'#AEAEB0'}>
                                     <HStack><Image w={'18px'} h={'18px'} src={jp} /><Text color={'#AEAEB0'}>{p.server}</Text></HStack> </Td>}
                                 {p.server === 'Russia' && <Td color={'#AEAEB0'}>
                                     <HStack><Image w={'18px'} h={'18px'} src={rs} /><Text color={'#AEAEB0'}>{p.server}</Text></HStack> </Td>}
                                 {p.server === 'Doesn't matter' && <Td color={'#AEAEB0'}>
                                     <HStack><Text color={'#AEAEB0'}>{p.server}</Text></HStack></Td>}

                                 <Td wordBreak={'break-all'} pr={10}>
                                     <Text
                                         color={'#9a8866'}
                                         whiteSpace={'normal'}
                                         fontWeight={'bold'}
                                         style={{
                                             overflow:'hidden',
                                             display: "-webkit-box",
                                             WebkitLineClamp: 2;
                                             WebkitBoxOrient: 'vertical'
