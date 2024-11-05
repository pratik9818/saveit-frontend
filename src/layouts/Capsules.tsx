import axios from "axios"
import { useEffect } from "react"
import { API_VERSION, DOMAIN } from "../utils/Constant"
import { useRecoilState } from "recoil"
import { capsulesStore } from "../recoil/Store"

export default function Capsules() {
const [capsulesState,setCapsulesState] = useRecoilState(capsulesStore)
  useEffect(() => {
    fetchCapsules()
  }, [])
  async function fetchCapsules(){
    const dateModified = new Date().toUTCString()
    console.log(dateModified);
    
   try {
    const res = await axios(`${DOMAIN}/api/${API_VERSION}/capsules?dateModified=${dateModified}`,
      {
        withCredentials: true,
      }
    )
      const result = await res
      console.log(result);
      if(result.data){
        console.log(result.data.data);
        
        setCapsulesState(result.data.data)
        console.log(capsulesState);
        
      }
   } catch (error) {
    console.log(error);
    
   }
  
  }
  return (
    <div>
     {
      capsulesState && capsulesState.map(element =>{
        return `<div>
          ${element.user_id}
        </div>`
      })
     }
    </div>
  )
}
