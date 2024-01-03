import CollapsableDiv from "@/components/CollapsableDiv";
import MediaCard from "@/components/MediaCard";
import { Cast } from "@/lib/definitions";
import { fetchTvSeriesDetail, fetchTvSeriesSeasonCredits, fetchTvSeriesSeasonDetails } from "@/lib/movie-api";
import { convertMinutesToHoursAndMinutes, formatDateString, extractIdFromSlug, extractSeasonNumberFromSeasonSlug, extractYear } from "@/lib/utils";
import type { Metadata } from 'next'

export async function generateMetadata(
    { params }: { params: { seasonSlug: string; slug: string } }
): Promise<Metadata> {
    // read route params
    const tvSerieId = Number(extractIdFromSlug(params.slug));
    const seasonNumber = Number(extractSeasonNumberFromSeasonSlug(params.seasonSlug));
    const [seasonDetailObject, tvserieDetailObject] = await Promise.all(
        [fetchTvSeriesSeasonDetails(tvSerieId, seasonNumber),
        fetchTvSeriesDetail(tvSerieId)]);

    const seasonAirDate = seasonDetailObject.air_date ? extractYear(seasonDetailObject.air_date)
        : '';

    return {
        title: `${tvserieDetailObject.name}: ${seasonDetailObject.name} (${seasonAirDate})`,
        description: seasonDetailObject.overview ? seasonDetailObject.overview : tvserieDetailObject.overview,
        openGraph: {
            title: `${tvserieDetailObject.name}: ${seasonDetailObject.name} (${seasonAirDate})`,
            description: seasonDetailObject.overview ? seasonDetailObject.overview : tvserieDetailObject.overview,
        },
    }
}

type Episode = {
    air_date: string;
    id: number;
    episode_number: number;
    name: string;
    overview: string;
    runtime: string;
    crew: Cast[]
}

export default async function SeasonPage({ params }:
    { params: { seasonSlug: string; slug: string } }) {

    const tvSerieId = Number(extractIdFromSlug(params.slug));
    const seasonNumber = Number(extractSeasonNumberFromSeasonSlug(params.seasonSlug));
    const [seasonDetailObject, seasonCredits] = await Promise.all(
        [fetchTvSeriesSeasonDetails(tvSerieId, seasonNumber),
        fetchTvSeriesSeasonCredits(tvSerieId, seasonNumber)])

    const getActorsArray = (casts: Cast[]) => {
        const filteredActorsArray = casts.filter(cast => cast.known_for_department === 'Acting');
        return filteredActorsArray.slice(0, 5)
    }


    return (
        <div className="md:grid md:grid-cols-4 flex flex-col bg-slate-700 h-full">
            <div className="md:col-span-1 flex flex-col p-4 rounded-lg gap-4">
                <MediaCard imageUrl={`https://image.tmdb.org/t/p/original${seasonDetailObject.poster_path}`}
                    className="rounded-lg shadow-md" />

                <div>
                    <h2 className="text-lg font-semibold text-center text-gray-200">No. of Episodes:</h2>
                    <p className="text-lg text-gray-400 text-center">{seasonDetailObject.episodes.length}</p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-center text-gray-200">Starring :</h2>
                    {getActorsArray(seasonCredits.cast).map((cast: { name: string; id: number }) => {
                        return <p key={cast.id} className="text-lg text-gray-400 text-center">{cast.name}</p>
                    })}

                </div>
            </div>
            <div className="md:col-span-3 p-4 flex flex-col text-gray-500 text-center md:text-start
            space-y-4">
                <div>
                    <header className="text-4xl font-bold mb-2 text-gray-200">{seasonDetailObject.name}</header>
                    {seasonDetailObject.air_date && <p className="text-lg text-gray-400">{formatDateString(seasonDetailObject.air_date)}</p>}
                </div>


                {seasonDetailObject.overview !== '' && <div>
                    <p className="text-3xl font-bold mb-2 text-gray-200">
                        Overview
                    </p>
                    <p className="text-lg text-gray-400 break-normal">
                        {seasonDetailObject.overview}
                    </p> </div>}

                <div className="flex flex-col">
                    <p className="text-3xl font-bold mb-4 text-gray-200">
                        Episodes
                    </p>
                    <div className="md:grid md:grid-cols-2 gap-4 flex flex-col">
                        {seasonDetailObject.episodes.map((episode: Episode) => {
                            return (
                                <CollapsableDiv key={episode.id} name={episode.name}>
                                    <div className="flex flex-col bg-slate-70 p-4 overflow-auto max-h-64">
                                        <p className="text-gray-400">
                                            <strong className="text-gray-200">Directed by : </strong>
                                            {episode.crew.filter(member => member.job === 'Director').map(member => member.name).join(', ') || '---'}
                                        </p>
                                        <p className="text-gray-400">
                                            <strong className="text-gray-200">Written by : </strong>
                                            {episode.crew.filter(member => member.job === 'Writer').map(member => member.name).join(', ') || '---'}
                                        </p>


                                        <p className="text-gray-400"><strong className="text-gray-200">Air Date : </strong> {
                                            episode.air_date ? formatDateString(episode.air_date) : ''}</p>
                                        <p className="text-gray-400"><strong className="text-gray-200">Episode Number : </strong> {episode.episode_number}</p>
                                        <p className="text-gray-400"><strong className="text-gray-200">Runtime : </strong> {convertMinutesToHoursAndMinutes(Number(episode.runtime))}</p>
                                        <p className="text-gray-400"><strong className="text-gray-200">Overview : </strong> {episode.overview}</p>
                                    </div>
                                </CollapsableDiv>
                            )
                        })}
                    </div>




                </div>




            </div>
        </div>
    )
}
