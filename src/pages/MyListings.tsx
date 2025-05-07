
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, 
  Edit, 
  Trash2, 
  PieChart,
  Users,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus
} from 'lucide-react';

// Mock data for owner's listings
const DEMO_LISTINGS = [
  {
    id: 'l1',
    title: 'Professional DSLR Camera',
    description: 'High-end camera for professional photography with multiple lenses included.',
    price: 45,
    rentalPeriod: 'day',
    category: 'Electronics',
    location: 'Downtown',
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&q=80&w=500',
    status: 'active',
    created: '2023-11-15',
    rentals: 8,
    revenue: 360
  },
  {
    id: 'l2',
    title: 'Mountain Bike',
    description: 'Premium mountain bike, perfect for weekend adventures.',
    price: 30,
    rentalPeriod: 'day',
    category: 'Vehicles',
    location: 'Westside',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=500',
    status: 'active',
    created: '2023-12-03',
    rentals: 5,
    revenue: 150
  },
  {
    id: 'l3',
    title: 'Professional Sound System',
    description: 'Complete DJ setup with speakers, mixer and lights.',
    price: 120,
    rentalPeriod: 'day',
    category: 'Electronics',
    location: 'Eastside',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=500',
    status: 'inactive',
    created: '2024-01-10',
    rentals: 2,
    revenue: 240
  }
];

// Mock data for bookings
const DEMO_BOOKINGS = [
  {
    id: 'b1',
    listingId: 'l1',
    productName: 'Professional DSLR Camera',
    renter: 'Jane Cooper',
    renterId: 'u2',
    startDate: '2024-05-10',
    endDate: '2024-05-12',
    status: 'active',
    totalPrice: 90,
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'b2',
    listingId: 'l2',
    productName: 'Mountain Bike',
    renter: 'Devon Lane',
    renterId: 'u3',
    startDate: '2024-05-15',
    endDate: '2024-05-16',
    status: 'pending',
    totalPrice: 30,
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'b3',
    listingId: 'l1',
    productName: 'Professional DSLR Camera',
    renter: 'Robert Fox',
    renterId: 'u4',
    startDate: '2024-05-20',
    endDate: '2024-05-23',
    status: 'upcoming',
    totalPrice: 135,
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'b4',
    listingId: 'l2',
    productName: 'Mountain Bike',
    renter: 'Jenny Wilson',
    renterId: 'u5',
    startDate: '2024-04-25',
    endDate: '2024-04-27',
    status: 'completed',
    totalPrice: 60,
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=500'
  }
];

const MyListings = () => {
  const [activeTab, setActiveTab] = useState("listings");
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Active</span>;
      case 'inactive':
        return <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">Inactive</span>;
      case 'pending':
        return <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Pending</span>;
      case 'completed':
        return <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Completed</span>;
      case 'upcoming':
        return <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">Upcoming</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">{status}</span>;
    }
  };
  
  // Group bookings by status
  const activeBookings = DEMO_BOOKINGS.filter(booking => booking.status === 'active');
  const pendingBookings = DEMO_BOOKINGS.filter(booking => booking.status === 'pending');
  const upcomingBookings = DEMO_BOOKINGS.filter(booking => booking.status === 'upcoming');
  const completedBookings = DEMO_BOOKINGS.filter(booking => booking.status === 'completed');

  return (
    <div className="min-h-screen bg-appbg">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-textdark">My Listings</h1>
          <Link to="/post-add">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Post New Add
            </Button>
          </Link>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Listings
              </CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{DEMO_LISTINGS.length}</div>
              <p className="text-xs text-muted-foreground">
                {DEMO_LISTINGS.filter(l => l.status === 'active').length} active listings
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Rentals
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeBookings.length}</div>
              <p className="text-xs text-muted-foreground">
                {pendingBookings.length} pending requests
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Bookings
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{DEMO_BOOKINGS.length}</div>
              <p className="text-xs text-muted-foreground">
                {completedBookings.length} completed rentals
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${DEMO_LISTINGS.reduce((acc, curr) => acc + curr.revenue, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                From {DEMO_LISTINGS.reduce((acc, curr) => acc + curr.rentals, 0)} rentals
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs 
          defaultValue="listings" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="bg-white border">
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="bookings">Rental Bookings</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
          </TabsList>
          
          {/* Listings Tab */}
          <TabsContent value="listings" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {DEMO_LISTINGS.map(listing => (
                <Card key={listing.id} className="overflow-hidden">
                  <div className="relative">
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      {getStatusBadge(listing.status)}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{listing.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-gray-600 line-clamp-2">{listing.description}</p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Category:</span> {listing.category}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Location:</span> {listing.location}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="font-bold">${listing.price}/{listing.rentalPeriod}</p>
                      <p className="text-sm text-gray-500">{listing.rentals} rentals</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" className="flex-1 mr-1">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 mx-1">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Messages
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 ml-1 text-destructive hover:bg-destructive/10">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-4">
            <Tabs defaultValue="active">
              <TabsList>
                <TabsTrigger value="active">Active ({activeBookings.length})</TabsTrigger>
                <TabsTrigger value="pending">Pending ({pendingBookings.length})</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming ({upcomingBookings.length})</TabsTrigger>
                <TabsTrigger value="completed">Completed ({completedBookings.length})</TabsTrigger>
              </TabsList>
              
              {/* Active Bookings */}
              <TabsContent value="active" className="mt-4">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {activeBookings.map((booking) => (
                    <Card key={booking.id}>
                      <div className="relative">
                        <img
                          src={booking.image}
                          alt={booking.productName}
                          className="w-full h-40 object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Active
                          </span>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{booking.productName}</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2 space-y-2">
                        <div className="text-sm">
                          <span className="font-medium">Renter:</span> {booking.renter}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Rental period:</span><br />
                          {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                        </div>
                        <div className="font-bold">${booking.totalPrice} total</div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Contact Renter
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                  {activeBookings.length === 0 && (
                    <div className="col-span-full text-center py-8 text-gray-500">
                      No active bookings at the moment
                    </div>
                  )}
                </div>
              </TabsContent>
              
              {/* Pending Bookings */}
              <TabsContent value="pending" className="mt-4">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {pendingBookings.map((booking) => (
                    <Card key={booking.id}>
                      <div className="relative">
                        <img
                          src={booking.image}
                          alt={booking.productName}
                          className="w-full h-40 object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            Pending
                          </span>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{booking.productName}</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2 space-y-2">
                        <div className="text-sm">
                          <span className="font-medium">Renter:</span> {booking.renter}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Requested period:</span><br />
                          {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                        </div>
                        <div className="font-bold">${booking.totalPrice} total</div>
                      </CardContent>
                      <CardFooter className="grid grid-cols-2 gap-2">
                        <Button variant="default" size="sm" className="w-full">
                          Accept
                        </Button>
                        <Button variant="outline" size="sm" className="w-full text-destructive hover:bg-destructive/10">
                          Decline
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                  {pendingBookings.length === 0 && (
                    <div className="col-span-full text-center py-8 text-gray-500">
                      No pending requests at the moment
                    </div>
                  )}
                </div>
              </TabsContent>
              
              {/* Display other booking tabs similarly */}
              <TabsContent value="upcoming" className="mt-4">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {upcomingBookings.length ? upcomingBookings.map(booking => (
                    <Card key={booking.id}>
                      {/* Similar structure to other booking cards */}
                      <div className="relative">
                        <img
                          src={booking.image}
                          alt={booking.productName}
                          className="w-full h-40 object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            Upcoming
                          </span>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{booking.productName}</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2 space-y-2">
                        <div className="text-sm">
                          <span className="font-medium">Renter:</span> {booking.renter}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Rental period:</span><br />
                          {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                        </div>
                        <div className="font-bold">${booking.totalPrice} total</div>
                      </CardContent>
                      <CardFooter className="grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm" className="w-full">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Contact
                        </Button>
                        <Button variant="outline" size="sm" className="w-full text-destructive hover:bg-destructive/10">
                          <AlertCircle className="h-4 w-4 mr-2" />
                          Issue
                        </Button>
                      </CardFooter>
                    </Card>
                  )) : (
                    <div className="col-span-full text-center py-8 text-gray-500">
                      No upcoming bookings at the moment
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="completed" className="mt-4">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {completedBookings.length ? completedBookings.map(booking => (
                    <Card key={booking.id}>
                      {/* Similar structure to other booking cards */}
                      <div className="relative">
                        <img
                          src={booking.image}
                          alt={booking.productName}
                          className="w-full h-40 object-cover opacity-90"
                        />
                        <div className="absolute top-2 right-2">
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completed
                          </span>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{booking.productName}</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2 space-y-2">
                        <div className="text-sm">
                          <span className="font-medium">Rented by:</span> {booking.renter}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Rental period:</span><br />
                          {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                        </div>
                        <div className="font-bold">${booking.totalPrice} total</div>
                      </CardContent>
                    </Card>
                  )) : (
                    <div className="col-span-full text-center py-8 text-gray-500">
                      No completed bookings yet
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>
          
          {/* Earnings Tab */}
          <TabsContent value="earnings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Earnings Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div className="bg-primary/10 rounded-md p-4">
                      <h3 className="text-sm font-medium text-gray-600">Total Revenue</h3>
                      <p className="text-2xl font-bold">${DEMO_LISTINGS.reduce((acc, curr) => acc + curr.revenue, 0)}</p>
                    </div>
                    <div className="bg-secondary/10 rounded-md p-4">
                      <h3 className="text-sm font-medium text-gray-600">This Month</h3>
                      <p className="text-2xl font-bold">$280</p>
                    </div>
                    <div className="bg-accent/10 rounded-md p-4">
                      <h3 className="text-sm font-medium text-gray-600">Last Month</h3>
                      <p className="text-2xl font-bold">$470</p>
                    </div>
                    <div className="bg-gray-100 rounded-md p-4">
                      <h3 className="text-sm font-medium text-gray-600">Pending</h3>
                      <p className="text-2xl font-bold">$90</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Revenue by Listing</h3>
                    <div className="space-y-2">
                      {DEMO_LISTINGS.map(listing => (
                        <div key={listing.id} className="bg-white p-3 border rounded-md">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded overflow-hidden mr-3">
                                <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <h4 className="font-medium">{listing.title}</h4>
                                <p className="text-xs text-gray-500">{listing.rentals} rentals</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold">${listing.revenue}</p>
                              <p className="text-xs text-gray-500">${listing.price}/{listing.rentalPeriod}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyListings;
