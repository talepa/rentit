
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  MapPin, 
  Star, 
  Clock, 
  User,
  Share,
  Heart
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data for the sample item
const mockItems = [
  { 
    id: 'p1', 
    title: 'High-end DSLR Camera', 
    images: [
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&q=80&w=500',
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=500',
      'https://images.unsplash.com/photo-1617634180931-bc3408ee1310?auto=format&fit=crop&q=80&w=500',
    ],
    price: 45,
    hourlyPrice: 10,
    weeklyPrice: 250,
    rating: 4.8,
    reviews: 24,
    category: 'Electronics',
    distance: '2 miles',
    type: 'product',
    location: 'Downtown Seattle, WA',
    description: 'Professional DSLR camera with multiple lenses and accessories. Perfect for photography enthusiasts or professionals who need high-quality equipment for short-term projects. Includes camera body, standard zoom lens, telephoto lens, wide-angle lens, flash, tripod, and carrying case.',
    features: [
      'Model: Canon EOS 5D Mark IV',
      '30.4MP Full-Frame CMOS Sensor',
      'DIGIC 6+ Image Processor',
      '3.2" 1.62m-Dot Touchscreen LCD Monitor',
      'DCI 4K Video at 30 fps',
      '61-Point High Density Reticular AF',
      'Native ISO 32000, Expanded to ISO 102400',
      'Dual Pixel RAW',
      '7 fps Shooting',
      'Built-In GPS and Wi-Fi with NFC'
    ],
    owner: {
      name: 'Michael Torres',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
      rating: 4.9,
      responseTime: '< 1 hour',
      memberSince: 'June 2021'
    },
    reviews: [
      {
        id: 'r1',
        user: 'Sarah Johnson',
        rating: 5,
        date: '2023-09-15',
        comment: 'The camera was in perfect condition, and Michael was extremely helpful with setup tips. Would definitely rent again!'
      },
      {
        id: 'r2',
        user: 'David Lee',
        rating: 4,
        date: '2023-08-22',
        comment: 'Great camera, everything worked as expected. The pickup location was a bit hard to find, but otherwise a smooth experience.'
      },
      {
        id: 'r3',
        user: 'Emma Wilson',
        rating: 5,
        date: '2023-07-30',
        comment: 'Outstanding equipment and service. Michael even followed up to make sure I was getting good shots with the camera.'
      }
    ]
  },
  { 
    id: 's2', 
    title: 'Handyman Services', 
    images: [
      'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=500',
      'https://images.unsplash.com/photo-1590479773265-7464e5d48118?auto=format&fit=crop&q=80&w=500',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=500',
    ],
    price: 35,
    hourlyPrice: 35,
    weeklyPrice: null, // Service that doesn't offer weekly rates
    rating: 4.4,
    reviews: 57,
    category: 'Home Services',
    distance: '2 miles',
    type: 'service',
    location: 'Serves Seattle metro area',
    description: 'Professional handyman services for home repairs, installations, and maintenance. From hanging shelves and TV mounts to assembling furniture and fixing leaky faucets, I can help with a wide range of household tasks.',
    features: [
      'Furniture assembly',
      'TV mounting',
      'Shelf installation',
      'Minor plumbing repairs',
      'Light fixture installation',
      'Door repairs',
      'Drywall repairs',
      'Painting touch-ups',
      'Smart home device installation',
      'General home maintenance'
    ],
    owner: {
      name: 'Robert Chen',
      image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100',
      rating: 4.7,
      responseTime: '< 2 hours',
      memberSince: 'March 2020'
    },
    reviews: [
      {
        id: 'r1',
        user: 'Jennifer Adams',
        rating: 4,
        date: '2023-10-02',
        comment: 'Robert arrived on time and did a great job mounting my TV. Very professional and cleaned up afterward.'
      },
      {
        id: 'r2',
        user: 'Thomas Baker',
        rating: 5,
        date: '2023-09-18',
        comment: 'Assembled all my IKEA furniture quickly and correctly. Saved me hours of frustration! Highly recommend.'
      },
      {
        id: 'r3',
        user: 'Patricia Hughes',
        rating: 4,
        date: '2023-08-25',
        comment: 'Fixed a leaky sink and replaced some damaged drywall. Fair price and good quality work.'
      }
    ]
  }
];

const ItemDetail = () => {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const [date, setDate] = useState<Date>();
  const [duration, setDuration] = useState<'hour' | 'day' | 'week'>('day');
  
  // Find the item based on ID from the mock data
  const item = mockItems.find(item => item.id === id) || mockItems[0];
  
  // Calculate price based on selected duration
  const calculatePrice = () => {
    switch (duration) {
      case 'hour':
        return item.hourlyPrice || item.price / 8;
      case 'week':
        return item.weeklyPrice || item.price * 5;
      default:
        return item.price;
    }
  };
  
  const handleNextImage = () => {
    setActiveImage((prevIndex) => (prevIndex + 1) % item.images.length);
  };
  
  const handlePrevImage = () => {
    setActiveImage((prevIndex) => (prevIndex - 1 + item.images.length) % item.images.length);
  };
  
  // Format the selected date for display
  const formattedDate = date ? format(date, 'PPP') : 'Select a date';

  return (
    <div className="min-h-screen bg-appbg">
      <Navbar />
      
      {/* Item Header for mobile */}
      <div className="md:hidden bg-white border-b sticky top-16 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center">
            <Link to="/categories" className="mr-2">
              <ChevronLeft className="h-5 w-5 text-gray-400" />
            </Link>
            <h1 className="text-lg font-bold text-textdark truncate">
              {item.title}
            </h1>
          </div>
        </div>
      </div>
      
      {/* Item Content */}
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        {/* Back button for desktop */}
        <div className="hidden md:block mb-4">
          <Link to="/categories" className="flex items-center text-primary hover:underline">
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back to listings
          </Link>
        </div>
        
        <div className="md:grid md:grid-cols-12 md:gap-8">
          {/* Left Column - Images and Details */}
          <div className="md:col-span-8 mb-8 md:mb-0">
            {/* Image Gallery */}
            <div className="relative rounded-lg overflow-hidden bg-gray-100 mb-6">
              <div className="aspect-w-16 aspect-h-9 relative">
                <img 
                  src={item.images[activeImage]} 
                  alt={item.title} 
                  className="object-cover w-full h-[300px] md:h-[400px]"
                />
                
                {/* Image Navigation Controls */}
                <div className="absolute inset-0 flex items-center justify-between p-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full bg-white/80 hover:bg-white"
                    onClick={handlePrevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full bg-white/80 hover:bg-white"
                    onClick={handleNextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Favorite and Share Buttons */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full bg-white/80 hover:bg-white"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full bg-white/80 hover:bg-white"
                  >
                    <Share className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                    {activeImage + 1} / {item.images.length}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="flex space-x-2 mb-6">
              {item.images.map((image, index) => (
                <div 
                  key={index}
                  className={`cursor-pointer overflow-hidden rounded-md ${activeImage === index ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img 
                    src={image} 
                    alt={`${item.title} - view ${index + 1}`} 
                    className="h-16 w-24 object-cover"
                  />
                </div>
              ))}
            </div>
            
            {/* Item Header - Desktop */}
            <div className="hidden md:block">
              <h1 className="text-2xl font-bold text-textdark mb-2">{item.title}</h1>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <div className="flex items-center mr-4">
                  <Star className="h-4 w-4 fill-secondary text-secondary mr-1" />
                  <span className="font-medium">{item.rating}</span>
                  <span className="mx-1">·</span>
                  <span>{item.reviews} reviews</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>
            
            {/* Item Header - Mobile */}
            <div className="md:hidden">
              <h1 className="text-xl font-bold text-textdark mb-2">{item.title}</h1>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <div className="flex items-center mr-4">
                  <Star className="h-4 w-4 fill-secondary text-secondary mr-1" />
                  <span className="font-medium">{item.rating}</span>
                  <span className="mx-1">·</span>
                  <span>{item.reviews} reviews</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>
            
            {/* Description */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-lg font-bold mb-4">Description</h2>
              <p className="text-gray-700 mb-6">{item.description}</p>
              
              <h3 className="font-bold mb-2">Features:</h3>
              <ul className="list-disc pl-5 text-gray-700">
                {item.features.map((feature, index) => (
                  <li key={index} className="mb-1">{feature}</li>
                ))}
              </ul>
            </div>
            
            {/* Reviews */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Reviews</h2>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-secondary text-secondary mr-1" />
                  <span className="font-medium">{item.rating}</span>
                  <span className="mx-1">·</span>
                  <span>{item.reviews} reviews</span>
                </div>
              </div>
              
              <div className="space-y-6">
                {item.reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{review.user}</h4>
                        <p className="text-sm text-gray-500">{format(new Date(review.date), 'MMM d, yyyy')}</p>
                      </div>
                      <div className="flex items-center bg-accent/10 px-1.5 py-0.5 rounded">
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        <span className="text-xs ml-1 font-medium">{review.rating}</span>
                      </div>
                    </div>
                    <p className="mt-2 text-gray-700">{review.comment}</p>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full">View All Reviews</Button>
              </div>
            </div>
            
            {/* Provider Info */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-lg font-bold mb-4">About the Provider</h2>
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <img 
                    src={item.owner.image} 
                    alt={item.owner.name}
                    className="h-16 w-16 rounded-full object-cover" 
                  />
                </div>
                <div>
                  <h3 className="font-medium text-lg">{item.owner.name}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Star className="h-3 w-3 fill-secondary text-secondary mr-1" />
                    <span>{item.owner.rating} · Member since {item.owner.memberSince}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-500 mr-2" />
                  <span>Response time: {item.owner.responseTime}</span>
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 text-gray-500 mr-2" />
                  <span>ID verified</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <Button>Contact Provider</Button>
              </div>
            </div>
          </div>
          
          {/* Right Column - Booking Card */}
          <div className="md:col-span-4">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
              <div className="mb-4">
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold">${calculatePrice()}</span>
                  <span className="text-gray-500 ml-1">/ {duration}</span>
                </div>
                
                {/* Duration Toggle */}
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {item.hourlyPrice && (
                    <Button
                      variant={duration === 'hour' ? 'default' : 'outline'}
                      onClick={() => setDuration('hour')}
                      className={duration === 'hour' ? 'bg-primary' : ''}
                    >
                      Hour
                    </Button>
                  )}
                  <Button
                    variant={duration === 'day' ? 'default' : 'outline'}
                    onClick={() => setDuration('day')}
                    className={duration === 'day' ? 'bg-primary' : ''}
                  >
                    Day
                  </Button>
                  {item.weeklyPrice !== null && (
                    <Button
                      variant={duration === 'week' ? 'default' : 'outline'}
                      onClick={() => setDuration('week')}
                      className={duration === 'week' ? 'bg-primary' : ''}
                    >
                      Week
                    </Button>
                  )}
                </div>
              </div>
              
              {/* Availability Calendar */}
              <div className="mb-4">
                <div className="grid gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formattedDate}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              {/* Additional Options */}
              <Tabs defaultValue="request" className="mb-4">
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="request">Request to Rent</TabsTrigger>
                  <TabsTrigger value="instant">Instant Book</TabsTrigger>
                </TabsList>
                <TabsContent value="request" className="mt-4">
                  <p className="text-sm text-gray-500 mb-4">
                    Send a request to the provider. They'll respond within {item.owner.responseTime}.
                  </p>
                  <Button className="w-full">Send Request</Button>
                </TabsContent>
                <TabsContent value="instant" className="mt-4">
                  <p className="text-sm text-gray-500 mb-4">
                    Book instantly without waiting for approval from the provider.
                  </p>
                  <Button className="w-full">Book Now</Button>
                </TabsContent>
              </Tabs>
              
              {/* Booking Summary */}
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between mb-2">
                  <span>${calculatePrice()} x 1 {duration}</span>
                  <span>${calculatePrice()}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Service fee</span>
                  <span>${Math.round(calculatePrice() * 0.1)}</span>
                </div>
                <div className="flex justify-between font-bold pt-2 border-t mt-2">
                  <span>Total</span>
                  <span>${calculatePrice() + Math.round(calculatePrice() * 0.1)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
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

export default ItemDetail;
