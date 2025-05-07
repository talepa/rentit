
import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem
} from '@/components/ui/command';
import { useNavigate } from 'react-router-dom';

// Mock data for search suggestions
const searchSuggestions = [
  { id: 'p1', title: 'DSLR Camera', category: 'Electronics', type: 'product' },
  { id: 'p2', title: 'Electric Scooter', category: 'Vehicles', type: 'product' },
  { id: 'p3', title: 'Camping Tent', category: 'Outdoor', type: 'product' },
  { id: 'p4', title: 'Professional DJ Equipment', category: 'Electronics', type: 'product' },
  { id: 's1', title: 'Professional Photography', category: 'Photography', type: 'service' },
  { id: 's2', title: 'Handyman Services', category: 'Home Services', type: 'service' },
  { id: 'st1', title: 'Modern Downtown Apartment', category: 'Apartment', type: 'stay' },
];

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState(searchSuggestions);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Filter suggestions based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = searchSuggestions.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions(searchSuggestions);
    }
  }, [searchQuery]);

  // Handle input focus
  const handleFocus = () => {
    setOpen(true);
  };

  // Handle search submit
  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (searchQuery) {
      console.log('Searching for:', searchQuery);
      navigate(`/categories?search=${encodeURIComponent(searchQuery)}`);
      setOpen(false);
    }
  };

  // Handle item selection
  const handleSelectItem = (id: string) => {
    console.log('Selected item:', id);
    navigate(`/item/${id}`);
    setOpen(false);
    setSearchQuery('');
  };

  // Handle location search
  const handleLocationSearch = () => {
    console.log('Searching by location');
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        console.log(`Location: ${latitude}, ${longitude}`);
        // Here you would typically call an API to get items near this location
        navigate(`/categories?lat=${latitude}&lng=${longitude}`);
      }, (error) => {
        console.error('Error getting location:', error);
        alert('Unable to access your location. Please check your browser settings.');
      });
    } else {
      alert('Geolocation is not supported by your browser');
    }
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <div className="w-full max-w-3xl mx-auto">
        <form onSubmit={handleSearch} className="relative flex items-center">
          <div className="absolute left-3 text-gray-400">
            <Search className="h-5 w-5" />
          </div>
          <Input 
            ref={inputRef}
            type="text"
            placeholder="Search for products, services or stays..."
            className="pl-10 pr-24 py-6 rounded-full border border-gray-200 bg-white w-full shadow-sm focus:border-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleFocus}
          />
          <div className="absolute right-2 flex items-center">
            <Button 
              type="button"
              variant="ghost"
              size="icon"
              className="mr-1"
              onClick={handleLocationSearch}
            >
              <MapPin className="h-5 w-5 text-primary" />
            </Button>
            <Button 
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white font-medium rounded-full px-4 py-2"
            >
              Search
            </Button>
          </div>
        </form>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder="Search for anything..." 
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {filteredSuggestions.map((item) => (
              <CommandItem 
                key={item.id}
                value={item.title}
                onSelect={() => handleSelectItem(item.id)}
              >
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    item.type === 'product' ? 'bg-primary' : 
                    item.type === 'service' ? 'bg-secondary' : 'bg-accent'
                  }`}></div>
                  <span>{item.title}</span>
                  <span className="ml-2 text-xs text-gray-400">in {item.category}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchBar;
