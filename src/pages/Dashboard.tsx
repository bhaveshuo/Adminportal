
import React from 'react';
import { Plus, Building, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import StatCard from '@/components/StatCard';

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="mt-1 text-sm text-gray-500">Welcome back to your dashboard</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-9 w-[240px] bg-white border-gray-200 focus:border-primary"
            />
          </div>
          <Button 
            variant="default"
            size="sm"
            className="bg-primary text-white hover:bg-primary/90 shadow-sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Offer
          </Button>
          <Button 
            variant="outline"
            size="sm"
            className="border-gray-200 hover:bg-gray-50"
          >
            <Building className="h-4 w-4 mr-2" />
            Add Mall
          </Button>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Users" 
          value="1,248" 
          description="Active users this month" 
          trend={3.67}
        />
        <StatCard 
          title="Active Malls" 
          value="8" 
          description="Currently operating malls"
          trend={-2.67}
        />
        <StatCard 
          title="Total Reservations" 
          value="1,874" 
          description="Completed this month"
          trend={2.54}
        />
        <StatCard 
          title="Occupancy Rate" 
          value="75%" 
          description="Average across all malls"
          trend={-2.57}
        />
      </div>
    </div>
  );
};

export default Dashboard;
