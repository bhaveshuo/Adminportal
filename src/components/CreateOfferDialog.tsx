import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from 'axios';

interface CreateOfferDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateOfferDialog: React.FC<CreateOfferDialogProps> = ({ open, onOpenChange }) => {
  const [selectedMall, setSelectedMall] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Format the date to match "YYYY-MM-DDThh:mm:ss"
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    // Default time to 18:30:00 as per example
    return `${year}-${month}-${day}T18:30:00`;
  };

  const handleCreate = async () => {
    const offerName = (document.getElementById("offerName") as HTMLInputElement)?.value;
    const offerDescription = (document.getElementById("description") as HTMLTextAreaElement)?.value;
    const validFrom = (document.getElementById("validFrom") as HTMLInputElement)?.value;
    const validTo = (document.getElementById("validTo") as HTMLInputElement)?.value;
    const files = fileInputRef.current?.files;

    if (!offerName || !offerDescription || !selectedMall || !validFrom || !validTo || !files?.length) {
      alert("All fields including at least one image are required.");
      return;
    }

    // Date validation
    if (new Date(validFrom) > new Date(validTo)) {
      alert("Valid From date cannot be after Valid To date.");
      return;
    }

    const offerPayload = {
      offerName,
      offerDescription,
      mall: [selectedMall],
      validFrom: formatDate(validFrom),
      validTo: formatDate(validTo),
    };

    const formData = new FormData();
    
    // Add offer data as a string with the correct format
    const offerBlob = new Blob([JSON.stringify(offerPayload)], {
      type: 'application/json'
    });
    formData.append("offer", offerBlob);
    
    // Append files correctly as "files" not "file" based on the curl command
    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const token = localStorage.getItem('token');

    if (!token) {
      alert('User not authenticated. Please login again.');
      return;
    }

    try {
      const response = await axios.post(
        `${baseURL}/v1/offers`,
        formData,
        {
          headers: {
            // Remove Content-Type to let browser set it with boundary for multipart/form-data
            Authorization: `Bearer ${token}`,
            accept: 'application/json'
          },
        }
      );
      console.log("Offer created successfully", response.data);
      onOpenChange(false);
    } catch (error: any) {
      console.error("Error creating offer:", error.response?.data || error.message);
      alert("Something went wrong while creating the offer.");
    }
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
            <label htmlFor="offerName" className="text-sm font-medium text-gray-700">Offer Name</label>
            <Input id="offerName" placeholder="Enter offer name" />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium text-gray-700">Offer Description</label>
            <Textarea id="description" placeholder="Enter offer description" className="min-h-[120px]" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Select Mall</label>
            <Select onValueChange={(val) => setSelectedMall(val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a mall" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3fa85f64-5717-4562-b3fc-2c963f66afa6">Mall One</SelectItem>
                <SelectItem value="mall2">Mall Two</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="validFrom" className="text-sm font-medium text-gray-700">Valid From</label>
              <Input type="date" id="validFrom" />
            </div>
            <div className="space-y-2">
              <label htmlFor="validTo" className="text-sm font-medium text-gray-700">Valid To</label>
              <Input type="date" id="validTo" />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-medium text-gray-700">Offer Images</label>
            <input ref={fileInputRef} type="file" accept="image/*" multiple required />
            <p className="text-xs text-gray-500">*Main Image is required. You can upload up to 3 sub images. Max size: 2MB.</p>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleCreate} className="bg-primary text-white hover:bg-primary/90">Create Offer</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOfferDialog;