
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Mail, Check, KeyRound } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

const Verify = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [userData, setUserData] = useState<any>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const pendingUser = localStorage.getItem('pendingUser');
    if (!pendingUser) {
      navigate('/signup');
      return;
    }
    
    setUserData(JSON.parse(pendingUser));
    
    // Start countdown for resend option
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [navigate]);
  
  const handleVerify = () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit code",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    // In a real app, this would verify the OTP with an API
    setTimeout(() => {
      setLoading(false);
      
      // For demo: any 6-digit code is accepted
      toast({
        title: "Verification successful",
        description: "Your account has been verified!",
      });
      
      // Store the verified user data
      localStorage.setItem('currentUser', localStorage.getItem('pendingUser') || '');
      localStorage.removeItem('pendingUser');
      
      navigate('/profile');
    }, 1500);
  };
  
  const handleResend = () => {
    if (countdown > 0) return;
    
    toast({
      title: "OTP resent",
      description: "A new verification code has been sent to your email",
    });
    
    setCountdown(30);
    
    // Restart countdown
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  if (!userData) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Verify Your Email</CardTitle>
          <CardDescription className="text-center">
            We've sent a verification code to<br />
            <span className="font-medium">{userData.email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex flex-col space-y-2 items-center">
              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            
            <Button 
              onClick={handleVerify} 
              disabled={otp.length !== 6 || loading}
              className="w-full"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="h-5 w-5 border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mr-2"></div>
                  <span>Verifying...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Check className="mr-2 h-5 w-5" />
                  <span>Verify Email</span>
                </div>
              )}
            </Button>
            
            <div className="text-sm text-center">
              <p>
                Didn't receive the code?{" "}
                <button 
                  onClick={handleResend} 
                  disabled={countdown > 0} 
                  className={`font-medium ${countdown > 0 ? 'text-gray-400' : 'text-primary hover:underline'}`}
                >
                  {countdown > 0 ? `Resend in ${countdown}s` : 'Resend Code'}
                </button>
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="w-full border-t pt-4">
            <div className="text-center text-sm w-full">
              <Link to="/login" className="font-medium text-primary hover:underline flex items-center justify-center">
                <KeyRound className="h-4 w-4 mr-1" />
                <span>Back to Login</span>
              </Link>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Verify;
