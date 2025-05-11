import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import EnhancedSearchBar from '@/components/EnhancedSearchBar';
import CategoryCard from '@/components/CategoryCard';
import ItemCard from '@/components/ItemCard';
import FeatureSection from '@/components/FeatureSection';
import AnimatedWave from '@/components/AnimatedWave';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    name: 'Electronics',
    imageUrl: '/electronics.jpg',
    description: 'Rent the latest gadgets and devices.',
  },
  {
    name: 'Vehicles',
    imageUrl: '/vehicles.jpg',
    description: 'Explore our range of rental vehicles.',
  },
  {
    name: 'Clothing',
    imageUrl: '/clothing.jpg',
    description: 'Find the perfect outfit for any occasion.',
  },
  {
    name: 'Tools',
    imageUrl: '/tools.jpg',
    description: 'Get the job done with our quality tool rentals.',
  },
  {
    name: 'Home & Garden',
    imageUrl: '/homestay.jpg',
    description: 'Transform your space with our rental items.',
  },
  {
    name: 'Sports Equipment',
    imageUrl: '/outdoor.jpg',
    description: 'Gear up for your next adventure.',
  },
  {
    name: 'Events',
    imageUrl: '/events.jpg',
    description: 'Everything you need for a memorable event.',
  },
];

const nearbyProducts = [
  {
    id: '1',
    name: 'DJI Drone',
    imageUrl: '/drone.jpg',
    price: 49,
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Canon Camera',
    imageUrl: '/camera.jpg',
    price: 39,
    rating: 4.5,
  },
  {
    id: '3',
    name: 'Camping Tent',
    imageUrl: '/tent.jpg',
    price: 29,
    rating: 4.2,
  },
  {
    id: '4',
    name: 'Projector',
    imageUrl: '/projector.jpg',
    price: 59,
    rating: 4.9,
  },
];

const featuredProducts = [
  {
    id: '5',
    name: 'Mountain Bike',
    imageUrl: '/bike.jpg',
    price: 59,
    rating: 4.7,
  },
  {
    id: '6',
    name: 'Gaming Laptop',
    imageUrl: '/laptop.jpg',
    price: 79,
    rating: 4.6,
  },
  {
    id: '7',
    name: 'Party Speaker',
    imageUrl: '/speaker.jpg',
    price: 39,
    rating: 4.4,
  },
  {
    id: '8',
    name: 'VR Headset',
    imageUrl: '/vr.jpg',
    price: 69,
    rating: 4.9,
  },
];

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // You can use a reverse geocoding service to get the city name from coordinates
          // For simplicity, we'll just store the coordinates
          setLocation(`${latitude}, ${longitude}`);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocation('Unknown');
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      setLocation('Unknown');
    }
  }, []);
  
  return (
    <div className="bg-gradient-to-b from-[#9bd5e9]/20 to-white min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative pt-20 pb-32 md:pt-28 md:pb-40 overflow-hidden">
        <AnimatedWave />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-4xl font-extrabold text-[#053e5d] sm:text-5xl lg:text-6xl leading-tight mb-4">
              Rent Anything, Anywhere
            </h1>
            <p className="text-lg text-gray-700 sm:text-xl md:text-2xl mb-8">
              Discover a world of rentals at your fingertips.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <EnhancedSearchBar 
              onSearch={(query) => setSearchQuery(query)} 
              placeholder="Search for items to rent"
            />
          </motion.div>
        </div>
      </div>
      
      {/* Categories Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 md:-mt-24">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {categories.map((category) => (
            <CategoryCard 
              key={category.name} 
              category={category} 
              onClick={() => navigate(`/categories/${category.name}`)}
            />
          ))}
        </motion.div>
      </div>
      
      {/* Nearby Items Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-[#053e5d] sm:text-3xl">
            Nearby Items
          </h2>
          <Button 
            variant="ghost" 
            className="text-[#053e5d] hover:text-[#0a2247] hover:bg-[#9bd5e9]/10"
            onClick={() => navigate('/nearby')}
          >
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        
        <FeatureSection title="Nearby Items" items={nearbyProducts} />
      </div>
      
      {/* Value Proposition Section */}
      <div className="bg-gradient-to-r from-[#f8fafc] to-[#9bd5e9]/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8">
          <div className="md:order-2">
            <motion.img 
              src="/value-prop.svg"
              alt="Value Proposition"
              className="w-full rounded-lg shadow-lg"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            />
          </div>
          
          <div className="md:order-1">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-2xl font-bold text-[#053e5d] sm:text-3xl mb-4">
                Why Choose RentMate?
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                RentMate offers a seamless and secure platform to rent items from trusted individuals in your community.
              </p>
              <ul className="list-disc list-inside text-gray-600 text-lg">
                <li>Wide selection of items</li>
                <li>Affordable prices</li>
                <li>Secure transactions</li>
                <li>Community-driven marketplace</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-[#053e5d] sm:text-3xl">
            Featured Items
          </h2>
          <Button 
            variant="ghost" 
            className="text-[#053e5d] hover:text-[#0a2247] hover:bg-[#9bd5e9]/10"
            onClick={() => navigate('/featured')}
          >
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        
        <FeatureSection title="Featured Items" items={featuredProducts} />
      </div>
    </div>
  );
};

export default Index;
