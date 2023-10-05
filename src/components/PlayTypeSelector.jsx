
import { Avatar, Box, Container, HStack, Icon, Select, Text, Image } from "@chakra-ui/react";


export default function PlayTypeSelector ({setter, disabled=false}) {

    if (disabled) {
        return (
            <Select disabled fontWeight={'bold'} bgColor={'#171715'} color={'#9a8866'} borderColor={'#9a8866'} borderRadius={0} w={'150px'} fontSize={'14px'}>
                <option value={'일반'}>
                    <HStack>
                        <Text>일반</Text>
                    </HStack>
                </option>
                <option value={'파밍'}>
                    <HStack>
                        <Text>파밍</Text>
                    </HStack>
                </option>
                <option value={'퀘스트'}>
                    <HStack>
                        <Text>퀘스트</Text>
                    </HStack>
                </option>
                <option value={'보스런'}>
                    <HStack>
                        <Text>보스런</Text>
                    </HStack>
                </option>
            </Select>
        )
    }

    return (
        <Select fontWeight={'bold'} bgColor={'#171715'} color={'#9a8866'} borderColor={'#9a8866'} borderRadius={0} w={'150px'} fontSize={'14px'}>
            <option value={'일반'}>
                <HStack>
                    <Text>일반</Text>
                </HStack>
            </option>
            <option value={'파밍'}>
                <HStack>
                    <Text>파밍</Text>
                </HStack>
            </option>
            <option value={'퀘스트'}>
                <HStack>
                    <Text>퀘스트</Text>
                </HStack>
            </option>
            <option value={'보스런'}>
                <HStack>
                    <Text>보스런</Text>
                </HStack>
            </option>
        </Select>
    )
}