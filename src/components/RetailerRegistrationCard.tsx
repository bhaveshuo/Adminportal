import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import UserAvatar from '@/components/UserAvatar';

interface RetailerRegistrationProps {
  retailer: {
    name: string;
    brand: string;
    tier: string;
    personalDetails: {
      fullName: string;
      email: string;
      mobile: string;
      registeredOn: string;
      designation: string;
    };
    brandDetails: {
      legalEntityName: string;
      brandName: string;
      cinNumber: string;
      gstNumber: string;
      primaryIndustry: string;
      targetAudience: string;
      ageGroup: string;
      priceRange: string;
    };
    corporateDetails: {
      addressLine1: string;
      addressLine2: string;
      pincode: string;
      corporateEmail: string;
      supportEmail: string;
    };
    documents: {
      companyRegistration: string;
      brandRegistration: string;
    };
  };
  onApprove: () => void;
  onReject: () => void;
}

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

const RetailerRegistrationCard: React.FC<RetailerRegistrationProps> = ({
  retailer,
  onApprove,
  onReject,
}) => {
  return (
    <Card className="p-6 mb-4 border-gray-100">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <UserAvatar 
            initials={retailer.name.split(' ').map(n => n[0]).join('')}
            className="bg-primary/10 text-primary ring-0"
          />
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-900">{retailer.name}</h3>
            <div className="flex gap-2">
              <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                {retailer.brand}
              </span>
              <span className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-full">
                {retailer.tier}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="border-red-200 hover:bg-red-50 text-red-600"
            onClick={onReject}
          >
            Reject
          </Button>
          <Button onClick={onApprove}>
            Approve
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Personal Details */}
        <div>
          <SectionTitle>Personal Details</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DetailGroup label="Full Name" value={retailer.personalDetails.fullName} />
            <DetailGroup label="Official Email" value={retailer.personalDetails.email} />
            <DetailGroup 
              label="Mobile No." 
              value={`${retailer.personalDetails.mobile} (verified)`} 
            />
            <DetailGroup label="Registered On" value={retailer.personalDetails.registeredOn} />
            <DetailGroup label="Designation" value={retailer.personalDetails.designation} />
          </div>
          <Separator className="mb-6" />
        </div>

        {/* Brand Details */}
        <div>
          <SectionTitle>Brand Details</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DetailGroup label="Legal Entity Name" value={retailer.brandDetails.legalEntityName} />
            <DetailGroup label="Brand Name" value={retailer.brandDetails.brandName} />
            <DetailGroup label="CIN Number" value={retailer.brandDetails.cinNumber} />
            <DetailGroup label="GST Number" value={retailer.brandDetails.gstNumber} />
            <DetailGroup label="Primary Industry" value={retailer.brandDetails.primaryIndustry} />
            <DetailGroup label="Target Audience" value={retailer.brandDetails.targetAudience} />
            <DetailGroup label="Age Group" value={retailer.brandDetails.ageGroup} />
            <DetailGroup label="Price Range Category" value={retailer.brandDetails.priceRange} />
          </div>
          <Separator className="mb-6" />
        </div>

        {/* Corporate Details */}
        <div>
          <SectionTitle>Corporate Details</SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DetailGroup label="Address line 1" value={retailer.corporateDetails.addressLine1} />
            <DetailGroup label="Address line 2" value={retailer.corporateDetails.addressLine2} />
            <DetailGroup label="Pincode" value={retailer.corporateDetails.pincode} />
            <DetailGroup label="Corporate Email" value={retailer.corporateDetails.corporateEmail} />
            <DetailGroup label="Support email" value={retailer.corporateDetails.supportEmail} />
          </div>
          <Separator className="mb-6" />
        </div>

        {/* Documents */}
        <div>
          <SectionTitle>Documents</SectionTitle>
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Company Registration.pdf</span>
              <Button variant="link" className="text-primary h-auto p-0">
                View
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Brand Registration.pdf</span>
              <Button variant="link" className="text-primary h-auto p-0">
                View
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RetailerRegistrationCard;
