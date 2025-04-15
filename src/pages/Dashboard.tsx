
import React from 'react';
import Button from '@/components/Button';
import StatCard from '@/components/StatCard';
import UserAvatar from '@/components/UserAvatar';
import { Plus, Building } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-design-bold text-gray-800">Welcome back, Admin</h1>
          <p className="text-gray-500 text-design-sm">Here's what's happening with your mall today.</p>
        </div>
        <UserAvatar initials="BM" />
      </div>
      
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:justify-end">
        <Button 
          variant="primary" 
          size="md"
          className="bg-primary-500 text-white hover:bg-primary-600 transition-colors"
          icon={<Plus className="h-4 w-4" />}
        >
          Create Offer
        </Button>
        <Button 
          variant="primary" 
          size="md"
          className="bg-primary-500 text-white hover:bg-primary-600 transition-colors"
          icon={<Building className="h-4 w-4" />}
        >
          Add Mall Registration
        </Button>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <StatCard 
          title="Total Users" 
          value="1,248" 
          description="12% increase from last month" 
        />
        <StatCard 
          title="Pending Partners" 
          value="5" 
          description="3 new requests this week" 
        />
        <StatCard 
          title="Active Malls" 
          value="8" 
          description="2 malls added this month" 
        />
      </div>
    </div>
  );
};

export default Dashboard;
