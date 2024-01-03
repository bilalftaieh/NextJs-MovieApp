// Importing necessary components and libraries
import CastCard from "@/components/CastCard";
import MediaCard from "@/components/MediaCard";
import MediaBackdrop from "@/components/MediaBackdrop";
import { fetchMovieDetails, fetchMovieCredits } from "@/lib/movie-api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { Suspense } from "react";
import { Cast } from "@/lib/definitions";
import {
    convertMinutesToHoursAndMinutes,
    formatDateString, formatNumber, getFormattedGenres, extractIdFromSlug, extractYear
} from "@/lib/utils";
import { Metadata } from "next";

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

    // Function to filter actors
    const filterActors = (cast: Cast[]): Cast[] => {
        return cast.filter(member => member.known_for_department === 'Acting').slice(0, 10);
    };

    // Function to get director
    const getDirector = (cast: Cast[]): Cast[] => {
        return cast.filter(member => member.job === 'Director');
    }

    // Returning the JSX for the page
    return (
        <div className="flex flex-col bg-slate-700 text-gray-100 p-4 space-y-4">
            <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><p className="text-gray-300">Loading...</p></div>}>
                <MediaBackdrop imageUrl={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`} />
            </Suspense>
            <div className="md:grid md:grid-cols-4 flex flex-col">
                <div className="md:col-span-1 flex flex-col p-4 rounded-lg items-center md:items-stretch">
                    <MediaCard imageUrl={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`}
                        tagline={movieDetails.tagline} href={movieDetails.homepage}
                        className="rounded-lg shadow-md" />

                    <div className="flex flex-row items-center space-x-6 md:space-x-0 md:flex-col justify-center">
                        <div>
                            <h2 className="text-lg font-semibold text-center" id="budget-header">Budget:</h2>
                            <p className="text-lg text-gray-400 text-center" id="budget-value">${formatNumber(movieDetails.budget)}</p>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold md:mt-4 text-center" id="box-office-header">Box Office:</h2>
                            <p className="text-lg text-gray-400 text-center" id="box-office-value">${formatNumber(movieDetails.revenue)}</p>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-4 justify-center items-center">
                        <div>
                            <h2 className="text-lg font-semibold mt-4 text-center" id="director-header">Directed by:</h2>
                            {getDirector(castObject.crew).length > 0 ?
                                (getDirector(castObject.crew).map((director) => {
                                    return <p key={director.id} className="director text-lg text-gray-400 text-center">{director.name}</p>
                                })) : (
                                    <p className="text-lg text-gray-400 text-center">---</p>
                                )}
                        </div>

                        <div className="mt-4 md:mt-0">
                            <h2 className="text-lg font-semibold text-center" id="producer-header">Produced by:</h2>
                            {movieDetails.production_companies.length > 0 ? (
                                movieDetails.production_companies.map((company: { logo_path: string, name: string }, index: number) => {
                                    return (
                                        <div key={index} className="flex flex-row items-center justify-center space-x-3 mt-4">
                                            {company.logo_path && <Image src={`https://image.tmdb.org/t/p/original${company.logo_path}`} alt="Company Logo" width={70} height={70} />}
                                            {!company.logo_path && <p className="text-sm font-medium text-gray-400">{company.name}</p>}
                                        </div>
                                    )
                                })
                            ) : (
                                <p className="text-lg text-gray-400 text-center">---</p>
                            )}
                        </div>
                    </div>





                </div>



                <div className="md:col-span-3 p-4 ">
                    <div className="flex flex-col space-y-3 text-center md:text-start">
                        <div>
                            <header className="text-4xl font-bold mb-2" id="movie-title-header">{movieDetails.title}</header>
                            <p id="movie-details" className="text-lg text-gray-400">{formatDateString(movieDetails.release_date)} · {getFormattedGenres(movieDetails.genres)} · {convertMinutesToHoursAndMinutes(movieDetails.runtime)}</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold mb-2">
                                Overview
                            </p>
                            <p className="text-lg text-gray-400 break-normal" id="overview-paragraph">
                                {movieDetails.overview}
                            </p>
                        </div>


                        <div>
                            <p className="text-3xl font-bold mb-2">
                                Cast
                            </p>
                            <div className="flex flex-row overflow-x-scroll justify-between space-x-4">
                                {filterActors(castObject.cast).map((cast) => {
                                    return <div className="min-w-max" key={cast.id} ><CastCard name={cast.name} character={cast.character}
                                        imageUrl={`https://image.tmdb.org/t/p/original${cast.profile_path}`} />
                                    </div>
                                })}
                                <div className="flex justify-center items-center">
                                    <p className="text-lg font-semibold cursor-pointer text-center 
                            ">View More <FontAwesomeIcon icon={faArrowRight} /></p>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
