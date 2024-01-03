import { convertMinutesToHoursAndMinutes, formatDateString, formatNumber
  , getFormattedGenres,createMediaSlug, extractIdFromSlug,extractSeasonNumberFromSeasonSlug, extractYear } from '@/lib/utils';
import '@testing-library/jest-dom'

describe('Test suite for utility functions', () => {
  test('convertMinutesToHoursAndMinutes function', () => {
    expect(convertMinutesToHoursAndMinutes(90)).toBe('1h 30m');
    expect(convertMinutesToHoursAndMinutes(45)).toBe('45m');
  });

  test('formatDateString function', () => {
    expect(formatDateString('2023-12-25')).toBe('25/12/2023');
  });

  test('getFormattedGenres function', () => {
    const genres = [{ id: 1, name: 'Action' }, { id: 2, name: 'Adventure' }];
    expect(getFormattedGenres(genres)).toBe('Action,Adventure');
  });

  test('formatNumber function', () => {
    expect(formatNumber(1000000000)).toBe('1.00 billion');
    expect(formatNumber(1000000)).toBe('1.00 million');
    expect(formatNumber(1000)).toBe('1.00 thousand');
    expect(formatNumber(100)).toBe('100');
  });

  test('createMediaSlug function', () => {
    expect(createMediaSlug("The Matrix", "101")).toBe("the-matrix-101");
    expect(createMediaSlug("A Beautiful Mind", "202")).toBe("a-beautiful-mind-202"); 
    expect(createMediaSlug("The Lord of the Rings: The Fellowship of the Ring", "303")).toBe("the-lord-of-the-rings-the-fellowship-of-the-ring-303");
    expect(createMediaSlug("Harry Potter and the Philosopher's Stone", "404")).toBe("harry-potter-and-the-philosophers-stone-404");
    expect(createMediaSlug("Star Wars: Episode IV – A New Hope", "505")).toBe("star-wars-episode-iv-a-new-hope-505");
  });

  test('extractIdFromSlug', () => {
    expect(extractIdFromSlug('the-matrix-101')).toBe('101');
    expect(extractIdFromSlug('a-beautiful-mind-202')).toBe('202');
    expect(extractIdFromSlug('the-lord-of-the-rings-the-fellowship-of-the-ring-303')).toBe('303');
    expect(extractIdFromSlug('harry-potter-and-the-philosophers-stone-404')).toBe('404');
    expect(extractIdFromSlug('star-wars-episode-iv-a-new-hope-505')).toBe('505');
});

test('extractSeasonNumberFromSeasonSlug', () => {
    expect(extractSeasonNumberFromSeasonSlug('season-1-3582')).toBe('1');
    expect(extractSeasonNumberFromSeasonSlug('season-2-4583')).toBe('2');
    expect(extractSeasonNumberFromSeasonSlug('season-3-5584')).toBe('3');
    expect(extractSeasonNumberFromSeasonSlug('season-4-6585')).toBe('4');
    expect(extractSeasonNumberFromSeasonSlug('season-5-7586')).toBe('5');
});

test('extractYear', () => {
  expect(extractYear('2023/02/10')).toBe('2023');
});

});
