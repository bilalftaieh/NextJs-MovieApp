// Importing necessary libraries
import Image from 'next/image';

// Props for MediaBackdrop component
const MediaBackdrop = ({ imageUrl }: { imageUrl: string }) => {
    // Placeholder for the image
    const placeholder = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC';

    // Returning the JSX for the component
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="relative h-full md:h-screen rounded-full w-full">
                <Image
                    src={imageUrl} // Source of the image
                    alt="Movie Backdrop" // Alt text for the image
                    fill
                    sizes="100%"
                    style={{ objectFit: "cover", borderRadius: '60px' }} // Style for the image
                    priority
                    placeholder='blur' // Placeholder for the image
                    blurDataURL={placeholder} // Data URL for the placeholder
                />
            </div>
        </div>
    );
};

export default MediaBackdrop;
