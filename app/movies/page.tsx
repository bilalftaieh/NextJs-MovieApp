// Importing necessary components and libraries
import FilterOptionsContainer from "@/components/FilterOptionsContainer";
import MediaCardContainer from "@/components/MediaCardContainer";
import { fetchCountries, fetchDiscoverMovies, fetchLanguages, fetchMovieGenres } from "@/lib/movie-api";
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Discover Movies',
  description: 'Explore our vast collection of movies. Filter and find movies that match your taste.',
}
 
// The main function for the Movies Page
export default async function MoviesPage({
    searchParams,
}: {
    searchParams?: {
        sort?: string;
        page?: string;
        year?: string;
        genre?: string;
        lang?: string;
        country?: string
    };
}) {
    // Default values for search parameters
    const sort = searchParams?.sort || 'popularity.desc';
    const currentPage = Number(searchParams?.page) || 1;
    const releaseYear = Number(searchParams?.year);
    const language = searchParams?.lang || 'en-US';
    const originCountry = searchParams?.country || undefined;
    const genre = searchParams?.genre;

    // Splitting genres into an array if it exists
    const genres = genre ? genre.split(',') : undefined;

    // Fetching movies and Filter Options
    const [filterLanguageOptions, filterCountryOptions,
        filterGenreOptions, moviesObject] = await Promise.all(
            [fetchLanguages(), fetchCountries(), fetchMovieGenres(), fetchDiscoverMovies(
                currentPage, sort, releaseYear, language, genres, originCountry)]);

    const totalResults = moviesObject.total_results;

    // Returning the JSX for the page
    return (
        <div className="md:grid md:grid-cols-4 gap-4 flex flex-col
         h-full md:overflow-auto space-y-4 overflow-hidden">
            <div className="md:col-span-1 md:h-screen flex flex-col ml-4">
                <div className="p-4">
                    <h1 className="text-4xl font-bold mb-4 text-white">Discover Movies</h1>
                    <p className="text-lg mb-4">Explore a wide variety of movies from different genres, languages, and countries. Use the filters to find your next favorite film.</p>
                </div>
                <FilterOptionsContainer languages={filterLanguageOptions}
                    countries={filterCountryOptions} genres={filterGenreOptions} />
            </div>
            <div className="md:col-span-3 flex flex-col gap-7">
                <p className="text-lg text-gray-400 ml-5">A TOTAL OF {totalResults} MOVIES QUERIED</p>
                    <MediaCardContainer mediaObject={moviesObject} mediaType="movie" />
            </div>
        </div>
    )
}
