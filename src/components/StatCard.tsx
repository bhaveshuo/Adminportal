
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description }) => {
  return (
    <Card className="bg-white border-gray-200 rounded-design-lg shadow-design-sm hover:shadow-design-md transition-all duration-200">
      <CardContent className="p-6">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <p className="text-design-sm font-design-medium text-gray-500">{title}</p>
            <div className="rounded-full p-2 bg-primary-50 text-primary-600">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <h3 className="text-2xl md:text-3xl font-design-bold text-gray-800">{value}</h3>
          <p className="text-design-sm text-gray-500">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
