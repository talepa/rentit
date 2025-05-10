import React, { useState } from 'react';
import { Search, MapPin, Calendar, Tag, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import FilterMenu from './FilterMenu';
interface SearchBarProps {
  className?: string;
}
const EnhancedSearchBar: React.FC<SearchBarProps> = ({
  className
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [category, setCategory] = useState<string | null>(null);
  const [filters, setFilters] = useState<any>({});
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const categories = [{
    id: 'electronics',
    name: 'Electronics'
  }, {
    id: 'vehicles',
    name: 'Vehicles'
  }, {
    id: 'clothing',
    name: 'Clothing'
  }, {
    id: 'tools',
    name: 'Tools'
  }, {
    id: 'homestays',
    name: 'Home Stays'
  }, {
    id: 'sports',
    name: 'Sports'
  }, {
    id: 'events',
    name: 'Events'
  }];
  const handleSearch = () => {
    // Build search parameters
    const searchParams = new URLSearchParams();
    if (query) searchParams.append('q', query);
    if (location) searchParams.append('location', location);
    if (date) searchParams.append('date', format(date, 'yyyy-MM-dd'));
    if (category) searchParams.append('category', category);

    // Add filters
    if (filters.priceRange) {
      searchParams.append('minPrice', filters.priceRange[0].toString());
      searchParams.append('maxPrice', filters.priceRange[1].toString());
    }
    if (filters.distance) searchParams.append('distance', filters.distance.toString());
    if (filters.rating) searchParams.append('rating', filters.rating.toString());

    // Navigate to search results
    navigate(`/categories?${searchParams.toString()}`);
  };
  const handleFilterUpdate = (newFilters: any) => {
    setFilters(newFilters);

    // Update active filter badges
    const newActiveFilters: string[] = [];
    if (newFilters.categories?.length > 0) {
      newActiveFilters.push(`${newFilters.categories.length} ${newFilters.categories.length === 1 ? 'category' : 'categories'}`);
    }
    if (newFilters.priceRange && (newFilters.priceRange[0] > 0 || newFilters.priceRange[1] < 1000)) {
      newActiveFilters.push(`$${newFilters.priceRange[0]}-$${newFilters.priceRange[1]}`);
    }
    if (newFilters.distance && newFilters.distance < 10) {
      newActiveFilters.push(`≤ ${newFilters.distance} miles`);
    }
    if (newFilters.rating && newFilters.rating > 0) {
      newActiveFilters.push(`${newFilters.rating}+ stars`);
    }
    if (newFilters.availability?.length > 0) {
      if (newFilters.availability.includes('available-now')) {
        newActiveFilters.push('Available Now');
      }
      if (newFilters.availability.includes('available-delivery')) {
        newActiveFilters.push('Free Delivery');
      }
    }
    if (newFilters.verification?.length > 0) {
      if (newFilters.verification.includes('verified-sellers')) {
        newActiveFilters.push('Verified Sellers');
      }
    }
    setActiveFilters(newActiveFilters);
  };
  const handlePopularItems = () => {
    navigate('/categories?popular=true');
  };
  const handleVerifiedRentals = () => {
    navigate('/categories?verified=true');
  };
  const handleFreeDelivery = () => {
    navigate('/categories?delivery=free');
  };
  const removeFilter = (index: number) => {
    // Remove specific filter
    const updatedFilters = [...activeFilters];
    updatedFilters.splice(index, 1);
    setActiveFilters(updatedFilters);
  };
  return <div className={`${className} w-full`}>
      <div className="relative flex flex-col gap-3">
        <div className="flex flex-col md:flex-row gap-2">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input type="text" placeholder="What are you looking for?" value={query} onChange={e => setQuery(e.target.value)} className="pl-10 border-[#9bd5e9] focus:ring-[#053e5d] focus:border-[#053e5d] bg-white" />
          </div>
          
          {/* Location Input */}
          <div className="relative md:w-1/4">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input type="text" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} className="pl-10 border-[#9bd5e9] focus:ring-[#053e5d] focus:border-[#053e5d] bg-white" />
          </div>

          {/* Date Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={`md:w-auto justify-start text-left font-normal border-[#9bd5e9] hover:bg-[#9bd5e9]/10 ${!date ? 'text-gray-500' : ''}`}>
                <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                {date ? format(date, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>

          {/* Category Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={`md:w-auto justify-start text-left font-normal border-[#9bd5e9] hover:bg-[#9bd5e9]/10 ${!category ? 'text-gray-500' : ''}`}>
                <Tag className="mr-2 h-4 w-4 text-gray-400" />
                {category ? categories.find(c => c.id === category)?.name : <span>Category</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-0" align="start">
              <div className="p-2">
                {categories.map(cat => <Button key={cat.id} variant="ghost" className="w-full justify-start text-left font-normal hover:bg-[#9bd5e9]/10 hover:text-[#053e5d]" onClick={() => setCategory(cat.id)}>
                    {cat.name}
                  </Button>)}
              </div>
            </PopoverContent>
          </Popover>

          {/* Filter Menu */}
          <FilterMenu onFilter={handleFilterUpdate} />
          
          {/* Search Button */}
          <Button onClick={handleSearch} className="bg-[#053e5d] hover:bg-[#0a2247] text-white">
            Search
          </Button>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && <div className="flex flex-wrap gap-2 mt-1">
            {activeFilters.map((filter, index) => <Badge key={index} variant="secondary" className="bg-[#9bd5e9]/20 hover:bg-[#9bd5e9]/30 text-[#053e5d]">
                {filter}
                <button onClick={() => removeFilter(index)} className="ml-2 text-[#053e5d]/60 hover:text-[#053e5d]">
                  <X className="h-3 w-3" />
                </button>
              </Badge>)}
          </div>}

        {/* Quick filter buttons */}
        <div className="flex flex-wrap gap-2">
          <Button variant="ghost" size="sm" onClick={handlePopularItems} className="hover:bg-white/20 text-zinc-950">
            Popular items
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" onClick={handleVerifiedRentals}>
            Verified rentals
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" onClick={handleFreeDelivery}>
            Free delivery
          </Button>
        </div>
      </div>
    </div>;
};
export default EnhancedSearchBar;