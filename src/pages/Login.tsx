import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, AlertTriangle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import TextField from '@/components/TextField';
import Button from '@/components/Button';
import OTPVerification from '@/components/OTPVerification';

const Login = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    if (!value) {
      setEmailError('Email is required');
    } else if (!validateEmail(value)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    setLoginError('');

    if (!email) {
      setEmailError('Email is required');
      return;
    }
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    console.log("Sending OTP to:", email);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailId: email }), // ✅ corrected field
      });

      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok) {
        setUserId(data.userId); // ✅ store userId for verification
        toast({
          title: "OTP Sent",
          description: "Please check your email for the OTP",
        });
        setShowOTPInput(true);
      } else {
        setLoginError(data.message || 'Failed to send OTP');
      }
    } catch (error) {
      setLoginError('An error occurred. Please try again.');
      console.error('Send OTP error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (otp: string) => {
    console.log("Verifying OTP:", otp, "for email:", email, "userId:", userId);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/user/login/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          emailId: email, // ✅ corrected field
          otp,
        }),
      });

      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Verification response:", data);

      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        toast({
          title: "Login successful",
          description: "Welcome to the Admin Portal",
        });
        navigate('/dashboard');
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: data.message || 'Invalid OTP',
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: 'An error occurred. Please try again.',
      });
      console.error('Verify OTP error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-design-lg shadow-design p-8">
          <div className="text-center mb-8">
            <h1 className="text-design-2xl font-design-bold text-gray-800">Admin Portal</h1>
            <p className="text-gray-500 mt-2">Sign in to your account</p>
          </div>
          
          {loginError && (
            <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-design-md flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              <span>{loginError}</span>
            </div>
          )}
          
          {!showOTPInput ? (
            <form onSubmit={handleSendOTP}>
              <div className="space-y-6">
                <TextField
                  label="Company Email"
                  type="email"
                  placeholder="Enter your company email"
                  value={email}
                  onChange={handleEmailChange}
                  error={emailError}
                  icon={<Mail className="h-5 w-5" />}
                  autoComplete="email"
                />
                
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="w-full"
                    isLoading={isLoading}
                    disabled={!validateEmail(email)}
                  >
                    Send OTP
                  </Button>
                </div>
              </div>
            </form>
          ) : (
            <OTPVerification onVerify={handleVerifyOTP} />
          )}
        </div>
        
        <div className="text-center mt-6 text-design-sm text-gray-500">
          <p>© 2025 Company Name. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
