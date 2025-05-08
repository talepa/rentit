
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, Star, Edit2, Award, ShoppingBag, Package, MessageSquare, Settings } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

// Demo account data
const DEMO_ACCOUNT = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  phone: '+1 (555) 123-4567',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
  dateJoined: 'January 2023',
  bio: 'Outdoor enthusiast and photography lover. Looking to rent quality gear for weekend adventures!',
  roles: ['renter', 'owner'],
  verificationStatus: {
    email: true,
    phone: true,
    id: false,
    payment: true
  },
  stats: {
    itemsRented: 12,
    itemsListed: 5,
    reviewsReceived: 8,
    averageRating: 4.7
  }
};

const DEMO_EARNINGS = [
  { month: 'January', amount: 250 },
  { month: 'February', amount: 175 },
  { month: 'March', amount: 320 },
  { month: 'April', amount: 410 },
  { month: 'May', amount: 380 }
];

const DEMO_HISTORY = [
  { 
    id: '1', 
    item: 'Professional Camera', 
    owner: 'Jane Smith',
    startDate: '2024-04-10', 
    endDate: '2024-04-12',
    status: 'completed',
    amount: 85
  },
  { 
    id: '2', 
    item: 'Mountain Bike', 
    owner: 'Mike Johnson',
    startDate: '2024-03-15', 
    endDate: '2024-03-18',
    status: 'completed',
    amount: 120
  },
  { 
    id: '3', 
    item: 'Camping Tent', 
    owner: 'Sarah Williams',
    startDate: '2024-05-01', 
    endDate: '2024-05-03',
    status: 'upcoming',
    amount: 65
  }
];

const DEMO_LISTINGS = [
  {
    id: '101',
    title: 'DSLR Camera with Zoom Lens',
    category: 'Electronics',
    price: 45,
    rentalCount: 8,
    rating: 4.8,
    isActive: true
  },
  {
    id: '102',
    title: 'Acoustic Guitar',
    category: 'Music',
    price: 25,
    rentalCount: 5,
    rating: 4.5,
    isActive: true
  },
  {
    id: '103',
    title: 'Snowboard Equipment',
    category: 'Sports',
    price: 35,
    rentalCount: 3,
    rating: 4.6,
    isActive: false
  }
];

const Profile = () => {
  const [activeRole, setActiveRole] = useState<'renter' | 'owner'>('renter');
  const [editMode, setEditMode] = useState(false);
  const [userProfile, setUserProfile] = useState(DEMO_ACCOUNT);
  const navigate = useNavigate();
  
  const handleSaveProfile = () => {
    setEditMode(false);
    toast({
      title: "Profile updated",
      description: "Your profile changes have been saved.",
    });
  };
  
  const handleRoleChange = (role: 'renter' | 'owner') => {
    setActiveRole(role);
  };
  
  return (
    <div className="min-h-screen bg-appbg">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-md animate-fade-in">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col items-center w-full">
                    <Avatar className="h-24 w-24 mb-3 border-4 border-primary/10 shadow-lg">
                      <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                      <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-xl text-center">{userProfile.name}</CardTitle>
                    <CardDescription className="text-center">Member since {userProfile.dateJoined}</CardDescription>
                    
                    <div className="flex gap-2 mt-3">
                      {userProfile.roles.includes('renter') && (
                        <Badge 
                          variant={activeRole === 'renter' ? 'default' : 'outline'} 
                          className="cursor-pointer transform transition-all hover:scale-105"
                          onClick={() => handleRoleChange('renter')}
                        >
                          Renter
                        </Badge>
                      )}
                      {userProfile.roles.includes('owner') && (
                        <Badge 
                          variant={activeRole === 'owner' ? 'default' : 'outline'} 
                          className="cursor-pointer transform transition-all hover:scale-105"
                          onClick={() => handleRoleChange('owner')}
                        >
                          Owner
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4 mt-2">
                  <div className="flex gap-1 items-center">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span className="font-medium">{userProfile.stats.averageRating}</span>
                    <span className="text-sm text-muted-foreground">
                      ({userProfile.stats.reviewsReceived} reviews)
                    </span>
                  </div>
                  
                  <div className="text-sm">
                    <p className="mt-1">{userProfile.bio}</p>
                  </div>
                  
                  <div className="pt-3 border-t">
                    <h4 className="text-sm font-semibold mb-2">Verification</h4>
                    <div className="flex flex-wrap gap-2">
                      {userProfile.verificationStatus.email && (
                        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                          Email Verified
                        </Badge>
                      )}
                      {userProfile.verificationStatus.phone && (
                        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                          Phone Verified
                        </Badge>
                      )}
                      {userProfile.verificationStatus.payment && (
                        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                          Payment Verified
                        </Badge>
                      )}
                      {!userProfile.verificationStatus.id && (
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200 cursor-pointer">
                          Verify ID
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full flex items-center gap-2 hover:bg-primary/10" 
                  onClick={() => setEditMode(true)}
                >
                  <Edit2 className="h-4 w-4" />
                  <span>Edit Profile</span>
                </Button>
              </CardFooter>
            </Card>
            
            <div className="mt-4 space-y-2">
              <Button 
                variant="ghost" 
                className="w-full justify-start hover:bg-primary/10 text-left" 
                onClick={() => navigate('/my-listings')}
              >
                <Package className="h-4 w-4 mr-2" />
                <span>My Listings</span>
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start hover:bg-primary/10 text-left" 
                onClick={() => navigate('/my-bookings')}
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                <span>My Bookings</span>
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start hover:bg-primary/10 text-left" 
                onClick={() => navigate('/messages')}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                <span>Messages</span>
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start hover:bg-primary/10 text-left" 
              >
                <Settings className="h-4 w-4 mr-2" />
                <span>Account Settings</span>
              </Button>
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {editMode ? (
              <Card className="mb-8 shadow-md animate-fade-in">
                <CardHeader>
                  <CardTitle>Edit Your Profile</CardTitle>
                  <CardDescription>Update your personal information and preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                        <Input 
                          id="name" 
                          value={userProfile.name} 
                          onChange={(e) => setUserProfile({...userProfile, name: e.target.value})} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <Input 
                          id="email" 
                          value={userProfile.email} 
                          onChange={(e) => setUserProfile({...userProfile, email: e.target.value})} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                        <Input 
                          id="phone" 
                          value={userProfile.phone} 
                          onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="avatar" className="text-sm font-medium">Profile Picture URL</label>
                        <Input 
                          id="avatar" 
                          value={userProfile.avatar} 
                          onChange={(e) => setUserProfile({...userProfile, avatar: e.target.value})} 
                        />
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <label htmlFor="bio" className="text-sm font-medium">Bio</label>
                        <textarea 
                          id="bio"
                          className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                          value={userProfile.bio}
                          onChange={(e) => setUserProfile({...userProfile, bio: e.target.value})}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setEditMode(false)}>Cancel</Button>
                  <Button onClick={handleSaveProfile}>Save Changes</Button>
                </CardFooter>
              </Card>
            ) : (
              <Tabs defaultValue="dashboard" className="w-full">
                <TabsList className="grid grid-cols-4 mb-8">
                  <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                  <TabsTrigger value="history">Rental History</TabsTrigger>
                  <TabsTrigger value="listings">My Listings</TabsTrigger>
                  <TabsTrigger value="earnings">Earnings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="dashboard" className="mt-0 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="shadow-md">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center">
                          <Star className="h-5 w-5 text-primary mr-2" />
                          Overview
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div className="p-3 bg-primary/5 rounded-lg">
                            <h4 className="text-sm text-muted-foreground">Items Rented</h4>
                            <p className="text-2xl font-bold">{userProfile.stats.itemsRented}</p>
                          </div>
                          <div className="p-3 bg-primary/5 rounded-lg">
                            <h4 className="text-sm text-muted-foreground">Items Listed</h4>
                            <p className="text-2xl font-bold">{userProfile.stats.itemsListed}</p>
                          </div>
                          <div className="p-3 bg-primary/5 rounded-lg">
                            <h4 className="text-sm text-muted-foreground">Reviews</h4>
                            <p className="text-2xl font-bold">{userProfile.stats.reviewsReceived}</p>
                          </div>
                          <div className="p-3 bg-primary/5 rounded-lg">
                            <h4 className="text-sm text-muted-foreground">Rating</h4>
                            <p className="text-2xl font-bold flex items-center justify-center">
                              {userProfile.stats.averageRating}
                              <Star className="h-4 w-4 text-yellow-500 ml-1" fill="currentColor" />
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="shadow-md">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center">
                          <CalendarIcon className="h-5 w-5 text-primary mr-2" />
                          Upcoming Rentals
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {DEMO_HISTORY.filter(item => item.status === 'upcoming').length > 0 ? (
                          <div className="space-y-3">
                            {DEMO_HISTORY.filter(item => item.status === 'upcoming').map(rental => (
                              <div key={rental.id} className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                                <div>
                                  <h4 className="font-medium">{rental.item}</h4>
                                  <div className="text-xs text-muted-foreground">
                                    {new Date(rental.startDate).toLocaleDateString()} - {new Date(rental.endDate).toLocaleDateString()}
                                  </div>
                                </div>
                                <Badge>${rental.amount}</Badge>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-6 text-muted-foreground">
                            <p>No upcoming rentals</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                    
                    <Card className="shadow-md md:col-span-2">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center">
                          <Award className="h-5 w-5 text-primary mr-2" />
                          Recommended Actions
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {!userProfile.verificationStatus.id && (
                            <div className="p-4 border border-yellow-300 bg-yellow-50 rounded-lg flex items-start">
                              <div className="rounded-full bg-yellow-100 p-2 mr-3">
                                <Award className="h-4 w-4 text-yellow-600" />
                              </div>
                              <div>
                                <h4 className="font-medium text-yellow-800">Verify your ID</h4>
                                <p className="text-sm text-yellow-700">Unlock access to premium items by verifying your identity</p>
                                <Button size="sm" variant="outline" className="mt-2 border-yellow-300 hover:bg-yellow-100">
                                  Verify Now
                                </Button>
                              </div>
                            </div>
                          )}
                          
                          {userProfile.roles.includes('renter') && !userProfile.roles.includes('owner') && (
                            <div className="p-4 border border-primary/30 bg-primary/5 rounded-lg flex items-start">
                              <div className="rounded-full bg-primary/20 p-2 mr-3">
                                <Package className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-medium text-primary/80">List your first item</h4>
                                <p className="text-sm text-muted-foreground">Start earning by listing items you don't use daily</p>
                                <Button size="sm" className="mt-2" onClick={() => navigate('/post-add')}>
                                  List an Item
                                </Button>
                              </div>
                            </div>
                          )}
                          
                          <div className="p-4 border border-green-300 bg-green-50 rounded-lg flex items-start">
                            <div className="rounded-full bg-green-100 p-2 mr-3">
                              <MessageSquare className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-green-800">Complete your profile</h4>
                              <p className="text-sm text-green-700">Add more details to improve your trustworthiness</p>
                              <Button size="sm" variant="outline" className="mt-2 border-green-300 hover:bg-green-100" onClick={() => setEditMode(true)}>
                                Update Profile
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="history" className="mt-0 animate-fade-in">
                  <Card className="shadow-md">
                    <CardHeader>
                      <CardTitle>Your Rental History</CardTitle>
                      <CardDescription>All your past and upcoming rentals in one place</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {DEMO_HISTORY.map((rental) => (
                          <div 
                            key={rental.id} 
                            className="p-4 border rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-primary/30 hover:bg-primary/5 transition-colors"
                          >
                            <div>
                              <div className="flex items-center">
                                <h3 className="font-medium">{rental.item}</h3>
                                <Badge className={`ml-2 ${
                                  rental.status === 'completed' ? 'bg-green-100 text-green-800 hover:bg-green-200' : 
                                  rental.status === 'upcoming' ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' :
                                  'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                }`}>
                                  {rental.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">From {rental.owner}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(rental.startDate).toLocaleDateString()} - {new Date(rental.endDate).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex items-center gap-3 self-end sm:self-center">
                              <div className="text-right">
                                <span className="text-sm text-muted-foreground block">Total</span>
                                <span className="font-semibold">${rental.amount}</span>
                              </div>
                              {rental.status === 'completed' && (
                                <Button size="sm" variant="outline">
                                  Leave Review
                                </Button>
                              )}
                              {rental.status === 'upcoming' && (
                                <Button size="sm" variant="outline">
                                  Manage
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="listings" className="mt-0 animate-fade-in">
                  <Card className="shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Your Listings</CardTitle>
                        <CardDescription>Manage all your rental listings</CardDescription>
                      </div>
                      <Button onClick={() => navigate('/post-add')}>
                        Add New Listing
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {DEMO_LISTINGS.map((listing) => (
                          <div 
                            key={listing.id} 
                            className="p-4 border rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-primary/30 hover:bg-primary/5 transition-colors"
                          >
                            <div>
                              <div className="flex items-center">
                                <h3 className="font-medium">{listing.title}</h3>
                                <Badge className={`ml-2 ${listing.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                  {listing.isActive ? 'Active' : 'Inactive'}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">Category: {listing.category}</p>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <span className="flex items-center mr-3">
                                  <ShoppingBag className="h-3 w-3 mr-1" />
                                  {listing.rentalCount} rentals
                                </span>
                                <span className="flex items-center">
                                  <Star className="h-3 w-3 mr-1" fill="currentColor" />
                                  {listing.rating}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 self-end sm:self-center">
                              <div className="text-right">
                                <span className="text-sm text-muted-foreground block">Price</span>
                                <span className="font-semibold">${listing.price}/day</span>
                              </div>
                              <Button size="sm">Edit</Button>
                              <Button size="sm" variant="outline">
                                {listing.isActive ? 'Deactivate' : 'Activate'}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="earnings" className="mt-0 animate-fade-in">
                  <Card className="shadow-md">
                    <CardHeader>
                      <CardTitle>Your Earnings</CardTitle>
                      <CardDescription>Track your rental income over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="h-64 border rounded-lg p-4">
                          <div className="text-center pt-16">
                            {/* This would be a chart in a real implementation */}
                            <p className="text-muted-foreground">Earnings chart would be displayed here</p>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-medium mb-3">Monthly Summary</h3>
                          <div className="space-y-2">
                            {DEMO_EARNINGS.map((month, index) => (
                              <div 
                                key={index}
                                className="p-3 border rounded-lg flex items-center justify-between hover:border-primary/30 hover:bg-primary/5 transition-colors"
                              >
                                <span>{month.month}</span>
                                <span className="font-semibold">${month.amount}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
