import React, { useState, useEffect, useRef } from 'react';
import Button from '@/components/Button';

interface OTPVerificationProps {
  onVerify: (otp: string) => Promise<void>;
  onResend?: () => Promise<void>;
}

const OTPVerification = ({ onVerify, onResend }: OTPVerificationProps) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData('text').slice(0, 6).split('');
    const newOtp = Array(6).fill('');
    pasted.forEach((digit, i) => {
      if (/^\d$/.test(digit)) {
        newOtp[i] = digit;
      }
    });
    setOtp(newOtp);
    inputsRef.current[pasted.length - 1]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setErrorMsg('Please enter the 6-digit OTP.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');
    try {
      await onVerify(otpValue);
    } catch {
      setErrorMsg('Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (onResend) {
      try {
        await onResend();
        setResendTimer(30);
      } catch {
        setErrorMsg('Failed to resend OTP. Please try again.');
      }
    }
  };

  useEffect(() => {
    const timer = resendTimer > 0 ? setTimeout(() => setResendTimer((r) => r - 1), 1000) : null;
    return () => timer && clearTimeout(timer);
  }, [resendTimer]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Enter OTP</label>
        <p className="text-sm text-gray-500 mb-4">Check your email for the 6-digit code</p>
        <div className="flex gap-2" onPaste={handlePaste}>
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputsRef.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className={`w-12 h-12 text-center text-lg border rounded ${
                errorMsg ? 'border-red-500' : 'border-gray-300'
              } focus:ring-primary-500`}
              autoFocus={i === 0}
            />
          ))}
        </div>
        {errorMsg && <p className="text-sm text-red-500 mt-2">{errorMsg}</p>}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="md"
        className="w-full"
        isLoading={isLoading}
        disabled={otp.join('').length !== 6}
      >
        Verify OTP
      </Button>

      <div className="text-center mt-4 text-sm text-gray-600">
        {resendTimer > 0 ? (
          <p>Resend OTP in <span className="font-medium">{resendTimer}s</span></p>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            className="text-primary-600 hover:underline font-medium"
          >
            Resend OTP
          </button>
        )}
      </div>
    </form>
  );
};

export default OTPVerification;
