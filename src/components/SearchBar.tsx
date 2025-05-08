import React, { useState } from 'react';
import { Search, MapPin, Loader2, Filter, X, Calendar, DollarSign, Tag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

interface SearchBarProps {
  compact?: boolean;
  className?: string;
}

// Demo categories data
const CATEGORIES = [
  "Electronics", "Vehicles", "Clothing", "Tools", "Sports", "Home", "Office", "Party"
];

const SearchBar = ({ compact = false, className = '' }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [locationData, setLocationData] = useState<{ lat?: number, lng?: number, locationName?: string }>({});
  const navigate = useNavigate();
  
  // Advanced filter states
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  // Handle search submit
  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (searchQuery || Object.keys(locationData).length > 0 || selectedCategories.length > 0) {
      let searchParams = new URLSearchParams();
      
      if (searchQuery) {
        searchParams.append('search', searchQuery);
      }
      
      if (locationData.lat && locationData.lng) {
        searchParams.append('lat', locationData.lat.toString());
        searchParams.append('lng', locationData.lng.toString());
      }
      
      if (selectedCategories.length > 0) {
        searchParams.append('categories', selectedCategories.join(','));
      }
      
      if (priceRange[0] > 0 || priceRange[1] < 1000) {
        searchParams.append('minPrice', priceRange[0].toString());
        searchParams.append('maxPrice', priceRange[1].toString());
      }
      
      if (dateRange.from) {
        searchParams.append('startDate', dateRange.from.toISOString());
      }
      
      if (dateRange.to) {
        searchParams.append('endDate', dateRange.to.toISOString());
      }
      
      setFiltersOpen(false);
      navigate(`/categories?${searchParams.toString()}`);
      
      toast({
        title: "Search initiated",
        description: "Showing results based on your criteria",
      });
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
  
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  const clearFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedCategories([]);
    setDateRange({ from: undefined, to: undefined });
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
          className={`pl-10 ${compact ? 'pr-24' : 'pr-32'} ${compact ? 'py-2' : 'py-6'} rounded-full border border-input bg-white/80 backdrop-blur-sm w-full shadow-sm hover:shadow-md focus:border-primary transition-all duration-300 hover-lift`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className={`absolute ${compact ? 'right-1' : 'right-2'} flex items-center`}>
          {!compact && (
            <Popover open={filtersOpen} onOpenChange={setFiltersOpen}>
              <PopoverTrigger asChild>
                <Button 
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="mr-1 hover:bg-secondary/20 hover:text-secondary btn-animated"
                >
                  <Filter className="h-5 w-5 text-primary hover:scale-110 transition-transform" />
                  {(selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 1000 || dateRange.from || dateRange.to) && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-secondary text-white rounded-full text-xs flex items-center justify-center">
                      !
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[320px] p-4" align="end">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Advanced Filters</h3>
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 text-xs">
                      <X className="h-3 w-3 mr-1" /> Clear all
                    </Button>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-2">
                      <DollarSign className="h-4 w-4 mr-1 text-primary" />
                      <h4 className="text-sm font-medium">Price Range</h4>
                    </div>
                    <Slider
                      defaultValue={[0, 1000]}
                      value={priceRange}
                      min={0}
                      max={1000}
                      step={10}
                      onValueChange={(value) => setPriceRange(value as [number, number])}
                      className="my-4"
                    />
                    <div className="flex justify-between text-sm">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}+</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-2">
                      <Tag className="h-4 w-4 mr-1 text-primary" />
                      <h4 className="text-sm font-medium">Categories</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {CATEGORIES.map(category => (
                        <Badge 
                          key={category} 
                          variant={selectedCategories.includes(category) ? "default" : "outline"}
                          className="cursor-pointer hover:bg-primary/20"
                          onClick={() => toggleCategory(category)}
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-2">
                      <Calendar className="h-4 w-4 mr-1 text-primary" />
                      <h4 className="text-sm font-medium">Availability</h4>
                    </div>
                    <div className="rounded-md border">
                      <CalendarComponent
                        mode="range"
                        selected={dateRange}
                        onSelect={setDateRange as any}
                        className="rounded-md border"
                      />
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleSearch} 
                    className="w-full"
                  >
                    Apply Filters
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
          
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
          
          <Button 
            type="submit"
            className="bg-secondary hover:bg-secondary/90 text-white font-medium rounded-full px-4 py-2 btn-animated"
          >
            Search
          </Button>
        </div>
      </form>
      
      {locationData.locationName && (
        <div className="mt-2 text-xs text-secondary flex items-center animate-fade-in">
          <MapPin className="h-3 w-3 mr-1" />
          <span>Using: {locationData.locationName}</span>
        </div>
      )}
      
      {selectedCategories.length > 0 && !filtersOpen && (
        <div className="mt-2 flex flex-wrap gap-1">
          {selectedCategories.map(cat => (
            <Badge key={cat} variant="secondary" className="text-xs">
              {cat}
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => setSelectedCategories(prev => prev.filter(c => c !== cat))}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
