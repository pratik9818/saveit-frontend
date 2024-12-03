import React from "react";

interface LoaderProps {
  width: number; // Width of the loader
  height: number; // Height of the loader
  top: string; // Height of the loader
  left: string; // Height of the loader
}

const Loader: React.FC<LoaderProps> = ({ width , height,top,left}) => {
  return (
    <div
      className={`border-4 border-gray-500 border-t-transparent rounded-full animate-spin absolute `}
      style={{
        width: `${width}px`,
        height: `${height}px`,
       top,
       left
      }}
    ></div>
  );
};

export default Loader;
