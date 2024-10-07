import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'; 
import './EPICImages.css'; 

function EPICImages() {
  const [epicImages, setEpicImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = 'https://nasa-explorer-3x83.onrender.com';

  const fetchEPICImages = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/epic`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('EPIC Images Data:', data);

      // Check if the received data is an array
      if (Array.isArray(data)) {
        setEpicImages(data);
      } else {
        console.error('Unexpected data structure:', data);
        setEpicImages([]); // Set to empty array if unexpected
      }
    } catch (error) {
      console.error('Error fetching EPIC images:', error);
      setError(error); // Log and set error
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  useEffect(() => {
    fetchEPICImages(); 
  }, []);

  return (
    <div className="epic-images-container">
      <Navbar /> 

      {loading && <div className="spinner">Loading...</div>}
      {error && <p className="error">Error fetching data: {error.message}</p>}

      <h1>EPIC Images</h1>
      <div className="epic-images-grid">
        {epicImages.map((image) => {
          // Extracting date parts (year, month, day)
          const dateParts = image.date.split(' ')[0].split('-');
          const [year, month, day] = dateParts;

          return (
            <div key={image.identifier} className="epic-image-item">
              <img
                src={`https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/jpg/${image.image}.jpg`}
                alt={image.caption}
                className="epic-image"
                onError={(e) => { e.target.onerror = null; e.target.src="fallback-image-url.jpg"; }}
              />
              <p>{image.caption}</p>
              <p><strong>Date:</strong> {image.date}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default EPICImages;

