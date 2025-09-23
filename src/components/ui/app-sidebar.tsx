import { useState } from "react";
import { 
  BookOpen, 
  GraduationCap, 
  FileText, 
  Brain,
  BarChart3,
  Users,
  Settings,
  Home,
  Upload,
  ClipboardList
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

// Get user role from auth context

const studentItems = [
  { title: "Dashboard", url: "/student", icon: Home },
  { title: "Upload Assignment", url: "/student/upload", icon: Upload },
  { title: "Take Quiz", url: "/student/quiz", icon: ClipboardList },
  { title: "My Grades", url: "/student/grades", icon: BarChart3 },
];

const teacherItems = [
  { title: "Dashboard", url: "/teacher", icon: Home },
  { title: "Review Assignments", url: "/teacher/assignments", icon: FileText },
  { title: "Create Quiz", url: "/teacher/quiz-generator", icon: Brain },
  { title: "Student Progress", url: "/teacher/progress", icon: Users },
  { title: "AI Grading", url: "/teacher/grading", icon: GraduationCap },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const { user } = useAuth();
  
  const userRole = user?.role || 'student';
  const items = userRole === 'student' ? studentItems : teacherItems;
  const isActive = (path: string) => currentPath === path;
  const isExpanded = items.some((i) => isActive(i.url));
  const collapsed = state === 'collapsed';
  
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-gradient-primary text-primary-foreground font-medium shadow-soft" 
      : "hover:bg-muted/50 transition-colors";

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent>
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-bold text-lg">EduGrade</h2>
                <p className="text-sm text-muted-foreground capitalize">{userRole}</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>
            {userRole === 'student' ? 'Student Portal' : 'Teacher Portal'}
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavCls({ isActive: isActive(item.url) })}
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span className="ml-3">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink 
                    to="/settings" 
                    className={getNavCls({ isActive: isActive('/settings') })}
                  >
                    <Settings className="h-5 w-5" />
                    {!collapsed && <span className="ml-3">Settings</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}