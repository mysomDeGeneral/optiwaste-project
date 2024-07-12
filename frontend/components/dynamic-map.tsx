import dynamic from 'next/dynamic';
import { MapProps } from './map';

const DynamicMap = dynamic(() => import('./map'), { 
  ssr: false,
  loading: () => <p>Loading Map...</p>
}) as React.ComponentType<MapProps>;

export default DynamicMap;