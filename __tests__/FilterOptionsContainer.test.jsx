import '@testing-library/jest-dom'
import { render, fireEvent,screen, waitFor } from '@testing-library/react';
import FilterOptionsContainer, { GenreSpheres, LanguageSelection,CountrySelection 
, SortSelection, ReleaseYearSelection} from '@/components/FilterOptionsContainer';
import { useRouter,useSearchParams } from 'next/navigation';

jest.mock('next/navigation')

const mockGenres = [
  { id: 1, name: 'Genre 1' },
  { id: 2, name: 'Genre 2' },

];

const mockLanguages = [
  { iso_639_1: 'en', english_name: 'English' },
  { iso_639_1: 'fr', english_name: 'French' },

];

const mockCountries = [
  { iso_3166_1: 'en', english_name: 'English' },
  { iso_3166_1: 'fr', english_name: 'French' },

];



describe('GenreSpheres', () => {
  const mockReplace = jest.fn();

  beforeEach(() => {
    useRouter.mockReturnValue({
      replace: mockReplace,
    });
  });  

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    useSearchParams.mockReturnValue({
      get : jest.fn().mockReturnValue('')
  });
    render(<GenreSpheres genres={mockGenres} />);
    mockGenres.forEach((genre) => {
      expect(screen.getByText(genre.name)).toBeInTheDocument();
    });
  });

  it('handles genre click correctly', () => {
    useSearchParams.mockReturnValue({
      get : jest.fn().mockReturnValue('')
  });
    render(<GenreSpheres genres={mockGenres} />);
    const genreElement = screen.getByText(mockGenres[0].name);
    fireEvent.click(genreElement);
    expect(mockReplace).toHaveBeenCalledWith(expect.stringContaining(`genre=${mockGenres[0].id}`));
    fireEvent.click(genreElement);
    expect(mockReplace).toHaveBeenCalledWith(expect.not.stringContaining('genre='));
  });

  it('handles more than one genre click correctly', () => {
    useSearchParams.mockReturnValue({
      get : jest.fn().mockReturnValue('')
  });
    render(<GenreSpheres genres={mockGenres} />);
    const genreElement1 = screen.getByText(mockGenres[0].name);
    const genreElement2 = screen.getByText(mockGenres[1].name);
    fireEvent.click(genreElement1);
    expect(mockReplace).toHaveBeenCalledWith(expect.stringContaining(`genre=${mockGenres[0].id}`));
    fireEvent.click(genreElement2);
    expect(mockReplace).toHaveBeenCalledWith(expect.stringContaining(`genre=${mockGenres[0].id}%2C${mockGenres[1].id}`));
    fireEvent.click(genreElement1);
    expect(mockReplace).toHaveBeenCalledWith(expect.not.stringContaining(`${mockGenres[0].id}`));
    fireEvent.click(genreElement2);
    expect(mockReplace).toHaveBeenCalledWith(expect.not.stringContaining(`genre=`));
});

it('populates selectedGenres array from searchParams', () => {
  useSearchParams.mockReturnValue({
    get : jest.fn().mockReturnValue('1,2')
});
  render(<GenreSpheres genres={mockGenres} />);
  const genreElement1 = screen.getByText(mockGenres[0].name);
  const genreElement2 = screen.getByText(mockGenres[1].name);
  expect(genreElement1).toHaveClass('bg-blue-800');
  expect(genreElement2).toHaveClass('bg-blue-800');
});


  // Add more test cases as needed
});

// Language Selection 

describe('LanguageSelection', () => {
    const mockReplace = jest.fn();      
  
    beforeEach(() => {
      useRouter.mockReturnValue({
        replace: mockReplace,
      });
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('renders correctly', () => {
      useSearchParams.mockReturnValue({
        get : jest.fn().mockReturnValue('')
    });
      render(<LanguageSelection languages={mockLanguages} />);
      mockLanguages.forEach((language) => {
        expect(screen.getByText(language.english_name)).toBeInTheDocument();
      });
    });
  
    it('deltes language selection params correctly', () => {
      useSearchParams.mockReturnValue({
        get : jest.fn().mockReturnValue('')
    });
      render(<LanguageSelection languages={mockLanguages} />);
      const selectElement = screen.getByRole('combobox');
      fireEvent.change(selectElement, { target: { value: '' } });
      expect(mockReplace).toHaveBeenCalledWith(expect.not.stringContaining(`lang=`));
    });

    it('handles language selection correctly', () => {
      useSearchParams.mockReturnValue({
        get : jest.fn().mockReturnValue('')
    });
      render(<LanguageSelection languages={mockLanguages} />);
      const selectElement = screen.getByRole('combobox');
      fireEvent.change(selectElement, { target: { value: 'en' } });
      expect(mockReplace).toHaveBeenCalledWith(expect.stringContaining(`lang=${mockLanguages[0].iso_639_1}`));
    });


    it('gets language selection from searchParams', () => {
      useSearchParams.mockReturnValue({
        get : jest.fn().mockReturnValue(mockLanguages[1].iso_639_1)
    });
      render(<LanguageSelection languages={mockLanguages} />);
      const selectElement = screen.getByRole('combobox');
      const selectedValue = selectElement.value;
      expect(selectedValue).toBe(mockLanguages[1].iso_639_1)
    });


    it('matches snapshot when clicked', () => {
        const {container} = render(<LanguageSelection languages={mockLanguages} />);
        const languageElement = screen.getByText(mockLanguages[0].english_name);
        fireEvent.click(languageElement);
        expect(container).toMatchSnapshot();
      });
  
    // Add more test cases as needed
  })


  describe('CountrySelection', () => {
    const mockReplace = jest.fn();

    beforeEach(() => {
      useRouter.mockReturnValue({
        replace: mockReplace,
      });
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('renders correctly', () => {
      useSearchParams.mockReturnValue({
        get : jest.fn().mockReturnValue('')
    });
      render(<CountrySelection countries={mockCountries} />);
      mockCountries.forEach((country) => {
        expect(screen.getByText(country.english_name)).toBeInTheDocument();
      });
    });
  
    it('handles country selection correctly', () => {
      useSearchParams.mockReturnValue({
        get : jest.fn().mockReturnValue('')
    });
      render(<CountrySelection countries={mockCountries} />);
      const selectElement = screen.getByRole('combobox');
      fireEvent.change(selectElement, { target: { value: 'en' } });
      expect(mockReplace).toHaveBeenCalledWith(expect.stringContaining(`country=${mockCountries[0].iso_3166_1}`));
    });

    it('deletes country selection params correctly', () => {
      useSearchParams.mockReturnValue({
        get : jest.fn().mockReturnValue('')
    });
      render(<CountrySelection countries={mockCountries} />);
      const selectElement = screen.getByRole('combobox');
      fireEvent.change(selectElement, { target: { value: '' } });
      expect(mockReplace).toHaveBeenCalledWith(expect.not.stringContaining(`country=`));
    });

    it('gets country selection from searchParams', () => {
      useSearchParams.mockReturnValue({
        get : jest.fn().mockReturnValue(mockCountries[1].iso_3166_1)
    });
      render(<CountrySelection countries={mockCountries} />);
      const selectElement = screen.getByRole('combobox');
      const selectedValue = selectElement.value;
      expect(selectedValue).toBe(mockCountries[1].iso_3166_1)
    });


    it('matches snapshot when clicked', () => {
        const {container} = render(<CountrySelection countries={mockCountries} />);
        const countryElement = screen.getByText(mockCountries[1].english_name);
        fireEvent.click(countryElement);
        expect(container).toMatchSnapshot();
      });
  
    // Add more test cases as needed
  })

  describe('SortSelection', () => {
    const mockReplace = jest.fn();
    const sortList = [{name:'Popularity',value:'popularity.desc'},
      ,{name:'Primary Release Date',value:'primary_release_date.desc'},
      {name:'Box Office',value:'revenue.desc'}]

    beforeEach(() => {
      useRouter.mockReturnValue({
        replace: mockReplace,
      });
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('renders correctly', () => {
      useSearchParams.mockReturnValue({
        get : jest.fn().mockReturnValue('')
    });
      render(<SortSelection />);
      sortList.forEach((sort) => {
        expect(screen.getByText(sort.name)).toBeInTheDocument();
      });
    });
  
    it('deletes sort selection params correctly', () => {
      useSearchParams.mockReturnValue({
        get : jest.fn().mockReturnValue('')
    });
      render(<SortSelection />);
      const selectElement = screen.getByRole('combobox');
      fireEvent.change(selectElement, { target: { value: sortList[0].value } });
      expect(mockReplace).toHaveBeenCalledWith(expect.stringContaining(`sort=${sortList[0].value}`));
    });

    it('handles sort selection correctly', () => {
      useSearchParams.mockReturnValue({
        get : jest.fn().mockReturnValue('')
    });
      render(<SortSelection />);
      const selectElement = screen.getByRole('combobox');
      fireEvent.change(selectElement, { target: { value: '' } });
      expect(mockReplace).toHaveBeenCalledWith(expect.not.stringContaining(`sort=`));
    });

    it('gets sort selection from searchParams', () => {
      useSearchParams.mockReturnValue({
        get : jest.fn().mockReturnValue(sortList[0].value)
    });
      render(<SortSelection />);
      const selectElement = screen.getByRole('combobox');
      const selectedValue = selectElement.value;
      expect(selectedValue).toBe(sortList[0].value)
    });


    it('matches snapshot when clicked', () => {
        const {container} = render(<SortSelection />);
        const sortElement = screen.getByText(sortList[0].name);
        fireEvent.click(sortElement);
        expect(container).toMatchSnapshot();
      });
  
    // Add more test cases as needed
  })

  describe('Release Year Selection', () => {
    let mockReplace;
  
    beforeEach(() => {
      mockReplace = jest.fn();
      useRouter.mockReturnValue({
        replace: mockReplace
      });
      useSearchParams.mockReturnValue({
        get: jest.fn().mockReturnValue({
          toString: () => '2023'
        })
      });
    });
  
    it('renders without crashing', () => {
      render(<ReleaseYearSelection />);
    });
  
    it('calls replace method onChange', async () => {
      const mockReplace = jest.fn();
      useRouter.mockReturnValue({ replace: mockReplace });
    
      render(<ReleaseYearSelection />);
      fireEvent.change(screen.getByPlaceholderText('Enter a year...'),{ target: { value: '2024'} })
    
      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith(expect.stringContaining('year=2024'));
      });
    });

    it('deletes search param when empty', async () => {
      const mockReplace = jest.fn();
      useRouter.mockReturnValue({ replace: mockReplace });
    
      render(<ReleaseYearSelection />);
      fireEvent.change(screen.getByPlaceholderText('Enter a year...'),{ target: { value: ''} })
    
      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith(expect.not.stringContaining('year='));
      });
    });
    
    
  
    it('updates search value when input changes', () => {
      render(<ReleaseYearSelection />);
      fireEvent.change(screen.getByPlaceholderText('Enter a year...'), { target: { value: '2024' } });
      expect(screen.getByPlaceholderText('Enter a year...').value).toBe('2024');
    });
  });

  // describe('FilterOptionsContainer', () => {
  //   beforeEach(() => {
  //     render(<FilterOptionsContainer genres={mockGenres} languages={mockLanguages} 
  //       countries={mockCountries} />);
  //       useRouter.mockReturnValue({
  //         replace: mockReplace,
  //       });
  //       useSearchParams.mockReturnValue({
  //         get : jest.fn().mockReturnValue('')
  //     });
  //   });
  
  //   it('renders the genres', () => {
  //     mockGenres.forEach(genre => {
  //       expect(screen.getByText(genre.name)).toBeInTheDocument();
  //     });
  //   });
  
  //   it('renders the languages', () => {
  //     mockLanguages.forEach(language => {
  //       expect(screen.getByText(language.english_name)).toBeInTheDocument();
  //     });
  //   });
  
  //   it('renders the countries', () => {
  //     mockCountries.forEach(country => {
  //       expect(screen.getByText(country.english_name)).toBeInTheDocument();
  //     });
  //   });
  
  //   it('renders the release year selection', () => {
  //     expect(screen.getByText('Release Year')).toBeInTheDocument();
  //   });
  // });

  