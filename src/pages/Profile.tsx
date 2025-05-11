
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import { User, MapPin, Phone, Mail, Calendar, Edit2, Save, Camera, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  
  // Mock user data - in a real app, this would come from the backend
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, Anytown, CA 12345',
    joinDate: 'May 2025',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
  });
  
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully."
    });
    
    setEditMode(false);
  };
  
  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out."
    });
    
    // In a real app, this would clear authentication tokens
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-background">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-4 pt-8 pb-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary">My Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left sidebar with user info */}
          <Card className="md:col-span-1">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <Avatar className="w-24 h-24 border-2 border-primary">
                    <AvatarImage src={userData.avatar} alt={userData.name} />
                    <AvatarFallback className="bg-primary/20 text-primary text-2xl">
                      {userData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <Button 
                    size="icon" 
                    variant="outline" 
                    className="absolute bottom-0 right-0 rounded-full h-8 w-8"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                
                <h2 className="text-xl font-semibold mb-1">{userData.name}</h2>
                <p className="text-muted-foreground text-sm mb-4 flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {userData.address.split(',')[1]?.trim()}
                </p>
                
                <div className="w-full space-y-3 mt-2">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-3 text-muted-foreground" />
                    <span className="text-sm">{userData.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-3 text-muted-foreground" />
                    <span className="text-sm">{userData.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-3 text-muted-foreground" />
                    <span className="text-sm">Joined {userData.joinDate}</span>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <Button 
                  variant="destructive" 
                  className="w-full" 
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Right section with tabs */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Personal Information</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setEditMode(!editMode)}
                  >
                    {editMode ? (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save
                      </>
                    ) : (
                      <>
                        <Edit2 className="mr-2 h-4 w-4" />
                        Edit
                      </>
                    )}
                  </Button>
                </div>
                <CardDescription>
                  Update your personal details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateProfile}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        value={userData.name} 
                        disabled={!editMode} 
                        onChange={(e) => setUserData({...userData, name: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={userData.email} 
                        disabled={!editMode}
                        onChange={(e) => setUserData({...userData, email: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input 
                        id="phone" 
                        value={userData.phone} 
                        disabled={!editMode}
                        onChange={(e) => setUserData({...userData, phone: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input 
                        id="address" 
                        value={userData.address} 
                        disabled={!editMode}
                        onChange={(e) => setUserData({...userData, address: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  {editMode && (
                    <Button type="submit" className="mt-6 w-full">
                      Save Changes
                    </Button>
                  )}
                </form>
              </CardContent>
            </Card>
            
            <Tabs defaultValue="listings" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="listings">My Listings</TabsTrigger>
                <TabsTrigger value="bookings">My Bookings</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="listings" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>My Listings</CardTitle>
                    <CardDescription>
                      Items you've listed for rent
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      <p>You haven't listed any items yet.</p>
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => navigate('/post-add')}
                      >
                        Create your first listing
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="bookings" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>My Bookings</CardTitle>
                    <CardDescription>
                      Items you've rented
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      <p>You haven't booked any items yet.</p>
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => navigate('/')}
                      >
                        Explore items to rent
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Reviews</CardTitle>
                    <CardDescription>
                      Reviews you've received and given
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No reviews yet.</p>
                      <p className="text-sm mt-2">Reviews will appear here once you rent or list items.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
