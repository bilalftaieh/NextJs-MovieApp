'use client'
// // Importing necessary libraries
// import Image from 'next/image';
// import styled from 'styled-components';

// // Styled component for the image
// const StyledImage = styled(Image)`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   mask-image: linear-gradient(180deg, transparent 5%, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 50%, transparent 95%);
//   z-index: -1;
// `;

// // Props for MediaBackdrop component
// const MediaBackdrop = ({ imageUrl }: { imageUrl: string }) => {
//     // Placeholder for the image
//     const placeholder = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC';

//     // Returning the JSX for the component
//     return (
//         <div className="relative h-screen md:block hidden" >
//             <StyledImage
//                 src={imageUrl} // Source of the image
//                 alt="Movie Backdrop" // Alt text for the image
//                 fill
//                 sizes="100%"
//                 style={{ objectFit: "contain", objectPosition:'center'}} // Style for the image
//                 priority
//                 placeholder='blur' // Placeholder for the image
//                 blurDataURL={placeholder} // Data URL for the placeholder
//             />
//         </div>
//     );
// };

// export default MediaBackdrop;

// Importing necessary libraries
import Image from 'next/image';
import styled from 'styled-components';

// Styled component for the image
const StyledImage = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  -webkit-mask-image: linear-gradient(180deg, transparent 5%, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 50%, transparent 95%);
  `;

// Styled component for the parent div
const StyledDiv = styled.div`
  display: none; // Hidden by default
  position: relative;
  height: 100vh;
  width: 100%;
  -webkit-mask-image: linear-gradient(90deg, transparent 5%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1) 65%, transparent 95%);
  @media (min-width: 768px) { 
    display: block;
  }
  `;

// Props for MediaBackdrop component
const MediaBackdrop = ({ imageUrl }: { imageUrl: string }) => {
    // Placeholder for the image
    const placeholder = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC';

    // Returning the JSX for the component
    return (
        <StyledDiv>
            <StyledImage
                unoptimized 
                src={imageUrl} // Source of the image
                alt="Movie Backdrop" // Alt text for the image
                fill
                style={{objectFit:'cover' , objectPosition:'top'}}
                priority
                placeholder='blur' // Placeholder for the image
                blurDataURL={placeholder} // Data URL for the placeholder
            />
        </StyledDiv>
    );
};

export default MediaBackdrop;
