import { render, fireEvent, screen } from '@testing-library/react';
import ButtonSwitch from '@/components/homepage/ButtonSwitch';

describe('ButtonSwitch', () => {
    const setActive = jest.fn();
    let active = 'movie';

    beforeEach(() => {
        render(<ButtonSwitch active={active} setActive={setActive} />);
    });

    it('renders correctly with initial active state', () => {
        expect(screen.getByText('Movie')).toHaveClass('text-blue-500 font-semibold');
        expect(screen.getByText('TV Series')).toHaveClass('text-gray-500');
    });

    it('calls setActive with "movie" when Movie button is clicked', () => {
        fireEvent.click(screen.getByText('Movie'));

        expect(setActive).toHaveBeenCalledWith('movie');
    });

    it('calls setActive with "tv" when TV Series button is clicked', () => {
        fireEvent.click(screen.getByText('TV Series'));

        expect(setActive).toHaveBeenCalledWith('tv');
    });
});
