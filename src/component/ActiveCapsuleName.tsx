import { useEffect, useState } from 'react'
import { activeCapsule, capsulesStore } from '../recoil/Store';
import { useRecoilValue } from 'recoil';

export default function ActiveCapsuleName() {
      const [activeCapsuleName,setActiveCapsuleName] = useState<string>("")
  const activeCapsuleValue = useRecoilValue(activeCapsule);
      const capsules = useRecoilValue(capsulesStore)
    
     useEffect(() => {
        const activeCapsuleObj = capsules.filter(capsule => capsule.capsule_id == activeCapsuleValue)
        setActiveCapsuleName(activeCapsuleObj[0]?.capsule_name)
      }, [activeCapsuleValue])
  return (
    <div className="px-2 mr-auto font-bold text-slate-500 pt-1 bg-slate-100">{activeCapsuleName?.substring(0,20)}</div>

  )
}
