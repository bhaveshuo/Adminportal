import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import BusinessTypeTable from "@/components/BusinessTypeTable";
import BusinessTypeTabs from "@/components/BusinessTypeTabs";
import MallsTable from '@/components/MallsTable';
//import MallsList from '@/components/MallsList';
import MallRegistrationDialog from "@/components/MallRegistrationDialog";

const Master = () => {
  const [activeTab, setActiveTab] = useState('business-type');
  const [isMallDialogOpen, setIsMallDialogOpen] = useState(false);

  return (
    <div className="p-8 space-y-6">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Master</h1>
        <p className="mt-1.5 text-sm text-gray-500">Manage all master data in one place</p>
      </div>

      {/* Tabs */}
      <BusinessTypeTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Content based on active tab */}
      {activeTab === 'business-type' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Business Type</h2>
              <p className="mt-1 text-sm text-gray-500">Define different types of businesses that can register on the platform</p>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Business Type
            </Button>
          </div>

          <div className="bg-white rounded-lg border border-gray-100 shadow-sm">
            <BusinessTypeTable />
          </div>
        </div>
      )}

      {/* Malls Tab Content */}
      {activeTab === 'malls' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Malls</h2>
              <p className="mt-1 text-sm text-gray-500">Define and manage mall information for partner registrations</p>
            </div>
            <Button className="gap-2" onClick={() => setIsMallDialogOpen(true)}>
              <Plus className="h-4 w-4" />
              Add Mall
            </Button>
          </div>

          <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6">
            <MallsTable />
          </div>
        </div>
      )}
      
      {/* Mall Registration Dialog */}
      <MallRegistrationDialog open={isMallDialogOpen} onOpenChange={setIsMallDialogOpen} />
    </div>
  );
};

export default Master;
