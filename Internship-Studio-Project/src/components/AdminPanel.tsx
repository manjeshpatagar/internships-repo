import React from "react";
import { useState } from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from "../components/ui/sidebar";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Switch } from "../components/ui/switch";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import {
  LogOut,
  Plus,
  Edit,
  Trash2,
  Search,
  School,
  Users,
  Shield,
  Settings,
  BookOpen,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  GraduationCap,
  Building,
  BarChart3,
  FileText,
  Database,
  Bell,
  HelpCircle,
  ClipboardList,
  Globe,
} from "lucide-react";

/* ---------- TAB IMPORTS ---------- */
import EducationBoardsTab from "./EducationBoardsTab";
import UsersTab            from "./UsersTab";
import { AdminCollegeView } from "./AdminCollegeView";
import { AdminRolesView }  from "./AdminRolesView";

/* ---------- TYPES ---------- */
interface College {
  id: string;
  name: string;
  location: string;
  type: string;
  established: string;
  website: string;
  status: 'active' | 'inactive';
  programs: string[];
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: 'active' | 'inactive';
  joinDate: string;
  college?: string;
  program?: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
}

interface EducationBoard {
  id: string;
  name: string;
  shortName: string;
  description: string;
  type: string;
  country: string;
  established: string;
  website: string;
  status: 'active' | 'inactive';
  affiliatedColleges: number;
}

interface AdminPanelProps {
  onLogout: () => void;
}

/* ---------- COMPONENT ---------- */
export function AdminPanel({ onLogout }: AdminPanelProps) {
  const [activeView, setActiveView] = useState("dashboard");

  /* ----------------  STATE  ---------------- */
  const [colleges, setColleges] = useState<College[]>([
    { id: "1", name: "Delhi University", location: "Delhi, India", type: "Public University", established: "1922", website: "du.ac.in", status: "active", programs: ["BCA", "MCA", "BSc CS"] },
    { id: "2", name: "Mumbai Institute of Technology", location: "Mumbai, India", type: "Private Institute", established: "1985", website: "mit.edu", status: "active", programs: ["BCA", "Diploma CS", "BSc IT"] }
  ]);

  const [users, setUsers] = useState<User[]>([
    { id: "1", name: "Priya Sharma", email: "priya@example.com", phone: "+91 98765 43210", role: "Student", status: "active", joinDate: "2024-01-15", college: "Delhi University", program: "BCA" },
    { id: "2", name: "Rahul Kumar", email: "rahul@example.com", phone: "+91 87654 32109", role: "Mentor", status: "active", joinDate: "2023-11-20" }
  ]);

  const [roles, setRoles] = useState<Role[]>([
    { id: "1", name: "Admin", description: "Full system access and management", permissions: ["create", "read", "update", "delete", "manage_users", "manage_colleges"], userCount: 2 },
    { id: "2", name: "Student", description: "Access to courses and personal dashboard", permissions: ["read", "update_profile", "apply_internship"], userCount: 1205 },
    { id: "3", name: "Mentor", description: "Mentorship and guidance capabilities", permissions: ["read", "update_profile", "mentor_students", "view_applications"], userCount: 85 }
  ]);

  const [educationBoards, setEducationBoards] = useState<EducationBoard[]>([
    { id: "1", name: "Central Board of Secondary Education", shortName: "CBSE", description: "National level board of education in India for public and private schools", type: "National Board", country: "India", established: "1962", website: "cbse.gov.in", status: "active", affiliatedColleges: 245 },
    { id: "2", name: "Indian Certificate of Secondary Education", shortName: "ICSE", description: "Private board of school education in India", type: "Private Board", country: "India", established: "1958", website: "cisce.org", status: "active", affiliatedColleges: 156 },
    { id: "3", name: "Maharashtra State Board", shortName: "MSBSHSE", description: "State board of education for Maharashtra state", type: "State Board", country: "India", established: "1966", website: "mahahsscboard.in", status: "active", affiliatedColleges: 189 },
    { id: "4", name: "University Grants Commission", shortName: "UGC", description: "Statutory body for coordination, determination and maintenance of standards", type: "Regulatory Body", country: "India", established: "1956", website: "ugc.ac.in", status: "active", affiliatedColleges: 312 }
  ]);

  /* ----------------  HANDLERS  ---------------- */
  const handleAddCollege = () => { /* ...same as before... */ };
  const handleAddUser   = () => { /* ...same as before... */ };
  const handleAddBoard  = () => { /* ...same as before... */ };
  const deleteCollege   = (id: string) => setColleges(c => c.filter(x => x.id !== id));
  const deleteUser      = (id: string) => setUsers(u => u.filter(x => x.id !== id));
  const deleteBoard     = (id: string) => setEducationBoards(b => b.filter(x => x.id !== id));
  const toggleCollegeStatus = (id: string) => setColleges(c => c.map(x => x.id === id ? { ...x, status: x.status === 'active' ? 'inactive' : 'active' } : x));
  const toggleUserStatus    = (id: string) => setUsers(u => u.map(x => x.id === id ? { ...x, status: x.status === 'active' ? 'inactive' : 'active' } : x));
  const toggleBoardStatus   = (id: string) => setEducationBoards(b => b.map(x => x.id === id ? { ...x, status: x.status === 'active' ? 'inactive' : 'active' } : x));

  /* ----------------  NAV  ---------------- */
  const sidebarNavigation = [
    { title: "Overview", items: [{ title: "Dashboard", icon: BarChart3, id: "dashboard" }, { title: "Analytics", icon: FileText, id: "analytics" }] },
    { title: "Management", items: [{ title: "Colleges", icon: School, id: "colleges" }, { title: "Education Boards", icon: ClipboardList, id: "boards" }, { title: "Users", icon: Users, id: "users" }, { title: "Roles", icon: Shield, id: "roles" }] },
    { title: "System", items: [{ title: "Settings", icon: Settings, id: "settings" }, { title: "Database", icon: Database, id: "database" }] }
  ];

  /* ----------------  RENDER  ---------------- */
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50/40">
        {/* ---------- SIDEBAR ---------- */}
        <Sidebar variant="inset">
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2 py-1">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <GraduationCap className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Career Studio</span>
                <span className="truncate text-xs text-muted-foreground">Admin Panel</span>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            {sidebarNavigation.map((group) => (
              <SidebarGroup key={group.title}>
                <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton isActive={activeView === item.id} onClick={() => setActiveView(item.id)}>
                          <item.icon className="size-4" />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>

          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton><HelpCircle className="size-4" /><span>Help & Support</span></SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={onLogout}><LogOut className="size-4" /><span>Logout</span></SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        {/* ---------- MAIN AREA ---------- */}
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1">
              <h1 className="text-lg font-semibold capitalize">
                {activeView === "dashboard" ? "Dashboard" :
                 activeView === "analytics" ? "Analytics" :
                 activeView === "colleges" ? "College Management" :
                 activeView === "boards" ? "Education Board Management" :
                 activeView === "users" ? "User Management" :
                 activeView === "roles" ? "Roles & Permissions" :
                 activeView === "settings" ? "System Settings" :
                 activeView === "database" ? "Database Management" : activeView}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon"><Bell className="size-4" /></Button>
              <Avatar className="h-8 w-8"><AvatarFallback>AD</AvatarFallback></Avatar>
            </div>
          </header>

          <main className="flex-1 space-y-4 p-4 md:p-6">
            {/* ---------- VIEWS ---------- */}
            {activeView === "dashboard"   && <div>Dashboard cards...</div>}
            {activeView === "analytics"   && <div>Analytics...</div>}
            {activeView === "colleges"    && <AdminCollegeView colleges={colleges} setColleges={setColleges} />}
            {activeView === "boards"      && <EducationBoardsTab boards={educationBoards} setBoards={setEducationBoards} />}
            {activeView === "users"       && <UsersTab users={users} setUsers={setUsers} colleges={colleges} />}
            {activeView === "roles"       && <AdminRolesView />}
            {activeView === "settings"    && <div>Settings...</div>}
            {activeView === "database"    && <div>Database...</div>}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}