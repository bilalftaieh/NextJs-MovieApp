import React from 'react';

interface ScrollContainerProps {
  children: React.ReactNode;
}

const HorizonatalScroller: React.FC<ScrollContainerProps> = ({ children }) => {
  return (
    <div className="flex flex-row overflow-x-scroll space-x-5 pb-7">
      {children}
    </div>
  );
};

export default HorizonatalScroller;
