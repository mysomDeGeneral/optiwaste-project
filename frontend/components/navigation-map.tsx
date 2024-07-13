'use client';

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

interface NavigationMapProps {
  destinationCoordinates: [number, number];
}

const NavigationMap: React.FC<NavigationMapProps> = ({ destinationCoordinates }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const directionsRef = useRef<MapboxDirections | null>(null);

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    if (mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: destinationCoordinates,
        zoom: 13
      });

      map.current.on('load', () => {
        directionsRef.current = new MapboxDirections({
          accessToken: mapboxgl.accessToken,
          unit: 'metric',
          profile: 'mapbox/driving'
        });

        map.current?.addControl(directionsRef.current, 'top-left');

        // Get user's current location
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            position => {
              const { latitude, longitude } = position.coords;
              if (directionsRef.current) {
                directionsRef.current.setOrigin([longitude, latitude]);
                directionsRef.current.setDestination(destinationCoordinates);
              }
            },
            error => {
              console.error('Error getting user location:', error);
              // If we can't get the user's location, just set the destination
              if (directionsRef.current) {
                directionsRef.current.setDestination(destinationCoordinates);
              }
            }
          );
        } else {
          console.log('Geolocation is not supported by your browser');
          // If geolocation is not supported, just set the destination
          if (directionsRef.current) {
            directionsRef.current.setDestination(destinationCoordinates);
          }
        }
      });
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [destinationCoordinates]);

  return <div ref={mapContainer} style={{ width: '100%', height: '400px' }} />;
};

export default NavigationMap;