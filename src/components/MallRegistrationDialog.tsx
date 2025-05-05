import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
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
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [pin, setPin] = useState('');

  const handleRegistration = async () => {
    const formData = new FormData();

    // Map current fields to API fields
    formData.append('accountId', 'default-account-id'); // required → default/fixed value
    formData.append('mallName', mallName);
    formData.append('legalEntityName', areaName || 'Default Legal Entity');
    formData.append('contactPersonEmailAddress', city || 'default@email.com');
    formData.append('mallCategory', googlePlusCode || 'default-category');
    formData.append('totalBuildUpArea', '0');
    formData.append('floorCounts', '0');
    formData.append('storeCounts', '0');
    formData.append('operatingSince', '0');
    formData.append('primaryEmergencyNumber', '0000000000');
    formData.append('securityHeadContact', '0000000000');
    formData.append('fireSafetyOfficeContact', '0000000000');
    formData.append('administrativeContact', city || 'default-admin-contact');
    formData.append('supportEmail', pin || 'support@example.com');
    formData.append('state', state || '0');
    formData.append('status', '0');
    formData.append('ownedBy', '0');

    try {
      const response = await axios.post('http://localhost:8081/v1/malls', formData, {
        headers: {
          'accept': 'application/json',
          // no content-type → browser sets multipart boundary
        }
      });
      console.log('Mall registered successfully', response.data);
      onOpenChange(false);
    } catch (err) {
      console.error('Error registering mall:', err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[600px] p-0 bg-white overflow-hidden">
        <DialogHeader className="px-6 py-4 bg-white border-b border-gray-100">
          <DialogTitle className="text-xl font-semibold text-gray-900">Mall Registration</DialogTitle>
          <p className="text-sm text-gray-500">Enter the basic details of the mall</p>
        </DialogHeader>

        <div className="px-6 py-4 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700" htmlFor="mallName">
                Mall Name<span className="text-red-500">*</span>
              </label>
              <Input id="mallName" value={mallName} onChange={(e) => setMallName(e.target.value)} placeholder="Enter mall name" className="w-full" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Latitude</label>
                <Input value={latitude} onChange={(e) => setLatitude(e.target.value)} placeholder="Enter latitude" className="w-full" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Longitude</label>
                <Input value={longitude} onChange={(e) => setLongitude(e.target.value)} placeholder="Enter longitude" className="w-full" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Area Name</label>
                <Input value={areaName} onChange={(e) => setAreaName(e.target.value)} placeholder="Enter area name" className="w-full" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Google+ code</label>
                <Input value={googlePlusCode} onChange={(e) => setGooglePlusCode(e.target.value)} placeholder="Enter Google+ code" className="w-full" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">State</label>
                <Select value={state} onValueChange={setState}>
                  <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">State 0</SelectItem>
                    <SelectItem value="1">State 1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">City</label>
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger><SelectValue placeholder="Select city" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="city1">City 1</SelectItem>
                    <SelectItem value="city2">City 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">PIN code</label>
                <Input value={pin} onChange={(e) => setPin(e.target.value)} placeholder="Enter PIN code" className="w-full" />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium text-gray-700">Mall Images</label>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="border-2 border-dashed border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center min-h-[120px] hover:border-primary-500 transition-colors cursor-pointer bg-gray-50">
                    <Plus className="h-8 w-8 text-gray-400" />
                    <span className="text-xs text-gray-500 mt-2">{i === 1 ? "Upload Mall Image" : `Sub Image ${i - 1}`}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">*Recommended Image size: 1920X1080px. Max file size: 2MB.</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-100">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-gray-200 hover:bg-gray-50">
            Cancel
          </Button>
          <Button onClick={handleRegistration} className="bg-primary text-white hover:bg-primary/90">
            Add Registration
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MallRegistrationDialog;
