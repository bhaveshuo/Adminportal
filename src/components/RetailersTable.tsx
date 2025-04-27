
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UserAvatar from "@/components/UserAvatar";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

const retailers = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex@company.org",
    status: "Active",
    partnerTier: "Basic",
    stores: 1,
    dateJoined: "14/8/2023",
  },
  {
    id: 2,
    name: "Alex Johnson",
    email: "alex@company.org",
    status: "Active",
    partnerTier: "Basic",
    stores: 5,
    dateJoined: "14/8/2023",
  },
  {
    id: 3,
    name: "Alex Johnson",
    email: "alex@company.org",
    status: "Active",
    partnerTier: "Basic",
    stores: 12,
    dateJoined: "14/8/2023",
  },
  {
    id: 4,
    name: "Alex Johnson",
    email: "alex@company.org",
    status: "Active",
    partnerTier: "Basic",
    stores: 3,
    dateJoined: "14/8/2023",
  },
  {
    id: 5,
    name: "Alex Johnson",
    email: "alex@company.org",
    status: "Active",
    partnerTier: "Basic",
    stores: 5,
    dateJoined: "14/8/2023",
  },
];

const RetailersTable = () => {
  return (
    <div className="relative">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-gray-100">
            <TableHead className="min-w-[250px] font-semibold text-gray-700">Retailers Name & Email</TableHead>
            <TableHead className="font-semibold text-gray-700">Status</TableHead>
            <TableHead className="font-semibold text-gray-700">Partner Tier</TableHead>
            <TableHead className="font-semibold text-gray-700">Stores</TableHead>
            <TableHead className="font-semibold text-gray-700">Date Joined</TableHead>
            <TableHead className="text-right font-semibold text-gray-700">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {retailers.map((retailer) => (
            <TableRow key={retailer.id} className="hover:bg-gray-50/50 border-gray-100">
              <TableCell>
                <div className="flex items-center gap-3">
                  <UserAvatar 
                    initials={retailer.name.split(' ').map(n => n[0]).join('')}
                    className="bg-primary/10 text-primary ring-0"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{retailer.name}</div>
                    <div className="text-sm text-gray-500">{retailer.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  {retailer.status}
                </span>
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                  {retailer.partnerTier}
                </span>
              </TableCell>
              <TableCell className="font-medium text-gray-900">{retailer.stores}</TableCell>
              <TableCell className="text-gray-500">{retailer.dateJoined}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                  <MoreHorizontal className="h-4 w-4 text-gray-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RetailersTable;
