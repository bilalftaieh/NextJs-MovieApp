import { render, fireEvent,screen} from '@testing-library/react';
import {SearchBar,SortSelect,GenreSphere
  ,LanguageSelect,CountrySelect,ReleaseYearSearch,MediaTypeFilter} from '@/components/FilterOptions'
import { useSearchParams} from 'next/navigation';

jest.mock('next/navigation');

describe('SearchBar', () => {
  let handleInputChange;

  beforeEach(() => {
    handleInputChange = jest.fn();
    useSearchParams.mockReturnValue({
      get: jest.fn().mockReturnValue({
        toString: () => 'test'
      })
    });
  });

  it('renders with label when includeLabel is true', () => {
   render(<SearchBar handleInputChange={handleInputChange} includeLabel={true} />);
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('does not render label when includeLabel is false', () => {
    render(<SearchBar handleInputChange={handleInputChange} includeLabel={false} />);
    expect(screen.queryByText('Search')).toBeNull();
  });

  it('empties search when emptySearch prop is true', () => {
    render(<SearchBar handleInputChange={handleInputChange} includeLabel={false} 
      emptySearchBar={true} />);
    expect(screen.getByPlaceholderText('Search...').value).toBe('');
  });

  it('calls handleInputChange when input changes', () => {
    render(<SearchBar handleInputChange={handleInputChange} includeLabel={false} />);
    fireEvent.change(screen.getByPlaceholderText('Search...'), { target: { value: 'test1' } });
    expect(handleInputChange).toHaveBeenCalled();
  });

  it('matches snapshot', () => {
    const {container} = render(<SearchBar handleInputChange={handleInputChange} />);
    expect(container).toMatchSnapshot();
  });
});


// SORT TEST

describe('SortSelect', () => {
  let mockHandleSortSelect;

  beforeEach(() => {
    mockHandleSortSelect = jest.fn();
  });

  it('renders without crashing', () => {
    render(<SortSelect handleSortSelect={mockHandleSortSelect} sortOption="" />);
  });

  it('calls handleSortSelect when an option is selected', () => {
    render(<SortSelect handleSortSelect={mockHandleSortSelect} sortOption="" />);
    fireEvent.change(screen.getByLabelText('Sort Results By'), { target: { value: 'popularity.desc' } });
    expect(mockHandleSortSelect).toHaveBeenCalledWith('popularity.desc');
  });

  it('selects the correct option when sortOption prop changes', () => {
    const { rerender } = render(<SortSelect handleSortSelect={mockHandleSortSelect} sortOption="" />);
    rerender(<SortSelect handleSortSelect={mockHandleSortSelect} sortOption="popularity.desc" />);
    expect(screen.getByLabelText('Sort Results By').value).toBe('popularity.desc');
  });
});

// GenreSphere Test

describe('GenreSphere', () => {
  let mockHandleGenreClick;

  beforeEach(() => {
    mockHandleGenreClick = jest.fn();
  });

  it('renders without crashing', () => {
    render(<GenreSphere isSelected={false} 
      genreId="1" handleGenreClick={mockHandleGenreClick} genreName="Action" />);
  });

  it('calls handleGenreClick when clicked', () => {
    render(<GenreSphere isSelected={false} 
      genreId="1" handleGenreClick={mockHandleGenreClick} genreName="Action" />);
    fireEvent.click(screen.getByText('Action'));
    expect(mockHandleGenreClick).toHaveBeenCalledWith('1');
  });

  it('renders with correct background color when isSelected is true', () => {
    render(<GenreSphere isSelected={true} genreId="1" 
    handleGenreClick={mockHandleGenreClick} genreName="Action" />);
    expect(screen.getByText('Action')).toHaveClass('bg-blue-800');
  });

  it('renders with correct background color when isSelected is false', () => {
    render(<GenreSphere isSelected={false} genreId="1" handleGenreClick={mockHandleGenreClick} genreName="Action" />);
    expect(screen.getByText('Action')).toHaveClass('hover:bg-blue-700');
  });

  it('matches snapshot when props change', () => {
    const { container, rerender } = render(<GenreSphere isSelected={false} genreId="1" 
    handleGenreClick={mockHandleGenreClick} genreName="Action" />);
    expect(container).toMatchSnapshot();

    rerender(<GenreSphere isSelected={true} genreId="2" 
    handleGenreClick={mockHandleGenreClick} genreName="Adventure" />);
    expect(container).toMatchSnapshot();
  });
});


// Language Select 

describe('LanguageSelect', () => {
  let mockHandleLanguageSelect;
  const languages = [
    { iso_639_1: 'en', english_name: 'English' },
    { iso_639_1: 'fr', english_name: 'French' },
    // Add more languages as needed
  ];

  beforeEach(() => {
    mockHandleLanguageSelect = jest.fn();
  });

  it('renders without crashing', () => {
    render(<LanguageSelect languages={languages} currentLanguage="" 
    handleLanguageSelect={mockHandleLanguageSelect} />);
  });

  it('calls handleLanguageSelect when a language is selected', () => {
    render(<LanguageSelect languages={languages} currentLanguage="" 
    handleLanguageSelect={mockHandleLanguageSelect} />);
    fireEvent.change(screen.getByLabelText('Language'), { target: { value: 'en' } });
    expect(mockHandleLanguageSelect).toHaveBeenCalledWith('en');
  });

  it('renders the correct language options', () => {
    render(<LanguageSelect languages={languages} currentLanguage="" handleLanguageSelect={mockHandleLanguageSelect} />);
    languages.forEach(language => {
      expect(screen.getByText(language.english_name)).toBeInTheDocument();
    });
  });

  it('selects the correct option when currentLanguage prop changes', () => {
    const { rerender} = render(<LanguageSelect languages={languages} currentLanguage="" handleLanguageSelect={mockHandleLanguageSelect} />);
    rerender(<LanguageSelect languages={languages} currentLanguage="fr" handleLanguageSelect={mockHandleLanguageSelect} />);
    expect(screen.getByLabelText('Language').value).toBe('fr');
  });
});

// Country Select TEST

describe('CountrySelect', () => {
  let mockHandleCountrySelect;
  const countries = [
    { iso_3166_1: 'US', english_name: 'United States' },
    { iso_3166_1: 'FR', english_name: 'France' },
    // Add more countries as needed
  ];

  beforeEach(() => {
    mockHandleCountrySelect = jest.fn();
  });

  it('renders without crashing', () => {
    render(<CountrySelect countries={countries} currentCountry="" handleCountrySelect={mockHandleCountrySelect} />);
  });

  it('calls handleCountrySelect when a country is selected', () => {
    render(<CountrySelect countries={countries} currentCountry="" handleCountrySelect={mockHandleCountrySelect} />);
    fireEvent.change(screen.getByLabelText('Country'), { target: { value: 'US' } });
    expect(mockHandleCountrySelect).toHaveBeenCalledWith('US');
  });

  it('renders the correct country options', () => {
    render(<CountrySelect countries={countries} currentCountry="" handleCountrySelect={mockHandleCountrySelect} />);
    countries.forEach(country => {
      expect(screen.getByText(country.english_name)).toBeInTheDocument();
    });
  });

  it('selects the correct option when currentCountry prop changes', () => {
    const { rerender} = render(<CountrySelect countries={countries} currentCountry="" handleCountrySelect={mockHandleCountrySelect} />);
    rerender(<CountrySelect countries={countries} currentCountry="FR" handleCountrySelect={mockHandleCountrySelect} />);
    expect(screen.getByLabelText('Country').value).toBe('FR');
  });
});


// Release Year Search TEST

describe('ReleaseYearSearch', () => {
  let mockHandleYearOnChange;

  beforeEach(() => {
    mockHandleYearOnChange = jest.fn();
    useSearchParams.mockReturnValue({
      get: jest.fn().mockReturnValue({
        toString: () => '2023'
      })
    });
  });

  it('renders without crashing', () => {
    render(<ReleaseYearSearch handleYearOnChange={mockHandleYearOnChange} />);
  });

  it('calls handleYearOnChange when input changes', () => {
    render(<ReleaseYearSearch handleYearOnChange={mockHandleYearOnChange} />);
    fireEvent.change(screen.getByLabelText('Release Year'), { target: { value: '2024' } });
    expect(mockHandleYearOnChange).toHaveBeenCalledWith('2024');
  });

  it('renders with correct default value from search params', () => {
    render(<ReleaseYearSearch handleYearOnChange={mockHandleYearOnChange} />);
    expect(screen.getByLabelText('Release Year').value).toBe('2023');
  });
});

describe('MediaTypeFilter', () => {
  let mockHandleClick;

  beforeEach(() => {
    mockHandleClick = jest.fn();
  });

  it('renders without crashing', () => {
    render(<MediaTypeFilter name='example' href='/search/tv?query=example' isSelected={false} 
    handleClick={mockHandleClick} />);
  });

  it('calls handleClick when clicked', () => {
    // Render the component with the mock handleClick function
    render(<MediaTypeFilter name='example' href='/search/tv?query=example' isSelected={false} 
    handleClick={mockHandleClick} />);

    // Simulate a click event on the button
    fireEvent.click(screen.getByText('example'));

    // Check if the mock handleClick function was called with the correct argument
    expect(mockHandleClick).toHaveBeenCalledWith('example');
  });

  it('changes background color when isSelected true', () => {
    render(<MediaTypeFilter name='example' href='/search/tv?query=example' isSelected={true} 
    handleClick={mockHandleClick} />);
    expect(screen.getByRole('button', { name: /example/i })).toHaveClass('bg-blue-800');
  });

  it('have hover background color when isSelected false', () => {
    render(<MediaTypeFilter name='example' href='/search/tv?query=example' isSelected={false} 
    handleClick={mockHandleClick} />);
    expect(screen.getByRole('button', { name: /example/i })).toHaveClass('hover:bg-blue-700');
  });

  it('matches snapshot', () => {
    const {container} = render(<MediaTypeFilter name='example' href='/search/tv?query=example' 
    isSelected={true} 
    handleClick={mockHandleClick} />);
    expect(container).toMatchSnapshot();
  });
});