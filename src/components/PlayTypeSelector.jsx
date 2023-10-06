import { Select } from "@chakra-ui/react";
import useFilterStore from "../store/useFilterStore";

export default function PlayTypeSelector ({setter, isFilter=false}) {

     const {setType} = useFilterStore()

     if (!isFilter) {
         return (
             <Select onChange={setter} fontWeight={'bold'} bgColor={'#171715'} color={'#9a8866'} borderColor={'#9a8866'} borderRadius={0} w={'150px'} fontSize={'14px'}>
                 <option value={'Play Type'}>Play Type</option>
                 <option value={'Farming'}>Farming</option>
                 <option value={'Quest'}>Quest</option>
                 <option value={'Engage'}>Engage</option>
                 <option value={'Boss Run'}>Boss Run</option>
             </Select>
         )
     }

     return (
         <Select onChange={(e) => setType(e.target.value)} fontWeight={'bold'} bgColor={'#171715'} color={'#9a8866'} borderColor={'#9a8866'} borderRadius={0} w={'150px'} fontSize={'14px'}>
                 <option value={'Play Type'}>Play Type</option>
                 <option value={'Farming'}>Farming</option>
                 <option value={'Quest'}>Quest</option>
                 <option value={'Engage'}>Engage</option>
                 <option value={'Boss Run'}>Boss Run</option>
         </Select>
     )
}
