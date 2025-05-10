
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { MessageSquare, Calendar, X, Check, Clock, Star, Filter, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const DEMO_BOOKINGS = [
  {
    id: 1,
    productName: "Professional Camera",
    owner: "John Doe",
    startDate: "2024-04-25",
    endDate: "2024-04-27",
    status: "active",
    price: 50,
    deposit: 200,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop",
    rating: 4.8,
  },
  {
    id: 2,
    productName: "Mountain Bike",
    owner: "Jane Smith",
    startDate: "2024-05-01",
    endDate: "2024-05-03",
    status: "pending",
    price: 30,
    deposit: 150,
    image: "https://images.unsplash.com/photo-1596496050827-8299e0220de1?q=80&w=1000&auto=format&fit=crop",
    rating: 4.5,
  },
  {
    id: 3,
    productName: "Drone",
    owner: "Mike Johnson",
    startDate: "2024-05-10",
    endDate: "2024-05-12",
    status: "completed",
    price: 80,
    deposit: 300,
    image: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?q=80&w=1000&auto=format&fit=crop",
    rating: 5.0,
  },
  {
    id: 4,
    productName: "Tent",
    owner: "Sarah Williams",
    startDate: "2024-06-15",
    endDate: "2024-06-17",
    status: "cancelled",
    price: 25,
    deposit: 75,
    image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=1000&auto=format&fit=crop",
    rating: 0,
  }
];

type BookingStatus = "active" | "pending" | "completed" | "cancelled";

const MyBookings = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<BookingStatus | 'all'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'price'>('date');

  const filteredBookings = DEMO_BOOKINGS.filter(booking => 
    filter === 'all' ? true : booking.status === filter
  );

  const sortedBookings = [...filteredBookings].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    } else {
      return b.price - a.price;
    }
  });

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case 'active': return 'bg-green-500 text-white';
      case 'pending': return 'bg-yellow-500 text-white';
      case 'completed': return 'bg-blue-500 text-white';
      case 'cancelled': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleCancelBooking = (id: number) => {
    toast.success(`Booking #${id} has been cancelled`);
    // In real app you would update the booking status via API call
  };
  
  const handleConfirmBooking = (id: number) => {
    toast.success(`Booking #${id} has been confirmed`);
    // In real app you would update the booking status via API call
  };
  
  const handleMessageOwner = (ownerName: string) => {
    navigate(`/messages?contact=${ownerName}`);
  };
  
  const handleBookAgain = (productName: string) => {
    navigate(`/categories?search=${productName}`);
  };
  
  const handleRateBooking = (id: number) => {
    // Would typically open a rating modal
    toast.success(`Thank you for rating your experience with booking #${id}`);
  };

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

  const backgroundVariants = {
    animate: {
      backgroundPosition: ['0% 0%', '100% 0%', '100% 100%', '0% 100%', '0% 0%'],
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Navbar />
      
      <motion.div 
        className="absolute inset-0 -z-10 opacity-10 pointer-events-none"
        variants={backgroundVariants}
        animate="animate"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%239C92AC" fill-opacity="0.4" fill-rule="evenodd"/%3E%3C/svg%3E")',
          backgroundSize: '150px 150px',
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold relative inline-block mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              My Bookings
              <div className="absolute -bottom-1 left-0 h-3 w-1/2 bg-primary/10 rounded-full -z-[1]"></div>
            </h1>
            <p className="text-gray-600">Manage all your rental bookings in one place</p>
          </div>
          
          <div className="flex space-x-2 self-end md:self-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center animate-pulse-subtle">
                  <Filter className="h-4 w-4 mr-2" />
                  <span>Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setFilter('all')} className={filter === 'all' ? 'bg-accent/20' : ''}>
                  All Bookings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('active')} className={filter === 'active' ? 'bg-accent/20' : ''}>
                  Active
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('pending')} className={filter === 'pending' ? 'bg-accent/20' : ''}>
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('completed')} className={filter === 'completed' ? 'bg-accent/20' : ''}>
                  Completed
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('cancelled')} className={filter === 'cancelled' ? 'bg-accent/20' : ''}>
                  Cancelled
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center animate-pulse-subtle">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <span>Sort</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSortBy('date')} className={sortBy === 'date' ? 'bg-accent/20' : ''}>
                  By Date
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('price')} className={sortBy === 'price' ? 'bg-accent/20' : ''}>
                  By Price (High to Low)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.div>
        
        {sortedBookings.length > 0 ? (
          <motion.div 
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {sortedBookings.map((booking) => (
              <motion.div 
                key={booking.id} 
                variants={itemVariants}
                className="h-full"
              >
                <Card className="h-full flex flex-col transform transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] animate-fade-in backdrop-blur-sm bg-white/80">
                  <CardHeader className="pb-3 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-t-md">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-medium line-clamp-1">{booking.productName}</CardTitle>
                      <Badge className={`${getStatusColor(booking.status as BookingStatus)} capitalize animate-pulse-subtle`}>
                        {booking.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4 flex-grow">
                    <div className="relative mb-3 rounded-md overflow-hidden h-48">
                      <img
                        src={booking.image}
                        alt={booking.productName}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      {booking.rating > 0 && (
                        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs rounded-full px-2 py-1 flex items-center">
                          <Star className="h-3 w-3 mr-1 text-yellow-400 fill-yellow-400" />
                          <span>{booking.rating}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      <motion.div 
                        className="flex items-center text-sm"
                        whileHover={{ scale: 1.02 }}
                      >
                        <Calendar className="h-4 w-4 mr-2 text-primary" />
                        <div>
                          <p className="font-medium">{formatDate(booking.startDate)} - {formatDate(booking.endDate)}</p>
                        </div>
                      </motion.div>
                      
                      <div className="flex justify-between">
                        <div className="text-sm text-gray-600">
                          <span className="block">From: <span className="font-medium">{booking.owner}</span></span>
                        </div>
                        <div className="text-right">
                          <span className="font-semibold text-primary">${booking.price}/day</span>
                          <p className="text-xs text-gray-500">Deposit: ${booking.deposit}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 flex justify-between border-t p-4 bg-gray-50/80">
                    {booking.status === 'pending' && (
                      <>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-red-500 border-red-500 hover:bg-red-50"
                          onClick={() => handleCancelBooking(booking.id)}
                        >
                          <X className="h-4 w-4 mr-1" /> Cancel
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-primary hover:bg-primary/90"
                          onClick={() => handleConfirmBooking(booking.id)}
                        >
                          <Check className="h-4 w-4 mr-1" /> Confirm
                        </Button>
                      </>
                    )}
                    
                    {booking.status === 'active' && (
                      <>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-red-500 border-red-500 hover:bg-red-50"
                          onClick={() => handleCancelBooking(booking.id)}
                        >
                          <X className="h-4 w-4 mr-1" /> Cancel
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-primary hover:bg-primary/90"
                          onClick={() => handleMessageOwner(booking.owner)}
                        >
                          <MessageSquare className="h-4 w-4 mr-1" /> Message
                        </Button>
                      </>
                    )}
                    
                    {booking.status === 'completed' && (
                      <>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleBookAgain(booking.productName)}
                        >
                          <Clock className="h-4 w-4 mr-1" /> Book Again
                        </Button>
                        {booking.rating === 0 ? (
                          <Button 
                            size="sm" 
                            className="bg-yellow-500 hover:bg-yellow-600"
                            onClick={() => handleRateBooking(booking.id)}
                          >
                            <Star className="h-4 w-4 mr-1" /> Rate
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline" disabled className="opacity-50">
                            Rated
                          </Button>
                        )}
                      </>
                    )}
                    
                    {booking.status === 'cancelled' && (
                      <Button 
                        size="sm" 
                        className="bg-primary hover:bg-primary/90 ml-auto"
                        onClick={() => handleBookAgain(booking.productName)}
                      >
                        <Clock className="h-4 w-4 mr-1" /> Book Again
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-sm mx-auto"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center animate-pulse">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">No bookings found</h3>
              <p className="text-gray-500 mb-6">You don't have any bookings matching the selected filter.</p>
              <Button onClick={() => setFilter('all')}>Show All Bookings</Button>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MyBookings;
