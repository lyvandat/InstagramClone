import React from "react";

// import { Container } from './styles';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="inline-block w-[24px] h-[24px]">
      <div className="rounded-full animate-[spin_600ms_ease-out_infinite] block w-[80%] h-[80%] m-[10%] border-[4px] border-gray-200 border-r-transparent"></div>
    </div>
  );
};

export default LoadingSpinner;
