
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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
  const [filters, setFilters] = useState<any>({});
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  const handleSearch = () => {
    // Build search parameters
    const searchParams = new URLSearchParams();
    if (query) searchParams.append('q', query);
    
    // Add location, date, and category from filters
    if (filters.location) searchParams.append('location', filters.location);
    if (filters.date) searchParams.append('date', filters.date);
    if (filters.category) searchParams.append('category', filters.category);

    // Add more filters
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
    if (newFilters.location) {
      newActiveFilters.push(`Location: ${newFilters.location}`);
    }
    if (newFilters.date) {
      newActiveFilters.push(`Date: ${newFilters.date}`);
    }
    if (newFilters.category) {
      newActiveFilters.push(`Category: ${newFilters.category}`);
    }
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

  return (
    <div className={`${className} w-full`}>
      <div className="relative flex flex-col gap-3">
        <div className="flex items-center gap-2 max-w-3xl mx-auto w-full">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              type="text" 
              placeholder="What are you looking for?" 
              value={query} 
              onChange={e => setQuery(e.target.value)} 
              className="pl-10 border-[#9bd5e9] focus:ring-[#053e5d] focus:border-[#053e5d] bg-white rounded-full" 
              onKeyUp={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
            />
          </div>

          {/* Filter Menu */}
          <FilterMenu onFilter={handleFilterUpdate} />
          
          {/* Search Button */}
          <Button 
            onClick={handleSearch} 
            className="bg-[#053e5d] hover:bg-[#0a2247] text-white rounded-full"
          >
            Search
          </Button>
        </div>

        {/* Active Filters Display */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1 max-w-3xl mx-auto">
            {activeFilters.map((filter, index) => (
              <div key={index} className="bg-[#9bd5e9]/20 hover:bg-[#9bd5e9]/30 text-[#053e5d] text-xs px-2 py-1 rounded-full">
                {filter}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedSearchBar;
