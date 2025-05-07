import React from 'react';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import CategoryCard from '@/components/CategoryCard';
import FeatureSection from '@/components/FeatureSection';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  // Mock data for categories with images
  const categories = [
    { 
      id: 'electronics', 
      name: 'Electronics', 
      icon: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=500', 
      color: 'bg-blue-100' 
    },
    { 
      id: 'vehicles', 
      name: 'Vehicles', 
      icon: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=500', 
      color: 'bg-green-100' 
    },
    { 
      id: 'tools', 
      name: 'Tools', 
      icon: 'https://images.unsplash.com/photo-1581166397057-235af2b3c6dd?auto=format&fit=crop&q=80&w=500', 
      color: 'bg-yellow-100' 
    },
    { 
      id: 'homestay', 
      name: 'Home Stays', 
      icon: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=500', 
      color: 'bg-purple-100' 
    },
    { 
      id: 'clothing', 
      name: 'Clothing', 
      icon: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=80&w=500', 
      color: 'bg-pink-100' 
    },
    { 
      id: 'services', 
      name: 'Services', 
      icon: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&q=80&w=500', 
      color: 'bg-indigo-100' 
    },
  ];

  // Mock data for featured products
  const featuredProducts = [
    { 
      id: 'p1', 
      title: 'High-end DSLR Camera', 
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&q=80&w=500', 
      price: 45,
      rating: 4.8,
      category: 'Electronics',
      distance: '2 miles',
      type: 'product' as const
    },
    { 
      id: 'p2', 
      title: 'Electric Scooter', 
      image: 'https://images.unsplash.com/photo-1520716963369-9b24de292cd2?auto=format&fit=crop&q=80&w=500', 
      price: 25,
      rating: 4.5,
      category: 'Vehicles',
      distance: '1 mile',
      type: 'product' as const
    },
    { 
      id: 'p3', 
      title: 'Camping Tent (4 Person)', 
      image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=500', 
      price: 30,
      rating: 4.6,
      category: 'Outdoor',
      distance: '3 miles',
      type: 'product' as const
    },
    { 
      id: 'p4', 
      title: 'Professional DJ Equipment', 
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=500', 
      price: 120,
      rating: 4.9,
      category: 'Electronics',
      distance: '5 miles',
      type: 'product' as const
    },
  ];

  // Mock data for featured services
  const featuredServices = [
    { 
      id: 's1', 
      title: 'Professional Photography', 
      image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&q=80&w=500', 
      price: 50,
      rating: 4.7,
      category: 'Photography',
      distance: '4 miles',
      type: 'service' as const
    },
    { 
      id: 's2', 
      title: 'Handyman Services', 
      image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=500', 
      price: 35,
      rating: 4.4,
      category: 'Home Services',
      distance: '2 miles',
      type: 'service' as const
    },
    { 
      id: 's3', 
      title: 'Professional House Cleaning', 
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=500', 
      price: 45,
      rating: 4.8,
      category: 'Cleaning',
      distance: '3 miles',
      type: 'service' as const
    },
    { 
      id: 's4', 
      title: 'Personal Fitness Trainer', 
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=500', 
      price: 40,
      rating: 4.6,
      category: 'Fitness',
      distance: '1 mile',
      type: 'service' as const
    },
  ];

  // Mock data for featured stays
  const featuredStays = [
    { 
      id: 'st1', 
      title: 'Modern Downtown Apartment', 
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=500', 
      price: 120,
      rating: 4.9,
      category: 'Apartment',
      distance: 'Downtown',
      type: 'stay' as const
    },
    { 
      id: 'st2', 
      title: 'Cozy Cabin Retreat', 
      image: 'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&q=80&w=500', 
      price: 95,
      rating: 4.7,
      category: 'Cabin',
      distance: '15 miles',
      type: 'stay' as const
    },
    { 
      id: 'st3', 
      title: 'Beachfront Villa', 
      image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=500', 
      price: 200,
      rating: 4.8,
      category: 'Villa',
      distance: 'Beachside',
      type: 'stay' as const
    },
    { 
      id: 'st4', 
      title: 'Urban Loft with City View', 
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=500', 
      price: 150,
      rating: 4.6,
      category: 'Loft',
      distance: 'City Center',
      type: 'stay' as const
    },
  ];

  return (
    <div className="min-h-screen bg-appbg">
      <Navbar />
      
      {/* Hero Section */}
      <div 
        className="bg-gradient-to-r from-primary to-primary/80 text-white relative"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1500')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70"></div>
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-20 relative">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-poppins drop-shadow-md">
              Rent Anything, Anywhere, Anytime
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Connect with local providers for products, services, and stays at affordable prices.
            </p>
            <SearchBar />
          </div>
        </div>
      </div>
      
      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-primary/10 rounded-lg"></div>
          <h2 className="text-xl font-bold py-3 px-4 font-poppins text-textdark relative">Categories</h2>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {categories.map(category => (
            <CategoryCard 
              key={category.id}
              id={category.id}
              name={category.name}
              icon={category.icon}
              color={category.color}
            />
          ))}
        </div>
      </div>

      {/* Become a Provider Section */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-secondary/20 to-secondary/10 rounded-lg p-6 sm:p-8 mt-4 mb-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-2/3">
              <h3 className="text-xl md:text-2xl font-bold text-textdark mb-2">Become a Provider</h3>
              <p className="text-gray-600 mb-4 md:mb-0">
                List your items or services on RentMate and start earning today.
              </p>
            </div>
            <div>
              <Button className="bg-secondary hover:bg-secondary/90 text-white">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Sections with Heading Backgrounds */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative mb-4">
          <div className="absolute inset-0 bg-primary/10 rounded-lg"></div>
          <h2 className="text-xl font-bold py-3 px-4 font-poppins text-textdark relative">Featured Products</h2>
        </div>
        <FeatureSection 
          title="" 
          viewAllLink="/categories/products"
          items={featuredProducts}
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative mb-4">
          <div className="absolute inset-0 bg-secondary/10 rounded-lg"></div>
          <h2 className="text-xl font-bold py-3 px-4 font-poppins text-textdark relative">Featured Services</h2>
        </div>
        <FeatureSection 
          title="" 
          viewAllLink="/categories/services"
          items={featuredServices}
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="relative mb-4">
          <div className="absolute inset-0 bg-accent/10 rounded-lg"></div>
          <h2 className="text-xl font-bold py-3 px-4 font-poppins text-textdark relative">Places to Stay</h2>
        </div>
        <FeatureSection 
          title="" 
          viewAllLink="/categories/stays"
          items={featuredStays}
        />
      </div>
      
      {/* Footer */}
      <footer className="bg-white border-t">
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

export default Index;
