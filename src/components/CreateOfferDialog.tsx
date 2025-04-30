import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X } from "lucide-react";

interface CreateOfferDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateOfferDialog: React.FC<CreateOfferDialogProps> = ({ open, onOpenChange }) => {
  // State to manage uploaded images
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [subImages, setSubImages] = useState<string[]>([null, null, null]);
  
  // Refs for hidden file inputs
  const mainInputRef = useRef<HTMLInputElement>(null);
  const subInputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];
  
  const handleImageUpload = (file: File, isMain: boolean, index: number = 0) => {
    if (!file) return;
    
    // Check file size (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      alert("File size should be less than 2MB");
      return;
    }
    
    // Create URL for preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageDataUrl = e.target?.result as string;
      
      if (isMain) {
        setMainImage(imageDataUrl);
      } else {
        const newSubImages = [...subImages];
        newSubImages[index] = imageDataUrl;
        setSubImages(newSubImages);
      }
    };
    reader.readAsDataURL(file);
  };
  
  const handleRemoveImage = (isMain: boolean, index: number = 0) => {
    if (isMain) {
      setMainImage(null);
    } else {
      const newSubImages = [...subImages];
      newSubImages[index] = null;
      setSubImages(newSubImages);
    }
  };
  
  const handleCreate = () => {
    // Handle form submission with images
    // You can access mainImage and subImages here
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col bg-white">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-xl font-semibold text-gray-900">Create new offer</DialogTitle>
          <p className="text-sm text-gray-500">This offer will be floated on the customer app</p>
        </DialogHeader>

        <div className="space-y-6 px-6 py-4 flex-1 overflow-y-auto">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="offerName">Offer Name</label>
            <Input 
              id="offerName" 
              placeholder="Enter offer name"
              className="border-gray-200 focus:border-primary-500 focus:ring focus:ring-primary-100 w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="description">Offer Description</label>
            <Textarea 
              id="description" 
              placeholder="Enter offer description"
              className="border-gray-200 focus:border-primary-500 focus:ring focus:ring-primary-100 min-h-[120px] w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Select Mall</label>
            <Select>
              <SelectTrigger className="border-gray-200 focus:border-primary-500 focus:ring focus:ring-primary-100 w-full">
                <SelectValue placeholder="Select a mall" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mall1">Mall One</SelectItem>
                <SelectItem value="mall2">Mall Two</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Valid From</label>
              <Input 
                type="date" 
                className="border-gray-200 focus:border-primary-500 focus:ring focus:ring-primary-100 w-full"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Valid To</label>
              <Input 
                type="date"
                className="border-gray-200 focus:border-primary-500 focus:ring focus:ring-primary-100 w-full"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-medium text-gray-700">Offer Images</label>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {/* Hidden file inputs */}
              <input 
                type="file" 
                ref={mainInputRef}
                className="hidden" 
                accept="image/*" 
                onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], true)}
              />
              
              {subInputRefs.map((ref, idx) => (
                <input
                  key={`file-input-${idx}`}
                  type="file"
                  ref={ref}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], false, idx)}
                />
              ))}

              {/* Main Image */}
              {!mainImage ? (
                <div 
                  onClick={() => mainInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center h-24 hover:border-primary-500 transition-colors cursor-pointer bg-gray-50"
                >
                  <Plus className="h-6 w-6 text-gray-400" />
                  <span className="text-xs text-gray-500 mt-2">Main Image</span>
                </div>
              ) : (
                <div className="relative h-24 rounded-lg overflow-hidden">
                  <img 
                    src={mainImage} 
                    alt="Main" 
                    className="w-full h-full object-cover" 
                  />
                  <button 
                    onClick={() => handleRemoveImage(true)}
                    className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                  >
                    <X className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              )}

              {/* Sub Images */}
              {subImages.map((img, i) => (
                !img ? (
                  <div 
                    key={`sub-placeholder-${i}`}
                    onClick={() => subInputRefs[i].current?.click()}
                    className="border-2 border-dashed border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center h-24 hover:border-primary-500 transition-colors cursor-pointer bg-gray-50"
                  >
                    <Plus className="h-6 w-6 text-gray-400" />
                    <span className="text-xs text-gray-500 mt-2">Sub Image</span>
                  </div>
                ) : (
                  <div key={`sub-image-${i}`} className="relative h-24 rounded-lg overflow-hidden">
                    <img 
                      src={img} 
                      alt={`Sub ${i+1}`} 
                      className="w-full h-full object-cover"
                    />
                    <button 
                      onClick={() => handleRemoveImage(false, i)}
                      className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                    >
                      <X className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                )
              ))}
            </div>
            <div className="text-xs text-gray-500 space-y-1">
              <p>*Main Image is required, Upload up to 3 sub images.</p>
              <p>*Recommended Image size: 1920x1080px. Max file size: 2MB.</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-gray-100 mt-auto">
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