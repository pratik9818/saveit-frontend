import useAlertFunction from '../hooks/AlertFunction';
import { successGreen } from '../utils/Constant';
import icons from '../utils/Icons'
interface textType {
    textToCopy: string | null;
  }
export default function CopyText({textToCopy}:textType) {
    const AlertFunction = useAlertFunction()
    const handleCopy = async () => {
        try {
        if(textToCopy) await navigator.clipboard.writeText(textToCopy);
        AlertFunction(true, successGreen, 'Copied', 1000);
        } catch (error) {
          console.error("Failed to copy text: ", error);
        }
      };
  return (
    <div onClick={handleCopy}>
    {<icons.CopyIcon/>}
    </div>
    
  )
}
