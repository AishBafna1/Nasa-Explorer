# 🚀🌌 NASA Explorer 🚀🌌

Welcome to the NASA Data Explorer, a web application that allows users to explore and interact with a variety of space-related data using NASA's Open APIs. This application provides access to endpoints such as the Astronomy Picture of the Day (APOD), Mars Rover Photos, Earth Polychromatic Imaging Camera (EPIC), and Near Earth Object Web Service (NeoWs).

# Accessing Application

NASA EXPLORER - https://frontend-pvks.onrender.com

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Data Visualization](#data-visualization)
- [Error Handling](#error-handling)
- [Deployment](#deployment)
- [Bonus Features](#bonus-features)
- [File Structure](#file-structure)
- [Contributing](#contributing)

## Features

- Interactive user interface for exploring NASA data
- Visualization of space data through images and graphs
- Loading state management to enhance user experience
- Error handling for API requests and data fetching
- Responsive design for various screen sizes
- User interactivity with filters and search functionality

## Technologies Used

- **Frontend**: React, CSS
- **Backend**: Node.js, Express
- **APIs**: NASA Open APIs
- **Deployment**: [Render](https://render.com/) (https://frontend-pvks.onrender.com)
## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/nasa-data-explorer.git

2. Navigate to the backend directory and install the dependencies:
bash
Copy code
cd nasa-data-explorer/backend
npm install

3. Create a .env file in the backend directory and add your NASA API key:
plaintext
Copy code
NASA_API_KEY=your_api_key

4. Start the backend server:
bash
Copy code
npm start

5. In a new terminal, navigate to the frontend directory and install the dependencies:
bash
Copy code
cd nasa-data-explorer/frontend
npm install

6. Start the frontend application:
bash
Copy code
npm start

## Usage
1. Open your browser and navigate to http://localhost:3000 to view the application.
2. Use the navigation bar to select different NASA data endpoints.
3. Explore the interactive visualizations and data presented for each endpoint.

## API Endpoints
The backend server provides the following API endpoints:

- /api/apod: Fetches Astronomy Picture of the Day data.
- /api/mars-rover: Fetches Mars Rover photos.
- /api/epic: Fetches Earth Polychromatic Imaging Camera (EPIC) images.
- /api/near-earth-objects: Fetches data on Near Earth Objects.

## Error Handling
The application implements error handling for API requests and data fetching to provide users with meaningful error messages. If an error occurs during the fetching process, a user-friendly message is displayed.

## Testing
To ensure the quality and reliability of the application, I conducted various tests using the following methods:

- Unit Testing: Each React component was tested for rendering and state management using Jest and React Testing Library. This included tests for the loading state, error handling, and data rendering based on API responses.

- Integration Testing: I tested the integration between the frontend and backend to ensure that API requests were functioning as expected. This involved mocking API responses and verifying that the frontend handled these responses correctly.

- Manual Testing: I performed manual tests to check the overall user experience, including navigation, responsiveness, and loading states across different devices.

## Challenges Faced
Throughout the development process, I encountered several challenges:

- API Rate Limiting: During testing, I hit the API rate limits imposed by NASA, which caused requests to fail. To solve this, I implemented error handling to notify users about API unavailability and added a retry mechanism for certain requests.

- Data Formatting Issues: Initially, the date format for some API responses did not match what the frontend expected, leading to rendering issues. I addressed this by implementing a date formatting utility that ensured consistency across all data fetched from different endpoints.

- CORS Issues: When connecting the frontend to the backend, I faced Cross-Origin Resource Sharing (CORS) issues. I resolved this by using the cors middleware in the Express backend to allow requests from the frontend domain.

- Responsive Design: Ensuring the application was responsive across different devices presented challenges in CSS styling. I utilized CSS Flexbox and Grid layouts to improve the responsiveness of components.

## Data Visualization
Data fetched from the APIs is processed and displayed using various visualization techniques, including:

- Images from the Astronomy Picture of the Day
- Graphs and charts representing data from Mars Rover photos and Near Earth Objects

## Error Handling
The application includes comprehensive error handling to manage edge cases such as:

- Network errors during API requests
- Invalid user input when searching or filtering data
- Displaying user-friendly error messages on the UI

## Deployment
The application is deployed on Render. You can access the live application at:

Live Application Link - https://frontend-pvks.onrender.com

## Bonus Features
- Implemented responsive design to ensure usability on various screen sizes.
- Included performance optimizations for faster data loading and rendering.
- Added testing using Jest and React Testing Library for both frontend and backend components.

## File Structure
```
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── App.js           # Main application component
│   │   ├── index.js         # Entry point for the React application
│   │   └── ...              # Other frontend files
│   ├── public/              # Public assets (e.g., index.html)
│   └── package.json         # Frontend dependencies and scripts
├── backend/
│   ├── routes/              # API route handlers
│   ├── server.js            # Main server file
│   ├── .env                 # Environment variables (not included in the repo)
│   ├── package.json         # Backend dependencies and scripts
│   └── ...                  # Other backend files
└── README.md                # Project documentation
```

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue to suggest improvements or report bugs.

Thank you for checking out the NASA Data Explorer! We hope you enjoy exploring space data as much as we enjoyed building this application.
