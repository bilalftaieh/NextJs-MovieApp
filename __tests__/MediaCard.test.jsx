import '@testing-library/jest-dom'
import { render,screen,fireEvent} from '@testing-library/react';
import MediaCard from '@/components/MediaCard';

const mockProps = {
  brokenImageUrl: 'https://path/to/image',
  workingImage : '/dark-knight.jpg',
  href : '/testHref',
  mediaName: 'Test Media',
  releaseDate: '2023-01-01',
  tagline:'Test Tagline'
};

describe('MediaCard', () => {
  it('renders without crashing', () => {
    render(<MediaCard imageUrl={mockProps.workingImage} />);
  });

  it('renders with correct image source', () => {
    render(<MediaCard imageUrl={mockProps.workingImage} />);
    expect(screen.getByAltText('No Image').getAttribute('src')).toContain('dark-knight.jpg');
  });

  it('replaces image source on error', () => {
    render(<MediaCard imageUrl={mockProps.brokenImageUrl} />);
    const img = screen.getByRole('img');

    // Simulate an error on the image
    fireEvent.error(img);

    // Check if the image source has been replaced
    expect(img.src).toMatch('default-image.png');
});

  it('renders with correct movie name', () => {
    render(<MediaCard imageUrl={mockProps.workingImage} mediaName={mockProps.mediaName} />);
    expect(screen.getByText(`${mockProps.mediaName}`)).toBeInTheDocument();
  });

  it('renders with correct release date', () => {
    render(<MediaCard imageUrl={mockProps.workingImage} releaseDate={mockProps.releaseDate} />);
    expect(screen.getByText(`01/01/2023`)).toBeInTheDocument();
  });

  it('renders with correct tagline', () => {
    render(<MediaCard imageUrl={mockProps.workingImage} tagline={mockProps.tagline} />);
    expect(screen.getByText(`${mockProps.tagline}`)).toBeInTheDocument();
  });

  it('renders content wrapped with next/link when href is provided', () => {
    const { container} = render(
        <MediaCard imageUrl={mockProps.workingImage} 
        mediaName={mockProps.mediaName} href={mockProps.href} />
    );

    // Check if the link is rendered
    const linkElement = container.querySelector('a');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href',`${mockProps.href}`);

    // Check if the content is rendered within the link
    const contentElement = screen.getByText(`${mockProps.mediaName}`);
    expect(linkElement).toContainElement(contentElement);
});
it('matches snapshot', () => {
    const { asFragment, rerender } = render(<MediaCard imageUrl={mockProps.workingImage} />);
    expect(asFragment()).toMatchSnapshot();

    rerender(<MediaCard imageUrl={mockProps.workingImage} href={mockProps.href} />);
    expect(asFragment()).toMatchSnapshot();
});

});
