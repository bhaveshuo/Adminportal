
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description }) => {
  return (
    <Card className="bg-gray-100/50 rounded-xl border-0 hover:bg-gray-100 transition-all duration-200">
      <CardContent className="p-6">
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
