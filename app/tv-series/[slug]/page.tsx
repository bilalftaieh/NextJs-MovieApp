import CastCard from "@/components/CastCard";
import MediaBackdrop from "@/components/MediaBackdrop";
import MediaCard from "@/components/MediaCard";
import { Cast } from "@/lib/definitions";
import { fetchTvSeriesCredits, fetchTvSeriesDetail } from "@/lib/movie-api";
import { createMediaSlug, formatDateString, getFormattedGenres, extractIdFromSlug, extractYear } from "@/lib/utils";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Metadata } from "next";
import Image from "next/image";

export async function generateMetadata(
    { params }: { params: { slug: string } }
): Promise<Metadata> {
    const tvSerieId = Number(extractIdFromSlug(params.slug));

    const tvSerieDetails = await fetchTvSeriesDetail(tvSerieId);

    const startYear = extractYear(tvSerieDetails.first_air_date);

    const endYear = !tvSerieDetails.in_production ? extractYear(tvSerieDetails.last_air_date)
        : ''

    return {
        title: `${tvSerieDetails.name} (TV Series ${startYear}-${endYear})`,
        description: tvSerieDetails.overview,
        openGraph: {
            title: `${tvSerieDetails.name} (TV Series ${startYear}-${endYear})`,
            description: tvSerieDetails.overview
        },
    }
}

export default async function TvSeriesDetailsPage({ params }: { params: { slug: string } }) {
    const tvSerieId = Number(extractIdFromSlug(params.slug))

    const [tvSerieDetails, castsObject] = await Promise.all([
        fetchTvSeriesDetail(tvSerieId),
        fetchTvSeriesCredits(tvSerieId)]);

    const filterActors = (cast: Cast[]): Cast[] => {
        const filteredCastArray = cast.filter(member => member.known_for_department === 'Acting');
        return filteredCastArray.slice(0, 10);
    };

    return (
        <div className="flex flex-col bg-slate-700 text-gray-100 p-4 space-y-4">
            <MediaBackdrop imageUrl={`https://image.tmdb.org/t/p/original${tvSerieDetails.backdrop_path}`} />
            <div className="md:grid md:grid-cols-4 flex flex-col">
                <div className="md:col-span-1 flex flex-col p-4 rounded-lg md:items-stretch">
                    <MediaCard imageUrl={`https://image.tmdb.org/t/p/original${tvSerieDetails.poster_path}`}
                        tagline={tvSerieDetails.tagline} href={tvSerieDetails.homepage}
                        className="rounded-lg shadow-md" />

                    <div className="flex flex-row items-center space-x-6 md:space-x-0 md:flex-col justify-center">

                        <div>
                            <h2 className="text-lg font-semibold mt-4 text-center">Created by:</h2>
                            {tvSerieDetails.created_by.length > 0 ?
                                (tvSerieDetails.created_by.map((creator: { name: string; id: number }) => {
                                    return <p key={creator.id} className="text-lg text-gray-400 text-center">{creator.name}</p>
                                })) : <p className="text-lg text-gray-400 text-center">---</p>}

                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mt-4 text-center">No. of Seasons:</h2>
                        <p className="text-lg text-gray-400 text-center">{tvSerieDetails.number_of_seasons}</p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mt-4 text-center">No. of Episodes:</h2>
                        <p className="text-lg text-gray-400 text-center">{tvSerieDetails.number_of_episodes}</p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mt-4 text-center">Watch on:</h2>
                        {tvSerieDetails.networks.map((network: { id: number; logo_path: string; name: string }) => {
                            return (
                                <div key={network.id} className="flex flex-col items-center justify-center space-x-3 mt-4">
                                    {network.logo_path && <Image src={`https://image.tmdb.org/t/p/original${network.logo_path}`} alt="Network Logo" width={70} height={70} />}
                                    {!network.logo_path && <p className="text-sm font-medium text-gray-400">{network.name}</p>}
                                </div>
                            )
                        })}
                    </div>

                    <h2 className="text-lg font-semibold mt-4 text-center">Produced by:</h2>
                    {tvSerieDetails.production_companies.length > 0 ? (
                        tvSerieDetails.production_companies.map((company: { logo_path: string, name: string }, index: number) => {
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



                <div className="md:col-span-3 p-4">
                    <div className="flex flex-col space-y-7 text-center md:text-start">
                        <div>
                            <header className="text-4xl font-bold mb-2">{tvSerieDetails.name}</header>
                            <p className="text-lg text-gray-400">{tvSerieDetails.in_production ?
                                (formatDateString(tvSerieDetails.first_air_date) + '-present') :
                                (formatDateString(tvSerieDetails.first_air_date) + '-' +
                                    formatDateString(tvSerieDetails.last_air_date))
                            } · {getFormattedGenres(tvSerieDetails.genres)}</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold mb-2">
                                Overview
                            </p>
                            <p className="text-lg text-gray-400 break-normal">
                                {tvSerieDetails.overview}
                            </p>
                        </div>


                        <div>
                            <p className="text-3xl font-bold mb-2">
                                Cast
                            </p>
                            <div className="flex flex-row overflow-x-scroll justify-between space-x-4">
                                {filterActors(castsObject.cast).map((cast) => {
                                    return <div className="min-w-max" key={cast.id} ><CastCard name={cast.name}
                                        character={cast.roles.length > 3 ? `${cast.roles.slice(0, 3).map(role => role.character).join(',')},.....`
                                            : `${cast.roles.map(role => role.character).join(',')}`}
                                        imageUrl={`https://image.tmdb.org/t/p/original${cast.profile_path}`} />
                                    </div>
                                })}
                                <div className="flex justify-center items-center">
                                    <p className="text-lg font-semibold cursor-pointer text-center 
                            ">View More <FontAwesomeIcon icon={faArrowRight} /></p>
                                </div>

                            </div>
                        </div>


                        <div>
                            <p className="text-3xl font-bold mb-5">
                                Seasons
                            </p>
                            <div className="flex flex-row overflow-x-scroll overflow-y-hidden ">
                                {tvSerieDetails.seasons.map((season: {
                                    air_date: string; name: string; poster_path: string; id: number
                                    season_number: string
                                }) => {
                                    return <div className="min-w-max mx-2" key={season.id}>
                                        <MediaCard imageUrl={`https://image.tmdb.org/t/p/original${season.poster_path}`} mediaName={season.name}
                                            releaseDate={season.air_date} href={`${params.slug}/season/s${season.season_number}`} />
                                    </div>
                                })}
                            </div>

                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}