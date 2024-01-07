import MediaContainer from '@/components/homepage/MediaContainer';
import { fetchTopTenNowPlayingMovies,fetchTopTenTrendingMovies,fetchTopTenTrendingTvSeries, 
fetchTopTenOnAirTvSeries} from '@/lib/movie-api'
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Home | Trending and Now Playing',
  description: 'Discover trending and now playing movies and TV series.',
}

export default async function Home() {
  const [trendingrMovies, trendingTvSeries,nowPlayingMovies,OnAirTvSeries] = await Promise.all
  ([fetchTopTenTrendingMovies(), fetchTopTenTrendingTvSeries()
    ,fetchTopTenNowPlayingMovies(),fetchTopTenOnAirTvSeries()]);
  return (
    <div className="flex flex-col gap-6 text-gray-200 p-6">
     <MediaContainer moviesArray={trendingrMovies} tvSeriesArray={trendingTvSeries} title='Trending'/>
     <MediaContainer moviesArray={nowPlayingMovies} tvSeriesArray={OnAirTvSeries} title='Now Playing'/>
    </div>
  )
  
}
