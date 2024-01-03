'use client'

import { useSearchParams } from "next/navigation";
import {
    CountryProps, GenreProps, LanguageProps
    , MediaTypeFilterProps, ReleaseYearProps, SearchProps, SortProps
} from "../lib/definitions";
import { useEffect, useState } from "react";
import Link from "next/link";


export const SearchBar = ({ handleInputChange, includeLabel, emptySearchBar }: SearchProps) => {

    const [inputValue, setInputValue] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        if (handleInputChange) {
            handleInputChange(event);
        }
    };

    useEffect(() => {
        if (emptySearchBar) {
            setInputValue('');
        }
    }, [emptySearchBar])

    return (
        <>
            {includeLabel && <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="search">
                Search
            </label>}
            <input
                type="text"
                onChange={handleChange}
                placeholder="Search..."
                value={inputValue}
                className="shadow appearance-none border rounded w-full py-2 pl-5 px-3 
             leading-tight focus:outline-none focus:shadow-outline "/>
        </>
    )
}

export const SortSelect = ({ handleSortSelect, sortOption }: SortProps) => {
    return (
        <>
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="sort">
                Sort Results By
            </label>
            <select
                id="sort"
                value={sortOption}
                onChange={(e) => handleSortSelect(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
                <option value="">--Please choose an option--</option>
                <option value="popularity.desc">Popularity</option>
                <option value="primary_release_date.desc">Primary Release Date</option>
                <option value="revenue.desc">Box Office</option>
                {/* Add more options as needed */}
            </select>
        </>
    )
}

export const GenreSphere = ({ isSelected, genreId, handleGenreClick, genreName }: GenreProps) => {
    const defaultBackgroundColor = 'bg-blue-800'; // Background color when isSelected is true
    const hoverBackgroundColor = 'bg-blue-700'; // Background color on hover (when isSelected is false)

    const backgroundClass = isSelected ? defaultBackgroundColor : `hover:${hoverBackgroundColor}`;

    return (
        <div
            className={`genre-sphere m-1 rounded-full p-4 text-sm font-semibold text-white
        shadow-xl cursor-pointer overflow-hidden overflow-ellipsis ${backgroundClass}`}
            onClick={() => handleGenreClick(genreId)}
        >
            {genreName}
        </div>
    );
};



export const LanguageSelect = ({ languages, currentLanguage, handleLanguageSelect }: LanguageProps) => {
    return (
        <>
            <label className="block text-sm font-bold mb-2" htmlFor="language">
                Language
            </label>
            <select
                id="language"
                value={currentLanguage}
                onChange={(e) => handleLanguageSelect(e.target.value)}
                className="shadow border rounded w-full py-2 px-3 text-black leading-tight 
                        focus:outline-none focus:shadow-outline bg-white"
            >
                <option value="">--Please choose a Language--</option>
                {languages.map((language, index) => {
                    return <option key={index} value={language.iso_639_1}>
                        {language.english_name}</option>
                })}
            </select>
        </>
    )
}


export const CountrySelect = ({ currentCountry, countries, handleCountrySelect }: CountryProps) => {
    return (
        <>
            <label className="block text-sm font-bold mb-2" htmlFor="country">
                Country
            </label>
            <select
                id="country"
                value={currentCountry}
                onChange={(e) => handleCountrySelect(e.target.value)}
                className="shadow border rounded w-full py-2 px-3 text-black leading-tight 
                        focus:outline-none focus:shadow-outline bg-white"
            >
                <option value="">--Please choose a Country--</option>
                {countries.map((country, index) => {
                    return <option key={index} value={country.iso_3166_1}>
                        {country.english_name}</option>
                })}
            </select>
        </>
    )
}

export const MediaTypeFilter = ({ name, href, isSelected, handleClick }: MediaTypeFilterProps) => {
    const backgroundColor = isSelected ? 'bg-blue-800' : 'hover:bg-blue-700'

    return (
        <Link href={href}>
            <button
                className={`flex flex-row items-center justify-between p-2 
                ${backgroundColor} rounded-md shadow-md cursor-pointer w-full`}
                onClick={() => handleClick(name)}
            >
                <p className="text-lg font-semibold text-gray-200">{name}</p>
            </button>
        </Link>
    )
}


export const ReleaseYearSearch = ({ handleYearOnChange }: ReleaseYearProps) => {
    const searchParams = useSearchParams();
    return (
        <>
            <label className="block text-sm font-bold mb-2" htmlFor="year">
                Release Year
            </label>
            <input
                id="year" name="year" min="1900" max="2099" step="1"
                type="number"
                onChange={(e) => handleYearOnChange(e.target.value)}
                placeholder="Enter a year..."
                defaultValue={searchParams.get('year')?.toString()}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </>
    )
}
