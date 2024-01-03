'use client'
import React, { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { CountrySelect, GenreSphere, LanguageSelect,ReleaseYearSearch,SortSelect } from "@/components/FilterOptions";
import { useDebouncedCallback } from "use-debounce";
import { Country, FilterOptionsContainerProps, Genre, Language} from "@/lib/definitions";
import CollapsableDiv from "./CollapsableDiv";

export const GenreSpheres = ({ genres }: { genres: Genre[]; }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  const handleGenreClick = (genre: number) => {
    const params = new URLSearchParams(searchParams);
    let newSelectedGenres;
    if (selectedGenres.includes(genre)) {
      newSelectedGenres = selectedGenres.filter(g => g !== genre);
    } else {
      newSelectedGenres = [...selectedGenres, genre];
    }
    setSelectedGenres(newSelectedGenres);

    if (newSelectedGenres.length == 0) {
      params.delete('genre');
    } else {
      params.set('genre', newSelectedGenres.join(','));
    }
    replace(`${pathname}?${params.toString()}`);
  }

  useEffect(() => {
    const genreParam = searchParams.get('genre');
    if (genreParam) {
      const genreIds = genreParam.split(',').map(Number);
      setSelectedGenres(genreIds);
    }
  }, []);

  return (
    <div className="flex flex-row flex-wrap gap-4">
      {genres.map((genre) => {
        return <GenreSphere key={genre.id} isSelected={selectedGenres.includes(genre.id)}
          genreId={genre.id} handleGenreClick={handleGenreClick}
          genreName={genre.name} />
      })}
    </div>
  );
}

export const LanguageSelection = ({ languages }: { languages: Language[] }) => {
  const [language, setLanguage] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleLanguageSelect = (language: string) => {
    const params = new URLSearchParams(searchParams);
    if (language) {
      params.set('lang', language)
    }
    else {
      params.delete('lang');
    }
    setLanguage(language);
    replace(`${pathname}?${params.toString()}`);
  }

  useEffect(() => {
    const langParam = searchParams.get('lang');
    if (langParam) {
      setLanguage(langParam);
    }
  }, []);

  return (<>
    <LanguageSelect languages={languages}
      currentLanguage={language} handleLanguageSelect={handleLanguageSelect} />
  </>
  )
}


export const CountrySelection = ({ countries }: { countries: Country[] }) => {
  const [country, setCountry] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleCountrySelect = (country: string) => {
    const params = new URLSearchParams(searchParams);
    if (country) {
      params.set('country', country)
    }
    else {
      params.delete('country');
    }
    setCountry(country);
    replace(`${pathname}?${params.toString()}`);
  }

  useEffect(() => {
    const countryParam = searchParams.get('country');
    if (countryParam) {
      setCountry(countryParam);
    }
  }, []);


  return (<>
    <CountrySelect countries={countries}
      currentCountry={country} handleCountrySelect={handleCountrySelect} />
  </>
  )
}

export const SortSelection = () => {
  const [sortOption, setSortOption] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSortSelect = (option: string) => {
    console.log(`changing to ${option}`)
    const params = new URLSearchParams(searchParams);
    if (option) {
      params.set('sort', option);
      setSortOption(option);
    } else {
      params.delete('sort');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  useEffect(() => {
    const sortParam = searchParams.get('sort');
    if (sortParam) {
      setSortOption(sortParam);
    }
  }, []);


  return (
    <>
      <SortSelect handleSortSelect={handleSortSelect} sortOption={sortOption} />
    </>
  );
}

export const ReleaseYearSelection = () => {
  const [releaseYear, setReleaseYear] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleYearOnChange = useDebouncedCallback((option: string) => {
    console.log(`changing to ${option}`)
    const params = new URLSearchParams(searchParams);
    if (option) {
      params.set('year', option);
      setReleaseYear(option);
    } else {
      params.delete('year');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500)
  return (
    <>
      <ReleaseYearSearch handleYearOnChange={handleYearOnChange} />
    </>
  );

}


export default function FilterOptionsContainer(
  { genres, languages, countries }: FilterOptionsContainerProps) {


  return (
    <div className="flex flex-col gap-4">
      <CollapsableDiv name="Sort">
        <SortSelection />
      </CollapsableDiv>

      <CollapsableDiv name="Filter">
        <div className="flex flex-col text-gray-300">
          <div className="mb-4">
            <h3 className="font-bold mb-2">Genres</h3>
            <GenreSpheres genres={genres} />
          </div>
          <div className="mb-4">
            <LanguageSelection languages={languages} />
          </div>
          <div className="mb-4">
            <CountrySelection countries={countries} />
          </div>
          <div className="mb-4">
            <ReleaseYearSelection />
          </div>
        </div>
      </CollapsableDiv>
    </div>
  );
}
