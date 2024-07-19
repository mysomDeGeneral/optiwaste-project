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

const Map: React.FC<MapProps> = ({ onSelectLocation }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null!);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [lng, setLng] = useState<number>(-1.546);
  const [lat, setLat] = useState<number>(6.674);
  const [zoom, setZoom] = useState<number>(9);
  const [coords, setCoords] = useState<Coords[]>([]);

  useEffect(() => {
    if (map.current) return; 
    if (mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current!,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: zoom
      });

      map.current.on('load', () => {
        map.current?.on('click', (e) => {
          const newLng = e.lngLat.lng;
          const newLat = e.lngLat.lat;
         
          if (marker.current) {
              marker.current.setLngLat([newLng, newLat]);
          } else {
              marker.current = new mapboxgl.Marker()
                  .setLngLat([newLng, newLat]);

                  if (map.current) {
                  marker.current.addTo(map.current);
                  }
        }

        setLng(newLng);
        setLat(newLat);
        onSelectLocation(newLng, newLat);
        });
      });
    }
  }, [lat, lng, zoom, onSelectLocation]);

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

function onSelectLocation(newLng: any, newLat: any) {
    throw new Error('Function not implemented.');
}
