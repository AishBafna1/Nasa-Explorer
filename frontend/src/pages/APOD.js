import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'; // Import Navbar
import './APOD.css';

function APOD() {
  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(''); // State for selected date

  // Set your deployed backend URL here
  const apiUrl = 'https://nasa-explorer-3x83.onrender.com/api/*'; // Replace with your actual backend URL

  // Function to fetch APOD data
  const fetchAPOD = async (date) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/apod?date=${date}`);
      
      if (!response.ok) {
        // If the response was not ok, throw an error
        const errorMessage = await response.text();
        throw new Error(`Error: ${response.status} - ${errorMessage}`);
      }

      const data = await response.json();
      console.log('Fetched APOD data:', data); // Log the fetched data
      setApodData(data);
    } catch (error) {
      console.error('Error fetching APOD:', error);
      setError(error.message || 'Failed to fetch APOD data');
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch APOD when the component mounts or when selectedDate changes
  useEffect(() => {
    if (selectedDate) {
      fetchAPOD(selectedDate);
    } else {
      fetchAPOD(new Date().toISOString().split('T')[0]); // Default to today's date
    }
  }, [selectedDate]);

  return (
    <div className="apod-container">
      <Navbar /> {/* Include the Navbar */}
      
      {loading && <div className="spinner">Loading...</div>}
      {error && <p className="error">Error fetching data: {error}</p>}
      
      <div className="apod-content">
        <h1>{apodData?.title || 'Astronomy Picture of the Day'}</h1>
        
        {/* Date selection */}
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)} // Update selected date
          placeholder="Select a date" // Add placeholder here
          style={{ margin: '20px 0', padding: '10px', fontSize: '1rem' }}
        />

        {/* Media display */}
        <div className="media-wrapper">
          {apodData && apodData.media_type === 'image' && apodData.url ? (
            <img src={apodData.url} alt={apodData.title} className="apod-image" />
          ) : (
            apodData && apodData.media_type === 'video' && apodData.url && (
              <iframe
                title="APOD Video"
                src={apodData.url}
                className="apod-video"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            )
          )}
        </div>

        <p className="description">{apodData?.explanation}</p>
        <p className="date">Date: {apodData?.date}</p> {/* Display the date */}
      </div>
    </div>
  );
}

export default APOD;
