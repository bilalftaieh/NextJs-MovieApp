import MediaCard from "@/components/MediaCard";
import { fetchMoviesFromSearch, fetchMultiDataFromSearch, fetchTvSeriesFromSearch } from "@/lib/movie-api";
import { Media, MediaType, Movie, TvSerie } from "@/lib/definitions";
import { createMediaSlug } from "@/lib/utils";
import type { Metadata } from 'next'
import AppPagination from "@/components/AppPagination";
 
export const metadata: Metadata = {
  title: 'Multi Search',
  description: 'Search across multiple categories including movies, TV series, and more.',
}


export default async function SearchPage({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const searchQuery = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

   const multiMediaDataArray = await fetchMultiDataFromSearch(currentPage,searchQuery)

   const multiMediaResults = multiMediaDataArray.results
   const multiMediaTotalPages = multiMediaDataArray.total_pages
   const multiMediaTotalResults = multiMediaDataArray.total_results

    return (
        <div className="flex flex-col gap-7">
    <p className="text-lg ml-5"
    >A TOTAL OF {multiMediaTotalResults} MEDIAS MATCH “{searchQuery}”</p>
        <div className="md:grid md:grid-cols-4 flex flex-col gap-4 items-center md:items-start">
            {multiMediaResults.map((media : Media)=>{
                if (media.media_type === 'movie') {
                    const movie = media as Movie;
                    return <MediaCard key={movie.id}
                        imageUrl={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        mediaName={movie.title}
                        releaseDate={movie.release_date}
                        href={`/movies/${createMediaSlug(movie.title,movie.id)}`}
                    />
                } else if (media.media_type === 'tv') {
                    const tvSerie = media as TvSerie;
                    return <MediaCard key={tvSerie.id}
                        imageUrl={`https://image.tmdb.org/t/p/original${tvSerie.poster_path}`}
                        mediaName={tvSerie.name}
                        releaseDate={tvSerie.first_air_date}
                        href={`/tv-series/${createMediaSlug(tvSerie.name,tvSerie.id)}`}
                    />
                }
            })}
        </div>
    <div className="flex justify-center h-full mb-5">
                <AppPagination totalPages={multiMediaTotalPages} />
    </div>
</div>

                
    )
}
