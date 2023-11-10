import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Display Coordinates (Longitude, Latitude, Height)
const CoordinateDisplay = () => {
  const [coordinates, setCoordinates] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/coordinate');
      setCoordinates(response.data);
    } catch (error) {
      console.log('Error fetching coordinates:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 500); // Fetch data every .5 seconds (Adjust if needed)

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      {coordinates ? (
        <div>
          <div
            className='coordinate'
            style={{
              fontFamily: 'Roboto',
              fontSize: '25px',
            }}
          >
            Longitude: {coordinates.longitude}
          </div>
          <div
            className='coordinate'
            style={{
              fontFamily: 'Roboto',
              fontSize: '25px',
              marginTop: '25px',
            }}
          >
            Latitude: {coordinates.latitude}
          </div>
          <div
            className='coordinate'
            style={{
              fontFamily: 'Roboto',
              fontSize: '25px',
              marginTop: '25px',
            }}
          >
            Height: {coordinates.height}
          </div>
        </div>
      ) : (
        <div>Waiting For Coordinates...</div>
      )}
    </div>
  );
};

export default CoordinateDisplay;
