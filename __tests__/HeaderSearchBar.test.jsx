import { render, fireEvent,screen } from '@testing-library/react';
import { useRouter,useSearchParams } from 'next/navigation';
import HeaderSearchBar from '@/components/HeaderSearchBar';

jest.mock('next/navigation');

describe('HeaderSearchBar', () => {
  let mockPush;

  beforeEach(() => {
    mockPush = jest.fn();
    useRouter.mockReturnValue({
      push: mockPush
    });
    useSearchParams.mockReturnValue({
      get: jest.fn().mockReturnValue({
        toString: () => '2023'
      })
    });
  });

  it('renders without crashing', () => {
    render(<HeaderSearchBar />);
  });

  it('calls handleSearchOnClick when button is clicked', () => {
    render(<HeaderSearchBar />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockPush).toHaveBeenCalled();
  });

  it('updates search value when input changes', () => {
    render(<HeaderSearchBar />);
    fireEvent.change(screen.getByPlaceholderText('Search...'), { target: { value: '2024' } });
    expect(screen.getByPlaceholderText('Search...').value).toBe('2024');
  });

  it('calls handleSearchOnClick with correct query when button is clicked', () => {
    render(<HeaderSearchBar />);
    fireEvent.change(screen.getByPlaceholderText('Search...'), { target: { value: '2024' } });
    fireEvent.click(screen.getByRole('button'));
    expect(mockPush).toHaveBeenCalledWith('/search?query=2024');
  });
});
