import React, { useEffect, useState, useCallback } from 'react';
import Navbar from '../components/Navbar'; // Ensure the path is correct
import './MarsPhotos.css'; // Ensure your styles are imported

function MarsPhotos() {
    const [marsPhotos, setMarsPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sol, setSol] = useState(1000); // Default Sol value

    // Set your deployed backend URL here
  const apiUrl = 'https://nasa-explorer-3x83.onrender.com'; // Replace with your actual backend URL

    // Wrap fetchMarsPhotos in useCallback
    const fetchMarsPhotos = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/mars-photos?sol=${sol}`);
            const data = await response.json();
            setMarsPhotos(data.photos);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, [sol]); // Adding sol as a dependency

    // Effect to fetch Mars photos when the component mounts or sol changes
    useEffect(() => {
        fetchMarsPhotos();
    }, [fetchMarsPhotos]); // Now use fetchMarsPhotos in the dependency array

    return (
        <div className="mars-photos-container">
            <Navbar />
            <h1>Mars Rover Photos</h1>
            <input
                type="number"
                value={sol}
                onChange={(e) => setSol(e.target.value)}
                placeholder="Enter Martian Sol"
                style={{ margin: '20px 0', padding: '10px', fontSize: '1rem' }}
            />
            <button onClick={fetchMarsPhotos} style={{ margin: '20px 0', padding: '10px', fontSize: '1rem' }}>
                Fetch Photos
            </button>

            {loading && <div className="spinner">Loading...</div>}
            {error && <p className="error">Error fetching Mars photos: {error.message}</p>}

            <div className="photos-gallery">
                {marsPhotos.length > 0 ? (
                    marsPhotos.map((photo) => (
                        <div key={photo.id} className="photo-item">
                            <img src={photo.img_src} alt={`Mars ${photo.id}`} className="mars-photo" />
                            <p className="date">Date: {photo.earth_date}</p> {/* Display Earth date */}
                            <p className="rover-name">Rover: {photo.rover.name}</p> {/* Display Rover name */}
                        </div>
                    ))
                ) : (
                    <p>No photos available for this Sol.</p>
                )}
            </div>
        </div>
    );
}

export default MarsPhotos;


