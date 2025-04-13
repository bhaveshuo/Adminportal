
import React from 'react';
import Button from '@/components/Button';
import StatCard from '@/components/StatCard';
import UserAvatar from '@/components/UserAvatar';

const Dashboard = () => {
  return (
    <div className="flex-1 p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <UserAvatar initials="BM" />
      </div>
      
      <div className="border-b border-gray-200 pb-4" />
      
      <div className="flex items-center justify-end gap-4">
        <Button 
          variant="primary" 
          size="md"
          className="bg-black text-white hover:bg-gray-800"
        >
          Create Offer
        </Button>
        <Button 
          variant="primary" 
          size="md"
          className="bg-black text-white hover:bg-gray-800"
        >
          Add Mall Registration
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total users" 
          value="1,248" 
          description="Active users in your system" 
        />
        <StatCard 
          title="Total Pending Partner" 
          value="5" 
          description="Approve request pending" 
        />
        <StatCard 
          title="Total Malls" 
          value="5" 
          description="Check mall details" 
        />
      </div>
    </div>
  );
};

export default Dashboard;
