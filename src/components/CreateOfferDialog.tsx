import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Image } from 'lucide-react';
import axios from 'axios';

interface CreateOfferDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void; // Optional callback for successful creation
}

const CreateOfferDialog: React.FC<CreateOfferDialogProps> = ({ open, onOpenChange, onSuccess }) => {
  const [selectedMall, setSelectedMall] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [offerName, setOfferName] = useState('');
  const [offerDescription, setOfferDescription] = useState('');
  const [validFrom, setValidFrom] = useState('');
  const [validTo, setValidTo] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Reset all form state when dialog opens or closes
  useEffect(() => {
    resetForm();
  }, [open]);

  const resetForm = () => {
    setOfferName('');
    setOfferDescription('');
    setSelectedMall('');
    setValidFrom('');
    setValidTo('');
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Format the date to match "YYYY-MM-DDThh:mm:ss"
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    // Default time to 18:30:00 as per example
    return `${year}-${month}-${day}T18:30:00`;
  };

  const handleCreate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!offerName || !offerDescription || !selectedMall || !validFrom || !validTo || !fileInputRef.current?.files?.length) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "All fields including at least one image are required."
      });
      return;
    }

    // Date validation
    if (new Date(validFrom) > new Date(validTo)) {
      toast({
        variant: "destructive",
        title: "Date Error",
        description: "Valid From date cannot be after Valid To date."
      });
      return;
    }

    const files = fileInputRef.current.files;
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
    
    // Append files correctly
    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const token = localStorage.getItem('token');
    if (!token) {
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "User not authenticated. Please login again."
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${baseURL}/v1/offers`,
        formData,
        {
          headers: {
            // Don't set Content-Type for FormData
            Authorization: token,
            accept: 'application/json'
          },
          // Add timeout to prevent hanging requests
          timeout: 10000
        }
      );
      
      console.log("Offer created successfully", response.data);
      toast({
        title: "Success",
        description: "Offer created successfully"
      });
      
      // Reset form
      resetForm();
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }
      
      // Close dialog
      onOpenChange(false);
    } catch (error: any) {
      console.error("Error creating offer:", error.response?.data || error.message);
      
      // Try to extract more detailed error message
      const errorMessage = 
        error.response?.data?.message || 
        error.response?.data?.error || 
        error.message || 
        "Something went wrong while creating the offer.";
      
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle cancel - reset form and close dialog
  const handleCancel = () => {
    resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      if (!newOpen) resetForm();
      onOpenChange(newOpen);
    }}>
      <DialogContent className="max-w-[600px] p-0 bg-white overflow-hidden">
        <DialogHeader className="px-6 py-4 bg-white border-b border-gray-100">
          <DialogTitle className="text-xl font-semibold text-gray-900">Create New Offer</DialogTitle>
          <p className="text-sm text-gray-500">Add a new offer to be displayed in the customer app</p>
        </DialogHeader>
        
        <div className="px-6 py-4 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="offerName" className="text-sm font-medium text-gray-700">
                Offer Name
              </label>
              <Input 
                id="offerName" 
                placeholder="Enter offer name" 
                value={offerName}
                onChange={(e) => setOfferName(e.target.value)}
                className="w-full" 
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium text-gray-700">
                Offer Description
              </label>
              <Textarea 
                id="description" 
                placeholder="Enter offer description" 
                value={offerDescription}
                onChange={(e) => setOfferDescription(e.target.value)}
                className="min-h-[120px] resize-none"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Select Mall</label>
              <Select 
                value={selectedMall} 
                onValueChange={setSelectedMall}
              >
                <SelectTrigger className="w-full">
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
                <Input 
                  type="date" 
                  id="validFrom"
                  value={validFrom}
                  onChange={(e) => setValidFrom(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="validTo" className="text-sm font-medium text-gray-700">Valid To</label>
                <Input 
                  type="date" 
                  id="validTo"
                  value={validTo}
                  onChange={(e) => setValidTo(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Offer Images</label>
              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-1 text-center">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    required
                    className="sr-only"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-600 focus-within:outline-none"
                  >
                    <div className="flex flex-col items-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-sm text-gray-600">Drop files here or click to upload</span>
                    </div>
                  </label>
                  <p className="text-xs text-gray-500">*Main Image is required. You can upload up to 3 sub images. Max size: 2MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-100">
          <Button 
            variant="outline" 
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleCreate}
            className="bg-primary text-white hover:bg-primary/90"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Offer"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOfferDialog;