
import React, { useState } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  compact?: boolean;
  className?: string;
}

const SearchBar = ({ compact = false, className = '' }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [locationData, setLocationData] = useState<{ lat?: number, lng?: number, locationName?: string }>({});
  const navigate = useNavigate();

  // Handle search submit
  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (searchQuery || Object.keys(locationData).length > 0) {
      let searchParams = new URLSearchParams();
      
      if (searchQuery) {
        searchParams.append('search', searchQuery);
      }
      
      if (locationData.lat && locationData.lng) {
        searchParams.append('lat', locationData.lat.toString());
        searchParams.append('lng', locationData.lng.toString());
      }
      
      navigate(`/categories?${searchParams.toString()}`);
    }
  };

  // Handle location search
  const handleLocationSearch = () => {
    if (isLocating) return;
    
    setIsLocating(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        
        // In a real app, you would use a reverse geocoding service to get the location name
        setLocationData({
          lat: latitude,
          lng: longitude,
          locationName: "Current Location"
        });
        
        toast({
          title: "Location detected",
          description: "Now showing items near your location",
        });
        
        setIsLocating(false);
        handleSearch();
      }, (error) => {
        console.error('Error getting location:', error);
        toast({
          title: "Location error",
          description: "Unable to access your location. Please check your browser settings.",
          variant: "destructive"
        });
        setIsLocating(false);
      });
    } else {
      toast({
        title: "Location not supported",
        description: "Geolocation is not supported by your browser",
        variant: "destructive"
      });
      setIsLocating(false);
    }
  };

  return (
    <div className={`w-full max-w-3xl mx-auto ${className}`}>
      <form onSubmit={handleSearch} className="relative flex items-center group">
        <div className="absolute left-3 text-primary/70 group-hover:text-primary transition-colors duration-300">
          <Search className="h-5 w-5" />
        </div>
        <Input 
          type="text"
          placeholder={compact ? "Search..." : "Search for rentals..."}
          className={`pl-10 ${compact ? 'pr-10' : 'pr-24'} ${compact ? 'py-2' : 'py-6'} rounded-full border border-input bg-white/80 backdrop-blur-sm w-full shadow-sm hover:shadow-md focus:border-primary transition-all duration-300 hover-lift`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className={`absolute ${compact ? 'right-1' : 'right-2'} flex items-center`}>
          <Button 
            type="button"
            variant="ghost"
            size="icon"
            className="mr-1 hover:bg-secondary/20 hover:text-secondary btn-animated"
            onClick={handleLocationSearch}
            disabled={isLocating}
          >
            {isLocating ? (
              <Loader2 className="h-5 w-5 animate-spin text-secondary" />
            ) : (
              <MapPin className="h-5 w-5 text-secondary hover:scale-110 transition-transform" />
            )}
          </Button>
          {!compact && (
            <Button 
              type="submit"
              className="bg-secondary hover:bg-secondary/90 text-white font-medium rounded-full px-4 py-2 btn-animated"
            >
              Search
            </Button>
          )}
        </div>
      </form>
      
      {locationData.locationName && (
        <div className="mt-2 text-xs text-secondary flex items-center animate-fade-in">
          <MapPin className="h-3 w-3 mr-1" />
          <span>Using: {locationData.locationName}</span>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
