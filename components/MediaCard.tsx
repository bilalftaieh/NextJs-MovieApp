'use client'
// Importing necessary libraries
import React from 'react';
import NextImage from 'next/image';
import Link from 'next/link';
import { formatDateString } from '@/lib/utils';
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

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
    const hoverScaleClass = href ? 'active:scale-110 md:hover:scale-110' : '';
    // const cardPressableProps = href ? { isPressable: true, onPress: () => push(href) } : {};
    return (
        <Link href={href || ''}>
            <Card className={`bg-transparent max-w-[200px] flex flex-col ${hoverScaleClass} 
            shadow-none`}>
                <CardBody className='flex-grow'>
                    <Image
                        unoptimized
                        as={NextImage}
                        width={200}
                        height={200}
                        alt={mediaName}
                        className="object-cover rounded-xl"
                        priority
                        src={imageUrl}
                        fallbackSrc={'/default-image.png'}
                    />
                </CardBody>
                <CardFooter className="flex flex-col gap-4 ">
                    {mediaName && <p className='text-lg font-bold line-clamp-1'>{mediaName}</p>}
                    {releaseDate && (
                        <p className="text-sm text-custom-two">
                            Release Date: <span className="font-semibold whitespace-nowrap">{formatDateString(releaseDate)}</span>
                        </p>
                    )} {/* Release date of the movie */}
                    {tagline && <p className="text-sm font-semibold italic 
                text-custom-two text-center">{tagline.toUpperCase()}</p>} {/* Tagline for the movie*/}
                </CardFooter>
            </Card>
        </Link>

    )

};

export default MediaCard;
