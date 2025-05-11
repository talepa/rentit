
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { Lock, ArrowRight } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

const Verify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const email = location.state?.email || "";
  const fromLogin = location.state?.fromLogin || false;

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // In a real app, this would be an API call to verify OTP
    setTimeout(() => {
      setLoading(false);
      
      if (otp.length === 6) {
        toast({
          title: "Verification successful",
          description: fromLogin 
            ? "You have been successfully logged in." 
            : "Your account has been verified.",
        });
        
        if (fromLogin) {
          // Redirect to the home page instead of profile after login
          navigate('/');
        } else {
          navigate('/login', { state: { verified: true } });
        }
      } else {
        toast({
          title: "Verification failed",
          description: "Please check your OTP and try again",
          variant: "destructive"
        });
      }
    }, 1500);
  };

  const handleResendOTP = () => {
    setCountdown(30);
    toast({
      title: "OTP Resent",
      description: "A new verification code has been sent to your email.",
    });
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
          <CardTitle className="text-2xl font-bold text-center">Verify Your Account</CardTitle>
          <CardDescription className="text-center">
            Enter the 6-digit code sent to{" "}
            {email ? <span className="font-bold">{email}</span> : "your email"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleVerify}>
            <div className="space-y-4">
              <div className="flex justify-center mb-6">
                <div className="rounded-full bg-primary/10 p-3">
                  <Lock className="h-8 w-8 text-primary" />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={setOtp}
                    render={({ slots }) => (
                      <InputOTPGroup className="gap-2">
                        {slots.map((slot, index) => (
                          <InputOTPSlot
                            key={index}
                            index={index}
                            className="h-12 w-12 text-lg"
                          />
                        ))}
                      </InputOTPGroup>
                    )}
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full mt-6" 
                disabled={otp.length !== 6 || loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="h-5 w-5 border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mr-2"></div>
                    <span>Verifying...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <span>Verify Account</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </div>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <div className="w-full space-y-2">
            <div className="text-center text-sm">
              {countdown > 0 ? (
                <p className="text-muted-foreground">
                  Resend code in <span className="font-semibold">{countdown}s</span>
                </p>
              ) : (
                <Button 
                  variant="link" 
                  className="p-0 h-auto" 
                  onClick={handleResendOTP}
                >
                  Resend verification code
                </Button>
              )}
            </div>
            <div className="text-center text-sm">
              <Link to="/login" className="font-medium text-primary hover:underline">
                Back to login
              </Link>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Verify;
