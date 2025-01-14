import { useRecoilState } from "recoil"
import { feedbackModal } from "../recoil/Store"
import { useState } from "react";
import axios from "axios";
import { API_VERSION, DOMAIN, errorRed, successGreen } from "../utils/Constant";
import useAlertFunction from "../hooks/AlertFunction";

export default function FeedbackModal() {
    const AlertFunction = useAlertFunction()
    const [hide ,setHide] = useRecoilState(feedbackModal)
    const [formData, setFormData] = useState({
        bugs: "",
        features: "",
        improvements: "",
        suggestions: "",
      });
      const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendForm()
      };

    function toogleModal(e: React.MouseEvent<HTMLDivElement>){
        const target = (e.target as HTMLDivElement).id;
        if (target == "feedbackModal")setHide(false)
    }

    async function sendForm() {
     const isFormFilled = formData.bugs || formData.features || formData.suggestions || formData.improvements
      if(!isFormFilled) return AlertFunction(true, errorRed, "Please fill one of the field", 4000);
      
        try {
          const {
            data: { message },
            status,
          } = await axios.post(
            `${DOMAIN}/api/${API_VERSION}/feedback`,{
                bugs:formData.bugs,
                features:formData.features,
                improvements:formData.improvements,
                suggestions:formData.suggestions,
            },
            { withCredentials: true }
          );
          if (status == 201) {
            AlertFunction(true, successGreen, message, 4000);
            setFormData({ bugs: "", features: "", improvements: "", suggestions: "" });
            setHide(false)
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const { status, response, message } = error;
            if (status == 500) {
              AlertFunction(
                true,
                errorRed,
                "Something went wrong ! please try again",
                4000
              );
              return;
            } else if (message == "Network Error") {
              AlertFunction(true, errorRed, "No Internet", 4000);
              return;
            }
            AlertFunction(true, errorRed, response?.data?.message, 4000);
          }
        }
      }
  return hide &&(
    <div id="feedbackModal" className="bg-gray-100 absolute w-[100vw] h-[98vh] top-0 flex justify-center items-center min-h-screen" onClick={(e)=>toogleModal(e)}>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md h-auto lg:h-[100%]"
      >
        <h1 className="text-2xl font-bold text-center mb-6">Feedback Form</h1>
        
        <div className="mb-4">
          <label className="block font-medium mb-1" htmlFor="bugs">
            Any bugs encountered?
          </label>
          <textarea
            id="bugs"
            name="bugs"
            value={formData.bugs}
            onChange={handleChange}
            placeholder="Describe any bugs you encountered..."
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label className="block font-medium mb-1" htmlFor="features">
            Feature requirements
          </label>
          <textarea
            id="features"
            name="features"
            value={formData.features}
            onChange={handleChange}
            placeholder="What features would you like to see?"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label className="block font-medium mb-1" htmlFor="improvements">
            Improvements
          </label>
          <textarea
            id="improvements"
            name="improvements"
            value={formData.improvements}
            onChange={handleChange}
            placeholder="How can we improve?"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label className="block font-medium mb-1" htmlFor="suggestions">
            Other suggestions
          </label>
          <textarea
            id="suggestions"
            name="suggestions"
            value={formData.suggestions}
            onChange={handleChange}
            placeholder="Any other suggestions?"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  )
}
