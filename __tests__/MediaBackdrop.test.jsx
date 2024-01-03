import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import MediaBackdrop from '@/components/MediaBackdrop';

describe('MediaBackdrop', () => {
  it('renders without crashing', () => {
    render(<MediaBackdrop imageUrl="/dark-knight.jpg" />);
  });

  it('renders with correct image source', () => {
    render(<MediaBackdrop imageUrl="/dark-knight.jpg" />);
    expect(screen.getByAltText('Movie Backdrop').getAttribute('src')).toContain('dark-knight.jpg');
});
  
  it('matches snapshot', () => {
    const { asFragment } = render(<MediaBackdrop imageUrl="/dark-knight.jpg" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
