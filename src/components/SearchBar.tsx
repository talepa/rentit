
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const SearchBar = () => {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative flex items-center">
        <div className="absolute left-3 text-gray-400">
          <Search className="h-5 w-5" />
        </div>
        <Input 
          type="text"
          placeholder="Search for products, services or stays..."
          className="pl-10 pr-24 py-6 rounded-full border border-gray-200 bg-white w-full shadow-sm focus:border-primary"
        />
        <div className="absolute right-2">
          <Button className="bg-primary hover:bg-primary/90 text-white font-medium rounded-full px-4 py-2">
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
