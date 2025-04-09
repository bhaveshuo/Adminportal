
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-admin-background p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-admin-secondary mb-4">Admin Portal</h1>
        <p className="text-lg text-gray-600 mb-8">Welcome to your admin dashboard system</p>
        <Button 
          size="lg" 
          onClick={() => navigate('/login')}
        >
          Go to Login
        </Button>
      </div>
    </div>
  );
};

export default Index;
