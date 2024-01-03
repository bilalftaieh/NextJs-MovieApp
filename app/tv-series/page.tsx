// Importing necessary components and libraries
import FilterOptionsContainer from "@/components/FilterOptionsContainer";
import MediaCardContainer from "@/components/MediaCardContainer";
import { fetchCountries, fetchDiscoverTvSeries, fetchLanguages, fetchTvGenres } from "@/lib/movie-api";
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Discover Tv Series',
    description: 'Explore our vast collection of tv series. Filter and find tv series that match your taste.',
}

// The main function for the Tv Series Page
export default async function TvSeriesPage(
    {
        searchParams,
    }: {
        searchParams?: {
            sort?: string;
            page?: string;
            year?: string
            genre?: string
            lang?: string
            country?: string
        };
    }
) {
    // Default values for search parameters
    const sort = searchParams?.sort || 'popularity.desc';
    const currentPage = Number(searchParams?.page) || 1;
    const releaseYear = Number(searchParams?.year) || undefined;
    const language = searchParams?.lang || 'en-US';
    const genre = searchParams?.genre || undefined;
    const originCountry = searchParams?.country || undefined

    // Splitting genres into an array if it exists
    const genres = genre ? genre.split(',') : undefined;

    // Fetching TV series and Filter options
    const [filterLanguageOptions, filterCountryOptions,
        filterGenreOptions, tvSeriesObject] = await Promise.all(
            [fetchLanguages(), fetchCountries(), fetchTvGenres(), fetchDiscoverTvSeries
                (currentPage, sort, releaseYear, language, genres, originCountry)]);
    const totalResults = tvSeriesObject.total_results
    // Returning the JSX for the page
    return (
        <div className="md:grid md:grid-cols-4 gap-4 flex flex-col
        bg-slate-700 h-full md:overflow-auto space-y-4 text-gray-200 overflow-hidden">
            <div className="md:col-span-1 md:h-screen flex flex-col ml-4">
                <div className="p-4">
                    <h1 className="text-4xl font-bold mb-4">Discover Tv Series</h1>
                    <p className="text-lg mb-4">Explore a wide variety of tv series from different genres, languages, and countries. Use the filters to find your next favorite tv serie.</p>
                </div>
                <FilterOptionsContainer languages={filterLanguageOptions}
                    countries={filterCountryOptions} genres={filterGenreOptions} />
            </div>
            <div className="col-span-3 flex flex-col gap-7">
                <p className="text-lg text-gray-400 ml-5">A TOTAL OF {totalResults} TV SERIES QUERIED</p>
                <MediaCardContainer mediaObject={tvSeriesObject} mediaType="tv" />
            </div>
        </div>
    )
}
