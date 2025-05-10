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
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

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
  accountId: string;
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const MallsTable = () => {
  const [malls, setMalls] = useState<Mall[]>([]);
  const [expandedMallId, setExpandedMallId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const refreshUserSession = async () => {
    try {
      // Get refresh token from localStorage
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      // Call your refresh token endpoint
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/refresh`, {
        refreshToken
      });

      // Update tokens in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);

      return response.data.token;
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  };

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const fetchMallsWithRetry = async (retryCount = 0) => {
    try {
      setLoading(true);
      setError(null);
      let token = localStorage.getItem('token');
      const accountId = localStorage.getItem('accountId');
      const userId = localStorage.getItem('userId');
      
      if (!token || !accountId) {
        navigate('/login');
        return;
      }

      try {
        console.log('Current User Info:', { accountId, userId });
        
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/v1/malls/admin`, 
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        console.log('API Response:', res.data);

        if (res.data.content && Array.isArray(res.data.content)) {
          // Filter malls based on ownership and account
          const filteredMalls = res.data.content.filter(mall => {
            console.log('Checking mall:', {
              mallId: mall.id,
              mallOwnedBy: mall.ownedBy,
              mallCreatedBy: mall.createdBy,
              userAccountId: accountId,
              userId: userId
            });
            
            // Check if the mall belongs to the current user's account
            return (
              mall.status === 2 && // Only show active malls
              (
                mall.ownedBy.toString() === accountId || // Check ownedBy
                mall.createdBy === userId || // Check createdBy
                mall.accountId === accountId // Check accountId
              )
            );
          });

          console.log('Filtered Malls:', filteredMalls);
          setMalls(filteredMalls);
        } else {
          console.log('No malls found in response');
          setMalls([]);
        }
      } catch (err: any) {
        console.error("Error fetching malls:", err.response?.data || err.message || err);
        
        // Handle authentication errors
        if (err.response?.status === 401 || 
            (err.response?.data?.error && err.response?.data?.error.includes('JWT expired'))) {
          toast({
            variant: "destructive",
            title: "Session Expired",
            description: "Your session has expired. Please log in again.",
          });
          localStorage.clear();
          navigate('/login');
          return;
        }

        // Handle server errors (500)
        if (err.response?.status === 500) {
          // If it's a role-related error
          if (err.response?.data?.error?.includes('roles')) {
            toast({
              variant: "destructive",
              title: "Authorization Error",
              description: "Please log out and log in again to refresh your permissions.",
            });
            localStorage.clear();
            navigate('/login');
            return;
          }

          // For other 500 errors
          toast({
            variant: "destructive",
            title: "Server Error",
            description: "We're experiencing technical difficulties. Please try again in a few minutes.",
          });

          // If we haven't exceeded max retries, attempt retry
          if (retryCount < MAX_RETRIES) {
            toast({
              title: "Retrying Connection",
              description: `Attempt ${retryCount + 1} of ${MAX_RETRIES}`,
              duration: 2000,
            });
            await delay(RETRY_DELAY * Math.pow(2, retryCount));
            return fetchMallsWithRetry(retryCount + 1);
          }
        }

        setError(
          !err.response ? 
          'Could not connect to server. Please check your internet connection.' : 
          `Server error: ${err.response?.data?.message || 'Failed to fetch malls. Please try again.'}`
        );
      } finally {
        setLoading(false);
      }
    } catch (err: any) {
      console.error("Error fetching malls:", err.response?.data || err.message || err);
      
      if (err.response?.status === 401 || 
          (err.response?.data?.error && err.response?.data?.error.includes('JWT expired'))) {
        toast({
          variant: "destructive",
          title: "Session Expired",
          description: "Your session has expired. Please log in again.",
        });
        localStorage.clear();
        navigate('/login');
        return;
      }

      if (err.response?.status === 500 && err.response?.data?.error?.includes('roles')) {
        toast({
          variant: "destructive",
          title: "Authorization Error",
          description: "Please log out and log in again to refresh your permissions.",
        });
        localStorage.clear();
        navigate('/login');
        return;
      }

      setError(
        !err.response ? 
        'Could not connect to server. Please check your internet connection.' : 
        'Failed to fetch malls. Please try again.'
      );
    }
  };

  const handleRefresh = () => {
    fetchMallsWithRetry();
  };

  const toggleAddressRow = (mallId: string) => {
    setExpandedMallId(expandedMallId === mallId ? null : mallId);
  };

  useEffect(() => {
    fetchMallsWithRetry();
  }, []);

  const renderTableRow = (mall: Mall, index: number) => {
    return (
      <TableRow
        key={mall.id}
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
    );
  };

  const renderExpandedRow = (mall: Mall) => {
    if (expandedMallId !== mall.id) return null;
    return (
      <TableRow key={`${mall.id}-expanded`} className="bg-gray-50 border-0">
        <TableCell className="py-3 px-4" colSpan={7}>
          <div className="flex items-center gap-2 text-gray-600 pl-4 bg-gray-50 border-l-2 border-gray-200 rounded p-3 transition-all">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="text-sm">
              {`${mall.address?.addressLine1 || ''} ${mall.address?.addressLine2 || ''}, ${mall.address?.pincode || ''}`}
            </span>
          </div>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Mall List</h2>
        <Button onClick={handleRefresh} variant="outline" size="sm">
          <RotateCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : error ? (
        <div className="text-center py-4">
          <p className="text-red-500 mb-2">{error}</p>
          <Button onClick={handleRefresh} variant="outline" size="sm">
            <RotateCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      ) : (
        <div className="rounded-md border">
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
              {malls.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                    No malls found.
                  </TableCell>
                </TableRow>
              ) : (
                malls.map((mall, index) => (
                  <React.Fragment key={mall.id}>
                    {renderTableRow(mall, index)}
                    {renderExpandedRow(mall)}
                  </React.Fragment>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default MallsTable;
