import React, { useEffect, useState, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Style, Fill, Circle } from 'ol/style';
import axios from 'axios';

const MapComponent = () => {
  const [coordinates, setCoordinates] = useState(null);
  const mapRef = useRef(null);
  const vectorSourceRef = useRef(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/coordinate');
      setCoordinates(response.data);
    } catch (error) {
      console.error('Error fetching coordinates:', error);
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

  useEffect(() => {

    if (!coordinates) return;

    if (!mapRef.current) {
      const map = new Map({
        target: 'map',
        layers: [new TileLayer({ source: new OSM() })],
        view: new View({
          center: fromLonLat([coordinates.longitude, coordinates.latitude]),
          zoom: 18,
        }),
        controls: [],
      });
      mapRef.current = map;
    }

    const longitude = coordinates.longitude;
    const latitude = coordinates.latitude;

    const feature = new Feature({
      geometry: new Point(fromLonLat([longitude, latitude])),
    });

    const markerStyle = new Style({
      image: new Circle({
        radius: 6,
        fill: new Fill({
          color: 'red',
        }),
      }),
    });
    feature.setStyle(markerStyle);

    const vectorSource = vectorSourceRef.current;
    if (!vectorSource) {
      vectorSourceRef.current = new VectorSource({
        features: [feature],
      });
    } else {
      const previousFeature = vectorSource.getFeatures()[0];
      vectorSource.clear();
      vectorSource.addFeature(feature);
      if (previousFeature) {
        previousFeature.setGeometry(null);
      }
    }

    const vectorLayer = new VectorLayer({
      source: vectorSourceRef.current,
    });

    const map = mapRef.current;
    map.addLayer(vectorLayer);
    map.getView().setCenter(fromLonLat([longitude, latitude]));

  }, [coordinates]);

  return (
    <div>
      {coordinates ? (
        <div id="map" style={{ width: '100%', height: '500px' }}></div>
      ) : (
        <div id="map" style={{ 
          fontFamily: 'Roboto',
          fontSize: '35px',
          fontWeight: 'bold',
          width: '100%', 
          height: '500px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div>
            Waiting For Coordinates...
          </div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;

