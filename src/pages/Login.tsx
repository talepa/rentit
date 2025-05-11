
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Lock, LogIn, Mail, KeyRound } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpEmail, setOtpEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      setLoading(false);
      
      // Demo login - would be replaced with actual authentication
      if (email && password) {
        // Store demo user
        const demoUser = {
          name: "Alex Johnson",
          email: email,
          phone: "+1 (555) 123-4567",
          location: "San Francisco, CA",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
          dateJoined: "January 2023",
        };
        
        localStorage.setItem('currentUser', JSON.stringify(demoUser));
        
        toast({
          title: "Login successful",
          description: "Welcome back to RentMate!",
        });
        navigate('/profile');
      } else {
        toast({
          title: "Login failed",
          description: "Please check your email and password",
          variant: "destructive"
        });
      }
    }, 1000);
  };
  
  const handleOtpRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpLoading(true);
    
    // In a real app, this would send an OTP via API
    setTimeout(() => {
      setOtpLoading(false);
      
      if (otpEmail) {
        localStorage.setItem('pendingUser', JSON.stringify({ email: otpEmail }));
        
        toast({
          title: "Verification code sent",
          description: "Check your email for the verification code",
        });
        navigate('/verify');
      } else {
        toast({
          title: "Failed to send code",
          description: "Please enter a valid email address",
          variant: "destructive"
        });
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Link to="/" className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-poppins font-bold text-lg">R</span>
              </div>
              <h1 className="ml-2 text-2xl font-bold text-primary">RentMate</h1>
            </Link>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="password" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="otp">OTP</TabsTrigger>
            </TabsList>
            
            <TabsContent value="password" className="space-y-4">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input
                        id="email"
                        placeholder="your@email.com"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link to="/forgot-password" className="text-sm font-medium text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input
                        id="password"
                        placeholder="••••••••"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="h-5 w-5 border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mr-2"></div>
                        <span>Logging in...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <LogIn className="mr-2 h-5 w-5" />
                        <span>Login</span>
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="otp" className="space-y-4">
              <form onSubmit={handleOtpRequest}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="otp-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input
                        id="otp-email"
                        placeholder="your@email.com"
                        type="email"
                        value={otpEmail}
                        onChange={(e) => setOtpEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={otpLoading}
                  >
                    {otpLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="h-5 w-5 border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mr-2"></div>
                        <span>Sending Code...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <KeyRound className="mr-2 h-5 w-5" />
                        <span>Send Verification Code</span>
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <div className="text-center text-sm w-full">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-primary hover:underline">
              Create one now
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
