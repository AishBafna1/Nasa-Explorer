import { render, screen, waitFor } from '@testing-library/react'; // Import waitFor
import { MemoryRouter } from 'react-router-dom';
import APOD from '../APOD';
import '@testing-library/jest-dom';

describe('APOD Component', () => {
  test('renders the APOD title', async () => {
    render(
      <MemoryRouter>
        <APOD />
      </MemoryRouter>
    );

    // Wait for the title to be in the document after loading
    await waitFor(() => {
      const titleElement = screen.getByText(/Astronomy Picture of the Day/i);
      expect(titleElement).toBeInTheDocument();
    });
  });

  test('renders the date input', () => {
    render(
      <MemoryRouter>
        <APOD />
      </MemoryRouter>
    );

    const dateInput = screen.getByPlaceholderText(/select a date/i);
    expect(dateInput).toBeInTheDocument();
  });
});
