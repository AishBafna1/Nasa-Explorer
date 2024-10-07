import React, { useState } from 'react';
import Navbar from '../components/Navbar'; // Ensure the path is correct
import './NasaLibrary.css'; // Ensure you have your CSS ready

function NasaLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [libraryData, setLibraryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiUrl = 'https://nasa-explorer-3x83.onrender.com';

  // Function to fetch NASA library images
  const fetchLibraryImages = async () => {
    if (!searchQuery) {
      setError('Please enter a search term.');
      return;
    }

    setLoading(true);
    setError(null); // Reset any previous errors

    try {
      const response = await fetch(`${apiUrl}/api/nasa-library?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      console.log('NASA Library Data:', data);

      if (data.collection && data.collection.items.length > 0) {
        setLibraryData(data.collection.items);
      } else {
        setLibraryData([]); // Clear previous results if no new results
        setError('No results found.'); // Set error if no results
      }
    } catch (error) {
      console.error('Error fetching NASA library data:', error);
      setError('Failed to fetch NASA library data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="nasa-library-container">
      <Navbar /> {/* Include the Navbar */}

      <h1>Nasa Image and Video Library</h1> {/* Title positioned above the search bar */}

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for images..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query
        />
        <button onClick={fetchLibraryImages}>Search</button>
      </div>

      {loading && <div className="spinner">Loading...</div>}
      {error && <p className="error">{error}</p>} {/* Display error message */}

      <div className="library-grid">
        {libraryData.map((item) => (
          <div key={item.data[0].nasa_id} className="library-item">
            <img 
              src={item.links[0].href} // Get the image URL
              alt={item.data[0].title} 
              className="library-image" 
            />
            <p>{item.data[0].title}</p>
            <p>{item.data[0].description || 'No description available.'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NasaLibrary;
