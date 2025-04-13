
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface UserAvatarProps {
  initials: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ initials }) => {
  return (
    <Avatar className="h-10 w-10 bg-gray-100 border border-gray-200 shadow-design-sm">
      <AvatarFallback className="text-primary-600 font-design-semibold">{initials}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
