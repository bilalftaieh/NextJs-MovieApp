'use client'

import { oswald_700 } from "@/lib/font";
import ButtonSwitch from "./ButtonSwitch";
import MediaCard from "../MediaCard";
import { useState } from "react";
import { Movie, TvSerie } from "@/lib/definitions";
import { createMediaSlug } from "@/lib/utils";
import VerticalScrollContainer from "../HorizontalScroller";
import HorizonatalScroller from "../HorizontalScroller";

interface ButtonProps {
    moviesArray: Movie[],
    title: string,
    tvSeriesArray: TvSerie[]
}


export default function MediaContainer({ moviesArray, title, tvSeriesArray }: ButtonProps) {
    const [active, setActive] = useState('movie');

    const mediaType = () => {
        if (active === 'movie') {
            return active.charAt(0).toUpperCase() + active.substring(1, active.length);
        }
        return active.charAt(0).toUpperCase() + active.substring(1, active.length) + ' ' + 'Serie';
    }



    return (<div className="flex flex-col md:gap-4 ">
        <div className="flex flex-row items-center space-x-4">
            <header className={`text-xl font-bold mb-4 ${oswald_700.className}`}>{title} {mediaType()}s</header>
            <ButtonSwitch active={active} setActive={setActive} />
        </div>

        {/* <div className="grid md:grid-cols-5 grid-cols-2 md:grid-rows-2 gap-3 ">
            {active === 'movie' && moviesArray.map((movie: Movie, index: number) => {
                return (<MediaCard
                    key={index}
                    imageUrl={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    mediaName={movie.title}
                    releaseDate={movie.release_date}
                    href={`/movies/${createMediaSlug(movie.title, movie.id)}`}
                />)
            })}
            {active === 'tv' && tvSeriesArray.map((tvSerie: TvSerie, index: number) => {
                return (<MediaCard
                    key={index}
                    imageUrl={`https://image.tmdb.org/t/p/original${tvSerie.poster_path}`}
                    mediaName={tvSerie.name}
                    releaseDate={tvSerie.first_air_date}
                    href={`/tv-series/${createMediaSlug(tvSerie.name, tvSerie.id)}`}
                />)
            })}
        </div> */}

        <HorizonatalScroller>
        {active === 'movie' && moviesArray.map((movie: Movie, index: number) => {
                return (<div className="min-w-max" key={movie.id}>
                    <MediaCard
                    imageUrl={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    mediaName={movie.title}
                    releaseDate={movie.release_date}
                    href={`/movies/${createMediaSlug(movie.title, movie.id)}`}
                />
                </div>)
            })}
            {active === 'tv' && tvSeriesArray.map((tvSerie: TvSerie, index: number) => {
                return (<div className="min-w-max" key={tvSerie.id}>
                        <MediaCard
                    imageUrl={`https://image.tmdb.org/t/p/original${tvSerie.poster_path}`}
                    mediaName={tvSerie.name}
                    releaseDate={tvSerie.first_air_date}
                    href={`/tv-series/${createMediaSlug(tvSerie.name, tvSerie.id)}`}
                />
                    </div>)
            })}
        </HorizonatalScroller>
    </div>)
}