import CastCard from "@/components/CastCard";
import MediaBackdrop from "@/components/MediaBackdrop";
import MediaCard from "@/components/MediaCard";
import { Cast } from "@/lib/definitions";
import { merriWeather_400, merriWeather_700 } from "@/lib/font";
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

    // For headers in the first column
    const firstColumnHeaderClass = `text-lg font-semibold text-center text-white ${merriWeather_700.className}`;
    const firstColumnParagraphClass = `text-base text-center ${merriWeather_400.className}`

    // For headers in the second column
    const secondColumnHeaderClass = `text-3xl font-bold mb-2 text-white ${merriWeather_700.className}`;
    const secondColumnParagraphClass = `text-lg break-normal ${merriWeather_400.className}`

    return (
        <div className="transform translate-y-24 md:-translate-y-32">
            <MediaBackdrop imageUrl={`https://image.tmdb.org/t/p/original${tvSerieDetails.backdrop_path}`} />
            <div className="md:grid md:grid-cols-4 flex flex-col -translate-y-20 md:-translate-y-28">
                <div className="md:col-span-1 flex flex-col p-4 rounded-lg md:items-stretch gap-4">
                    <MediaCard imageUrl={`https://image.tmdb.org/t/p/original${tvSerieDetails.poster_path}`}
                        tagline={tvSerieDetails.tagline} href={tvSerieDetails.homepage}
                        className="rounded-lg shadow-md" />

                    <div className="flex flex-row items-center space-x-6 md:space-x-0 md:flex-col justify-center">

                        <div>
                            <h2 className={firstColumnHeaderClass}>Created by:</h2>
                            {tvSerieDetails.created_by.length > 0 ?
                                (tvSerieDetails.created_by.map((creator: { name: string; id: number }) => {
                                    return <p key={creator.id} className={firstColumnParagraphClass}>{creator.name}</p>
                                })) : <p className={firstColumnParagraphClass}>---</p>}

                        </div>
                    </div>

                    <div>
                        <h2 className={firstColumnHeaderClass}>No. of Seasons:</h2>
                        <p className={firstColumnParagraphClass}>{tvSerieDetails.number_of_seasons}</p>
                    </div>

                    <div>
                        <h2 className={firstColumnHeaderClass}>No. of Episodes:</h2>
                        <p className={firstColumnParagraphClass}>{tvSerieDetails.number_of_episodes}</p>
                    </div>

                    <div>
                        <h2 className={firstColumnHeaderClass}>Watch on:</h2>
                        {tvSerieDetails.networks.map((network: { id: number; logo_path: string; name: string }) => {
                            return (
                                <div key={network.id} className="flex flex-col items-center justify-center space-x-3 mt-4">
                                    {network.logo_path && <Image src={`https://image.tmdb.org/t/p/h50_filter(negate,000,666)${network.logo_path}`} alt="Network Logo" width={70} height={70} />}
                                    {!network.logo_path && <p className={firstColumnParagraphClass}>{network.name}</p>}
                                </div>
                            )
                        })}
                    </div>

                    <h2 className={firstColumnHeaderClass}>Produced by:</h2>
                    {tvSerieDetails.production_companies.length > 0 ? (
                        tvSerieDetails.production_companies.map((company: { logo_path: string, name: string }, index: number) => {
                            return (
                                <div key={index} className="flex flex-row items-center justify-center space-x-3 mt-4">
                                    {company.logo_path && <Image src={`https://image.tmdb.org/t/p/h50_filter(negate,000,666)${company.logo_path}`} alt="Company Logo" width={70} height={70} />}
                                    {!company.logo_path && <p className={firstColumnParagraphClass}>{company.name}</p>}
                                </div>
                            )
                        })
                    ) : (
                        <p className={firstColumnParagraphClass}>---</p>
                    )}


                </div>



                <div className="md:col-span-3 p-4">
                    <div className="flex flex-col space-y-6 text-center md:text-start">
                        <div>
                            <header className={secondColumnHeaderClass}>{tvSerieDetails.name}</header>
                            <p className={secondColumnParagraphClass}>{tvSerieDetails.in_production ?
                                (formatDateString(tvSerieDetails.first_air_date) + '-present') :
                                (formatDateString(tvSerieDetails.first_air_date) + '-' +
                                    formatDateString(tvSerieDetails.last_air_date))
                            } · {getFormattedGenres(tvSerieDetails.genres)}</p>
                        </div>
                        <div>
                            <p className={secondColumnHeaderClass}>
                                Overview
                            </p>
                            <p className={secondColumnParagraphClass}>
                                {tvSerieDetails.overview}
                            </p>
                        </div>


                        <div>
                            <p className={secondColumnHeaderClass}>
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
                            <p className={secondColumnHeaderClass}>
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