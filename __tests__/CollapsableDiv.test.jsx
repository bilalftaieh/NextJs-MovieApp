import '@testing-library/jest-dom'
import { render, fireEvent, screen} from '@testing-library/react'
import CollapsableDiv from '@/components/CollapsableDiv'

it('correctly renders the Collapsable Div and expands on click', () => {
  const { container } = render(
    <CollapsableDiv name='language'>
      <h1>HELLO!</h1>
    </CollapsableDiv>
  );

  // Check initial state (not expanded)
  expect(container).toMatchSnapshot();

  // Simulate a click event
  fireEvent.click(screen.getByText(/language/i));

  // Check expanded state with a new snapshot
  expect(container).toMatchSnapshot();
});


