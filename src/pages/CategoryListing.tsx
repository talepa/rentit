
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ItemCard from '@/components/ItemCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ChevronLeft, Filter, Search as SearchIcon } from 'lucide-react';

// Mock data for items
const mockItems = [
  { 
    id: 'p1', 
    title: 'High-end DSLR Camera', 
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&q=80&w=500', 
    price: 45,
    rating: 4.8,
    category: 'Electronics',
    distance: '2 miles',
    type: 'product'
  },
  { 
    id: 'p2', 
    title: 'Electric Scooter', 
    image: 'https://images.unsplash.com/photo-1520716963369-9b24de292cd2?auto=format&fit=crop&q=80&w=500', 
    price: 25,
    rating: 4.5,
    category: 'Vehicles',
    distance: '1 mile',
    type: 'product'
  },
  { 
    id: 'p3', 
    title: 'Camping Tent (4 Person)', 
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=500', 
    price: 30,
    rating: 4.6,
    category: 'Outdoor',
    distance: '3 miles',
    type: 'product'
  },
  { 
    id: 'p4', 
    title: 'Professional DJ Equipment', 
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=500', 
    price: 120,
    rating: 4.9,
    category: 'Electronics',
    distance: '5 miles',
    type: 'product'
  },
  { 
    id: 's1', 
    title: 'Professional Photography', 
    image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&q=80&w=500', 
    price: 50,
    rating: 4.7,
    category: 'Photography',
    distance: '4 miles',
    type: 'service'
  },
  { 
    id: 's2', 
    title: 'Handyman Services', 
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=500', 
    price: 35,
    rating: 4.4,
    category: 'Home Services',
    distance: '2 miles',
    type: 'service'
  },
  { 
    id: 's3', 
    title: 'Professional House Cleaning', 
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=500', 
    price: 45,
    rating: 4.8,
    category: 'Cleaning',
    distance: '3 miles',
    type: 'service'
  },
  { 
    id: 's4', 
    title: 'Personal Fitness Trainer', 
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=500', 
    price: 40,
    rating: 4.6,
    category: 'Fitness',
    distance: '1 mile',
    type: 'service'
  },
];

// Category names for title display
const categoryNames = {
  'electronics': 'Electronics',
  'vehicles': 'Vehicles',
  'tools': 'Tools',
  'homestay': 'Home Stays',
  'clothing': 'Clothing',
  'services': 'Services',
  'products': 'All Products',
  'stays': 'All Stays',
};

const CategoryListing = () => {
  const { category } = useParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');
  
  // Filter items based on category and/or type
  const filteredItems = mockItems.filter(item => {
    // Filter by search query
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by category
    if (category && category !== 'products' && category !== 'services' && category !== 'stays') {
      if (item.category.toLowerCase() !== categoryNames[category].toLowerCase()) {
        return false;
      }
    } else if (category === 'products' && item.type !== 'product') {
      return false;
    } else if (category === 'services' && item.type !== 'service') {
      return false;
    } else if (category === 'stays' && item.type !== 'stay') {
      return false;
    }
    
    // Filter by selected type
    if (selectedType !== 'all' && item.type !== selectedType) {
      return false;
    }
    
    // Filter by price range
    if (item.price < priceRange[0] || item.price > priceRange[1]) {
      return false;
    }
    
    return true;
  });
  
  // Sort items
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'price-low') {
      return a.price - b.price;
    } else if (sortBy === 'price-high') {
      return b.price - a.price;
    } else if (sortBy === 'rating') {
      return (b.rating || 0) - (a.rating || 0);
    }
    // Default: recommended
    return 0;
  });
  
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  
  const handlePriceChange = (values) => {
    setPriceRange(values);
  };
  
  const resetFilters = () => {
    setPriceRange([0, 200]);
    setSelectedType('all');
    setSearchQuery('');
    setSortBy('recommended');
  };

  return (
    <div className="min-h-screen bg-appbg">
      <Navbar />
      
      {/* Category Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Link to="/" className="mr-2">
              <ChevronLeft className="h-5 w-5 text-gray-400" />
            </Link>
            <h1 className="text-xl font-bold text-textdark">
              {category ? categoryNames[category] || 'Category' : 'All Categories'}
            </h1>
          </div>
        </div>
      </div>
      
      {/* Search and Filter */}
      <div className="bg-white border-b sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <SearchIcon className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search in this category"
                className="w-full pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="ml-4 flex items-center">
              <Button 
                variant="outline"
                className="flex items-center gap-2"
                onClick={toggleFilter}
              >
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px] ml-2">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Filter Panel */}
          {isFilterOpen && (
            <div className="py-4 border-t mt-2 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Type</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant={selectedType === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedType('all')}
                    >
                      All
                    </Button>
                    <Button 
                      variant={selectedType === 'product' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedType('product')}
                    >
                      Products
                    </Button>
                    <Button 
                      variant={selectedType === 'service' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedType('service')}
                    >
                      Services
                    </Button>
                    <Button 
                      variant={selectedType === 'stay' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedType('stay')}
                    >
                      Stays
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Price Range (per day)</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 200]}
                      max={200}
                      step={5}
                      value={priceRange}
                      onValueChange={handlePriceChange}
                      className="mt-6"
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-500">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-end justify-end">
                  <Button variant="outline" className="mr-2" onClick={resetFilters}>
                    Reset
                  </Button>
                  <Button onClick={toggleFilter}>
                    Apply
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Item Listing */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {sortedItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sortedItems.map(item => (
              <ItemCard 
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                category={item.category}
                distance={item.distance}
                type={item.type}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No items found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
            <Button className="mt-4" onClick={resetFilters}>
              Reset Filters
            </Button>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <footer className="bg-white border-t mt-8">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:justify-start">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-white font-poppins font-bold">R</span>
                </div>
                <h2 className="ml-2 text-xl font-bold text-primary">RentMate</h2>
              </div>
            </div>
            <div className="mt-8 md:mt-0">
              <p className="text-center md:text-right text-sm text-gray-500">
                &copy; 2023 RentMate. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CategoryListing;
