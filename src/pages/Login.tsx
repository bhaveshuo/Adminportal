import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, AlertTriangle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import TextField from '@/components/TextField';
import Button from '@/components/Button';
import OTPVerification from '@/components/OTPVerification';

interface LoginResponse {
  userId?: string;
  message?: string;
  [key: string]: any;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [userId, setUserId] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0); // ⏰ cooldown state
  const navigate = useNavigate();
  const { toast } = useToast();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // 🔥 handle cooldown timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendCooldown > 0) {
      interval = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendCooldown]);

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

    if (resendCooldown > 0) {
      toast({ title: "Please wait", description: `You can resend OTP in ${resendCooldown}s.` });
      return;
    }

    setIsLoading(true);
    console.log("Sending OTP to:", email);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        },
        body: JSON.stringify({
          key: email,
          media: 'EMAIL'
        }),
      });

      let data: LoginResponse = {};
      try {
        data = await response.json();
      } catch (err) {
        console.warn("No JSON returned from /login", err);
      }

      if (response.ok) {
        if (data.userId) {
          setUserId(data.userId);
          toast({ title: "OTP Sent", description: "Check your email for the OTP" });
          setShowOTPInput(true);
          setResendCooldown(60); // ⏰ start cooldown
        } else {
          setLoginError('User ID missing in response');
        }
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
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/user/login/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        },
        body: JSON.stringify({
          userId,
          key: email,
          otp,
          media: 'EMAIL'
        }),
      });

      const token = response.headers.get('authorization');
      console.log("auth token from header:", token);

      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('authToken', token);
        toast({ title: "Login successful", description: "Welcome to the Admin Portal" });
        navigate('/dashboard');
      } else {
        throw new Error("Authorization token not received (check CORS expose headers)");
      }
    } catch (err: any) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message || 'An error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
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
                    disabled={!validateEmail(email) || resendCooldown > 0}
                  >
                    {resendCooldown > 0 ? `Resend OTP in ${resendCooldown}s` : 'Send OTP'}
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
