'use client'
// Importing necessary libraries
import Image from 'next/image';
import React, { useState } from 'react';

// Props for CastCard component
type CastCardProps = {
  name: string; // Name of the cast member
  character: string; // Character played by the cast member
  imageUrl: string; // URL of the image
};

// The main function for the CastCard component
const CastCard: React.FC<CastCardProps> = ({ name, character, imageUrl }) => {
  const [imageSrc, setImageSrc] = useState(imageUrl); // Set a default path here
  const handleError = () => {
    setImageSrc('/default-image.png'); // Set the path to your default image here
  };

  // Returning the JSX for the component
  return (
    <div className="flex flex-col items-center overflow-hidden m-2 ">
      <div className="relative h-64 w-full ">
        <Image
          alt={name} // Alt text for the image
          fill
          sizes="100%"
          style={{ objectFit: "cover" }} // Style for the image
          src={imageSrc} // Source of the image
          onError={handleError}
          priority
        />
      </div>
      <div className="flex-grow px-6 py-4 text-center ">
        <h1 className="font-bold text-xl mb-2">{name}</h1>  {/*Name of the cast member */}
        <p className="text-gray-400 text-base">{character}</p> {/* Character played by the cast member */}
      </div>
    </div>
  )
};

export default CastCard;
