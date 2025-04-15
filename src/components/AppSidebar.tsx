
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Store, 
  Settings,
  Menu,
  CalendarDays,
  FileText,
  LogOut 
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
      icon: Store, 
      label: 'Tables', 
      path: '/master',
      active: location.pathname === '/master'
    },
    { 
      icon: CalendarDays, 
      label: 'Reservations', 
      path: '/reservations',
      active: location.pathname === '/reservations'
    },
    { 
      icon: Users, 
      label: 'Waiters', 
      path: '/waiters',
      active: location.pathname === '/waiters'
    },
    { 
      icon: Menu, 
      label: 'Menu', 
      path: '/menu',
      active: location.pathname === '/menu'
    },
    { 
      icon: FileText, 
      label: 'Reports', 
      path: '/reports',
      active: location.pathname === '/reports'
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      path: '/settings',
      active: location.pathname === '/settings'
    }
  ];

  return (
    <Sidebar variant="inset" className="bg-[#1A1A1A] text-gray-300">
      <div className="p-4 border-b border-gray-800">
        <h1 className="text-xl font-semibold text-white flex items-center gap-2">
          <span className="text-primary">•</span> TABELA
        </h1>
      </div>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton asChild isActive={item.active}>
                <Link to={item.path} className="w-full">
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <div className="mt-auto p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 text-sm">
          <UserAvatar initials="AS" />
          <div className="flex-1">
            <p className="font-medium text-white">Ann Smith</p>
            <p className="text-gray-400 text-xs">Administrator</p>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default AppSidebar;
