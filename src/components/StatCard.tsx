
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description }) => {
  return (
    <Card className="bg-gray-50 border-gray-200 rounded-design-lg shadow-design-sm hover:shadow-design-md transition-shadow">
      <CardContent className="pt-6">
        <div className="space-y-2">
          <p className="text-sm text-gray-500 font-design-medium">{title}</p>
          <h3 className="text-3xl font-design-bold text-gray-800">{value}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
