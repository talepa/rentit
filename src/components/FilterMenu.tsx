
import React, { useState } from 'react';
import { Filter, ChevronDown, Check, X, MapPin, Calendar, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';

interface FilterOption {
  id: string;
  label: string;
  checked: boolean;
}

interface FilterMenuProps {
  onFilter: (filters: any) => void;
}

const FilterMenu: React.FC<FilterMenuProps> = ({ onFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [category, setCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [distance, setDistance] = useState(10);
  const [rating, setRating] = useState(0);
  const [sortBy, setSortBy] = useState('relevance');
  
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
  
  // Different filter categories
  const [categoryFilters, setCategoryFilters] = useState<FilterOption[]>([
    { id: 'electronics', label: 'Electronics', checked: false },
    { id: 'vehicles', label: 'Vehicles', checked: false },
    { id: 'clothing', label: 'Clothing', checked: false },
    { id: 'tools', label: 'Tools', checked: false },
    { id: 'homestays', label: 'Home Stays', checked: false },
    { id: 'sports', label: 'Sports', checked: false },
    { id: 'events', label: 'Events', checked: false },
    { id: 'services', label: 'Services', checked: false },
  ]);

  const [availability, setAvailability] = useState<FilterOption[]>([
    { id: 'available-now', label: 'Available Now', checked: false },
    { id: 'available-weekend', label: 'Available This Weekend', checked: false },
    { id: 'available-delivery', label: 'Free Delivery', checked: false },
    { id: 'available-pickup', label: 'Pickup Only', checked: false },
  ]);

  const [verification, setVerification] = useState<FilterOption[]>([
    { id: 'verified-sellers', label: 'Verified Sellers', checked: false },
    { id: 'top-rated', label: 'Top Rated (4+)', checked: false },
    { id: 'super-renters', label: 'Super Renters', checked: false },
  ]);

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  const handleCategoryChange = (id: string) => {
    setCategoryFilters(categoryFilters.map(category => 
      category.id === id ? { ...category, checked: !category.checked } : category
    ));
  };

  const handleAvailabilityChange = (id: string) => {
    setAvailability(availability.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const handleVerificationChange = (id: string) => {
    setVerification(verification.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
  };

  const handleDistanceChange = (value: number[]) => {
    setDistance(value[0]);
  };

  const handleRatingChange = (value: number[]) => {
    setRating(value[0]);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const handleCategorySelect = (categoryId: string) => {
    setCategory(categoryId);
  };

  const applyFilters = () => {
    const filters = {
      location,
      date: date ? format(date, 'yyyy-MM-dd') : undefined,
      category,
      priceRange,
      distance,
      rating,
      sortBy,
      categories: categoryFilters.filter(c => c.checked).map(c => c.id),
      availability: availability.filter(a => a.checked).map(a => a.id),
      verification: verification.filter(v => v.checked).map(v => v.id),
    };
    
    onFilter(filters);
    setIsOpen(false);
  };

  const resetFilters = () => {
    setLocation('');
    setDate(undefined);
    setCategory(null);
    setPriceRange([0, 1000]);
    setDistance(10);
    setRating(0);
    setSortBy('relevance');
    setCategoryFilters(categoryFilters.map(c => ({ ...c, checked: false })));
    setAvailability(availability.map(a => ({ ...a, checked: false })));
    setVerification(verification.map(v => ({ ...v, checked: false })));
  };

  const countActiveFilters = () => {
    let count = 0;
    if (location) count++;
    if (date) count++;
    if (category) count++;
    if (categoryFilters.some(c => c.checked)) count++;
    if (availability.some(a => a.checked)) count++;
    if (verification.some(v => v.checked)) count++;
    if (rating > 0) count++;
    if (distance < 10) count++;
    if (priceRange[0] > 0 || priceRange[1] < 1000) count++;
    return count;
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={toggleFilter}
        className="flex items-center gap-2 bg-white border-[#9bd5e9] hover:bg-[#9bd5e9]/10"
      >
        <Filter className="h-4 w-4 text-[#053e5d]" />
        <span className="text-[#053e5d]">Filters</span>
        {countActiveFilters() > 0 && (
          <span className="bg-[#053e5d] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {countActiveFilters()}
          </span>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 z-50 w-80 bg-white rounded-lg shadow-lg border border-[#9bd5e9] overflow-hidden"
          >
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-[#053e5d] to-[#0a2247] text-white">
              <h3 className="font-medium">Filter Options</h3>
              <Button variant="ghost" size="icon" onClick={toggleFilter} className="h-7 w-7 rounded-full text-white hover:bg-white/20">
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto p-4">
              {/* Location Input */}
              <div className="mb-5">
                <h4 className="text-sm font-medium mb-2 flex items-center">
                  <MapPin className="h-4 w-4 mr-1 text-[#053e5d]" />
                  <span>Location</span>
                </h4>
                <Input 
                  type="text" 
                  placeholder="Enter your location" 
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)}
                  className="border-[#9bd5e9] focus:border-[#053e5d]"
                />
              </div>
              
              {/* Date Picker */}
              <div className="mb-5">
                <h4 className="text-sm font-medium mb-2 flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-[#053e5d]" />
                  <span>Date</span>
                </h4>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={`w-full justify-start text-left font-normal border-[#9bd5e9] hover:bg-[#9bd5e9]/10 ${!date ? 'text-gray-500' : 'text-[#053e5d]'}`}>
                      <Calendar className="mr-2 h-4 w-4 text-[#053e5d]" />
                      {date ? format(date, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              
              {/* Category Selection */}
              <div className="mb-5">
                <h4 className="text-sm font-medium mb-2 flex items-center">
                  <Tag className="h-4 w-4 mr-1 text-[#053e5d]" />
                  <span>Category</span>
                </h4>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={`w-full justify-start text-left font-normal border-[#9bd5e9] hover:bg-[#9bd5e9]/10 ${!category ? 'text-gray-500' : 'text-[#053e5d]'}`}>
                      <Tag className="mr-2 h-4 w-4 text-[#053e5d]" />
                      {category ? categories.find(c => c.id === category)?.name : <span>Select category</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 p-0" align="start">
                    <div className="p-2">
                      {categories.map(cat => (
                        <Button 
                          key={cat.id} 
                          variant="ghost" 
                          className="w-full justify-start text-left font-normal hover:bg-[#9bd5e9]/10 hover:text-[#053e5d]" 
                          onClick={() => handleCategorySelect(cat.id)}
                        >
                          {cat.name}
                        </Button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Price Range */}
              <div className="mb-5">
                <h4 className="text-sm font-medium mb-2 flex justify-between">
                  <span>Price Range</span>
                  <span className="text-[#053e5d]">${priceRange[0]} - ${priceRange[1]}</span>
                </h4>
                <Slider
                  defaultValue={[0, 1000]}
                  max={1000}
                  step={10}
                  value={priceRange}
                  onValueChange={handlePriceChange}
                  className="my-4"
                />
              </div>

              {/* Distance */}
              <div className="mb-5">
                <h4 className="text-sm font-medium mb-2 flex justify-between">
                  <span>Maximum Distance</span>
                  <span className="text-[#053e5d]">{distance} miles</span>
                </h4>
                <Slider
                  defaultValue={[10]}
                  max={50}
                  step={1}
                  value={[distance]}
                  onValueChange={handleDistanceChange}
                />
              </div>

              {/* Rating */}
              <div className="mb-5">
                <h4 className="text-sm font-medium mb-2 flex justify-between">
                  <span>Minimum Rating</span>
                  <span className="text-[#053e5d]">{rating}+ stars</span>
                </h4>
                <Slider
                  defaultValue={[0]}
                  min={0}
                  max={5}
                  step={0.5}
                  value={[rating]}
                  onValueChange={handleRatingChange}
                />
              </div>

              {/* Sort By */}
              <div className="mb-5">
                <h4 className="text-sm font-medium mb-2">Sort By</h4>
                <div className="grid grid-cols-2 gap-2">
                  {['relevance', 'price-low', 'price-high', 'rating', 'distance', 'newest'].map((sort) => (
                    <Button
                      key={sort}
                      variant={sortBy === sort ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSortChange(sort)}
                      className={sortBy === sort ? "bg-[#053e5d] hover:bg-[#053e5d]/90 text-white" : "border-[#9bd5e9] text-[#053e5d] hover:bg-[#9bd5e9]/10"}
                    >
                      {sort === 'relevance' && 'Relevance'}
                      {sort === 'price-low' && 'Price: Low-High'}
                      {sort === 'price-high' && 'Price: High-Low'}
                      {sort === 'rating' && 'Highest Rated'}
                      {sort === 'distance' && 'Nearest First'}
                      {sort === 'newest' && 'Newest First'}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="mb-5">
                <h4 className="text-sm font-medium mb-2">Multiple Categories</h4>
                <div className="grid grid-cols-2 gap-y-2">
                  {categoryFilters.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={category.id} 
                        checked={category.checked} 
                        onCheckedChange={() => handleCategoryChange(category.id)}
                        className="border-[#9bd5e9] data-[state=checked]:bg-[#053e5d] data-[state=checked]:border-[#053e5d]"
                      />
                      <Label htmlFor={category.id} className="text-sm">{category.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="mb-5">
                <h4 className="text-sm font-medium mb-2">Availability</h4>
                {availability.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2 mb-2">
                    <Checkbox 
                      id={option.id} 
                      checked={option.checked} 
                      onCheckedChange={() => handleAvailabilityChange(option.id)}
                      className="border-[#9bd5e9] data-[state=checked]:bg-[#053e5d] data-[state=checked]:border-[#053e5d]"
                    />
                    <Label htmlFor={option.id} className="text-sm">{option.label}</Label>
                  </div>
                ))}
              </div>

              {/* Verification */}
              <div className="mb-5">
                <h4 className="text-sm font-medium mb-2">Verification</h4>
                {verification.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2 mb-2">
                    <Checkbox 
                      id={option.id} 
                      checked={option.checked} 
                      onCheckedChange={() => handleVerificationChange(option.id)}
                      className="border-[#9bd5e9] data-[state=checked]:bg-[#053e5d] data-[state=checked]:border-[#053e5d]"
                    />
                    <Label htmlFor={option.id} className="text-sm">{option.label}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-[#f8fafc] border-t border-[#9bd5e9] flex justify-between">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={resetFilters}
                className="border-[#053e5d] text-[#053e5d]"
              >
                Reset All
              </Button>
              <Button 
                onClick={applyFilters}
                size="sm"
                className="bg-[#053e5d] hover:bg-[#0a2247] text-white"
              >
                Apply Filters
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterMenu;
