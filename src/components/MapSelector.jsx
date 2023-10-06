import { Box, Container, HStack, Select, Text } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import useFilterStore from "../store/useFilterStore";

export default function MapSelector ({setter, isFilter=false}) {

     const {setMap} = useFilterStore()

     if (!isFilter) {
         return (
             <Select onChange={setter} fontWeight={'bold'} bgColor={'#171715'} color={'#9a8866'} borderColor={'#9a8866'} borderRadius={0} w={'150px'} fontSize={'14px'}>
                 <option value={'Select map'}>Select map</option>
                 <option value={'All'}>All</option>
                 <option value={'custom'}>Custom</option>
                 <option value={'Factory'}>Factory</option>
                 <option value={'Wood'}>Wood</option>
                 <option value={'Street'}>Street</option>
                 <option value={'Shoreline'}>Shoreline</option>
                 <option value={'Lab'}>Laboratory</option>
             </Select>
         )
     }

     return (
         <Select onChange={(e) => setMap(e.target.value)} fontWeight={'bold'} bgColor={'#171715'} color={'#9a8866'} borderColor={'#9a8866'} borderRadius={0} w={'150px'} fontSize={'14px'}>
             <option value={'Select map'}>Select map</option>
             <option value={'All'}>All</option>
             <option value={'custom'}>Custom</option>
             <option value={'Factory'}>Factory</option>
             <option value={'Wood'}>Wood</option>
             <option value={'Street'}>Street</option>
             <option value={'Shoreline'}>Shoreline</option>
             <option value={'Lab'}>Laboratory</option>
         </Select>
     )
}
