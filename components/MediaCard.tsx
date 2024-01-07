'use client'
// Importing necessary libraries
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDateString } from '@/lib/utils';

// Props for MediaCard component
type MediaCardProps = {
    children?: React.ReactNode; // Children of the MediaCard component
    imageUrl: string; // URL of the image
    mediaName?: string; // Name of the media
    releaseDate?: string; // Release date of the movie
    className?: String; // Class name for the MediaCard component
    href?: string; // Href for the MediaCard component
    tagline?: string; // Tagline for the MediaCard component
};

// The main function for the MediaCard component
const MediaCard: React.FC<MediaCardProps> = ({ imageUrl, mediaName, releaseDate, href, tagline }) => {
    const [imageSrc, setImageSrc] = useState(imageUrl);
    const handleError = () => {
        setImageSrc('/default-image.png'); // Set the path to your default image here
    };

    // Placeholder for the image
    const placeholder = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC';
    
    // Content for the MediaCard component
    const content = (
        <div className="media-card flex flex-col items-center 
        max-w-xs rounded overflow-hidden hover:scale-110 
        transition-transform cursor-pointer text-white">
            <div className="relative h-64 w-full">
                <Image
                    src={imageSrc} // Source of the image
                    alt={'No Image'} // Alt text for the image
                    fill
                    sizes="100%"
                    style={{ objectFit: "contain" }} // Style for the image
                    priority
                    placeholder='blur' // Placeholder for the image
                    blurDataURL={placeholder} // Data URL for the placeholder
                    onError={handleError}
                    className='w-auto'
                />
            </div>
            <div className="flex-grow px-6 py-4 text-center ">
                {mediaName && <div className="font-bold text-lg mb-2">
                    <p className='truncate md:overflow-visible md:whitespace-normal'>{mediaName}</p> </div>} {/* Name of the movie */}
                {releaseDate && (
                    <p className="text-sm">
                        Release Date: <span className="font-semibold whitespace-nowrap">{formatDateString(releaseDate)}</span>
                    </p>
                )} {/* Release date of the movie */}
                {tagline && <p className="text-sm font-semibold italic 
                mt-2 text-custom-two text-center">{tagline.toUpperCase()}</p>} {/* Tagline for the movie*/}
            </div>
        </div>
    );

    // Returning the JSX for the component
    return href ? <Link href={href}>{content}</Link> : <>{content}</>;
};

export default MediaCard;
