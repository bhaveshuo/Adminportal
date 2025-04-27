import React, { useState } from 'react';
import { Plus, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatCard from '@/components/StatCard';
import CreateOfferDialog from '@/components/CreateOfferDialog';
import MallRegistrationDialog from '@/components/MallRegistrationDialog';

const Dashboard = () => {
  const [createOfferOpen, setCreateOfferOpen] = useState(false);
  const [mallRegistrationOpen, setMallRegistrationOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="mt-1.5 text-sm text-gray-500">View and manage your dashboard analytics</p>
        </div>
        <div className="flex items-center gap-3">
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
            size="default"
            className="gap-2 bg-white hover:bg-gray-50 border-gray-200"
            onClick={() => setMallRegistrationOpen(true)}
          >
            <Building className="h-4 w-4 text-gray-600" />
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

      <MallRegistrationDialog
        open={mallRegistrationOpen}
        onOpenChange={setMallRegistrationOpen}
      />
    </div>
  );
};

export default Dashboard;