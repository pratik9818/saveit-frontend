import axios from "axios"
import { useEffect } from "react"
import { API_VERSION, DOMAIN } from "../utils/Constant"
import { useRecoilState } from "recoil"
import { capsulesStore } from "../recoil/Store"
import ThreedotImg from "../component/ThreedotImg"
import CapsuleName from "../component/CapsuleName"
import CapsuleActionModal from "../component/CapsuleActionModal"

export default function Capsules() {
  
const [capsulesState,setCapsulesState] = useRecoilState(capsulesStore)
  useEffect(() => {
    fetchCapsules()
  }, [])
console.log(capsulesState);

  async function fetchCapsules(){
    const dateModified = new Date().toUTCString()
    
   try {
    const res = await axios(`${DOMAIN}/api/${API_VERSION}/capsules?dateModified=${dateModified}`,
      {
        withCredentials: true,
      }
    )
      const result = await res
      if(result.data){
        setCapsulesState(result.data.data)
      }
   } catch (error) {
    console.log(error);

   }
  
  }
  return (
    <div className="border h-[87vh] flex flex-wrap justify-center">
     {
       capsulesState && capsulesState.map(element =>{
         return <div key={element.capsule_id} className="border-2 w-2/12 h-2/6 m-2 flex justify-between flex-col" >
         <ThreedotImg capsuleid = {element.capsule_id}/>
          <CapsuleActionModal capsuleid = {element.capsule_id}/>
         <CapsuleName name={element.capsule_name} capsuleid={element.capsule_id}/>
        </div>
      })
     }
    </div>
  )
}
