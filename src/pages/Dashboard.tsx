
import React from 'react';
import Button from '@/components/Button';
import StatCard from '@/components/StatCard';
import { Plus, Building, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 w-[200px] bg-white"
            />
          </div>
          <Button 
            variant="primary" 
            size="sm"
            className="bg-primary-600 text-white hover:bg-primary-700 transition-colors"
            icon={<Plus className="h-4 w-4" />}
          >
            Create Offer
          </Button>
          <Button 
            variant="primary" 
            size="sm"
            className="bg-primary-600 text-white hover:bg-primary-700 transition-colors"
            icon={<Building className="h-4 w-4" />}
          >
            Add Mall
          </Button>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard 
          title="Total Users" 
          value="1,248" 
          description="Total registered users" 
          trend={3.67}
        />
        <StatCard 
          title="Active Malls" 
          value="8" 
          description="Currently active malls"
          trend={-2.67}
        />
        <StatCard 
          title="Total Reservations" 
          value="1,874" 
          description="Completed reservations"
          trend={2.54}
        />
        <StatCard 
          title="Occupancy Rate" 
          value="75%" 
          description="Current occupancy"
          trend={-2.57}
        />
      </div>
    </div>
  );
};

export default Dashboard;
