import { Select } from "@chakra-ui/react";

import useFilterStore from "../store/useFilterStore";

export default function RegionSelector ({setter, isFilter=false}) {

     const {setServer} = useFilterStore()

     if (!isFilter) {
         return (
             <Select onChange={setter} fontWeight={'bold'} bgColor={'#171715'} color={'#9a8866'} borderColor={'#9a8866'} borderRadius={0} w={'150px'} fontSize={'14px'}>
                 <option value={'Select server'}>Select server</option>
                 <option value={'It doesn't matter'}>It doesn't matter</option>
                 <option value={'Korea'}>Korea</option>
                 <option value={'North America'}>North America</option>
                 <option value={'Japan'}>Japan</option>
                 <option value={'Russia'}>Russia</option>
                 <option value={'Australia'}>Australia</option>
             </Select>
         )
     }
    
     return (
         <Select onChange={(e) => setServer(e.target.value)} fontWeight={'bold'} bgColor={'#171715'} color={'#9a8866'} borderColor={'#9a8866'} borderRadius={0} w={'150px'} fontSize={'14px'}>
             <option value={'Select server'}>Select server</option>
             <option value={'It doesn't matter'}>It doesn't matter</option>
             <option value={'Korea'}>Korea</option>
             <option value={'North America'}>North America</option>
             <option value={'Japan'}>Japan</option>
             <option value={'Russia'}>Russia</option>
             <option value={'Australia'}>Australia</option>
         </Select>
     )
}
