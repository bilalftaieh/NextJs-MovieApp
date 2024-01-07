import React from 'react';
import Image from 'next/image';
import { LogoProps } from '@/lib/definitions';

const Logo: React.FC<LogoProps> = ({ src, alt }) => {
  return (
    <div className="p-2 
     dark:filter ">
      <Image src={src} alt={alt} width={70} height={70} />
    </div>
  );
};

export default Logo;
