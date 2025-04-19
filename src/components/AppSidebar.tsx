
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard,
  Settings,
  Building,
  Users
} from 'lucide-react';
import { 
  Sidebar, 
  SidebarContent,
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton 
} from '@/components/ui/sidebar';
import UserAvatar from './UserAvatar';

const AppSidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      path: '/dashboard',
      active: location.pathname === '/dashboard'
    },
    { 
      icon: Users, 
      label: 'Partner', 
      path: '/partner',
      active: location.pathname === '/partner'
    },
    { 
      icon: Building, 
      label: 'Master', 
      path: '/master',
      active: location.pathname === '/master'
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      path: '/settings',
      active: location.pathname === '/settings'
    }
  ];

  return (
    <Sidebar className="bg-white border-r border-gray-100">
      <div className="p-4 border-b border-gray-100">
        <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          Admin Portal
        </h1>
      </div>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton asChild isActive={item.active}>
                <Link 
                  to={item.path}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <div className="mt-auto p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 text-sm">
          <UserAvatar initials="BM" />
          <div className="flex-1">
            <p className="font-medium text-gray-900">Bhavesh Mhatre</p>
            <p className="text-gray-500 text-xs">Administrator</p>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default AppSidebar;
