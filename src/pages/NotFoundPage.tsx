import { useEffect } from "react";

const NotFoundPage = () => {

  useEffect(()=>{
      document.title = "Saveit.tech - Organize Your Digital Life Effortlessly";
  },[])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-2xl mt-4">Page Not Found</p>
      <a href="/" className="mt-8 text-blue-500 hover:text-blue-700">
        Go back to home
      </a>
    </div>
  );
};

export default NotFoundPage;
