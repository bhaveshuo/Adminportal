
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface UserAvatarProps {
  initials: string;
  className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ initials, className }) => {
  return (
    <Avatar className={`h-10 w-10 bg-primary-50 border border-primary-100 shadow-design-sm ring-2 ring-white ${className || ''}`}>
      <AvatarFallback className="text-primary-600 font-design-semibold text-design-sm">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
