// Importing necessary libraries and definitions
import { format, parseISO } from "date-fns";
import { Cast, Genre } from "./definitions";

// Function to convert minutes to hours and minutes
export function convertMinutesToHoursAndMinutes(minutes: number) {
    let hours = Math.floor(minutes / 60);
    let remainingMinutes = minutes % 60;
    if (minutes < 60) {
        return `${minutes}m`;
    } else {
        return `${hours}h ${remainingMinutes}m`;
    }
}

// Function to format a date string into 'MM/dd/yyyy' format
export const formatDateString = (dateString: string): string => {
    const date = parseISO(dateString);
    const formattedDate = format(date, 'dd/MM/yyyy');
    return formattedDate;
};

// Function to get formatted genres as a string
export const getFormattedGenres = (genres: Genre[]) => {
    return genres.map(genre => genre.name).join(',');
}

// Function to format a number into a readable format
export function formatNumber(number: number) {
    if (number >= 1e9) {
        return (number / 1e9).toFixed(2) + ' billion';
    } else if (number >= 1e6) {
        return (number / 1e6).toFixed(2) + ' million';
    } else if (number >= 1e3) {
        return (number / 1e3).toFixed(2) + ' thousand';
    }
    return number.toString();
}

export function createMediaSlug(mediaName: string, mediaId: number) {
    // Remove any leading or trailing spaces
    var slug = mediaName.trim();

    // Replace spaces with hyphens
    slug = slug.replace(/\s+/g, '-');

    // Remove special characters except hyphens
    slug = slug.replace(/[^\w\-]+/g, '');

    // Remove consecutive hyphens
    slug = slug.replace(/\-\-+/g, '-');

    // Convert to lowercase
    slug = slug.toLowerCase();

    // URL encode the slug to handle special characters and non-English languages
    slug = encodeURIComponent(slug);

    // Add the media ID at the end
    slug = slug + '-' + encodeURIComponent(mediaId);

    return slug;
}

export function extractIdFromSlug(slug: string) {
    let slugParts = slug.split('-'); 
    return slugParts[slugParts.length - 1]; 
}

export function extractSeasonNumberFromSeasonSlug(seasonSlug: string) {
    return seasonSlug.substring(1);
}

export function extractYear(dateString: string) {
    var date = new Date(dateString);
    if (!isNaN(date.getTime())) {
        return date.getFullYear();
    } else {
        return "Invalid date string";
    }
}

