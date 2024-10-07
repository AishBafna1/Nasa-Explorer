import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import './NeoWs.css';
import NEOChart from '../components/NEOChart';

function NeoWs() {
  const [neoData, setNeoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = 'https://nasa-explorer-3x83.onrender.com';

  const fetchNeoData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/neo`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('NEO Data:', data); // Log to check the structure

      // Directly setting the array to the state
      setNeoData(data.near_earth_objects); // Update to set the actual NEO objects
    } catch (error) {
      console.error('Error fetching NEO data:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNeoData();
  }, []);

  return (
    <div className="neo-container">
      <Navbar />
      {loading && <div className="spinner">Loading...</div>}
      {error && <p className="error">Error fetching data: {error.message}</p>}
      <h1>Near Earth Objects</h1>
      {neoData.length > 0 && <NEOChart neoData={neoData} />}
      {neoData.length > 0 && (
        <div className="neo-list">
          {neoData.map((neo) => (
            <div key={neo.id} className="neo-item">
              <h2>{neo.name}</h2>
              <p>
                <strong>Estimated Diameter:</strong> {neo.estimated_diameter?.meters?.estimated_diameter_max?.toFixed(2) || 'N/A'} m
              </p>
              <p>
                <strong>Close Approach Date:</strong> {neo.close_approach_data[0]?.close_approach_date || 'N/A'}
              </p>
              <p>
                <strong>Miss Distance:</strong> {neo.close_approach_data[0]?.miss_distance?.kilometers || 'N/A'} km
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NeoWs;
