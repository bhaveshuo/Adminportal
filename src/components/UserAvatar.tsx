
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface UserAvatarProps {
  initials: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ initials }) => {
  return (
    <Avatar className="h-10 w-10 bg-gray-200">
      <AvatarFallback className="text-gray-700 font-medium">{initials}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
