import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const businessTypes = [
  {
    id: 1,
    name: "Retail",
    description: "Businesses that sell goods directly to the consumers",
  },
  {
    id: 2,
    name: "Wholesale",
    description: "Businesses that sell goods in bulk to retailers",
  },
  {
    id: 3,
    name: "Manufacturing",
    description: "Businesses that produce goods",
  },
  {
    id: 4,
    name: "Service",
    description: "Businesses that provide services",
  },
];

const BusinessTypeTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-t border-gray-100">
          <TableHead className="w-[100px] font-medium text-gray-700">Sr.no</TableHead>
          <TableHead className="font-medium text-gray-700">Name</TableHead>
          <TableHead className="font-medium text-gray-700">Description</TableHead>
          <TableHead className="text-right font-medium text-gray-700">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {businessTypes.map((type) => (
          <TableRow key={type.id} className="border-gray-100">
            <TableCell className="font-medium">{type.id}</TableCell>
            <TableCell>{type.name}</TableCell>
            <TableCell className="text-gray-500">{type.description}</TableCell>
            <TableCell className="text-right space-x-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Pencil className="h-4 w-4 text-gray-500" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Trash2 className="h-4 w-4 text-gray-500" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BusinessTypeTable;
