
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description }) => {
  return (
    <Card className="bg-gray-50">
      <CardContent className="pt-6">
        <div className="space-y-2">
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-3xl font-bold">{value}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
