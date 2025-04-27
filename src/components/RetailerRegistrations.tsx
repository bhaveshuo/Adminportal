import React from 'react';
import RetailerRegistrationCard from './RetailerRegistrationCard';
import { useToast } from "@/components/ui/use-toast";

// Sample data
const sampleRetailer = {
  name: "Bhavesh Designs",
  brand: "Brand",
  tier: "Pro Tier",
  personalDetails: {
    fullName: "Bhavesh Mhatre",
    email: "bhavesh@uo.app",
    mobile: "9284529795",
    registeredOn: "10/2/2025",
    designation: "Manager"
  },
  brandDetails: {
    legalEntityName: "Bhavesh Mhatre",
    brandName: "Bhavesh Designs",
    cinNumber: "12345567",
    gstNumber: "27AACT2803M1ZB",
    primaryIndustry: "Fashion",
    targetAudience: "Men,Women,Unisex",
    ageGroup: "Kid,Teens,Young Adults, Adults",
    priceRange: "Luxury"
  },
  corporateDetails: {
    addressLine1: "Mumbai, Kurla",
    addressLine2: "Pheonix Mall",
    pincode: "401302",
    corporateEmail: "bhavesh@uo.design",
    supportEmail: "support@uo.design"
  },
  documents: {
    companyRegistration: "Company Registration.pdf",
    brandRegistration: "Brand Registration.pdf"
  }
};

const RetailerRegistrations = () => {
  const { toast } = useToast();

  const handleApprove = () => {
    toast({
      title: "Retailer Approved",
      description: "The retailer registration has been approved successfully."
    });
  };

  const handleReject = () => {
    toast({
      title: "Retailer Rejected",
      description: "The retailer registration has been rejected.",
      variant: "destructive"
    });
  };

  return (
    <div className="space-y-6">
      <RetailerRegistrationCard
        retailer={sampleRetailer}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
};

export default RetailerRegistrations;