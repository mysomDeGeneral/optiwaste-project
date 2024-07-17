// 'use client';

// import React, { useEffect, useRef, useState, useCallback } from 'react';
// import mapboxgl from 'mapbox-gl';
// import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
// import { getLocation } from '@/apis/api';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
// import * as turf from '@turf/turf';

// mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

// interface Coordinates {
//   lat: number;
//   lng: number;
// }

// const CollectorRoute = ({ requestAddress }: { requestAddress: string }) => {
//   const mapContainer = useRef<HTMLDivElement | null>(null);
//   const map = useRef<mapboxgl.Map | null>(null);
//   const directions = useRef<MapboxDirections | null>(null);
//   const [collectorLocation, setCollectorLocation] = useState<Coordinates | null>(null);
//   const [mapLoaded, setMapLoaded] = useState(false);

//   const getRoute = useCallback(async () => {
//     if (!collectorLocation || !requestAddress || !directions.current || !mapLoaded) return;

//     try {
//       console.log('Getting route...');
//       console.log('Collector location:', collectorLocation);
//       console.log('Request address:', requestAddress);
//       const requestCoords: Coordinates = await fetchWithRetry(() => getLocation(requestAddress), 3, 1000);
//       console.log('Request coords:', requestCoords);

//       directions.current.setOrigin([collectorLocation.lng, collectorLocation.lat]);
//       directions.current.setDestination([requestCoords.lng, requestCoords.lat]);
//     } catch (error) {
//       console.error('Error getting route:', error);
//     }
//   }, [collectorLocation, requestAddress, mapLoaded]);

//   useEffect(() => {
//     if (map.current) return; // Initialize map only once

//     const initializeMap = async () => {
//       try {
//         const collectorCoords = await getCollectorLocation();
//         setCollectorLocation(collectorCoords);

//         map.current = new mapboxgl.Map({
//           container: mapContainer.current!,
//           style: 'mapbox://styles/mapbox/streets-v11',
//           center: [collectorCoords.lng, collectorCoords.lat],
//           zoom: 12,
//           bearing: 0, // Start with north up
//           pitch: 60, // Tilt the map for better 3D view
//         });

//         directions.current = new MapboxDirections({
//           accessToken: mapboxgl.accessToken,
//           unit: 'metric',
//           profile: 'mapbox/driving-traffic',
//           alternatives: false, // Disable alternative routes
//           controls: {
//             inputs: false,
//             instructions: true,
//             profileSwitcher: false, // Disable profile switcher
//           },
//           interactive: false, // Disable interaction with the directions control
//         });

//         map.current.addControl(directions.current, 'top-left');

//         // Temporarily enable default navigation controls to test map interaction
//         map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
//         map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');

//         map.current.on('load', () => {
//           console.log('Map is fully loaded');
//           setMapLoaded(true);
//         });

//         map.current.on('error', (e) => {
//           console.log('Map error:', e);
//         })

//         directions.current.on('route', (e) => {
//           console.log('Route event:', e);
//           if (e.route && e.route.length > 0) {
//             console.log('Route found:', e.route[0]);
//             rotateMapAlongRoute(e.route[0]);
//           } else {
//             console.error('No route found');
//           }
//         });
//       } catch (error) {
//         console.error('Error initializing map:', error);
//       }
//     };

//     initializeMap();
//   }, []);

//   useEffect(() => {
//     if (mapLoaded) {
//       getRoute();
//     }
//   }, [mapLoaded, getRoute]);

//   const getCollectorLocation = (): Promise<Coordinates> => {
//     return new Promise((resolve) => {
//       const useManualLocation = true;
//       const manualLocation = { lat: 6.6355, lng: -1.4766 }; // Kumasi, Ghana

//       if (useManualLocation) {
//         resolve(manualLocation);
//       } else {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             const { latitude, longitude } = position.coords;
//             resolve({ lat: latitude, lng: longitude });
//           },
//           (error) => {
//             console.error('Geolocation error:', error);
//             resolve(manualLocation); // Fallback to manual location on error
//           }
//         );
//       }
//     });
//   };

//   const rotateMapAlongRoute = (route: any) => {
//     if (!map.current || !route.geometry || !route.geometry.coordinates) return;

//     const coordinates = route.geometry.coordinates;
//     let bearing = 0;

//     // Animate the map to rotate along the route
//     const animate = () => {
//       if (coordinates.length > 1) {
//         const start = coordinates.shift();
//         const end = coordinates[0];
//         bearing = turf.bearing(start, end);

//         map.current!.easeTo({
//           center: start,
//           bearing: bearing,
//           duration: 1000,
//           easing: (t) => t,
//         });

//         requestAnimationFrame(animate);
//       }
//     };

//     animate();
//   };

//   const fetchWithRetry = async (fetchFunction: () => Promise<any>, retries: number, delay: number): Promise<any> => {
//     try {
//       return await fetchFunction();
//     } catch (error) {
//       if (retries === 1) throw error;
//       await new Promise((res) => setTimeout(res, delay));
//       return fetchWithRetry(fetchFunction, retries - 1, delay);
//     }
//   };

//   return (
//     <div
//       style={{
//         height: '100%',
//         position: 'relative',
//       }}
//     >
//       <div ref={mapContainer} style={{ width: '100%', height: 'calc(100% - 3.5rem)' }} /> {/* Adjust height to exclude the nav bar */}
//     </div>
//   );
// };

// export default CollectorRoute;
import React from 'react';
import CollectorRoute from "./collector-map";

interface CollectorMapProps {
  requestAddress: string;
}

const CollectorMap: React.FC<CollectorMapProps>  = ({ requestAddress }) => {
  return (
    <CollectorRoute requestAddress={requestAddress} />
  );
};

export default CollectorMap;
