
import {
    Box,
    Container,
    HStack,
    Text,
    Image
}
from '@chakra-ui/react'

import useStatusStore from '../store/useStatusStore'

import logo from '../resource/logo.png'


export default function Header () {

    const {online, setOnline} = useStatusStore()

    return (
        <Box w={'100%'} bgColor={'black'} p={'24px 0 24px 0'} boxShadow={'0 0 100px rgba(65,61,52,1), 0 0 6px rgba(232,190,107,0.8)'} zIndex={10}>
            <Container maxW={'1200px'}>
                <HStack spacing={4} w={'100%'} justifyContent={'space-between'}>
                    <Image src={logo} objectFit={'contain'} w={'120px'} h={'60px'}/> 
                    <HStack>
                        <Text color={'#9a8866'} letterSpacing={'-1px'} fontSize={'14px'}>실시간 스쿼드 이용자: </Text>
                        {online > 0 ? <Text fontWeight={'bold'} color={'green'} fontSize={'15px'}>{online}</Text> : <Text fontSize={'15px'} color={'gray'} fontWeight={'bold'}>0</Text>}
                    </HStack>
                </HStack>
            </Container>
        </Box>
    )
}
