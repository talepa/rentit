
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  Star, 
  Calendar, 
  MapPin, 
  User, 
  Shield, 
  Clock, 
  CheckCircle2,
  MessageCircle,
  CreditCard,
  Wallet,
  Banknote,
  CircleDollarSign,
  AlertCircle
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from '@/components/ui/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

// Mock data for item details
const items = {
  'p1': { 
    id: 'p1', 
    title: 'High-end DSLR Camera - Canon EOS 5D Mark IV', 
    images: [
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1617000326797-ca4deddfb656?auto=format&fit=crop&q=80&w=1200'
    ],
    price: 45,
    rating: 4.8,
    reviewCount: 24,
    category: 'Electronics',
    location: 'Brooklyn, NY',
    distance: '2 miles away',
    owner: {
      name: 'Michael Scott',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
      rating: 4.9,
      responseTime: '< 1 hour',
      memberSince: 'April 2022'
    },
    description: 'Professional Canon EOS 5D Mark IV DSLR camera with 24-70mm lens. Perfect for photography enthusiasts and professionals. Includes extra battery, SD card, and camera bag.',
    features: [
      'Canon EOS 5D Mark IV Body',
      '24-70mm f/2.8L Lens',
      'Extra Battery Pack',
      '64GB SD Card',
      'Camera Bag',
      'Basic Tripod',
    ],
    policies: [
      'Valid ID required',
      '100% damage deposit required',
      'Return in original condition',
      'Late returns charged extra'
    ],
    type: 'product' as const,
  }
};

// Mock data for reviews
const reviews = [
  {
    id: 'r1',
    user: 'John D.',
    rating: 5,
    date: '2023-04-12',
    comment: 'Amazing camera, worked perfectly for my weekend photography project. Owner was very helpful and provided all necessary accessories.'
  },
  {
    id: 'r2',
    user: 'Sarah M.',
    rating: 4,
    date: '2023-03-28',
    comment: 'Great equipment, just what I needed for my family photoshoot. Battery life was a bit less than expected but still got all my shots.'
  },
  {
    id: 'r3',
    user: 'Alex P.',
    rating: 5,
    date: '2023-02-15',
    comment: 'Excellent camera and lens combo. Everything was clean and well-maintained. Would definitely rent again.'
  }
];

// Mock data for similar items
const similarItems = [
  {
    id: 'sim1',
    title: 'Sony Alpha a7 III',
    image: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?auto=format&fit=crop&q=80&w=500',
    price: 50,
    rating: 4.7,
    type: 'product' as const,
    category: 'Electronics',
    distance: '3 miles'
  },
  {
    id: 'sim2',
    title: 'Nikon Z7 Mirrorless',
    image: 'https://images.unsplash.com/photo-1581591524425-c7e0978865fc?auto=format&fit=crop&q=80&w=500',
    price: 55,
    rating: 4.9,
    type: 'product' as const,
    category: 'Electronics',
    distance: '5 miles'
  },
  {
    id: 'sim3',
    title: 'Photography Studio Session',
    image: 'https://images.unsplash.com/photo-1582126892906-5ba111006bd1?auto=format&fit=crop&q=80&w=500',
    price: 75,
    rating: 4.8,
    type: 'service' as const,
    category: 'Photography',
    distance: '3 miles'
  }
];

enum RentalStep {
  VIEWING,
  DATE_SELECTION,
  PAYMENT_SELECTION,
  CONFIRMATION,
  COMPLETED
}

type PaymentMethod = 'card' | 'upi' | 'cash' | 'wallet';

const ItemDetail = () => {
  const { id } = useParams<{ id: string }>();
  const item = items[id as keyof typeof items];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDates, setSelectedDates] = useState<Date | undefined>(undefined);
  const [rentalLength, setRentalLength] = useState(1);
  const [rentalStep, setRentalStep] = useState(RentalStep.VIEWING);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');

  if (!item) {
    return (
      <div className="min-h-screen bg-appbg">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold">Item not found</h2>
          <p className="mt-4">The item you're looking for doesn't exist or has been removed.</p>
          <Button className="mt-6 btn-animated btn-primary animate-pulse-glow" asChild>
            <Link to="/">Go Back Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentIndex((prev) => 
      prev === item.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? item.images.length - 1 : prev - 1
    );
  };

  const handleRentNow = () => {
    setRentalStep(RentalStep.DATE_SELECTION);
  };

  const handleDateConfirmation = () => {
    if (!selectedDates) {
      toast({
        title: "Date Required",
        description: "Please select a rental start date",
        variant: "destructive",
      });
      return;
    }
    setRentalStep(RentalStep.PAYMENT_SELECTION);
  };

  const handlePaymentConfirmation = () => {
    setRentalStep(RentalStep.CONFIRMATION);
  };

  const handleConfirmBooking = () => {
    // Here you would typically process the booking
    setTimeout(() => {
      setRentalStep(RentalStep.COMPLETED);
      toast({
        title: "Booking Successful!",
        description: "Your rental has been confirmed.",
      });
    }, 1000);
  };

  const handleMessageOwner = () => {
    toast({
      title: "Message Sent",
      description: "Owner has been notified about your interest.",
    });
  };

  const calculateSubtotal = () => {
    return item.price * rentalLength;
  };
  
  const calculatePlatformFee = () => {
    return Math.round(calculateSubtotal() * 0.1);
  };
  
  const calculateTaxes = () => {
    return Math.round(calculateSubtotal() * 0.05);
  };
  
  const calculateTotal = () => {
    return calculateSubtotal() + calculatePlatformFee() + calculateTaxes();
  };

  const getPaymentMethodIcon = (method: PaymentMethod) => {
    switch (method) {
      case 'card': return <CreditCard className="h-4 w-4" />;
      case 'upi': return <CircleDollarSign className="h-4 w-4" />;
      case 'cash': return <Banknote className="h-4 w-4" />;
      case 'wallet': return <Wallet className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-appbg">
      <Navbar />

      {/* Item Detail Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Link to="/" className="mr-2">
              <ChevronLeft className="h-5 w-5 text-gray-400 hover:text-primary transition-colors" />
            </Link>
            <h1 className="text-lg md:text-xl font-bold text-textdark truncate">
              {item.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="relative rounded-lg overflow-hidden bg-gray-100 h-64 sm:h-96 mb-6 shadow-md hover:shadow-lg transition-all duration-300">
              <img 
                src={item.images[currentIndex]} 
                alt={item.title} 
                className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
              />
              {item.images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white hover:scale-110 transition-transform"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5 text-primary" />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white hover:scale-110 transition-transform"
                    aria-label="Next image"
                  >
                    <ChevronLeft className="h-5 w-5 transform rotate-180 text-primary" />
                  </button>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                    {item.images.map((_, idx) => (
                      <button 
                        key={idx} 
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          currentIndex === idx ? 'bg-primary w-4' : 'bg-white/50 hover:bg-white/80'
                        }`}
                        onClick={() => setCurrentIndex(idx)}
                        aria-label={`Go to image ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Item Details Tabs */}
            <Tabs defaultValue="details" className="w-full animate-fade-in">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="details" className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Details</TabsTrigger>
                <TabsTrigger value="reviews" className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Reviews ({reviews.length})</TabsTrigger>
                <TabsTrigger value="policies" className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Policies</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-primary">Description</h3>
                  <p className="text-gray-700">{item.description}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-primary">Features</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {item.features.map((feature, index) => (
                      <li key={index} className="flex items-center group hover:bg-primary/5 p-1 rounded-md transition-all">
                        <CheckCircle2 className="h-4 w-4 text-accent mr-2 group-hover:scale-110 transition-transform" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-primary">Location</h3>
                  <div className="flex items-center text-gray-700">
                    <MapPin className="h-4 w-4 mr-1 text-secondary" />
                    <span>{item.location}</span>
                    <span className="ml-2 text-sm text-gray-500">({item.distance})</span>
                  </div>
                  <div className="mt-3 rounded-lg overflow-hidden h-48 shadow-md hover:shadow-lg transition-all duration-300">
                    <img 
                      src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000"
                      alt="Map Location" 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      <span className="ml-1 font-medium">{item.rating}</span>
                      <span className="mx-1 text-gray-500">•</span>
                      <span className="text-gray-500">{item.reviewCount} reviews</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {reviews.map(review => (
                      <div key={review.id} className="border-b pb-4 last:border-0 hover:bg-primary/5 p-3 rounded-lg transition-all duration-300">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 border-2 border-primary/20">
                              <AvatarFallback className="bg-primary/10 text-primary">{review.user.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="ml-2">
                              <p className="font-medium text-primary">{review.user}</p>
                              <p className="text-xs text-gray-500">{review.date}</p>
                            </div>
                          </div>
                          <div className="flex animate-fade-in">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating 
                                    ? "text-yellow-500 fill-yellow-500" 
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="mt-2 text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="policies">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-primary">Rental Policies</h3>
                    <ul className="space-y-2">
                      {item.policies.map((policy, index) => (
                        <li key={index} className="flex items-center group hover:bg-primary/5 p-2 rounded-md transition-all">
                          <Shield className="h-4 w-4 text-primary mr-2 group-hover:scale-110 transition-transform" />
                          <span>{policy}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Similar Items */}
            <div className="mt-8 animate-fade-in">
              <h3 className="text-lg font-semibold mb-4 text-primary">Similar Items</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {similarItems.map(similarItem => (
                  <Link key={similarItem.id} to={`/item/${similarItem.id}`} className="block">
                    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group">
                      <div className="overflow-hidden">
                        <img 
                          src={similarItem.image} 
                          alt={similarItem.title} 
                          className="w-full h-36 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-3">
                        <h4 className="font-medium text-sm line-clamp-1 group-hover:text-primary transition-colors">{similarItem.title}</h4>
                        <div className="flex items-center mt-1">
                          <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                          <span className="text-xs ml-1">{similarItem.rating}</span>
                          <span className="mx-1 text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">{similarItem.distance}</span>
                        </div>
                        <p className="text-sm font-medium mt-1 text-secondary">${similarItem.price}/day</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Widget */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-4 sticky top-20 animate-scale-up">
              {rentalStep === RentalStep.VIEWING && (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-2xl font-bold text-secondary">${item.price}<span className="text-sm font-normal text-gray-500">/day</span></p>
                      <div className="flex items-center mt-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="ml-1">{item.rating}</span>
                        <span className="mx-1 text-gray-500">•</span>
                        <span className="text-gray-500">{item.reviewCount} reviews</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full mb-3 btn-secondary animate-pulse-glow" onClick={handleRentNow}>
                    Rent Now
                  </Button>
                  
                  <Button variant="outline" className="w-full btn-animated hover-lift" onClick={handleMessageOwner}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message Owner
                  </Button>
                  
                  <div className="border-t mt-4 pt-4">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 border-2 border-primary/20">
                        <AvatarImage src={item.owner.image} alt={item.owner.name} />
                        <AvatarFallback>{item.owner.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="ml-3">
                        <p className="font-medium">{item.owner.name}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                          <span>{item.owner.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 text-sm">
                      <div className="flex items-center text-gray-700 mb-1 group">
                        <Clock className="h-4 w-4 mr-2 text-primary group-hover:scale-110 transition-transform" />
                        <span>Response time: {item.owner.responseTime}</span>
                      </div>
                      <div className="flex items-center text-gray-700 group">
                        <User className="h-4 w-4 mr-2 text-primary group-hover:scale-110 transition-transform" />
                        <span>Member since {item.owner.memberSince}</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {rentalStep === RentalStep.DATE_SELECTION && (
                <>
                  <h3 className="text-lg font-semibold mb-4 text-primary">Select Rental Dates</h3>
                  
                  <div className="mb-4">
                    <CalendarComponent
                      mode="single"
                      selected={selectedDates}
                      onSelect={setSelectedDates}
                      className="border rounded-md p-3 animate-fade-in"
                      disabled={(date) => date < new Date()}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1 text-gray-700">Rental Length (days)</label>
                    <select 
                      className="w-full border rounded-md p-2 focus:ring-primary focus:border-primary transition-all"
                      value={rentalLength}
                      onChange={(e) => setRentalLength(Number(e.target.value))}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 14, 30].map(days => (
                        <option key={days} value={days}>{days} day{days > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="border-t pt-4 mb-4">
                    <div className="flex justify-between mb-2">
                      <span>${item.price} × {rentalLength} days</span>
                      <span>${item.price * rentalLength}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Platform fee</span>
                      <span>${calculatePlatformFee()}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Taxes</span>
                      <span>${calculateTaxes()}</span>
                    </div>
                    <div className="flex justify-between font-bold mt-3 pt-3 border-t">
                      <span>Total</span>
                      <span>${calculateTotal()}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button 
                      variant="outline" 
                      className="flex-1 btn-animated"
                      onClick={() => setRentalStep(RentalStep.VIEWING)}
                    >
                      Back
                    </Button>
                    <Button className="flex-1 btn-secondary animate-pulse-glow" onClick={handleDateConfirmation}>
                      Continue
                    </Button>
                  </div>
                </>
              )}

              {rentalStep === RentalStep.PAYMENT_SELECTION && (
                <>
                  <h3 className="text-lg font-semibold mb-4 text-primary">Select Payment Method</h3>
                  
                  <div className="mb-6">
                    <RadioGroup 
                      value={paymentMethod} 
                      onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-2 border p-3 rounded-lg hover:bg-primary/5 transition-colors cursor-pointer">
                        <RadioGroupItem value="card" id="payment-card" className="text-primary" />
                        <Label htmlFor="payment-card" className="flex items-center cursor-pointer">
                          <CreditCard className="h-5 w-5 mr-2 text-primary" />
                          Credit/Debit Card
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border p-3 rounded-lg hover:bg-primary/5 transition-colors cursor-pointer">
                        <RadioGroupItem value="upi" id="payment-upi" className="text-primary" />
                        <Label htmlFor="payment-upi" className="flex items-center cursor-pointer">
                          <CircleDollarSign className="h-5 w-5 mr-2 text-primary" />
                          UPI Payment
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border p-3 rounded-lg hover:bg-primary/5 transition-colors cursor-pointer">
                        <RadioGroupItem value="wallet" id="payment-wallet" className="text-primary" />
                        <Label htmlFor="payment-wallet" className="flex items-center cursor-pointer">
                          <Wallet className="h-5 w-5 mr-2 text-primary" />
                          Digital Wallet
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border p-3 rounded-lg hover:bg-primary/5 transition-colors cursor-pointer">
                        <RadioGroupItem value="cash" id="payment-cash" className="text-primary" />
                        <Label htmlFor="payment-cash" className="flex items-center cursor-pointer">
                          <Banknote className="h-5 w-5 mr-2 text-primary" />
                          Cash on Delivery
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="border-t pt-4 mb-4">
                    <div className="flex justify-between mb-2">
                      <span>${item.price} × {rentalLength} days</span>
                      <span>${item.price * rentalLength}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Platform fee</span>
                      <span>${calculatePlatformFee()}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Taxes</span>
                      <span>${calculateTaxes()}</span>
                    </div>
                    <div className="flex justify-between font-bold mt-3 pt-3 border-t">
                      <span>Total</span>
                      <span>${calculateTotal()}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button 
                      variant="outline" 
                      className="flex-1 btn-animated"
                      onClick={() => setRentalStep(RentalStep.DATE_SELECTION)}
                    >
                      Back
                    </Button>
                    <Button className="flex-1 btn-secondary animate-pulse-glow" onClick={handlePaymentConfirmation}>
                      Continue
                    </Button>
                  </div>
                </>
              )}

              {rentalStep === RentalStep.CONFIRMATION && (
                <>
                  <h3 className="text-lg font-semibold mb-4 text-primary">Confirm Your Booking</h3>
                  
                  <div className="mb-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Item:</span>
                      <span>{item.title.slice(0, 30)}...</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Start Date:</span>
                      <span>{selectedDates?.toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Duration:</span>
                      <span>{rentalLength} day{rentalLength > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Return Date:</span>
                      <span>
                        {selectedDates ? new Date(
                          selectedDates.getTime() + rentalLength * 24 * 60 * 60 * 1000
                        ).toLocaleDateString() : ''}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Payment Method:</span>
                      <span className="flex items-center">
                        {getPaymentMethodIcon(paymentMethod)}
                        <span className="ml-1 capitalize">{paymentMethod}</span>
                      </span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4 mb-4">
                    <div className="flex justify-between mb-2">
                      <span>${item.price} × {rentalLength} days</span>
                      <span>${item.price * rentalLength}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Platform fee</span>
                      <span>${calculatePlatformFee()}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Taxes</span>
                      <span>${calculateTaxes()}</span>
                    </div>
                    <div className="flex justify-between font-bold mt-3 pt-3 border-t">
                      <span>Total</span>
                      <span>${calculateTotal()}</span>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-md mb-4 flex items-start">
                    <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-sm text-amber-800">
                      By confirming, you agree to our rental terms and policies.
                    </p>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button 
                      variant="outline" 
                      className="flex-1 btn-animated"
                      onClick={() => setRentalStep(RentalStep.PAYMENT_SELECTION)}
                    >
                      Back
                    </Button>
                    <Button className="flex-1 btn-secondary animate-button-glow" onClick={handleConfirmBooking}>
                      Confirm Booking
                    </Button>
                  </div>
                </>
              )}

              {rentalStep === RentalStep.COMPLETED && (
                <div className="text-center py-6 animate-scale-up">
                  <div className="h-16 w-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-subtle">
                    <CheckCircle2 className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">Booking Confirmed!</h3>
                  <p className="text-gray-600 mb-6">You've successfully booked {item.title.slice(0, 30)}...</p>
                  
                  <div className="mb-4 text-left border rounded-md p-3 bg-gray-50">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-gray-500">Start Date</p>
                        <p className="font-medium">{selectedDates?.toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Return Date</p>
                        <p className="font-medium">
                          {selectedDates ? new Date(
                            selectedDates.getTime() + rentalLength * 24 * 60 * 60 * 1000
                          ).toLocaleDateString() : ''}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Payment Method</p>
                        <p className="font-medium capitalize flex items-center">
                          {getPaymentMethodIcon(paymentMethod)}
                          <span className="ml-1">{paymentMethod}</span>
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Total Paid</p>
                        <p className="font-medium">${calculateTotal()}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button asChild className="flex-1 btn-primary animate-pulse-glow">
                      <Link to="/my-bookings">View My Bookings</Link>
                    </Button>
                    <Button variant="outline" asChild className="flex-1 btn-animated hover-lift">
                      <Link to="/">Continue Shopping</Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
