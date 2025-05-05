import React, { useState } from 'react';
import { MoreVertical, Pencil, Trash2, RotateCw, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data based on the wireframe
const malls = [
  {
    id: 1,
    name: "Royal Meenakshi Mall",
    area: "Bannerghatta Rd",
    state: "Karnataka",
    city: "Bangalore",
    zipCode: "560076",
    address: "Bannerghatta Rd, Hulimava, Royal Meenakshi Mall"
  },
  {
    id: 2,
    name: "Phoenix Market City",
    area: "Kurla Rd",
    state: "Maharashtra",
    city: "Mumbai",
    zipCode: "100010",
    address: "Market city Rd, Kurla East"
  },
  {
    id: 3,
    name: "Phoenix Market City",
    area: "Kurla Rd",
    state: "Maharashtra",
    city: "Mumbai",
    zipCode: "100010",
    address: "Market city Rd, Kurla East"
  }
];

const MallsTable = () => {
  const [expandedMallId, setExpandedMallId] = useState<number | null>(null);

  const toggleAddressRow = (mallId: number) => {
    setExpandedMallId(expandedMallId === mallId ? null : mallId);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-t border-gray-100">
          <TableHead className="w-[100px] font-medium text-gray-700">Sr.no</TableHead>
          <TableHead className="font-medium text-gray-700">Name</TableHead>
          <TableHead className="font-medium text-gray-700">Area</TableHead>
          <TableHead className="font-medium text-gray-700">State</TableHead>
          <TableHead className="font-medium text-gray-700">City</TableHead>
          <TableHead className="font-medium text-gray-700">Zip code</TableHead>
          <TableHead className="text-right font-medium text-gray-700">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {malls.map((mall) => (
          <React.Fragment key={mall.id}>
            <TableRow 
              className="border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleAddressRow(mall.id)}
            >
              <TableCell className="font-medium">{mall.id}</TableCell>
              <TableCell>{mall.name}</TableCell>
              <TableCell className="text-gray-500">{mall.area}</TableCell>
              <TableCell className="text-gray-500">{mall.state}</TableCell>
              <TableCell className="text-gray-500">{mall.city}</TableCell>
              <TableCell className="text-gray-500">{mall.zipCode}</TableCell>
              <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4 text-gray-500" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white shadow-md border-gray-200 rounded-md">
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-gray-50">
                      <Pencil className="h-4 w-4 text-gray-500" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-red-500 hover:bg-gray-50">
                      <Trash2 className="h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-gray-50">
                      <RotateCw className="h-4 w-4 text-gray-500" />
                      <span>Override</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
            {expandedMallId === mall.id && (
              <TableRow className="bg-gray-50 border-0">
                <TableCell className="py-3 px-4" colSpan={7}>
                  <div className="flex items-center gap-2 text-gray-600 pl-4 bg-gray-50 border-l-2 border-gray-200 rounded p-3 transition-all">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{mall.address}</span>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
};

export default MallsTable;
