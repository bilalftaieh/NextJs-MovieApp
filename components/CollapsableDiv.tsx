'use client'
// Importing necessary libraries
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowRight } from "@fortawesome/free-solid-svg-icons";

// Props for CollapsableDiv component
interface CollapsableDivProps {
    name: string; // Name of the collapsable div
    children: React.ReactNode; // Children of the collapsable div
}

// The main function for the CollapsableDiv component
export default function CollapsableDiv({ name, children }: CollapsableDivProps) {
    // State for whether the div is expanded or not
    const [isExpanded, setIsExpanded] = useState(false);

    // Function to handle click
    const handleClick = () => {
        setIsExpanded(!isExpanded);
    }

    // Returning the JSX for the component
    return (
        <div className="flex flex-col p-4 hover:bg-custom-one-dark">
            <div className="collapsable-div flex flex-row items-center cursor-pointer p-2 
            rounded-md space-x-4" onClick={handleClick}>
                <h2 className="font-bold text-lg text-white">{name}</h2>
                <div>
                    {!isExpanded && <FontAwesomeIcon icon={faArrowRight} />}
                    {isExpanded && <FontAwesomeIcon icon={faArrowDown} />}
                </div>
            </div>
            <div className="mt-2">
                {isExpanded && children}
            </div>
        </div>
    );
}
