import axios from "axios";
import useAlertFunction from "../hooks/AlertFunction";
import { API_VERSION, DOMAIN, errorRed, successGreen } from "./Constant";

interface FragmentDetails {
  fragment_id: string;
  url?: string;
  file_name?: string;
  text_content?: string;
}

// Universal download function
const downloadFile = (
  content: string | Blob, 
  fileName: string, 
  AlertFunction: (status: boolean, color: string, message: string, duration: number) => void
) => {
  let blobUrl: string;

  if (typeof content === 'string' && content.startsWith('https')) {
    // If the content is a URL, use it directly
    blobUrl = content;
  } else {
    // If the content is text or Blob, create a Blob URL
    const blob = typeof content === 'string' ? new Blob([content], { type: 'text/plain' }) : content;
    blobUrl = window.URL.createObjectURL(blob);
  }

  // Create a temporary <a> element to trigger the download
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = fileName; // Suggested file name
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  // Clean up Blob URL if created
  if (typeof content !== 'string' || !content.startsWith('https')) {
    window.URL.revokeObjectURL(blobUrl);
  }
  AlertFunction(true, successGreen, 'Downloaded', 1000);
};

export const useDownloadFile = () => {
  const AlertFunction = useAlertFunction();

  const checkDownloadCount = async (fragmentDetails: FragmentDetails) => {
    try {
      const resp = await axios(
        `${DOMAIN}/api/${API_VERSION}/fragments/files/download?fragmentId=${fragmentDetails.fragment_id}`,
        {
          withCredentials: true,
        }
      );
      console.log(resp);
      if (fragmentDetails.url && fragmentDetails.file_name) {
        downloadFile(fragmentDetails.url, fragmentDetails.file_name, AlertFunction);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { status, response, message } = error;

        if (status === 500) {
          AlertFunction(
            true,
            errorRed,
            "Something went wrong ! please try again",
            2000
          );
          return;
        } else if (message === "Network Error") {
          AlertFunction(true, errorRed, "No Internet", 2000);
          return;
        }
        AlertFunction(true, errorRed, response?.data?.message, 1000);
      }
    }
  };

  const handleDownload = (fragmentDetails: FragmentDetails) => {
    if (fragmentDetails?.url && fragmentDetails?.url.startsWith('http')) {
      // Download remote file (image, video, PDF, etc.)
      checkDownloadCount(fragmentDetails);
    } else {
      // Download generated text or blob
      const textContent = fragmentDetails.text_content;
      if (textContent) downloadFile(textContent, 'fragment.txt', AlertFunction);
    }
  };

  return { handleDownload };
};
