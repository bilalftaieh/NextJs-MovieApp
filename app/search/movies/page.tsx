import MediaCardContainer from "@/components/MediaCardContainer";
import { fetchMoviesFromSearch } from "@/lib/movie-api";
import { Metadata } from "next";

export const metadata : Metadata = {
    title:'Movie Search',
    description : 'Search for Movies'
} 
export default async function MoviesSearchPage(
    {
        searchParams,
    }: {
        searchParams?: {
            query?: string;
            page?: string;
        };
    }
){

    const searchQuery = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

   const moviesDataObject = await fetchMoviesFromSearch(currentPage,searchQuery)
   const moviesTotalResults = moviesDataObject.total_results

    return (
        <div className="flex flex-col gap-7">
            <p className="text-lg text-gray-400 ml-5">A TOTAL OF {moviesTotalResults} MOVIES MATCH “{searchQuery}”</p>
            <MediaCardContainer mediaObject={moviesDataObject} mediaType="movie"/>
        </div>
                
    )
}
