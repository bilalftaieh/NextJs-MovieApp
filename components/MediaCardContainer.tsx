// Importing necessary components, libraries and definitions
import { Media, MediaCardContainerProps, Movie, TvSerie } from "@/lib/definitions";
import Pagination from "./Pagination";
import MediaCard from "./MediaCard";
import { createMediaSlug } from "@/lib/utils";

// The main function for the MediaCardContainer component
export default function MediaCardContainer(
    { mediaObject, mediaType }: MediaCardContainerProps) {

    const mediaArray = mediaObject.results;
    const totalPages = mediaObject.total_pages <= 500 ? mediaObject.total_pages : 500;
    // Returning the JSX for the component
    return (
        <div className="md:grid md:grid-cols-4 gap-4 flex flex-col items-center justify-center
            md:items-start md:justify-start">
            {mediaArray.map((media: Media) => {
                if (mediaType === 'movie') {
                    const movie = media as Movie;
                    return <MediaCard key={movie.id}
                        imageUrl={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        mediaName={movie.title}
                        releaseDate={movie.release_date}
                        href={`/movies/${createMediaSlug(movie.title, movie.id)}`}
                    />
                } else if (mediaType === 'tv') {
                    const tvSerie = media as TvSerie;
                    return <MediaCard key={tvSerie.id}
                        imageUrl={`https://image.tmdb.org/t/p/original${tvSerie.poster_path}`}
                        mediaName={tvSerie.name}
                        releaseDate={tvSerie.first_air_date}
                        href={`/tv-series/${createMediaSlug(tvSerie.name, tvSerie.id)}`}
                    />
                }
            })}
            <div className="col-span-4 flex justify-center h-full mb-5">
                <Pagination
                    totalPages={totalPages}
                />
            </div>
        </div>

    )


}