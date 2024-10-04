import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'; // Ensure the path is correct
import './NeoWs.css'; // Ensure you have your NEO styles
import NEOChart from '../components/NEOChart'; // Import the chart component

function NeoWs() {
  const [neoData, setNeoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Near Earth Objects data from the API
  const fetchNeoData = async () => {
    setLoading(true); // Set loading state before fetching
    try {
      const response = await fetch('/api/neo'); // Fetch data from your backend
      const data = await response.json(); // Parse the response as JSON
      console.log('NEO Data:', data); // Log the fetched data

      if (data && data.near_earth_objects) {
        setNeoData(data.near_earth_objects); // Set the state to the array of NEOs
      } else {
        console.error('Unexpected data structure:', data);
        setNeoData([]); // Set to empty if unexpected structure
      }
    } catch (error) {
      console.error('Error fetching NEO data:', error); // Log any errors
      setError(error); // Set the error state
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Call the fetch function when the component mounts
  useEffect(() => {
    fetchNeoData(); // Call the function to fetch NEO data
  }, []);

  return (
    <div className="neo-container">
      <Navbar /> {/* Include the Navbar */}

      {loading && <div className="spinner">Loading...</div>}
      {error && <p className="error">Error fetching data: {error.message}</p>}

      <h1>Near Earth Objects</h1>

      {/* Render the chart */}
      {neoData.length > 0 && <NEOChart neoData={neoData} />}

      {/* Display the list of NEOs */}
      <div className="neo-list">
        {neoData.map((neo) => (
          <div key={neo.id} className="neo-item">
            <h2>{neo.name}</h2>
            <p><strong>Estimated Diameter:</strong> {neo.estimated_diameter.meters.estimated_diameter_max.toFixed(2)} m</p>
            <p><strong>Close Approach Date:</strong> {neo.close_approach_data[0].close_approach_date}</p>
            <p><strong>Miss Distance:</strong> {neo.close_approach_data[0].miss_distance.kilometers} km</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NeoWs;
