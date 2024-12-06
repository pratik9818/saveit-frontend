import { successGreen } from "./Constant";

// Universal download function
const downloadFile = (content: string | Blob, fileName: string, AlertFunction: (status: boolean, color: string, message: string, duration: number) => void) => {
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


export default downloadFile;
