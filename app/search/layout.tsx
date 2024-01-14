'use client'
// Import necessary components and hooks
import { MediaTypeFilter } from "@/components/FilterOptions";
import { MediaType } from "@/lib/definitions";
import { useSearchParams, usePathname } from "next/navigation"
import { useEffect, useState } from "react";

// Define the SearchLayout component
export default function SearchLayout({
  children, // This will be a page or nested layout
}: {
  children: React.ReactNode
}) {

  // State to keep track of the selected media type
  const [selectedMediaType, setSelectedMediaType] = useState('');

  // Initialize mediaTypes as an empty array
  let mediaTypes: MediaType[] = [];

  // Use the useSearchParams hook to get the current search parameters
  const searchParams = useSearchParams();

  const pathName = usePathname();

  // Get the 'query' parameter from the search parameters
  const query = searchParams.get('query')

  // If there is a query, define the mediaTypes
  if (query) {
    mediaTypes = [
      { name: 'Movies', href: `/search/movies?${searchParams.toString()}` },
      { name: 'TV', href: `/search/tv?${searchParams.toString()}` }
    ];
  }

  useEffect(() => {
    if (pathName.includes('/search/movies')) {
      setSelectedMediaType('Movies');
    } else if (pathName.includes('/search/tv')) {
      setSelectedMediaType('TV');
    } else {
      setSelectedMediaType('');
    }
  }, [pathName]);


  // Handler for when a media filter is clicked
  const handleMediaFilterClick = (mediaType: string) => {
    setSelectedMediaType(mediaType);
  }

  // Return the component JSX
  return (
    <div className="md:grid md:grid-cols-4 gap-4 space-y-4 
        flex flex-col w-full min-h-screen">
      <div className="md:col-span-1 ml-3 mt-5">
        <h1 className="text-4xl font-bold mb-4 text-white">Media Search</h1>
        <p className="mb-4">Search for your favorite TV shows, movies, and more.</p>
        <div className="flex flex-col gap-4">
          {mediaTypes.map((mediaType, index) => {
            return (
              <MediaTypeFilter
                key={index}
                name={mediaType.name}
                href={mediaType.href}
                isSelected={selectedMediaType === mediaType.name}
                handleClick={handleMediaFilterClick}
              />
            )
          })}
        </div>
      </div>
      <div className="md:col-span-3 flex-grow overflow-auto">
        {children}
      </div>
    </div>
  )
}
