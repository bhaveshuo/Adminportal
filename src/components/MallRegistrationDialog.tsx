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
      const accountId = localStorage.getItem('accountId');
      const contactPersonEmailAddress = localStorage.getItem('contactPersonEmailAddress');
      const administrativeContact = localStorage.getItem('administrativeContact');
      const supportEmail = localStorage.getItem('supportEmail');
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (!accountId || !contactPersonEmailAddress || !administrativeContact || !supportEmail || !token || !userId) {
        console.error('Missing required information:', { accountId, contactPersonEmailAddress, administrativeContact, supportEmail, userId });
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

      const formData = new FormData();
      
      // Required fields
      formData.append('accountId', accountId);
      formData.append('mallName', mallName);
      formData.append('legalEntityName', areaName);
      formData.append('contactPersonEmailAddress', contactPersonEmailAddress);
      formData.append('mallCategory', '20da49ac02a2-49f1-a367-5c47b5b7b28a');
      formData.append('totalBuildUpArea', '0');
      formData.append('floorCounts', '0');
      formData.append('storeCounts', '0');
      formData.append('operatingSince', '0');
      formData.append('administrativeContact', administrativeContact);
      formData.append('supportEmail', supportEmail);
      formData.append('state', 'Karnataka');
      formData.append('status', '2'); // Set status to 2 to make it visible
      formData.append('ownedBy', accountId);
      formData.append('createdBy', userId || ''); // Add createdBy field
      formData.append('isAdminCreated', 'false'); // Add isAdminCreated field
      
      // Additional fields
      formData.append('pincode', pin);
      formData.append('addressState', 'Karnataka');
      formData.append('country', 'India');
      formData.append('city', 'Bangalore');
      formData.append('lat', validLat.toString());
      formData.append('lng', validLng.toString());
      formData.append('googlePlusCode', googlePlusCode);
      formData.append('areaName', areaName);
      formData.append('addressLine1', '123Main St');
      formData.append('addressLine2', 'Suite456');
      formData.append('timingWeekdayOpening', '0900');
      formData.append('timingWeekdayClosing', '2100');
      formData.append('timingWeekendOpening', '1000');
      formData.append('timingWeekendClosing', '2200');

      if (mainImage) {
        formData.append('mainImage', mainImage);
      }

      console.log('=== FORM DATA SUBMISSION ===');
      console.log('AccountId:', accountId);
      console.log('Mall Name:', mallName);
      
      const mallResponse = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/v1/malls/admin`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      console.log('Mall creation response:', {
        status: mallResponse.data.status,
        isAdminCreated: mallResponse.data.isAdminCreated,
        createdBy: mallResponse.data.createdBy,
        ownedBy: mallResponse.data.ownedBy
      });

      if (mallResponse.data.id) {
        // Handle sub-images if available
        if (subImages && subImages.length > 0) {
          for (const file of subImages) {
            const mediaFormData = new FormData();
            mediaFormData.append('file', file);
            await axios.post(
              `${import.meta.env.VITE_API_BASE_URL}/v1/malls/${mallResponse.data.id}/media`,
              mediaFormData,
              {
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'multipart/form-data'
                }
              }
            );
          }
          console.log('Sub-images uploaded!');
        }

        onOpenChange(false);
        window.location.reload();
      } else {
        throw new Error('Mall creation failed - no ID returned');
      }
    } catch (err: any) {
      console.error('Error registering mall:', err.response?.data || err.message || err);
      if (err.response?.status === 401 || 
          (err.response?.data?.error && err.response?.data?.error.includes('JWT expired'))) {
        alert('Your session has expired. Please log in again.');
        window.location.href = '/login';
        return;
      }
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