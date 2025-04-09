
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, AlertTriangle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import TextField from '@/components/TextField';
import Button from '@/components/Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
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

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    
    if (!value) {
      setPasswordError('Password is required');
    } else if (value.length < 6) {
      setPasswordError('Password must be at least 6 characters');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setEmailError('');
    setPasswordError('');
    setLoginError('');
    
    // Validate fields
    let isValid = true;
    
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }
    
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }
    
    if (!isValid) return;
    
    setIsLoading(true);
    
    try {
      // Here you would normally make an API call to authenticate
      // For now, we'll simulate a successful login after a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Example check - in real app this would be from your API
      if (email === 'admin@example.com' && password === 'password123') {
        toast({
          title: "Login successful",
          description: "Welcome to the Admin Portal",
        });
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        setLoginError('Invalid email or password');
      }
    } catch (error) {
      setLoginError('An error occurred. Please try again.');
      console.error('Login error:', error);
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
          
          <form onSubmit={handleSubmit}>
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
              
              <TextField
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
                error={passwordError}
                icon={<Lock className="h-5 w-5" />}
                autoComplete="current-password"
              />
              
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full"
                  isLoading={isLoading}
                >
                  Sign In
                </Button>
              </div>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <a href="#" className="text-design-sm text-primary-500 hover:text-primary-600 hover:underline">
              Forgot your password?
            </a>
          </div>
        </div>
        
        <div className="text-center mt-6 text-design-sm text-gray-500">
          <p>© 2025 Company Name. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
