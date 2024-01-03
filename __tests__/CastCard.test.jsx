import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import CastCard from '@/components/CastCard'

const mockProps = {
  name: 'Test Actor',
  character: 'Test Character',
  imageUrl: '/dark-knight.jpg',
};

const brokenImageProps = {
  ...mockProps,
  imageUrl: 'https://path/to/broken/image',
};

it('renders cast card correctly', () => {
  render(<CastCard {...mockProps} />);

  expect(screen.getByText('Test Actor')).toBeInTheDocument();
  expect(screen.getByText('Test Character')).toBeInTheDocument();
});

it('loads working image correctly', () => {
  render(<CastCard {...mockProps} />);
  const img = screen.getByRole('img');

  expect(img.src).toContain('dark-knight.jpg');
});

it('replaces image source on error', () => {
  render(<CastCard {...brokenImageProps} />);
  const img = screen.getByRole('img');

  // Simulate an error on the image
  fireEvent.error(img);

  // Check if the image source has been replaced
  expect(img.src).toMatch('default-image.png');
});

it('matches snapshot', () => {
    const{container} = render(<CastCard {...mockProps} />)
    expect(container).toMatchSnapshot();

  });

