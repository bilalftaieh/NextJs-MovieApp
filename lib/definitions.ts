// Type for Country
export type Country = {
  iso_3166_1: string; // ISO 3166-1 alpha-2 code
  english_name: string; // Name in English
  native_name: string; // Name in native language
}

// Type for Language
export type Language = {
  iso_639_1: string, // ISO 639-1 code
  english_name: string // Name in English
}

// Type for Genre
export type Genre = {
  id: number; // Genre ID
  name: string; // Genre name
}

// Type for Cast
export type Cast = {
  known_for_department: string // Department the cast member is known for
  name: string // Name of the cast member
  id: number // ID of the cast member
  profile_path: string // Path to the profile of the cast member
  character: string // Character played by the cast member
  job: string // Job of the cast member
  roles: { character: string }[] // Roles played by the cast member
  department: string // Department of the cast member
  jobs: { job: string; episode_count: number }[] // Jobs done by the cast member and the episode count for each job
  total_episode_count: number // Total episode count
}

export interface Media {
  poster_path: string,
  key?: Number,
  id: number,
  media_type?: string
};

export interface Movie extends Media {
  title: string,
  release_date: string,
};

export interface TvSerie extends Media {
  name: string,
  first_air_date: string,
};

export type MediaResultSet = {
  results: Movie[] | TvSerie[];
  total_pages: number;
  total_results: number;
}

export type MediaType = {
  name: string;
  href: string
}

export type MediaRating = {
  Source:string;
  Value:string;
}

// Props for Search component
export type SearchProps = {
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Function to handle input change
  includeLabel: boolean // Whether to include label or not
  emptySearchBar?: boolean
}

// Props for Sort component
export interface SortProps {
  handleSortSelect: (arg: string) => void; // Function to handle sort select
  sortOption: string; // Selected sort option
}

// Props for Genre component
export interface GenreProps {
  isSelected: boolean; // Whether the genre is selected or not
  genreId: number; // ID of the genre
  handleGenreClick: (arg: number) => void; // Function to handle genre click
  genreName: string; // Name of the genre
}

// Props for Language component
export interface LanguageProps {
  languages: Language[] // Array of languages
  currentLanguage: string; // Current selected language
  handleLanguageSelect: (arg: string) => void; // Function to handle language select
}

// Props for Country component
export interface CountryProps {
  countries: Country[] // Array of countries
  currentCountry: string; // Current selected country
  handleCountrySelect: (arg: string) => void; // Function to handle country select
}

// Props for ReleaseYear component
export interface ReleaseYearProps {
  handleYearOnChange: (arg: string) => void; // Function to handle year change
}

export interface LogoProps {
  src: string;
  alt: string;
}


export interface FilterOptionsContainerProps {
  genres: Genre[]
  languages: Language[]
  countries: Country[]
}

// Props for ReleaseYear component
export interface MediaTypeFilterProps {
  name: string;
  href: string;
  isSelected: boolean;
  handleClick: (arg: string) => void
}

// Props for MediaCardContainer component
export interface MediaCardContainerProps {
  mediaObject: MediaResultSet
  mediaType: string;
}
