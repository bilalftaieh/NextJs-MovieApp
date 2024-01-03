'use client'
// Importing necessary libraries and components
import { SearchBar } from "@/components/FilterOptions"
import { useState } from "react"
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

// The main function for the HeaderSearchBar component
export default function HeaderSearchBar() {
    // State for the search value
    const [searchValue, setSearchValue] = useState('');
    const [emptySearch, setEmptySearch] = useState(false);

    // Using the useRouter hook from Next.js
    const { push } = useRouter();

    // Function to handle search on click
    const handleSearchOnClick = (searchQuery: string) => {
        const params = new URLSearchParams();
        if (searchQuery) {
            params.set('query', searchQuery);
        } else {
            params.delete('query', searchQuery);
        }
        setSearchValue('');
        setEmptySearch(true);
        setTimeout(() => setEmptySearch(false), 0);
        push(`/search?${params.toString()}`);
    }

    // Function to handle input change
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    }

    // Returning the JSX for the component
    return (

        <div className='flex flex-row space-x-2'>
            <SearchBar handleInputChange={handleInputChange}
                includeLabel={false} emptySearchBar={emptySearch} />
            <button className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleSearchOnClick(searchValue)}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>

        </div>
    )
}