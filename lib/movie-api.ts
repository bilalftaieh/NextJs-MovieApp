require('dotenv').config()
const requestParams = {
  languages: 'configuration/languages',
  movieGenres: 'genre/movie/list',
  tvGenres: 'genre/tv/list',
  countries: 'configuration/countries',
  trendingMovies: 'trending/movie/day',
  nowPlayingMovies: 'movie/now_playing',
  trendingTvSeries: 'trending/tv/day',
  onTheAirTv: 'tv/on_the_air',
  movieDetails: (id: number) => `movie/${id}`,
  movieCredits: (id: number) => `movie/${id}/credits`,
  tvSeriesDetails: (id: number) => `tv/${id}`,
  tvSeriesCredits: (id: number) => `tv/${id}/aggregate_credits`,
  tvSeriesSeasonDetails: (id: number, seasonNumber: number) => `tv/${id}/season/${seasonNumber}`,
  tvSeriesSeasonCredits: (id: number, seasonNumber: number) => `tv/${id}/season/${seasonNumber}/aggregate_credits`,
  discoverMovies: 'discover/movie',
  discoverTvSeries: 'discover/tv',
  multiSearch: 'search/multi',
  searchMovies: 'search/movie',
  searchTvSeries: 'search/tv',
  movieExternalIds:(id:number) => `movie/${id}/external_ids`,
  mediaRating : (imdbId:number) => `?i=${imdbId}`
}

const TMDB_BASE_URL = process.env.TMDB_BASEURL;
const TMDB_BEARER_TOKEN = process.env.TMDB_BEARER_TOKEN;
const OMDB_BASE_URL = process.env.OMDB_BASEURL;
const OMDB_APIKEY = process.env.OMDB_APIKEY;

export async function fetchTopTenTrendingMovies() {
  console.log(`${TMDB_BASE_URL}${requestParams.trendingMovies}?language=en-US`);
  try {
    const response = await fetch(`${TMDB_BASE_URL}${requestParams.trendingMovies}?language=en-US`, {
      headers: {
        'Authorization': `Bearer ${TMDB_BEARER_TOKEN}`,
        'Content-Type': 'application/json'
      },
      next:{
        revalidate:3600
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const data = await response.json();
    return data.results.slice(0, 10);
  } catch (e) {
    console.error('An error occurred while fetching the popular movies:', e);
    return null;
  }
}

export async function fetchTopTenNowPlayingMovies() {
  console.log(`${TMDB_BASE_URL}${requestParams.nowPlayingMovies}?language=en-US&page=1`);
  try {
    const response = await fetch(`${TMDB_BASE_URL}${requestParams.nowPlayingMovies}?language=en-US&page=1`, {
      headers: {
        'Authorization': `Bearer ${TMDB_BEARER_TOKEN}`,
        'Content-Type': 'application/json'
      }, 
      next:{
        revalidate:3600
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const data = await response.json();
    return data.results.slice(0, 10);
  } catch (e) {
    console.error('An error occurred while fetching the now playing movies:', e);
    return null;
  }
}

export async function fetchTopTenTrendingTvSeries() {
  console.log(`${TMDB_BASE_URL}${requestParams.trendingTvSeries}?language=en-US`);
  try {
    const response = await fetch(`${TMDB_BASE_URL}${requestParams.trendingTvSeries}?language=en-US`, {
      headers: {
        'Authorization': `Bearer ${TMDB_BEARER_TOKEN}`,
        'Content-Type': 'application/json'
      },
      next:{
        revalidate:3600
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const data = await response.json();
    return data.results.slice(0, 10);
  } catch (e) {
    console.error('An error occurred while fetching the popular tv series:', e);
    return null;
  }
}

export async function fetchTopTenOnAirTvSeries() {
  console.log(`${TMDB_BASE_URL}${requestParams.onTheAirTv}?language=en-US&page=1`);
  try {
    const response = await fetch(`${TMDB_BASE_URL}${requestParams.onTheAirTv}?language=en-US&page=1`, {
      headers: {
        'Authorization': `Bearer ${TMDB_BEARER_TOKEN}`,
        'Content-Type': 'application/json'
      },
      next:{
        revalidate:3600
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const data = await response.json();
    return data.results.slice(0, 10);
  } catch (e) {
    console.error('An error occurred while fetching the on Air tv series:', e);
    return null;
  }
}

export async function fetchMovieDetails(movieId: number) {
  console.log(`${TMDB_BASE_URL}${requestParams.movieDetails(movieId)}?language=en-US`);
  try {
    const response = await fetch(`${TMDB_BASE_URL}${requestParams.movieDetails(movieId)}?language=en-US&page=1`, {
      headers: {
        'Authorization': `Bearer ${TMDB_BEARER_TOKEN}`,
        'Content-Type': 'application/json'
      },
      next:{
        revalidate:86400
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const data = await response.json();
    return data;
  } catch (e) {
    console.error('An error occurred while fetching the movie detail:', e);
    return null;
  }
}

export async function fetchMovieCredits(movieId: number) {
  console.log(`${TMDB_BASE_URL}${requestParams.movieCredits(movieId)}?language=en-US`);
  try {
    const response = await fetch(`${TMDB_BASE_URL}${requestParams.movieCredits(movieId)}?language=en-US`, {
      headers: {
        'Authorization': `Bearer ${TMDB_BEARER_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const data = await response.json();
    return data;
  } catch (e) {
    console.error('An error occurred while fetching the movie credits:', e);
    return null;
  }
}

export async function fetchDiscoverMovies(page: number = 1, sortby: string = "popularity.desc"
  , releaseYear?: number, language?: string, genre?: string[], originCountry?: string) {
  // Start with the base URL and mandatory parameters
  let url = `${TMDB_BASE_URL}${requestParams.discoverMovies}?include_adult=false&include_video=false&page=${page}&sort_by=${sortby}`;

  // Add optional parameters if they are provided
  if (releaseYear) {
    url += `&primary_release_year=${releaseYear}`;
  }
  if (originCountry) {
    url += `&with_origin_country=${originCountry}`;
  }

  if (language) {
    url += `&language=${language}`;
  }

  if (genre) {
    let genreUrl = '&with_genres=' + genre.join('%2C');
    url += genreUrl;
  }

  try {
    console.log(url);
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${TMDB_BEARER_TOKEN}`,
        'Content-Type': 'application/json'
      },
      next: {
        revalidate: 1800
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    await new Promise((resolve) => setTimeout(resolve, 3000));
    const data = await response.json();
    return data;
  } catch (e) {
    console.error('An error occurred while fetching the movie credits:', e);
    return null;
  }
}

export async function fetchDiscoverTvSeries(page: number = 1, sortby: string = "popularity.desc"
  , firstAirYear?: number, language?: string, genre?: string[], originCountry?: string) {
  // Start with the base URL and mandatory parameters
  let url = `${TMDB_BASE_URL}${requestParams.discoverTvSeries}?include_adult=false&include_null_first_air_dates=false&page=${page}&sort_by=${sortby}`;

  // Add optional parameters if they are provided
  if (firstAirYear) {
    url += `&first_air_date_year=${firstAirYear}`;
  }
  if (language) {
    url += `&language=${language}`;
  }

  if (genre) {
    let genreUrl = '&with_genres=' + genre.join('%2C');
    url += genreUrl;
  }

  if (originCountry) {
    url += `&with_origin_country=${originCountry}`;
  }

  try {
    console.log(url);
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${TMDB_BEARER_TOKEN}`,
        'Content-Type': 'application/json'
      },
      next: {
        revalidate: 1800
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    await new Promise((resolve) => setTimeout(resolve, 3000));
    const data = await response.json();
    return data;
  } catch (e) {
    console.error('An error occurred while fetching the movie credits:', e);
    return null;
  }
}

export async function fetchMultiDataFromSearch(page: number, query: string) {
  console.log(`${TMDB_BASE_URL}${requestParams.multiSearch}?query=${query}&include_adult=false&language=en-US&page=${page}`);
  try {
    const response = await fetch(`${TMDB_BASE_URL}${requestParams.multiSearch}?query=${query}&include_adult=false&language=en-US&page=${page}`, {
      headers: {
        'Authorization': `Bearer ${TMDB_BEARER_TOKEN}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const data = await response.json();
    return data;
  } catch (e) {
    console.error('An error occurred while fetching the movie credits:', e);
    return null;
  }
}

export async function fetchTvSeriesFromSearch(page: number, query: string) {
  console.log(`${TMDB_BASE_URL}${requestParams.searchTvSeries}?query=${query}&include_adult=false&language=en-US&page=${page}`);
  try {
    const response = await fetch(`${TMDB_BASE_URL}${requestParams.searchTvSeries}?query=${query}&include_adult=false&language=en-US&page=${page}`, {
      headers: {
        'Authorization': `Bearer ${TMDB_BEARER_TOKEN}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const data = await response.json();
    return data;
  } catch (e) {
    console.error('An error occurred while fetching the movie credits:', e);
    return null;
  }
}

export async function fetchMoviesFromSearch(page: number, query: string) {
  console.log(`${TMDB_BASE_URL}${requestParams.searchMovies}?query=${query}&include_adult=false&language=en-US&page=${page}`);
  try {
    const response = await fetch(`${TMDB_BASE_URL}${requestParams.searchMovies}?query=${query}&include_adult=false&language=en-US&page=${page}`, {
      headers: {
        'Authorization': `Bearer ${TMDB_BEARER_TOKEN}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const data = await response.json();
    return data;
  } catch (e) {
    console.error('An error occurred while fetching the movie credits:', e);
    return null;
  }
}

export async function fetchTvSeriesDetail(tvSerieId: number) {
  console.log(`${TMDB_BASE_URL}${requestParams.tvSeriesDetails(tvSerieId)}?language=en-US`);
  try {
    const response = await fetch(`${TMDB_BASE_URL}${requestParams.tvSeriesDetails(tvSerieId)}?language=en-US`, {
      headers: {
        'Authorization': `Bearer ${TMDB_BEARER_TOKEN}`,
        'Content-Type': 'application/json'
      },
      next:{
        revalidate:86400
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const data = await response.json();
    return data
  } catch (e) {
    console.error('An error occurred while fetching the popular movies:', e);
    return null;
  }
}

export async function fetchTvSeriesCredits(tvSerieId: number) {
  console.log(`${TMDB_BASE_URL}${requestParams.tvSeriesCredits(tvSerieId)}?language=en-US`);
  try {
    const response = await fetch(`${TMDB_BASE_URL}${requestParams.tvSeriesCredits(tvSerieId)}?language=en-US`, {
      headers: {
        'Authorization': `Bearer ${TMDB_BEARER_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const data = await response.json();
    return data
  } catch (e) {
    console.error('An error occurred while fetching the popular movies:', e);
    return null;
  }
}

export async function fetchTvSeriesSeasonDetails(tvSerieId: number, seasonNumber: number) {
  console.log(`${TMDB_BASE_URL}${requestParams.tvSeriesSeasonDetails(tvSerieId, seasonNumber)}?language=en-US`);
  try {
    const response = await fetch(`${TMDB_BASE_URL}${requestParams.tvSeriesSeasonDetails(tvSerieId, seasonNumber)}?language=en-US`, {
      headers: {
        'Authorization': `Bearer ${TMDB_BEARER_TOKEN}`,
        'Content-Type': 'application/json'
      },
      next:{
        revalidate:86400
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const data = await response.json();
    return data
  } catch (e) {
    console.error('An error occurred while fetching the popular movies:', e);
    return null;
  }
}

export async function fetchTvSeriesSeasonCredits(tvSerieId: number, seasonNumber: number) {
  console.log(`${TMDB_BASE_URL}${requestParams.tvSeriesSeasonCredits(tvSerieId, seasonNumber)}?language=en-US`);
  try {
    const response = await fetch(`${TMDB_BASE_URL}${requestParams.tvSeriesSeasonCredits(tvSerieId, seasonNumber)}?language=en-US`, {
      headers: {
        'Authorization': `Bearer ${TMDB_BEARER_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const data = await response.json();
    return data
  } catch (e) {
    console.error('An error occurred while fetching the popular movies:', e);
    return null;
  }
}


export async function fetchLanguages() {
  console.log(`${TMDB_BASE_URL}${requestParams.languages}`);
  try {
    const response = await fetch(`${TMDB_BASE_URL}${requestParams.languages}`, {
      headers: {
        'Authorization': `Bearer ${TMDB_BEARER_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const data = await response.json();
    return data;
  } catch (e) {
    console.error('An error occurred while fetching the movie credits:', e);
    return null;
  }
}

export async function fetchCountries() {
  console.log(`${TMDB_BASE_URL}${requestParams.countries}`);
  try {
    const response = await fetch(`${TMDB_BASE_URL}${requestParams.countries}`, {
      headers: {
        'Authorization': `Bearer ${TMDB_BEARER_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const data = await response.json();
    return data;
  } catch (e) {
    console.error('An error occurred while fetching the movie credits:', e);
    return null;
  }
}

export async function fetchMovieGenres() {
  console.log(`${TMDB_BASE_URL}${requestParams.movieGenres}`);
  try {
    const response = await fetch(`${TMDB_BASE_URL}${requestParams.movieGenres}`, {
      headers: {
        'Authorization': `Bearer ${TMDB_BEARER_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const data = await response.json();
    return data.genres;
  } catch (e) {
    console.error('An error occurred while fetching the movie credits:', e);
    return null;
  }
}

export async function fetchTvGenres() {
  console.log(`${TMDB_BASE_URL}${requestParams.tvGenres}`);
  try {
    const response = await fetch(`${TMDB_BASE_URL}${requestParams.tvGenres}`, {
      headers: {
        'Authorization': `Bearer ${TMDB_BEARER_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const data = await response.json();
    return data.genres;
  } catch (e) {
    console.error('An error occurred while fetching the movie credits:', e);
    return null;
  }
}

export async function fetchMovieExternalIds(movieId:number) {
  console.log(`${TMDB_BASE_URL}${requestParams.movieExternalIds(movieId)}`);
  try {
    const response = await fetch(`${TMDB_BASE_URL}${requestParams.movieExternalIds(movieId)}`, {
      headers: {
        'Authorization': `Bearer ${TMDB_BEARER_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const data = await response.json();
    return data;
  } catch (e) {
    console.error('An error occurred while fetching the movie external ids:', e);
    return null;
  }
}

export async function fetchMediaRating(imdbId:number) {
  console.log(`${OMDB_BASE_URL}${requestParams.mediaRating(imdbId)}&apikey=${OMDB_APIKEY}`);
  try {
    const response = await fetch(`${OMDB_BASE_URL}${requestParams.mediaRating(imdbId)}&apikey=${OMDB_APIKEY}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const data = await response.json();
    return data.Ratings;
  } catch (e) {
    console.error('An error occurred while fetching the media ratings:', e);
    return null;
  }
}




