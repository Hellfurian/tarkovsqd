
import { Select } from "@chakra-ui/react";

import useFilterStore from "../store/useFilterStore";

export default function RegionSelector ({setter, isFilter=false}) {

    const {setServer} = useFilterStore()

    if (!isFilter) {
        return (
            <Select onChange={setter} fontWeight={'bold'} bgColor={'#171715'} color={'#9a8866'} borderColor={'#9a8866'} borderRadius={0} w={'150px'} fontSize={'14px'}>
                <option value={'서버 선택'}>서버 선택</option>
                <option value={'상관없음'}>상관없음</option>
                <option value={'한국'}>한국</option>
                <option value={'북미'}>북미</option>
                <option value={'일본'}>일본</option>
                <option value={'러시아'}>러시아</option>
                <option value={'호주'}>호주</option>
            </Select>
        )
    }
    
    return (
        <Select onChange={(e) => setServer(e.target.value)} fontWeight={'bold'} bgColor={'#171715'} color={'#9a8866'} borderColor={'#9a8866'} borderRadius={0} w={'150px'} fontSize={'14px'}>
            <option value={'서버 선택'}>서버 선택</option>
            <option value={'상관없음'}>상관없음</option>
            <option value={'한국'}>한국</option>
            <option value={'북미'}>북미</option>
            <option value={'일본'}>일본</option>
            <option value={'러시아'}>러시아</option>
            <option value={'호주'}>호주</option>
        </Select>
    )
}