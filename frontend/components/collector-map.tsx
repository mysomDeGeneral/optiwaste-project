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

const useCurrentLocation = (options = {}) => {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const watchId = useRef<number | null>(null);

  useEffect(() => {
    const geo = navigator.geolocation;

    if (!geo) {
      setError('Geolocation is not supported');
      return;
    }

    const onChange = ({ coords }: GeolocationPosition) => {
      setLocation({
        lat: coords.latitude,
        lng: coords.longitude,
      });
    };

    const onError = (error: GeolocationPositionError) => {
      setError(error.message);
    };

    const watchOptions: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
      ...options,
    };

    watchId.current = geo.watchPosition(onChange, onError, watchOptions);

    return () => {
      if (watchId.current !== null) {
        geo.clearWatch(watchId.current);
      }
    };
  }, [options]);

  return { location, error };
};

// const getCurrentLocation = (): Promise<Coordinates> => {
//   return new Promise((resolve, reject) => {
//     if (!navigator.geolocation) {
//       reject(new Error('Geolocation is not supported by your browser'));
//     } else {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           resolve({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           });
//         },
//         (error) => {
//           reject(error);
//         }
//       );
//     }
//   });
// };


const CollectorRoute: React.FC<CollectorRouteProps> = ({ requestAddress }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const directions = useRef<MapboxDirections | null>(null);
  const { location: collectorLocation, error: locationError } = useCurrentLocation();
  const [zoom, setZoom] = useState<number>(12);

  const center = useMemo(() => 
    collectorLocation ? [collectorLocation.lng, collectorLocation.lat] : [-1.4766, 6.6355],
  [collectorLocation]
  ) as [number, number];


  useEffect(() => {
    if (locationError) {
      console.error('Error getting current location:', locationError);
      // Fallback to Kumasi, Ghana if unable to get current location
    }
  }, [locationError]);



// useEffect(() => {
//   const fetchLocation = async () => {
//     try {
//       const location = await getCurrentLocation();
//       setCollectorLocation(location);
//       console.log('location', location);
//     } catch (error) {
//       console.error('Error getting current location:', error);
//       // Fallback to Kumasi, Ghana if unable to get current location
//       setCollectorLocation({ lng: -1.4766, lat: 6.6355 });
//     }
//   };

//   fetchLocation();
// }, []);


  const getRoute = useCallback(async () => {
    if (!directions.current || !requestAddress || !collectorLocation) return;

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
    if (map.current || !collectorLocation) return;

    const initializeMap = async () => {
      if (mapContainer.current) {
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: collectorLocation ? [collectorLocation.lng, collectorLocation.lat] : [0,0],
          zoom: zoom,
          bearing: 0,
          pitch: 60,
          interactive: true,
        });

        // map.current.dragPan.disable();
        map.current.scrollZoom.enable();
        map.current.doubleClickZoom.enable();
        map.current.boxZoom.disable();
        map.current.keyboard.disable();

        map.current.getCanvas().style.pointerEvents = 'none';

        map.current.on('mousedown', (e) => e.preventDefault());
        map.current.on('click', (e) => e.preventDefault());
        map.current.on('contextmenu', (e) => e.preventDefault());

        new mapboxgl.Marker()
          .setLngLat([collectorLocation.lng, collectorLocation.lat])
          .addTo(map.current);

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

function onMove(arg1: any): void {
  throw new Error('Function not implemented.');
}
function onUp(arg1: any): void {
  throw new Error('Function not implemented.');
}

