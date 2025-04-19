
import React, { useState } from 'react';
import { Plus, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatCard from '@/components/StatCard';
import CreateOfferDialog from '@/components/CreateOfferDialog';

const Dashboard = () => {
  const [createOfferOpen, setCreateOfferOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            size="sm"
            className="bg-primary text-white hover:bg-primary/90"
            onClick={() => setCreateOfferOpen(true)}
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
            Add Mall Registration
          </Button>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Users" 
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

      <CreateOfferDialog
        open={createOfferOpen}
        onOpenChange={setCreateOfferOpen}
      />
    </div>
  );
};

export default Dashboard;
