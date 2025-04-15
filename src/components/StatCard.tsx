
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  trend?: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description, trend }) => {
  const isPositive = trend && trend > 0;
  const trendColor = isPositive ? 'text-green-600' : 'text-red-600';
  const trendIcon = isPositive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />;

  return (
    <Card className="bg-white border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
      <CardContent className="p-6">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
            {trend && (
              <div className={`flex items-center gap-1 text-sm ${trendColor}`}>
                {trendIcon}
                {Math.abs(trend).toFixed(2)}%
              </div>
            )}
          </div>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
