// Importing necessary components and libraries
import CastCard from "@/components/CastCard";
import MediaCard from "@/components/MediaCard";
import MediaBackdrop from "@/components/MediaBackdrop";
import { fetchMovieDetails, fetchMovieCredits, fetchMovieExternalIds, fetchMediaRating } from "@/lib/movie-api";
import { Cast, MediaRating } from "@/lib/definitions";
import {
    convertMinutesToHoursAndMinutes,
    formatDateString, formatNumber, getFormattedGenres, extractIdFromSlug, extractYear
} from "@/lib/utils";
import { Metadata } from "next";
import Logo from "@/components/Logo";
import { merriWeather_400, merriWeather_700 } from "@/lib/font";

export async function generateMetadata(
    { params }: { params: { slug: string } }
): Promise<Metadata> {
    // read route params
    const movieId = Number(extractIdFromSlug(params.slug));

    // fetch data
    const movieDetails = await fetchMovieDetails(movieId);

    const releaseYear = extractYear(movieDetails.release_date)

    return {
        title: `${movieDetails.title} (${releaseYear})`,
        description: movieDetails.overview,
        openGraph: {
            title: `${movieDetails.title} (${releaseYear})`,
            description: movieDetails.overview
        },
    }
}

// The main function for the Movie Details Page
export default async function MovieDetailsPage({ params }: { params: { slug: string } }) {

    const movieId = Number(extractIdFromSlug(params.slug));

    // Fetching movie details and credits
    const [movieDetails, castObject] = await Promise.all([
        fetchMovieDetails(movieId),
        fetchMovieCredits(movieId)]);
    const movieExternalIds = await fetchMovieExternalIds(movieId);
    const movieRatings = await fetchMediaRating(movieExternalIds.imdb_id);

    // Function to filter actors
    const filterActors = (cast: Cast[]): Cast[] => {
        return cast.filter(member => member.known_for_department === 'Acting').slice(0, 10);
    };

    // Function to get director
    const getDirector = (cast: Cast[]): Cast[] => {
        return cast.filter(member => member.job === 'Director');
    }

    // For headers in the first column
    const firstColumnHeaderClass = `text-lg font-semibold text-center text-white ${merriWeather_700.className}`;
    const firstColumnParagraphClass = `text-base text-center ${merriWeather_400.className}`

    // For headers in the second column
    const secondColumnHeaderClass = `text-4xl font-bold mb-2 text-white ${merriWeather_700.className}`;
    const secondParagraphHeaderClass = `text-lg break-normal ${merriWeather_400.className}`

    // Returning the JSX for the page
    return (
        <div className="transform translate-y-24 md:-translate-y-32">
            <MediaBackdrop imageUrl={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`} />

            <div className="md:grid md:grid-cols-4 flex flex-col -translate-y-20 md:-translate-y-28">
                <div className="md:col-span-1 flex flex-col p-4 rounded-lg items-center md:items-stretch gap-4">
                    <MediaCard imageUrl={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`}
                        tagline={movieDetails.tagline} href={movieDetails.homepage}
                        className="rounded-lg shadow-md" />

                    <div className="flex flex-row items-center space-x-6 md:space-x-0 md:flex-col justify-center gap-4">
                        <div>
                            <h2 className={firstColumnHeaderClass} id="budget-header">Budget:</h2>
                            <p className={firstColumnParagraphClass} id="budget-value">${formatNumber(movieDetails.budget)}</p>
                        </div>

                        <div>
                            <h2 className={firstColumnHeaderClass} id="box-office-header">Box Office:</h2>
                            <p className={firstColumnParagraphClass} id="box-office-value">${formatNumber(movieDetails.revenue)}</p>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-4 justify-center items-center">
                        <div>
                            <h2 className={firstColumnHeaderClass} id="director-header">Directed by:</h2>
                            {getDirector(castObject.crew).length > 0 ?
                                (getDirector(castObject.crew).map((director) => {
                                    return <p key={director.id} className={`director ${firstColumnParagraphClass}`}>{director.name}</p>
                                })) : (
                                    <p className={firstColumnParagraphClass}>---</p>
                                )}
                        </div>

                        <div className="mt-4 md:mt-0">
                            <h2 className={firstColumnHeaderClass} id="producer-header">Produced by:</h2>
                            <div className="flex flex-col items-center space-y-3 mt-4">
                                {movieDetails.production_companies.length > 0 ? (
                                    movieDetails.production_companies.map((company: { logo_path: string, name: string }, index: number) => {
                                        return (
                                            company.logo_path ? <Logo src={`https://image.tmdb.org/t/p/h50_filter(negate,000,666)${company.logo_path}`} alt="Logo" />
                                                : <p className="text-sm font-medium">{company.name}</p>
                                        )
                                    })
                                ) : (
                                    <p className="text-lg text-center">---</p>
                                )}

                            </div>
                        </div>
                    </div>





                </div>



                <div className="md:col-span-3 p-4">
                    <div className="flex flex-col space-y-6 text-center md:text-start">
                        <div>
                            <header className={secondColumnHeaderClass} id="movie-title-header" >{movieDetails.title}</header>
                            <p id="movie-details" className={`text-lg ${merriWeather_400.className}`}>{formatDateString(movieDetails.release_date)} · {getFormattedGenres(movieDetails.genres)} · {convertMinutesToHoursAndMinutes(movieDetails.runtime)}</p>
                        </div>
                        <div>
                            <p className={secondColumnHeaderClass}>
                                Overview
                            </p>
                            <p className={secondParagraphHeaderClass} id="overview-paragraph">
                                {movieDetails.overview}
                            </p>
                        </div>


                        <div>
                            <p className={secondColumnHeaderClass}>
                                Cast
                            </p>
                            <div className="flex flex-row overflow-x-scroll justify-between space-x-4">
                                {filterActors(castObject.cast).map((cast) => {
                                    return <div className="min-w-max" key={cast.id} ><CastCard name={cast.name} character={cast.character}
                                        imageUrl={`https://image.tmdb.org/t/p/original${cast.profile_path}`} />
                                    </div>
                                })}

                            </div>
                        </div>

                        {movieRatings && movieRatings.length > 0 && (
                            <div>
                                <p className={secondColumnHeaderClass}>
                                    Ratings
                                </p>
                                <div className="flex flex-row flex-wrap">
                                    {movieRatings.map((rating: MediaRating, index: number) => (
                                        <div key={`${rating.Source}-${index}`} className="review-aggregator text-white flex flex-col items-center m-2 p-2 bg-custom-one-light rounded">
                                            <span className="text-lg font-bold text-white">{rating.Source}</span>
                                            <span className="text-xl">{rating.Value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}


                    </div>
                </div>
            </div>
        </div>



    )
}
