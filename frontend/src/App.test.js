import { render, screen } from '@testing-library/react';
import App from './App'; // Ensure the correct path to your App component

test('renders the main title of the application', () => {
  render(<App />);
  
  // Change this to a string that actually appears in your App component
  const titleElement = screen.getByText(/NASA Data Explorer/i); // Adjust the regex to match your app's title or text
  expect(titleElement).toBeInTheDocument(); // Check if the title is rendered
});


