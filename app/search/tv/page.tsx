import MediaCardContainer from "@/components/MediaCardContainer";
import { fetchTvSeriesFromSearch } from "@/lib/movie-api";
import { Metadata } from "next";

export const metadata : Metadata = {
    title:'TV Series Search',
    description : 'Search for TV Series'
} 

export default async function TvSeriesSearchPage(
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

   const tvSeriesDataObject = await fetchTvSeriesFromSearch(currentPage,searchQuery)
   const tvSeriesTotalResults = tvSeriesDataObject.total_results

    return (
        <div className="flex flex-col gap-7 justify-center">
            <p className="text-lg text-gray-400 ml-5">A TOTAL OF {tvSeriesTotalResults} TV SERIES MATCH “{searchQuery}”</p>
             <MediaCardContainer mediaObject={tvSeriesDataObject} mediaType="tv"/>
        </div>
                
    )
}
