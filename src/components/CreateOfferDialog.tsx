
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

interface CreateOfferDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateOfferDialog: React.FC<CreateOfferDialogProps> = ({ open, onOpenChange }) => {
  const handleCreate = () => {
    // Handle form submission
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">Create new offer</DialogTitle>
          <p className="text-sm text-gray-500">This offer will be floated on the customer app</p>
        </DialogHeader>
        
        <div className="space-y-6 py-4 bg-white">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="offerName">Offer Name</label>
            <Input 
              id="offerName" 
              placeholder="Enter offer name"
              className="border-gray-200 focus:border-primary-500 focus:ring focus:ring-primary-100"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="description">Offer Description</label>
            <Textarea 
              id="description" 
              placeholder="Enter offer description"
              className="border-gray-200 focus:border-primary-500 focus:ring focus:ring-primary-100 min-h-[120px]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Select Mall</label>
            <Select>
              <SelectTrigger className="border-gray-200 focus:border-primary-500 focus:ring focus:ring-primary-100">
                <SelectValue placeholder="Select a mall" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mall1">Mall One</SelectItem>
                <SelectItem value="mall2">Mall Two</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Valid From</label>
              <Input 
                type="date" 
                className="border-gray-200 focus:border-primary-500 focus:ring focus:ring-primary-100"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Valid To</label>
              <Input 
                type="date"
                className="border-gray-200 focus:border-primary-500 focus:ring focus:ring-primary-100"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-medium text-gray-700">Offer Images</label>
            <div className="grid grid-cols-4 gap-4">
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center min-h-[120px] hover:border-primary-500 transition-colors cursor-pointer bg-gray-50">
                <Plus className="h-8 w-8 text-gray-400" />
                <span className="text-xs text-gray-500 mt-2">Main Image</span>
              </div>
              {[1, 2, 3].map((i) => (
                <div key={i} className="border-2 border-dashed border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center min-h-[120px] hover:border-primary-500 transition-colors cursor-pointer bg-gray-50">
                  <Plus className="h-8 w-8 text-gray-400" />
                  <span className="text-xs text-gray-500 mt-2">Sub Image</span>
                </div>
              ))}
            </div>
            <div className="text-xs text-gray-500 space-y-1">
              <p>*Main Image is required, Upload up to 3 sub images.</p>
              <p>*Recommended Image size: 1920x1080px. Max file size: 2MB.</p>
            </div>
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
            onClick={handleCreate}
            className="bg-primary text-white hover:bg-primary/90"
          >
            Create Offer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOfferDialog;
