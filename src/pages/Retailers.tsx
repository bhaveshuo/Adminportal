import React, { useState } from 'react';
import { Search, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import RetailersTable from '@/components/RetailersTable';
import RetailerRegistrations from '@/components/RetailerRegistrations';
import StoreRegistrations from '@/components/StoreRegistrations';

const Retailers = () => {
  const [selectedTab, setSelectedTab] = useState('all-retailers');

  return (
    <div className="p-8 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Retailers</h1>
          <p className="mt-1.5 text-sm text-gray-500">Manage and view all your retailers in one place</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="default" 
            className="gap-2 bg-white hover:bg-gray-50 border-gray-200"
          >
            <Download className="h-4 w-4 text-gray-600" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setSelectedTab('all-retailers')}
              className={`${
                selectedTab === 'all-retailers'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
            >
              All Retailers
            </button>
            <button
              onClick={() => setSelectedTab('retailer-registrations')}
              className={`${
                selectedTab === 'retailer-registrations'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
            >
              Retailers registrations
            </button>
            <button
              onClick={() => setSelectedTab('store-registrations')}
              className={`${
                selectedTab === 'store-registrations'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
            >
              Store registrations
            </button>
          </nav>
        </div>

        {/* Content based on selected tab */}
        {selectedTab === 'all-retailers' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input 
                  placeholder="Search retailers..." 
                  className="pl-10 bg-white border-gray-200"
                />
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="gap-2 bg-white border-gray-200">
                  <Filter className="h-4 w-4 text-gray-600" />
                  Filter
                </Button>
                <Button variant="outline" className="bg-white border-gray-200">
                  All statuses
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-100">
              <RetailersTable />
            </div>
          </div>
        )}

        {selectedTab === 'retailer-registrations' && <RetailerRegistrations />}

        {selectedTab === 'store-registrations' && <StoreRegistrations />}
      </div>
    </div>
  );
};

export default Retailers;
