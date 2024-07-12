'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export interface MapProps {
    onSelectLocation: (lng: number, lat: number) => void;
}

interface Coords {
    lng: number;
    lat: number;
    }

const Map: React.FC = ({ }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState<number>(-70.9);
  const [lat, setLat] = useState<number>(42.35);
  const [zoom, setZoom] = useState<number>(9);
  const [coords, setCoords] = useState<Coords[]>([]);

  useEffect(() => {
    if (map.current) return; 
    if (mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: zoom
      });

      map.current.on('click', (e) => {
        const newLng = e.lngLat.lng;
        const newLat = e.lngLat.lat;
        // const { lng, lat } = e.lngLat;
        // setCoords(prev => [...prev, { lng, lat }]);

        // new mapboxgl.Marker()
        //     .setLngLat([lng, lat])
        //     .addTo(map.current!);

        if (marker.current) {
            marker.current.setLngLat([newLng, newLat]);
        } else {
            marker.current = new mapboxgl.Marker()
                .setLngLat([newLng, newLat])
                .addTo(map.current);
      }
        });
    }
  }, [lng, lat, zoom]);

const handleRemoveCoords = (index: number) => {
    setCoords(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div ref={mapContainer} className="map-container" style={{ height: '400px' }} />

    </div>
  );
};

export default Map;