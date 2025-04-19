
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

interface MallRegistrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MallRegistrationDialog: React.FC<MallRegistrationDialogProps> = ({ open, onOpenChange }) => {
  const handleRegistration = () => {
    // Handle form submission
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">Mall Registration</DialogTitle>
          <p className="text-sm text-gray-500">Enter the basic details of the mall</p>
        </DialogHeader>
        
        <div className="space-y-6 py-4 bg-white">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="mallName">
              Mall Name<span className="text-red-500">*</span>
            </label>
            <Input 
              id="mallName" 
              placeholder="Enter mall name"
              className="border-gray-200 focus:border-primary-500 focus:ring focus:ring-primary-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                Latitude
                <span className="text-gray-400 hover:text-gray-600 cursor-help" title="Right-click on Google Maps to get coordinates">ⓘ</span>
              </label>
              <Input 
                type="text"
                placeholder="Enter latitude"
                className="border-gray-200 focus:border-primary-500 focus:ring focus:ring-primary-100"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                Longitude
                <span className="text-gray-400 hover:text-gray-600 cursor-help" title="Right-click on Google Maps to get coordinates">ⓘ</span>
              </label>
              <Input 
                type="text"
                placeholder="Enter longitude"
                className="border-gray-200 focus:border-primary-500 focus:ring focus:ring-primary-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                Google+ code
                <span className="text-gray-400 hover:text-gray-600 cursor-help" title="Get the Plus code from Google Maps">ⓘ</span>
              </label>
              <Input 
                type="text"
                placeholder="Enter Google+ code"
                className="border-gray-200 focus:border-primary-500 focus:ring focus:ring-primary-100"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Area Name</label>
              <Input 
                type="text"
                placeholder="Enter area name"
                className="border-gray-200 focus:border-primary-500 focus:ring focus:ring-primary-100"
              />
            </div>
          </div>

          <p className="text-xs text-gray-500 italic">
            Open Google Maps: Right-click on any location and select "What's here?" The coordinates will appear in the information card at the bottom
          </p>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">State</label>
              <Select>
                <SelectTrigger className="border-gray-200 focus:border-primary-500 focus:ring focus:ring-primary-100">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="state1">State One</SelectItem>
                  <SelectItem value="state2">State Two</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">City</label>
              <Select>
                <SelectTrigger className="border-gray-200 focus:border-primary-500 focus:ring focus:ring-primary-100">
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="city1">City One</SelectItem>
                  <SelectItem value="city2">City Two</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">PIN code</label>
              <Input 
                type="text"
                placeholder="Enter PIN code"
                className="border-gray-200 focus:border-primary-500 focus:ring focus:ring-primary-100"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-medium text-gray-700">Mall Images</label>
            <div className="grid grid-cols-4 gap-4">
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center min-h-[120px] hover:border-primary-500 transition-colors cursor-pointer bg-gray-50">
                <Plus className="h-8 w-8 text-gray-400" />
                <span className="text-xs text-gray-500 mt-2">Upload Mall Image</span>
              </div>
              {[1, 2, 3].map((i) => (
                <div key={i} className="border-2 border-dashed border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center min-h-[120px] hover:border-primary-500 transition-colors cursor-pointer bg-gray-50">
                  <Plus className="h-8 w-8 text-gray-400" />
                  <span className="text-xs text-gray-500 mt-2">Sub Image {i}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500">*Recommended Image size: 1920X1080px. Max file size: 2MB.</p>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="border-gray-200 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleRegistration}
            className="bg-primary text-white hover:bg-primary/90"
          >
            Add Registration
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MallRegistrationDialog;
