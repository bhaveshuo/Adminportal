import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import axios from 'axios';

interface MallRegistrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MallRegistrationDialog: React.FC<MallRegistrationDialogProps> = ({ open, onOpenChange }) => {
  const [mallName, setMallName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [areaName, setAreaName] = useState('');
  const [googlePlusCode, setGooglePlusCode] = useState('');
  const [pin, setPin] = useState('');
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [subImages, setSubImages] = useState<File[]>([]);

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMainImage(e.target.files[0]);
    }
  };

  const handleSubImageChange = (index: number, file: File) => {
    const updated = [...subImages];
    updated[index] = file;
    setSubImages(updated);
  };

  const removeSubImage = (index: number) => {
    const updated = [...subImages];
    updated.splice(index, 1);
    setSubImages(updated);
  };

  const removeMainImage = () => {
    setMainImage(null);
  };

  const handleRegistration = async () => {
    try {
      // Fetch IDs from localStorage
      const accountId = localStorage.getItem('accountId');
      const contactPersonEmailAddress = localStorage.getItem('contactPersonEmailAddress');
      const administrativeContact = localStorage.getItem('administrativeContact');
      const supportEmail = localStorage.getItem('supportEmail');
      const ownedBy = localStorage.getItem('ownedBy');
  
      if (!accountId || !contactPersonEmailAddress || !administrativeContact || !supportEmail || !ownedBy) {
        console.error('Missing required IDs from localStorage:', { accountId, contactPersonEmailAddress, administrativeContact, supportEmail, ownedBy });
        alert('Error: Missing required user information. Please log in again.');
        return;
      }
  
      // Validate latitude and longitude
      const validLat = parseFloat(latitude);
      const validLng = parseFloat(longitude);
      if (isNaN(validLat) || isNaN(validLng)) {
        alert('Latitude and Longitude must be valid numbers!');
        return;
      }
  
      // Validate pincode
      if (!/^\d{4,10}$/.test(pin)) {
        alert('Pincode must be numeric (4-10 digits)!');
        return;
      }
  
      const formData = {}
      
      // Required fields from curl example
      formData['accountId'] = accountId;
      formData['mallName'] = mallName;
      formData['legalEntityName'] = areaName; // Using areaName as legalEntityName
      formData['contactPersonEmailAddress'] = contactPersonEmailAddress;
      formData['mallCategory'] = '20da49ac02a2-49f1-a367-5c47b5b7b28a'
      formData['totalBuildUpArea'] = '0'
      formData['floorCounts'] = '0'
      formData['storeCounts'] = '0'
      formData['operatingSince'] = '0' // Match format in curl example
      
      // No need to add optional fields from curl
      formData['administrativeContact'] = administrativeContact;
      formData['supportEmail'] = supportEmail;
      formData['state'] = 'Karnataka' // Keep original value instead of '0'
      formData['status'] = '0'
      formData['ownedBy'] = accountId;
      
      // Additional fields from your implementation
      // Only include these if the API actually accepts them
      formData['pincode'] = pin;
      formData['addressState'] = 'Karnataka'
      formData['country'] = 'India'
      formData['city'] = 'Bangalore'
      formData['lat'] = validLat.toString();
      formData['lng'] = validLng.toString();
      formData['googlePlusCode'] = googlePlusCode;
      formData['areaName'] = areaName;
      formData['addressLine1'] = '123Main St'
      formData['addressLine2'] = 'Suite456'
      formData['timingWeekdayOpening'] = '0900'
      formData['timingWeekdayClosing'] = '2100'
      formData['timingWeekendOpening'] = '1000'
      formData['timingWeekendClosing'] = '2200'
  
      if (mainImage) {
        formData['mainImage'] = mainImage;
      }
  
      console.log('=== FORM DATA SUBMISSION ===');
      console.log(formData);
  
      const mallResponse = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/v1/malls/admin`,
        formData
      );

      console.log('Mall response:', mallResponse.status, mallResponse.statusText);
  
      const mallId = mallResponse.data.id;
      console.log('✅ Mall created successfully:', mallResponse.data);
  
      // Handle sub-images if available
      if (subImages && subImages.length > 0) {
        for (const file of subImages) {
          const mediaFormData = new FormData();
          mediaFormData.append('file', file);
          await axios.post(`${import.meta.env.VITE_API_BASE_URL}/v1/malls/${mallId}/media`, mediaFormData);
        }
        console.log('Sub-images uploaded!');
      }
  
      onOpenChange(false);
    } catch (err) {
      console.error('Error registering mall:', err.response?.data || err.message || err);
      alert('Failed to register mall. Please check console for details.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby="mall-dialog-description" className="max-w-[600px] p-0 bg-white overflow-hidden">
        <DialogHeader className="px-6 py-4 bg-white border-b border-gray-100">
          <DialogTitle className="text-xl font-semibold text-gray-900">Mall Registration</DialogTitle>
          <DialogDescription id="mall-dialog-description" className="text-sm text-gray-500">
            Enter the basic details of the mall
          </DialogDescription>
        </DialogHeader>
        <div className="px-6 py-4 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Mall Name</label>
              <Input value={mallName} onChange={(e) => setMallName(e.target.value)} placeholder="Enter mall name" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Latitude</label>
                <Input value={latitude} onChange={(e) => setLatitude(e.target.value)} placeholder="Latitude" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Longitude</label>
                <Input value={longitude} onChange={(e) => setLongitude(e.target.value)} placeholder="Longitude" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Area Name</label>
                <Input value={areaName} onChange={(e) => setAreaName(e.target.value)} placeholder="Area Name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Google+ Code</label>
                <Input value={googlePlusCode} onChange={(e) => setGooglePlusCode(e.target.value)} placeholder="Google+ Code" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">PIN Code</label>
              <Input value={pin} onChange={(e) => setPin(e.target.value)} placeholder="PIN Code" />
            </div>
            <div className="space-y-4">
              <label className="text-sm font-medium text-gray-700">Mall Images</label>
              <div className="grid grid-cols-4 gap-4">
                <div className="relative border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center min-h-[120px] bg-gray-50">
                  {mainImage ? (
                    <>
                      <img src={URL.createObjectURL(mainImage)} alt="Main" className="h-16 object-cover rounded" />
                      <button type="button" onClick={removeMainImage} className="absolute top-1 right-1 text-white bg-black rounded-full w-6 h-6 flex items-center justify-center"><X size={16} /></button>
                    </>
                  ) : (
                    <>
                      <Plus className="h-8 w-8 text-gray-400" />
                      <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleMainImageChange} />
                      <span className="text-xs text-gray-500 mt-2">Upload Main</span>
                    </>
                  )}
                </div>
                {[0, 1, 2].map((i) => (
                  <div key={i} className="relative border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center min-h-[120px] bg-gray-50">
                    {subImages[i] ? (
                      <>
                        <img src={URL.createObjectURL(subImages[i])} alt={`Sub ${i + 1}`} className="h-16 object-cover rounded" />
                        <button type="button" onClick={() => removeSubImage(i)} className="absolute top-1 right-1 text-white bg-black rounded-full w-6 h-6 flex items-center justify-center"><X size={16} /></button>
                      </>
                    ) : (
                      <>
                        <Plus className="h-8 w-8 text-gray-400" />
                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => e.target.files && handleSubImageChange(i, e.target.files[0])} />
                        <span className="text-xs text-gray-500 mt-2">Sub Image {i + 1}</span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-100">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleRegistration} className="bg-primary text-white">Add Registration</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MallRegistrationDialog;