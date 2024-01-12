'use client'
import { Card, CardBody, CardFooter,Image } from '@nextui-org/react';
// Importing necessary libraries
import NextImage from 'next/image';
import React, { useState } from 'react';

// Props for CastCard component
type CastCardProps = {
  name: string; // Name of the cast member
  character: string; // Character played by the cast member
  imageUrl: string; // URL of the image
};

// The main function for the CastCard component
const CastCard: React.FC<CastCardProps> = ({ name, character, imageUrl }) => {

  // Returning the JSX for the component
  return (
    <Card className={`bg-transparent max-w-[200px] flex flex-col shadow-none`}>
            <CardBody className='flex-grow'>
                <Image
                    as={NextImage}
                    width={200}
                    height={200}
                    alt={name}
                    className="object-cover rounded-xl"
                    priority
                    src={imageUrl}
                    fallbackSrc={'/default-image.png'}
                />
            </CardBody>
            <CardFooter className="flex flex-col gap-2 items-center">
                {name && <p className='text-lg font-bold line-clamp-1'>{name}</p>}
                {character && (
                    <p className="text-base text-custom-two line-clamp-1">
                        {character}
                    </p>
                )} 
            </CardFooter>
        </Card>
  )
};

export default CastCard;
