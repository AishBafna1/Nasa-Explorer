import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'; // Include the Navbar
import './EPICImages.css'; // Ensure you have the EPIC Images styles

function EPICImages() {
  const [epicImages, setEpicImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch EPIC images from the API
  const fetchEPICImages = async () => {
    setLoading(true); // Set loading state before fetching
    try {
      const response = await fetch('/api/epic'); // Fetch data from your backend
      const data = await response.json(); // Parse the response as JSON
      console.log('EPIC Images Data:', data); // Log the fetched data

      if (data && Array.isArray(data)) {
        setEpicImages(data); // Set the state to the array of images
      } else {
        console.error('Unexpected data structure:', data);
        setEpicImages([]); // Set to empty if unexpected structure
      }
    } catch (error) {
      console.error('Error fetching EPIC images:', error); // Log any errors
      setError(error); // Set the error state
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Call the fetch function when the component mounts
  useEffect(() => {
    fetchEPICImages(); // Call the function to fetch EPIC images
  }, []);

  return (
    <div className="epic-images-container">
      <Navbar /> {/* Include the Navbar */}

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
