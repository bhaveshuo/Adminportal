
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Store, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton 
} from '@/components/ui/sidebar';

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
      label: 'Master', 
      path: '/master',
      active: location.pathname === '/master'
    },
    { 
      icon: Store, 
      label: 'Partners', 
      path: '/partners',
      active: location.pathname === '/partners'
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      path: '/settings',
      active: location.pathname === '/settings'
    },
  ];

  return (
    <Sidebar>
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-design-semibold text-gray-800">Admin Portal</h1>
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
      <div className="mt-auto p-4 border-t border-gray-200">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/login" className="w-full">
                <LogOut className="h-5 w-5" />
                <span>Log out</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </div>
    </Sidebar>
  );
};

export default AppSidebar;
