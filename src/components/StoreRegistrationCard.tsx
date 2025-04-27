import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';
import UserAvatar from '@/components/UserAvatar';

const DetailLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm text-gray-500 mb-1">{children}</p>
);

const DetailValue = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm font-medium text-gray-900">{children}</p>
);

const DetailGroup = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-1">
    <DetailLabel>{label}</DetailLabel>
    <DetailValue>{value}</DetailValue>
  </div>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h4 className="text-base font-medium text-gray-900 mb-4">{children}</h4>
);

interface StoreRegistrationCardProps {
  store: any;
  onApprove: () => void;
  onReject: (reason: string) => void;
}

const StoreRegistrationCard: React.FC<StoreRegistrationCardProps> = ({
  store,
  onApprove,
  onReject,
}) => {
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  const handleReject = () => {
    onReject(rejectionReason);
    setIsRejectDialogOpen(false);
    setRejectionReason('');
  };

  return (
    <>
      <Card className="p-6 mb-4 border-gray-100">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <UserAvatar 
              initials={store.retailer.name.split(' ').map((n: string) => n[0]).join('')}
              className="bg-primary/10 text-primary ring-0"
            />
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-gray-900">{store.retailer.name}</h3>
              <div className="flex gap-2">
                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                  {store.retailer.type}
                </span>
                <span className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-full">
                  {store.retailer.tier}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border-red-200 hover:bg-red-50 text-red-600"
              onClick={() => setIsRejectDialogOpen(true)}
            >
              Reject
            </Button>
            <Button onClick={onApprove}>
              Approve
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          {/* Store Information */}
          <div>
            <SectionTitle>Store Information</SectionTitle>
            <Separator className="mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DetailGroup label="Store Name" value={store.store.name} />
              <DetailGroup label="Store Type" value={store.store.type} />
              <DetailGroup label="Store Category" value={store.store.category} />
              <DetailGroup label="GST Number" value={store.store.gstNo} />
            </div>
          </div>

          {/* Store Manager */}
          <div>
            <SectionTitle>Store Manager</SectionTitle>
            <Separator className="mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DetailGroup label="Full Name" value={store.storeManager.fullName} />
              <DetailGroup label="Email" value={store.storeManager.email} />
              <DetailGroup label="Contact Number" value={store.storeManager.contactNumber} />
              <DetailGroup label="Designation" value={store.storeManager.designation} />
              <DetailGroup label="Status" value={store.storeManager.status} />
            </div>
          </div>

          {/* Location Details */}
          <div>
            <SectionTitle>Location Details</SectionTitle>
            <Separator className="mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DetailGroup label="State" value={store.location.state} />
              <DetailGroup label="City" value={store.location.city} />
              <DetailGroup label="Mall" value={store.location.mall} />
            </div>
          </div>

          {/* Store Details */}
          <div>
            <SectionTitle>Store Details</SectionTitle>
            <Separator className="mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <DetailGroup label="Floor Number" value={store.storeDetails.floorNumber} />
              <DetailGroup label="Store Number" value={store.storeDetails.storeNumber} />
              <DetailGroup label="Store Size" value={store.storeDetails.storeSize} />
              <DetailGroup label="Display Area" value={store.storeDetails.displayArea} />
            </div>
          </div>

          {/* Operating Hours */}
          <div>
            <SectionTitle>Operating Hours</SectionTitle>
            <Separator className="mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium mb-4">Weekday</h5>
                <div className="grid grid-cols-2 gap-4">
                  <DetailGroup label="Opening Time" value={store.operatingHours.weekday.opening} />
                  <DetailGroup label="Closing Time" value={store.operatingHours.weekday.closing} />
                </div>
              </div>
              <div>
                <h5 className="font-medium mb-4">Weekend</h5>
                <div className="grid grid-cols-2 gap-4">
                  <DetailGroup label="Opening Time" value={store.operatingHours.weekend.opening} />
                  <DetailGroup label="Closing Time" value={store.operatingHours.weekend.closing} />
                </div>
              </div>
            </div>
          </div>

          {/* Customer Facilities */}
          <div>
            <SectionTitle>Customer Facilities</SectionTitle>
            <Separator className="mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DetailGroup label="Trial Rooms" value={store.customerFacilities.trialRooms} />
              <DetailGroup label="Wheelchair Access" value={store.customerFacilities.wheelchairAccess} />
              <DetailGroup label="Self Checkout" value={store.customerFacilities.selfCheckout} />
              <DetailGroup label="VIP Room" value={store.customerFacilities.vipRoom} />
              <DetailGroup label="Kids Play Area" value={store.customerFacilities.kidsPlayArea} />
              <DetailGroup label="Customer Lounge" value={store.customerFacilities.customerLounge} />
            </div>
          </div>

          {/* Documents */}
          <div>
            <SectionTitle>Documents</SectionTitle>
            <Separator className="mb-6" />
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">{store.documents.companyRegistration}</span>
                <Button variant="link" className="text-primary h-auto p-0">
                  View
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">{store.documents.brandRegistration}</span>
                <Button variant="link" className="text-primary h-auto p-0">
                  View
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent className="sm:max-w-md p-0">
          <div className="flex justify-between items-center w-full p-6 pb-3 border-b border-gray-100">
            <DialogTitle>Rejection Reason</DialogTitle>
            <DialogClose className="h-6 w-6 p-0 rounded-full hover:bg-gray-100 flex items-center justify-center focus:outline-none">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>
          <div className="p-6">
            <Textarea
              placeholder="Please provide a reason for rejection..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="min-h-[120px] resize-none border-gray-200 focus-visible:ring-primary/30"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsRejectDialogOpen(false)}
              className="bg-white border-gray-200"
            >
              Cancel
            </Button>
            <Button
              variant="default" 
              onClick={handleReject}
              className="bg-black hover:bg-gray-800 text-white"
            >
              Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StoreRegistrationCard;
