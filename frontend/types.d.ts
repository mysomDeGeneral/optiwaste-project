declare module '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions' {
    import { IControl } from 'mapbox-gl';
  
    export default class MapboxDirections implements IControl {
      setProfile(currentMode: string) {
          throw new Error('Method not implemented.');
      }
      constructor(options: MapboxDirections.Options);
      
      addWaypoint(index: number, waypoint: any): void;
      removeWaypoint(index: number): void;
      setOrigin(origin: any): void;
      setDestination(destination: any): void;
      setWaypoint(index: number, waypoint: any): void;
      onAdd(map: mapboxgl.Map): HTMLElement;
      onRemove(map: mapboxgl.Map): void;
  
      getOrigin(): any;
      getDestination(): any;
      getWaypoints(): any[];
    }
  
    namespace MapboxDirections {
      interface Options {
        accessToken: string;
        unit?: string;
        profile?: string;
        alternatives?: boolean;
        congestion?: boolean;
        flyTo?: boolean;
        placeholderOrigin?: string;
        placeholderDestination?: string;
        zoom?: number;
        language?: string;
        steps?: boolean;
        exclude?: string;
        controls?: {
          inputs?: boolean;
          instructions?: boolean;
          profileSwitcher?: boolean;
        };
      }
    }
  }