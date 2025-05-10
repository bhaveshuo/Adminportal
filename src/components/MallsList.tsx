import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface MallImage {
  id: string;
  fileKey: string;
  fileName: string;
  fileType: string;
}

interface MallTiming {
  weekday: {
    opening: string;
    closing: string;
  };
  weekend: {
    opening: string;
    closing: string;
  };
}

interface MallAddress {
  addressLine1: string;
  addressLine2: string;
  pincode: number;
  state: string;
  country: string;
  city: string;
  lat: string;
  lng: string;
  googlePlusCode: string;
  areaName: string;
}

interface Mall {
  id: string;
  accountId: string;
  mallName: string;
  legalEntityName: string;
  contactPersonEmailAddress: string;
  address: MallAddress;
  mallImages: MallImage[];
  mallCategory: string;
  totalBuildUpArea: number;
  floorCounts: number;
  storeCounts: number;
  operatingSince: number;
  timing: MallTiming;
  primaryEmergencyNumber: string;
  securityHeadContact: string;
  fireSafetyOfficeContact: string;
  administrativeContact: string;
  supportEmail: string;
  state: number;
  status: number;
  createdBy: string;
  ownedBy: number;
  createdAt: string;
  updatedAt: string;
  isMallClosed: boolean;
  isAdminCreated: boolean;
}

const MallsList: React.FC = () => {
  const [malls, setMalls] = useState<Mall[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMalls = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/v1/malls`);
        setMalls(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch malls');
        setLoading(false);
        console.error('Error fetching malls:', err);
      }
    };

    fetchMalls();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-2xl font-bold mb-6">Malls</h2>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mall Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Operating Hours</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {malls.map((mall) => (
              <TableRow key={mall.id}>
                <TableCell className="font-medium">
                  {mall.mallName}
                  <div className="text-sm text-gray-500">{mall.legalEntityName}</div>
                </TableCell>
                <TableCell>
                  <div>{mall.address.areaName}</div>
                  <div className="text-sm text-gray-500">
                    {mall.address.city}, {mall.address.state}
                  </div>
                </TableCell>
                <TableCell>
                  <div>{mall.contactPersonEmailAddress}</div>
                  <div className="text-sm text-gray-500">{mall.supportEmail}</div>
                </TableCell>
                <TableCell>
                  <div>Weekday: {mall.timing.weekday.opening} - {mall.timing.weekday.closing}</div>
                  <div>Weekend: {mall.timing.weekend.opening} - {mall.timing.weekend.closing}</div>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    mall.isMallClosed 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {mall.isMallClosed ? 'Closed' : 'Open'}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MallsList; 