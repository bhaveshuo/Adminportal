
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard,
  Settings,
  Building,
  Users,
  Icon,
  icons,
  Handshake,
  User,
  LogOut,
  Database
} from 'lucide-react';
import { 
  Sidebar, 
  SidebarContent,
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton 
} from '@/components/ui/sidebar';
import UserAvatar from './UserAvatar';
import { Button } from '@/components/ui/button'

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
      icon: Database, 
      label: 'Master', 
      path: '/master',
      active: location.pathname === '/master'
    },

    { 
      icon: Users, 
      label: 'Retailers', 
      path: '/Retailers',
      active: location.pathname === '/retailers'
    },

    { 
      icon: Building, 
      label: 'Malls', 
      path: '/Malls',
      active: location.pathname === '/Malls'
    },

    { 
      icon: Settings, 
      label: 'Settings', 
      path: '/settings',
      active: location.pathname === '/settings'
    }
  ];
  
  const handleLogout = () => {
    // Here you would typically handle logout functionality
    console.log('Logout clicked');
    // For demonstration, we'll just redirect to login page
    window.location.href = '/login';
  };

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
      <div className="flex flex-col">
          <div className="flex items-center gap-3 text-sm mb-3">
            <UserAvatar initials="BM" />
            <div className="flex-1">
              <p className="font-medium text-gray-900">Bhavesh Mhatre</p>
              <p className="text-gray-500 text-xs">Administrator</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start text-gray-600 hover:text-red-600 hover:bg-red-50 mt-1"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </Sidebar>
  );
};

export default AppSidebar;
