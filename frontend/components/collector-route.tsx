'use client';
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import { getLocation } from '@/apis/api';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

interface Coordinates {
  lat: number;
  lng: number;
}

const CollectorRoute = ({ requestAddress }: { requestAddress: string }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const directions = useRef<MapboxDirections | null>(null);
  const [collectorLocation, setCollectorLocation] = useState<Coordinates | null>(null);
  const [profile, setProfile] = useState<'driving' | 'cycling' | 'walking'>('driving');

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    const initializeMap = async () => {
      try {
        const collectorCoords = await getCollectorLocation();
        setCollectorLocation(collectorCoords);

        map.current = new mapboxgl.Map({
          container: mapContainer.current!,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [collectorCoords.lng, collectorCoords.lat],
          zoom: 12,
        });

        directions.current = new MapboxDirections({
          accessToken: mapboxgl.accessToken,
          unit: 'metric',
          profile: 'mapbox/driving',
          alternatives: true,
          congestion: true,
        });

        map.current.addControl(directions.current, 'top-left');
        map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
        map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');

        const trafficToggle = new mapboxgl.ToggleControl({
          className: 'mapboxgl-ctrl-traffic',
          textOn: 'Hide Traffic',
          textOff: 'Show Traffic',
          onChange: (isEnabled: any) => {
            const trafficLayers = ['traffic', 'traffic-flow', 'traffic-incidents'];
            trafficLayers.forEach(layer => {
              map.current!.setLayoutProperty(layer, 'visibility', isEnabled ? 'visible' : 'none');
            });
          }
        });
        map.current.addControl(trafficToggle, 'top-right');

        map.current.on('load', () => {
          getRoute();
        });
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initializeMap();
  }, []);

  const getRoute = async () => {
    if (!collectorLocation || !requestAddress || !directions.current) return;

    try {
      console.log('Request address:', requestAddress);
      const requestCoords: Coordinates = await getLocation(requestAddress);
      console.log('Request coords:', requestCoords);

      directions.current.setOrigin([collectorLocation.lng, collectorLocation.lat]);
      console.log('Request coords:', requestCoords.lng, requestCoords.lat);
      directions.current.setDestination([requestCoords.lng, requestCoords.lat]);
      directions.current.setProfile(`mapbox/${profile}`);
    } catch (error) {
      console.error('Error getting route:', error);
    }
  };

  useEffect(() => {
    getRoute();
  }, [collectorLocation, requestAddress, profile]);

  const getCollectorLocation = (): Promise<Coordinates> => {
    return new Promise((resolve) => {
      const useManualLocation = true;
      const manualLocation = { lat: 6.6355, lng: -1.4766 }; // Kumasi, Ghana
      if (useManualLocation) {
        resolve(manualLocation);
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({ lat: latitude, lng: longitude });
          },
          (error) => {
            console.error('Geolocation error:', error);
            resolve(manualLocation); // Fallback to manual location on error
          }
        );
      }
    });
  };

  const handleProfileChange = (newProfile: 'driving' | 'cycling' | 'walking') => {
    setProfile(newProfile);
  };

  return (
    <div style={{ height: '90vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>
        <button onClick={() => handleProfileChange('driving')}>Driving</button>
        <button onClick={() => handleProfileChange('cycling')}>Cycling</button>
        <button onClick={() => handleProfileChange('walking')}>Walking</button>
      </div>
      <div ref={mapContainer} style={{ flex: 1 }} />
    </div>
  );
};

export default CollectorRoute;