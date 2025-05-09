
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import { CategoryCarousel } from '@/components/CategoryCard';
import FeatureSection from '@/components/FeatureSection';
import NotificationPopover from '@/components/NotificationPopover';
import LocationMap from '@/components/LocationMap';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Clock, MapPin, TrendingUp } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mock data for categories
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
    { 
      id: 'outdoor', 
      name: 'Outdoor', 
      icon: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?auto=format&fit=crop&q=80&w=500', 
      color: 'bg-emerald-100' 
    },
    { 
      id: 'furniture', 
      name: 'Furniture', 
      icon: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=500', 
      color: 'bg-amber-100' 
    },
    { 
      id: 'events', 
      name: 'Events', 
      icon: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=500', 
      color: 'bg-rose-100' 
    },
  ];

  // Popular Categories based on user engagement
  const popularCategories = [
    { 
      id: 'electronics', 
      name: 'Electronics', 
      icon: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=500', 
      color: 'bg-blue-100',
      rentals: 845 
    },
    { 
      id: 'vehicles', 
      name: 'Vehicles', 
      icon: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=500', 
      color: 'bg-green-100',
      rentals: 732 
    },
    { 
      id: 'homestay', 
      name: 'Home Stays', 
      icon: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=500', 
      color: 'bg-purple-100',
      rentals: 621 
    },
    { 
      id: 'services', 
      name: 'Services', 
      icon: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&q=80&w=500', 
      color: 'bg-indigo-100',
      rentals: 518
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

  // Recent listings
  const recentListings = [
    { 
      id: 'r1', 
      title: 'Mountain Bike', 
      image: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&q=80&w=500', 
      price: 35,
      rating: 4.7,
      category: 'Sports',
      distance: '0.5 miles',
      type: 'product' as const,
      listed: '2 hours ago'
    },
    { 
      id: 'r2', 
      title: 'Drone with 4K Camera', 
      image: 'https://images.unsplash.com/photo-1524143986875-3b5c3339173b?auto=format&fit=crop&q=80&w=500', 
      price: 80,
      rating: 4.9,
      category: 'Electronics',
      distance: '4 miles',
      type: 'product' as const,
      listed: '3 hours ago'
    },
    { 
      id: 'r3', 
      title: 'Luxury Watch Collection', 
      image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=500', 
      price: 150,
      rating: 5.0,
      category: 'Fashion',
      distance: '7 miles',
      type: 'product' as const,
      listed: '5 hours ago'
    },
    { 
      id: 'r4', 
      title: 'Garden Tools Set', 
      image: 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?auto=format&fit=crop&q=80&w=500', 
      price: 25,
      rating: 4.4,
      category: 'Home & Garden',
      distance: '1.5 miles',
      type: 'product' as const,
      listed: '6 hours ago'
    },
  ];

  // Trending items (most rented this week)
  const trendingItems = [
    { 
      id: 't1', 
      title: 'Gaming Console PS5', 
      image: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&q=80&w=500', 
      price: 55,
      rating: 4.9,
      category: 'Gaming',
      distance: '3 miles',
      type: 'product' as const
    },
    { 
      id: 't2', 
      title: 'Electric Guitar', 
      image: 'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?auto=format&fit=crop&q=80&w=500', 
      price: 40,
      rating: 4.7,
      category: 'Music',
      distance: '5 miles',
      type: 'product' as const
    },
    { 
      id: 't3', 
      title: 'Luxury Car (Weekend)', 
      image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=500', 
      price: 250,
      rating: 4.8,
      category: 'Vehicles',
      distance: '8 miles',
      type: 'product' as const
    },
    { 
      id: 't4', 
      title: 'Projector for Events', 
      image: 'https://images.unsplash.com/photo-1619066468268-c4c363ee1cf6?auto=format&fit=crop&q=80&w=500', 
      price: 70,
      rating: 4.6,
      category: 'Electronics',
      distance: '2 miles',
      type: 'product' as const
    },
  ];

  // 3D carousel animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  // Parallax effect calculation
  const parallaxOffset = scrollY * 0.4;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      {/* Hero Section with Parallax */}
      <div className="relative overflow-hidden">
        {/* Background Layers with Parallax */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1602508303143-eff7fba4acec?auto=format&fit=crop&q=80&w=1800')",
            transform: `translateY(${parallaxOffset}px)`,
            backgroundPosition: `50% ${50 + (scrollY * 0.1)}%`,
            filter: 'brightness(0.7)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-secondary/60 to-primary/70 mix-blend-multiply z-1"></div>
        
        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 lg:py-32 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex justify-center mb-4"
            >
              <div className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full">
                <p className="text-sm text-white font-medium">Rent anything, anywhere, anytime</p>
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white font-poppins drop-shadow-md"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Welcome to <span className="text-accent font-bold">Rentit</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto drop-shadow"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              The easiest way to rent items and services from people around you
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl max-w-3xl mx-auto">
                <SearchBar />
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  <div className="flex items-center">
                    <LocationMap />
                  </div>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                    Popular items
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                    Verified rentals
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                    Free delivery
                  </Button>
                </div>
              </div>
            </motion.div>
            
            <div className="mt-16 flex items-center justify-center space-x-12 md:space-x-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="text-center"
              >
                <p className="text-3xl font-bold text-white">10k+</p>
                <p className="text-white/80 text-sm">Items</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                className="text-center"
              >
                <p className="text-3xl font-bold text-white">5k+</p>
                <p className="text-white/80 text-sm">Users</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="text-center"
              >
                <p className="text-3xl font-bold text-white">25k+</p>
                <p className="text-white/80 text-sm">Rentals</p>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Wave shape divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[60px] md:h-[100px]">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-gray-50"></path>
          </svg>
        </div>
      </div>
      
      {/* Popular Categories Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <Star className="text-amber-400 h-5 w-5" />
            <h2 className="text-2xl font-bold text-textdark">Popular Categories</h2>
          </div>
          <Button variant="ghost" className="text-primary">View All</Button>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {popularCategories.map((category, index) => (
            <motion.div 
              key={category.id}
              variants={itemVariants}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="relative h-32 overflow-hidden">
                <img 
                  src={category.icon} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-3 left-3">
                  <h3 className="text-white font-bold text-lg">{category.name}</h3>
                </div>
              </div>
              <div className="p-3 flex justify-between items-center">
                <span className="text-sm text-gray-600">{category.rentals}+ rentals</span>
                <Button variant="ghost" size="sm" className="text-primary p-0 h-auto">
                  Explore <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* All Categories Section with Carousel */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-textdark">Browse All Categories</h2>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <CategoryCarousel categories={categories} />
        </div>
      </div>
      
      {/* Recent Listings Section */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <Clock className="text-primary h-5 w-5" />
            <h2 className="text-2xl font-bold text-textdark">Recently Added</h2>
          </div>
          <Button variant="ghost" className="text-primary">View All</Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentListings.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group"
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-0 left-0 m-3">
                  <span className="inline-block bg-primary text-white text-xs px-2 py-1 rounded">
                    {item.listed}
                  </span>
                </div>
                <div className="absolute top-0 right-0 m-3">
                  <span className="inline-flex items-center bg-white/90 backdrop-blur-sm text-xs px-2 py-1 rounded">
                    <MapPin className="w-3 h-3 mr-1 text-primary" />
                    {item.distance}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center">
                    <span className="text-xs text-gray-600">{item.category}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                    <span className="text-xs font-medium">{item.rating}</span>
                  </div>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <p className="font-bold text-gray-900">
                    <span className="text-sm mr-1">$</span>
                    {item.price}
                    <span className="text-xs font-normal text-gray-500">/day</span>
                  </p>
                  <Button variant="outline" size="sm" className="text-xs h-8">
                    Rent Now
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trending Items Section */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <TrendingUp className="text-secondary h-5 w-5" />
            <h2 className="text-2xl font-bold text-textdark">Trending Now</h2>
          </div>
          <Button variant="ghost" className="text-primary">View All</Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group border border-gray-100"
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-0 right-0 m-3">
                  <span className="inline-flex items-center bg-secondary/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Popular
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center">
                    <span className="text-xs text-gray-600">{item.category}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                    <span className="text-xs font-medium">{item.rating}</span>
                  </div>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <p className="font-bold text-gray-900">
                    <span className="text-sm mr-1">$</span>
                    {item.price}
                    <span className="text-xs font-normal text-gray-500">/day</span>
                  </p>
                  <Button variant="outline" size="sm" className="text-xs h-8">
                    Rent Now
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Featured Section */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-textdark">Featured Products</h2>
          <Button variant="ghost" className="text-primary">View All</Button>
        </div>
        <FeatureSection 
          title="" 
          viewAllLink="/categories/products"
          items={featuredProducts}
        />
      </div>
      
      {/* App Download Section */}
      <div className="bg-gradient-to-br from-primary/10 to-secondary/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-3xl font-bold text-textdark mb-4">Download the Rentit App</h2>
              <p className="text-gray-600 mb-6">Get the best rental experience on your mobile device. Find items near you, chat with owners, and manage your rentals on the go.</p>
              <div className="flex flex-wrap gap-4">
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-12" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-12" />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&q=80&w=1000&h=600" 
                  alt="App Screenshot" 
                  className="w-full h-auto rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-xl font-bold">Seamless Rental Experience</h3>
                  <p className="text-white/80 text-sm mt-2">Find, book, and manage rentals all in one place</p>
                </div>
              </div>
              <div className="absolute -bottom-5 -right-5 h-24 w-24 bg-secondary/20 rounded-full blur-2xl"></div>
              <div className="absolute -top-5 -left-5 h-16 w-16 bg-primary/20 rounded-full blur-xl"></div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Trust & Safety Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-textdark mb-4">Your Trust & Safety is Our Priority</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">We're committed to making Rentit a safe and reliable platform for all users.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Verified Users</h3>
            <p className="text-gray-600">All users undergo verification processes to ensure a trustworthy community.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="h-12 w-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
            <p className="text-gray-600">All transactions are processed securely and funds are only released when both parties are satisfied.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Quality Guarantee</h3>
            <p className="text-gray-600">All listings are reviewed to ensure they meet our quality standards before they go live.</p>
          </motion.div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to start renting?</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">Join thousands of users who are already earning and saving money through Rentit.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90">
              List an Item
            </Button>
            <Button size="lg" className="bg-white/20 hover:bg-white/30">
              Browse Items
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

