
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { CategoryCarousel } from '@/components/CategoryCard';
import FeatureSection from '@/components/FeatureSection';
import NotificationPopover from '@/components/NotificationPopover';
import LocationMap from '@/components/LocationMap';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Clock, MapPin, TrendingUp } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import AnimatedWave from '@/components/AnimatedWave';
import EnhancedSearchBar from '@/components/EnhancedSearchBar';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
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

  const handleExploreCategory = (categoryId: string) => {
    navigate(`/categories/${categoryId}`);
  };

  const handleRentNow = (itemId: string) => {
    navigate(`/item/${itemId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#9bd5e9]/10 to-[#f8fafc]">
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
        <div className="absolute inset-0 bg-gradient-to-br from-[#053e5d]/90 via-[#4f8391]/70 to-[#053e5d]/80 mix-blend-multiply z-1"></div>
        
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
                <p className="text-sm text-white font-medium">Don't buy, just Rentit</p>
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white font-poppins drop-shadow-md"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Welcome to <span className="text-[#0FA0CE] font-bold">Rentit</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto drop-shadow"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              Don't buy, just Rentit
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl max-w-3xl mx-auto">
                <EnhancedSearchBar />
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
        
        {/* Animated wave shape */}
        <AnimatedWave 
          fill="#9bd5e9" 
          opacity={0.6}
          animationDuration={20}
        />
      </div>
      
      {/* Popular Categories Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <Star className="text-amber-400 h-5 w-5" />
            <h2 className="text-2xl font-bold text-[#053e5d] relative">
              Popular Categories
              <motion.span 
                className="absolute -bottom-1 left-0 w-12 h-0.5 bg-[#9bd5e9]"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </h2>
          </div>
          <Button 
            variant="ghost" 
            className="text-[#053e5d] hover:text-[#0a2247] hover:bg-[#9bd5e9]/10"
            onClick={() => navigate('/categories')}
          >
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
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
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-[#9bd5e9]/30"
            >
              <div className="relative h-32 overflow-hidden">
                <img 
                  src={category.icon} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#053e5d]/80 to-transparent"></div>
                <div className="absolute bottom-3 left-3">
                  <h3 className="text-white font-bold text-lg">{category.name}</h3>
                </div>
              </div>
              <div className="p-3 flex justify-between items-center">
                <span className="text-sm text-[#4f8391]">{category.rentals}+ rentals</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-[#053e5d] hover:text-[#0a2247] hover:bg-[#9bd5e9]/10 p-0 h-auto"
                  onClick={() => handleExploreCategory(category.id)}
                >
                  Explore <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* All Categories Section with Carousel */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <motion.div 
          className="flex items-center justify-between mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl font-bold text-[#053e5d] relative">
            Browse All Categories
            <motion.span 
              className="absolute -bottom-1 left-0 w-10 h-0.5 bg-[#9bd5e9]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </h2>
        </motion.div>
        <motion.div 
          className="bg-white p-4 rounded-xl shadow-sm border border-[#9bd5e9]/30"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <CategoryCarousel categories={categories} />
        </motion.div>
      </div>
      
      {/* Recent Listings Section */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <Clock className="text-[#4f8391] h-5 w-5" />
            <h2 className="text-2xl font-bold text-[#053e5d] relative">
              Recently Added
              <motion.span 
                className="absolute -bottom-1 left-0 w-12 h-0.5 bg-[#9bd5e9]"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </h2>
          </div>
          <Button 
            variant="ghost" 
            className="text-[#053e5d] hover:text-[#0a2247] hover:bg-[#9bd5e9]/10"
            onClick={() => navigate('/categories?sort=newest')}
          >
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentListings.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group border border-[#9bd5e9]/20"
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-0 left-0 m-3">
                  <motion.span 
                    className="inline-block bg-[#053e5d] text-white text-xs px-2 py-1 rounded"
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.listed}
                  </motion.span>
                </div>
                <div className="absolute top-0 right-0 m-3">
                  <span className="inline-flex items-center bg-white/90 backdrop-blur-sm text-xs px-2 py-1 rounded">
                    <MapPin className="w-3 h-3 mr-1 text-[#053e5d]" />
                    {item.distance}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 group-hover:text-[#053e5d] transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center">
                    <span className="text-xs text-[#4f8391]">{item.category}</span>
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
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs h-8 border-[#053e5d] text-[#053e5d] hover:bg-[#053e5d] hover:text-white"
                    onClick={() => handleRentNow(item.id)}
                  >
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
            <TrendingUp className="text-[#4f8391] h-5 w-5" />
            <h2 className="text-2xl font-bold text-[#053e5d] relative">
              Trending Now
              <motion.span 
                className="absolute -bottom-1 left-0 w-12 h-0.5 bg-[#9bd5e9]"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </h2>
          </div>
          <Button 
            variant="ghost" 
            className="text-[#053e5d] hover:text-[#0a2247] hover:bg-[#9bd5e9]/10"
            onClick={() => navigate('/categories?trending=true')}
          >
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-gradient-to-br from-white to-[#9bd5e9]/10 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group border border-[#9bd5e9]/30"
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-0 right-0 m-3">
                  <span className="inline-flex items-center bg-[#4f8391]/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Popular
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 group-hover:text-[#053e5d] transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center">
                    <span className="text-xs text-[#4f8391]">{item.category}</span>
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
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs h-8 border-[#053e5d] text-[#053e5d] hover:bg-[#053e5d] hover:text-white"
                    onClick={() => handleRentNow(item.id)}
                  >
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
          <h2 className="text-xl font-bold text-[#053e5d] relative">
            Featured Products
            <motion.span 
              className="absolute -bottom-1 left-0 w-10 h-0.5 bg-[#9bd5e9]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
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
        
        <FeatureSection items={featuredProducts} />
      </div>
    </div>
  );
};

export default Index;
