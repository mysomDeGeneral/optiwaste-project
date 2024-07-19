'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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

interface CollectorRouteProps {
  requestAddress: string;
}

const CollectorRoute: React.FC<CollectorRouteProps> = ({ requestAddress }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const directions = useRef<MapboxDirections | null>(null);
  const [collectorLocation, setCollectorLocation] = useState<Coordinates>({ lng: -1.4766, lat: 6.6355 }); // Kumasi, Ghana
  const [zoom, setZoom] = useState<number>(12);

  const center = useMemo(() => [collectorLocation.lng, collectorLocation.lat], [collectorLocation]);

  const getRoute = useCallback(async () => {
    if (!directions.current || !requestAddress) return;

    try {
      console.log('Getting route...');
      console.log('Collector location:', collectorLocation);
      console.log('Request address:', requestAddress);
      const requestCoords: Coordinates = await getLocation(requestAddress);
      console.log('Request coords:', requestCoords);

      directions.current.setOrigin([collectorLocation.lng, collectorLocation.lat]);
      directions.current.setDestination([requestCoords.lng, requestCoords.lat]);
    } catch (error) {
      console.error('Error getting route:', error);
    }
  }, [collectorLocation, requestAddress]);


  useEffect(() => {
    if (map.current) return;

    const initializeMap = async () => {
      if (mapContainer.current) {
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [collectorLocation.lng, collectorLocation.lat],
          zoom: zoom,
          bearing: 0,
          pitch: 60,
          interactive: false,
        });

        directions.current = new MapboxDirections({
          accessToken: mapboxgl.accessToken,
          unit: 'metric',
          profile: 'mapbox/driving-traffic',
          alternatives: false,
          controls: {
            inputs: false,
            instructions: true,
            profileSwitcher: false,
          },
        });

        map.current.addControl(directions.current, 'top-left');
        map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
        //map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');

        map.current.on('load', () => {
          console.log('Map loaded successfully');
          getRoute();
        });

        map.current.on('error', (e) => {
          console.error('Map error:', e);
        });
      }
    };

    initializeMap();
  }, [center, zoom, getRoute, collectorLocation]);



  return (
    <div>
      <div ref={mapContainer} className="map-container" style={{ height: '800px' }} />
    </div>
  );
};

export default CollectorRoute;