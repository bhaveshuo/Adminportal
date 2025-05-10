import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MoreVertical, Pencil, Trash2, RotateCw, MapPin, Clock, Phone, Mail } from "lucide-react";
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
  mallName: string;
  legalEntityName: string;
  address: MallAddress;
  timing: MallTiming;
  contactPersonEmailAddress: string;
  supportEmail: string;
  isMallClosed: boolean;
}

const MallsTable = () => {
  const [malls, setMalls] = useState<Mall[]>([]);
  const [expandedMallId, setExpandedMallId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMalls();
  }, []);

  const fetchMalls = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/v1/malls?page=0&size=10`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.content && Array.isArray(res.data.content)) {
        setMalls(res.data.content);
      } else {
        console.warn("No malls found or unexpected response structure.");
        setMalls([]);
      }
    } catch (err: any) {
      console.error("❌ Error fetching malls:", err.response?.data || err.message || err);
      setError('Failed to fetch malls. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleAddressRow = (mallId: string) => {
    setExpandedMallId(expandedMallId === mallId ? null : mallId);
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-t border-gray-100">
          <TableHead className="w-[60px] font-medium text-gray-700">Sr.no</TableHead>
          <TableHead className="font-medium text-gray-700">Mall Details</TableHead>
          <TableHead className="font-medium text-gray-700">Location</TableHead>
          <TableHead className="font-medium text-gray-700">Contact Info</TableHead>
          <TableHead className="font-medium text-gray-700">Operating Hours</TableHead>
          <TableHead className="font-medium text-gray-700">Status</TableHead>
          <TableHead className="text-right font-medium text-gray-700">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {malls.length > 0 ? (
          malls.map((mall, index) => (
            <React.Fragment key={mall.id}>
              <TableRow
                className="border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleAddressRow(mall.id)}
              >
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  <div className="font-medium">{mall.mallName || 'N/A'}</div>
                  <div className="text-sm text-gray-500">{mall.legalEntityName || 'N/A'}</div>
                </TableCell>
                <TableCell>
                  <div>{mall.address?.areaName || 'N/A'}</div>
                  <div className="text-sm text-gray-500">
                    {mall.address?.city || 'N/A'}, {mall.address?.state || 'N/A'}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Mail className="h-3 w-3 text-gray-400" />
                    <span className="text-sm">{mall.contactPersonEmailAddress || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Mail className="h-3 w-3" />
                    <span>{mall.supportEmail || 'N/A'}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <span>
                      Weekday: {mall.timing?.weekday.opening || 'N/A'} - {mall.timing?.weekday.closing || 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span>
                      Weekend: {mall.timing?.weekend.opening || 'N/A'} - {mall.timing?.weekend.closing || 'N/A'}
                    </span>
                  </div>
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
                      <span className="text-sm">
                        {`${mall.address?.addressLine1 || ''} ${mall.address?.addressLine2 || ''}, ${mall.address?.pincode || ''}`}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-4 text-gray-500">
              No malls found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default MallsTable;
