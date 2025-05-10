
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface LocationMapProps {
  initialLocation?: { lat: number; lng: number };
  onLocationChange?: (location: { lat: number; lng: number }) => void;
}

const LocationMap = ({
  initialLocation = { lat: 40.7128, lng: -74.006 },
  onLocationChange
}: LocationMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [location, setLocation] = useState(initialLocation);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize the map
    const mapInstance = new google.maps.Map(mapRef.current, {
      center: location,
      zoom: 13,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false
    });

    setMap(mapInstance);

    // Create a marker at the initial location
    const markerInstance = new google.maps.Marker({
      position: location,
      map: mapInstance,
      animation: google.maps.Animation.DROP,
      draggable: true
    });

    setMarker(markerInstance);

    // Handle marker drag events to update location
    markerInstance.addListener('dragend', () => {
      const position = markerInstance.getPosition();
      if (position) {
        const newLocation = { lat: position.lat(), lng: position.lng() };
        setLocation(newLocation);
        if (onLocationChange) {
          onLocationChange(newLocation);
        }
      }
    });

    // Initialize the places search box if the searchInputRef is available
    if (searchInputRef.current && window.google?.maps?.places) {
      const searchBox = new google.maps.places.SearchBox(searchInputRef.current);
      
      // Fix: Use HTMLElement instead of MVCObject
      const searchBoxContainer = document.createElement('div');
      searchBoxContainer.appendChild(searchInputRef.current.cloneNode(true));
      
      // Push the container as HTMLElement
      mapInstance.controls[google.maps.ControlPosition.TOP_CENTER].push(searchBoxContainer);

      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();
        if (!places || places.length === 0) return;

        const place = places[0];
        if (!place.geometry || !place.geometry.location) return;

        // Update the map center and marker position
        mapInstance.setCenter(place.geometry.location);
        markerInstance.setPosition(place.geometry.location);

        // Update the location state
        const newLocation = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        };
        setLocation(newLocation);
        if (onLocationChange) {
          onLocationChange(newLocation);
        }
      });
    }

    return () => {
      // Clean up event listeners if needed
    };
  }, [onLocationChange]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={toggleExpanded}
        className="flex items-center gap-2 bg-[#9bd5e9] hover:bg-[#4f8391] text-[#01030d] hover:text-white border-[#053e5d]"
      >
        <Search className="h-4 w-4" />
        <span>Location</span>
      </Button>
      
      {isExpanded && (
        <div className="absolute z-50 top-full mt-2 w-72 bg-white rounded-lg shadow-lg overflow-hidden border border-[#053e5d]">
          <div className="p-3 border-b border-[#9bd5e9]">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search for a location..."
              className="w-full px-3 py-2 border border-[#9bd5e9] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#053e5d]"
            />
          </div>
          <div 
            ref={mapRef} 
            className="w-full h-48"
          />
          <div className="p-3 flex justify-between bg-[#f8fafc]">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleExpanded}
              className="border-[#053e5d] text-[#053e5d] hover:bg-[#053e5d] hover:text-white"
            >
              Cancel
            </Button>
            <Button 
              size="sm" 
              onClick={() => {
                if (onLocationChange) {
                  onLocationChange(location);
                }
                toggleExpanded();
              }}
              className="bg-[#053e5d] hover:bg-[#0a2247] text-white"
            >
              Confirm Location
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationMap;
