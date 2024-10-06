const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// NASA API key
const NASA_API_KEY = "Jz4HJntWR4irZ7XwhBMIhWFnfo5q7PKdU1X1k9Xv";

// Use CORS middleware to allow requests from any origin temporarily
app.use(cors({
  origin: '*',  // Allow all origins temporarily
}));

// Basic route to check if the server is running
app.get('/', (req, res) => {
  res.send('NASA Explorer Backend is running');
});

// Route to fetch NASA Astronomy Picture of the Day (APOD)
app.get('/api/apod', async (req, res) => {
    const { date } = req.query; // Get the date from the query parameter
    try {
        const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}${date ? `&date=${date}` : ''}`);
        res.json(response.data); // Send the APOD data to the frontend
    } catch (error) {
        console.error('Error fetching APOD data:', error);
        res.status(500).json({ error: 'Failed to fetch APOD data' });
    }
});
  
// Route to fetch Mars Rover Photos
app.get('/api/mars-photos', async (req, res) => {
  const sol = req.query.sol || 1000; // Default sol value
  try {
    const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&api_key=${NASA_API_KEY}`);
    res.json(response.data); // Send the Mars Rover photos to the frontend
  } catch (error) {
    console.error('Error fetching Mars Rover photos:', error);
    res.status(500).json({ error: 'Failed to fetch Mars Rover photos' });
  }
});

app.get('/api/epic', async (req, res) => {
  try {
    const response = await axios.get(`https://api.nasa.gov/EPIC/api/natural?api_key=${NASA_API_KEY}`);
    
    // Log the entire response to inspect the URLs
    console.log('Response from NASA API:', response.data); 

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching EPIC images:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch EPIC images' });
  }
});

app.get('/api/neo', async (req, res) => {
  try {
    const response = await axios.get(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${NASA_API_KEY}`);
    console.log(response.data.near_earth_objects); // Log the response data
    res.json(response.data); // Send the data back to the frontend
  } catch (error) {
    console.error('Error fetching NEO data:', error);
    res.status(500).json({ error: 'Failed to fetch NEO data' });
  }
});

// Route to fetch NASA Image and Video Library
app.get('/api/nasa-library', async (req, res) => {
    const query = req.query.q; // Get the search query from the query parameter
    if (!query) {
      return res.status(400).json({ error: 'No query provided' });
    }
    
    try {
      const response = await axios.get(`https://images-api.nasa.gov/search?q=${query}&media_type=image`);
      res.json(response.data); // Send the NASA library data to the frontend
    } catch (error) {
      console.error('Error fetching NASA library data:', error);
      res.status(500).json({ error: 'Failed to fetch NASA library data' });
    }
});
  
// Start the server only if this file is the main module
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}

// Export the app for testing
module.exports = app; // Ensure this line is included for testing
