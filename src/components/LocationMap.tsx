
import React, { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface LocationMapProps {
  initialLocation?: { lat: number; lng: number };
  onLocationSelect?: (location: { lat: number; lng: number }) => void;
}

const LocationMap: React.FC<LocationMapProps> = ({ 
  initialLocation = { lat: 40.7128, lng: -74.0060 }, // Default to NYC
  onLocationSelect 
}) => {
  const [apiKey, setApiKey] = useState<string>('');
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [locationName, setLocationName] = useState('');

  // Input field for API key (temporary solution)
  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  // Load Google Maps when API key is provided
  useEffect(() => {
    if (!apiKey || !mapRef.current || mapLoaded) return;

    // Load Google Maps script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      setMapLoaded(true);
      initMap();
    };
    
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, [apiKey, mapLoaded]);

  // Initialize map
  const initMap = () => {
    if (!window.google || !mapRef.current) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: selectedLocation,
      zoom: 13,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
    });

    // Add marker for initial location
    const marker = new window.google.maps.Marker({
      position: selectedLocation,
      map: map,
      draggable: true,
      animation: window.google.maps.Animation.DROP,
    });

    // Update location when marker is dragged
    marker.addListener('dragend', () => {
      const position = marker.getPosition();
      if (position) {
        const newLocation = { lat: position.lat(), lng: position.lng() };
        setSelectedLocation(newLocation);
        if (onLocationSelect) {
          onLocationSelect(newLocation);
        }
        // Get address for the location
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: newLocation }, (results, status) => {
          if (status === 'OK' && results && results[0]) {
            setLocationName(results[0].formatted_address);
          }
        });
      }
    });

    // Add search box
    const input = document.createElement('input');
    input.placeholder = 'Search for a location';
    input.className = 'map-search-input';
    input.style.cssText = 'padding:10px; margin:10px; border:1px solid #ccc; border-radius:4px; width:calc(100% - 20px)';
    
    const searchBox = new window.google.maps.places.SearchBox(input);
    map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(input);
    
    map.addListener('bounds_changed', () => {
      searchBox.setBounds(map.getBounds()!);
    });
    
    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();
      if (!places || places.length === 0) return;
      
      const place = places[0];
      if (!place.geometry || !place.geometry.location) return;
      
      // Set map center to the selected place
      map.setCenter(place.geometry.location);
      map.setZoom(15);
      
      // Update marker position
      marker.setPosition(place.geometry.location);
      
      // Update selected location and trigger callback
      const newLocation = { 
        lat: place.geometry.location.lat(), 
        lng: place.geometry.location.lng() 
      };
      setSelectedLocation(newLocation);
      setLocationName(place.formatted_address || '');
      if (onLocationSelect) {
        onLocationSelect(newLocation);
      }
    });

    // Get initial location name
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: selectedLocation }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        setLocationName(results[0].formatted_address);
      }
    });
  };

  const handleShareLocation = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Location',
        text: `Check out this location: ${locationName}`,
        url: `https://www.google.com/maps/search/?api=1&query=${selectedLocation.lat},${selectedLocation.lng}`
      }).catch(error => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support Web Share API
      const url = `https://www.google.com/maps/search/?api=1&query=${selectedLocation.lat},${selectedLocation.lng}`;
      navigator.clipboard.writeText(url);
      alert('Location link copied to clipboard!');
    }
  };

  const useCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setSelectedLocation(currentLocation);
          
          if (mapLoaded && window.google) {
            const map = new window.google.maps.Map(mapRef.current!, {
              center: currentLocation,
              zoom: 15
            });
            
            new window.google.maps.Marker({
              position: currentLocation,
              map: map,
              draggable: true
            });
            
            // Get address for the location
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ location: currentLocation }, (results, status) => {
              if (status === 'OK' && results && results[0]) {
                setLocationName(results[0].formatted_address);
              }
            });
            
            if (onLocationSelect) {
              onLocationSelect(currentLocation);
            }
          }
        },
        (error) => {
          console.error("Error getting current location:", error);
          alert("Unable to retrieve your location. Please check your browser permissions.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex gap-2 items-center">
          <MapPin size={16} />
          Location
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Select Location</DialogTitle>
        </DialogHeader>
        
        {!apiKey && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">
              Please enter your Google Maps API key:
            </p>
            <input
              type="text"
              value={apiKey}
              onChange={handleApiKeyChange}
              placeholder="Enter Google Maps API Key"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <p className="mt-2 text-xs text-gray-500">
              You can get an API key from the <a href="https://console.cloud.google.com/google/maps-apis" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Cloud Console</a>
            </p>
          </div>
        )}
        
        <div className="flex flex-col gap-4">
          <div ref={mapRef} className="w-full h-[400px] bg-gray-100 rounded-md relative">
            {!mapLoaded && apiKey && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            )}
            {!apiKey && (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-500">Enter API key to load maps</p>
              </div>
            )}
          </div>
          
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Selected Location:</p>
            <p className="text-sm text-gray-600">{locationName || "No location selected"}</p>
            
            <div className="flex gap-2 mt-2">
              <Button onClick={useCurrentLocation} variant="outline" size="sm" className="flex gap-1 items-center">
                <MapPin size={14} />
                Use My Location
              </Button>
              
              <Button onClick={handleShareLocation} variant="outline" size="sm" disabled={!locationName}>
                Share Location
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LocationMap;
