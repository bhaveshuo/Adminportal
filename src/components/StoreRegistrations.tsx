import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import StoreRegistrationCard from './StoreRegistrationCard';
import { useToast } from "@/hooks/use-toast";

// Sample store registration data based on the wireframe
const sampleStore = {
  retailer: {
    name: "Bhavesh Designs",
    type: "Brand",
    tier: "Pro Tier"
  },
  store: {
    name: "Downtown Fashion",
    type: "Flagship Store",
    category: "Fashion",
    gstNo: "F:BSK1234NFKS"
  },
  storeManager: {
    fullName: "Bhavesh Mhatre",
    email: "bhavesh@uo.design",
    contactNumber: "9284529795",
    designation: "Manager",
    status: "Invited accepted: No"
  },
  permissions: {
    handleCustomerSupport: "Yes",
    viewAnalytics: "Yes",
    manageStore: "No",
    seeProductDetails: "Yes",
    addProducts: "Yes",
    assignSupporter: "Yes"
  },
  location: {
    state: "Maharashtra",
    city: "Mumbai",
    mall: "Phoenix"
  },
  storeDetails: {
    floorNumber: "2",
    storeNumber: "44",
    storeSize: "364 sq ft",
    displayArea: "29 sq ft"
  },
  operatingHours: {
    weekday: {
      opening: "06:00 Am",
      closing: "09:00 Pm"
    },
    weekend: {
      opening: "06:00 Am",
      closing: "09:00 Pm"
    }
  },
  customerFacilities: {
    trialRooms: "Qty: 4, Mirrors,Seating",
    wheelchairAccess: "Yes",
    selfCheckout: "No",
    vipRoom: "No",
    kidsPlayArea: "No",
    customerLounge: "No"
  },
  storeServices: {
    personalShopping: "Always Available",
    giftWrapping: "Complimentry",
    alteration: "Free"
  },
  features: {
    digitalBanking: "Yes",
    gstCompliant: "Yes",
    customerDatabase: "No",
    loyaltyProgram: "Yes",
    returnProcessing: "Yes",
    discountManagement: "Yes"
  },
  languages: {
    english: "Yes",
    hindi: "Yes",
    marathi: "No",
    gujarati: "Yes",
    tamil: "Yes",
    telugu: "Yes",
    bengali: "Yes",
    kannada: "Yes"
  },
  storeSystem: {
    pos: "Cloud POS",
    posProvider: "Point labs",
    inventoryManagement: "Integrated with POS",
    systemProvider: "Logic ERP",
    stockUpdateFrequency: "Real time"
  },
  inventoryFeatures: {
    realTimeUpdates: "Yes",
    barcodeScanning: "Yes",
    sizeColorMatrix: "No",
    lowStockAlerts: "Yes",
    autoReplenishment: "Yes",
    interStoreTransfer: "Yes",
    stockReconciliation: "Yes"
  },
  paymentMethods: {
    creditDebit: "Yes",
    upi: "Yes",
    mobileWallets: "No",
    cash: "Yes",
    netBanking: "Yes",
    storeCredit: "Yes",
    giftCards: "Yes"
  },
  documents: {
    companyRegistration: "Company Registration.pdf",
    brandRegistration: "Brand Registration.pdf"
  }
};

const StoreRegistrations = () => {
  const { toast } = useToast();

  const handleApprove = () => {
    toast({
      title: "Store Approved",
      description: "The store registration has been approved successfully."
    });
  };

  const handleReject = (reason: string) => {
    toast({
      title: "Store Rejected",
      description: `The store registration has been rejected. Reason: ${reason}`,
      variant: "destructive"
    });
  };

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input 
            placeholder="Search by name or email..." 
            className="pl-10 bg-white border-gray-200 focus-visible:ring-primary/20"
          />
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-white hover:bg-gray-50 border-gray-200">
            All types
          </Button>
          <Button variant="outline" className="bg-white hover:bg-gray-50 border-gray-200">
            All statuses
          </Button>
        </div>
      </div>

      {/* Registration Cards */}
      <Card className="border-gray-100 shadow-sm">
        <StoreRegistrationCard
          store={sampleStore}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </Card>
    </div>
  );
};

export default StoreRegistrations;
