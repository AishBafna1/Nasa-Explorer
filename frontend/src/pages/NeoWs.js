import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import './NeoWs.css';
import NEOChart from '../components/NEOChart';

function NeoWs() {
  const [neoData, setNeoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNeoData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/neo');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('NEO Data:', data);

      // Directly setting the array to the state
      setNeoData(data);
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
              <p><strong>Estimated Diameter:</strong> {neo.diameter.toFixed(2)} m</p>
              <p><strong>Close Approach Date:</strong> {neo.closeApproachDate}</p>
              <p><strong>Miss Distance:</strong> {neo.missDistance} km</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NeoWs;
