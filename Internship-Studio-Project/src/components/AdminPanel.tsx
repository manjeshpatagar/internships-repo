import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { AdminCollegeView } from "../components/AdminCollegeView";
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
  SidebarSeparator,
} from "./ui/sidebar";
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
  Home,
  ClipboardList,
  Globe
} from "lucide-react";


interface AdminPanelProps {
  onLogout: () => void;
}

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

export function AdminPanel({ onLogout }: AdminPanelProps) {
  const [activeView, setActiveView] = useState("dashboard");
  
  // Sample data
  const [colleges, setColleges] = useState<College[]>([
    {
      id: "1",
      name: "Delhi University",
      location: "Delhi, India",
      type: "Public University",
      established: "1922",
      website: "du.ac.in",
      status: "active",
      programs: ["BCA", "MCA", "BSc CS"]
    },
    {
      id: "2", 
      name: "Mumbai Institute of Technology",
      location: "Mumbai, India",
      type: "Private Institute",
      established: "1985",
      website: "mit.edu",
      status: "active",
      programs: ["BCA", "Diploma CS", "BSc IT"]
    }
  ]);

  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Priya Sharma",
      email: "priya@example.com",
      phone: "+91 98765 43210",
      role: "Student",
      status: "active",
      joinDate: "2024-01-15",
      college: "Delhi University",
      program: "BCA"
    },
    {
      id: "2",
      name: "Rahul Kumar",
      email: "rahul@example.com", 
      phone: "+91 87654 32109",
      role: "Mentor",
      status: "active",
      joinDate: "2023-11-20"
    }
  ]);

  const [roles, setRoles] = useState<Role[]>([
    {
      id: "1",
      name: "Admin",
      description: "Full system access and management",
      permissions: ["create", "read", "update", "delete", "manage_users", "manage_colleges"],
      userCount: 2
    },
    {
      id: "2", 
      name: "Student",
      description: "Access to courses and personal dashboard",
      permissions: ["read", "update_profile", "apply_internship"],
      userCount: 1205
    },
    {
      id: "3",
      name: "Mentor",
      description: "Mentorship and guidance capabilities",
      permissions: ["read", "update_profile", "mentor_students", "view_applications"],
      userCount: 85
    }
  ]);

  const [educationBoards, setEducationBoards] = useState<EducationBoard[]>([
    {
      id: "1",
      name: "Central Board of Secondary Education",
      shortName: "CBSE",
      description: "National level board of education in India for public and private schools",
      type: "National Board",
      country: "India",
      established: "1962",
      website: "cbse.gov.in",
      status: "active",
      affiliatedColleges: 245
    },
    {
      id: "2",
      name: "Indian Certificate of Secondary Education",
      shortName: "ICSE",
      description: "Private board of school education in India",
      type: "Private Board",
      country: "India",
      established: "1958",
      website: "cisce.org",
      status: "active",
      affiliatedColleges: 156
    },
    {
      id: "3",
      name: "Maharashtra State Board",
      shortName: "MSBSHSE",
      description: "State board of education for Maharashtra state",
      type: "State Board",
      country: "India",
      established: "1966",
      website: "mahahsscboard.in",
      status: "active",
      affiliatedColleges: 189
    },
    {
      id: "4",
      name: "University Grants Commission",
      shortName: "UGC",
      description: "Statutory body for coordination, determination and maintenance of standards",
      type: "Regulatory Body",
      country: "India",
      established: "1956",
      website: "ugc.ac.in",
      status: "active",
      affiliatedColleges: 312
    }
  ]);

  // College form state
  const [collegeForm, setCollegeForm] = useState({
    name: '',
    location: '',
    type: 'Public University',
    established: '',
    website: '',
    programs: [] as string[]
  });

  // User form state
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Student',
    college: '',
    program: ''
  });

  // Education Board form state
  const [boardForm, setBoardForm] = useState({
    name: '',
    shortName: '',
    description: '',
    type: 'National Board',
    country: 'India',
    established: '',
    website: ''
  });

  const handleAddCollege = () => {
    const newCollege: College = {
      id: Date.now().toString(),
      ...collegeForm,
      status: 'active'
    };
    setColleges([...colleges, newCollege]);
    setCollegeForm({ name: '', location: '', type: 'Public University', established: '', website: '', programs: [] });
  };

  const handleAddUser = () => {
    const newUser: User = {
      id: Date.now().toString(),
      ...userForm,
      status: 'active',
      joinDate: new Date().toISOString().split('T')[0]
    };
    setUsers([...users, newUser]);
    setUserForm({ name: '', email: '', phone: '', role: 'Student', college: '', program: '' });
  };

  const handleAddBoard = () => {
    const newBoard: EducationBoard = {
      id: Date.now().toString(),
      ...boardForm,
      status: 'active',
      affiliatedColleges: 0
    };
    setEducationBoards([...educationBoards, newBoard]);
    setBoardForm({ name: '', shortName: '', description: '', type: 'National Board', country: 'India', established: '', website: '' });
  };

  const deleteCollege = (id: string) => {
    setColleges(colleges.filter(c => c.id !== id));
  };

  const deleteUser = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const toggleCollegeStatus = (id: string) => {
    setColleges(colleges.map(c => 
      c.id === id ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' } : c
    ));
  };

  const toggleUserStatus = (id: string) => {
    setUsers(users.map(u => 
      u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u
    ));
  };

  const deleteBoard = (id: string) => {
    setEducationBoards(educationBoards.filter(b => b.id !== id));
  };

  const toggleBoardStatus = (id: string) => {
    setEducationBoards(educationBoards.map(b => 
      b.id === id ? { ...b, status: b.status === 'active' ? 'inactive' : 'active' } : b
    ));
  };

  const sidebarNavigation = [
    {
      title: "Overview",
      items: [
        { title: "Dashboard", icon: BarChart3, id: "dashboard" },
        { title: "Analytics", icon: FileText, id: "analytics" },
      ]
    },
    {
      title: "Management",
      items: [
        { title: "Colleges", icon: School, id: "colleges" },
        { title: "Education Boards", icon: ClipboardList, id: "boards" },
        { title: "Users", icon: Users, id: "users" },
        { title: "Roles", icon: Shield, id: "roles" },
      ]
    },
    {
      title: "System",
      items: [
        { title: "Settings", icon: Settings, id: "settings" },
        { title: "Database", icon: Database, id: "database" },
      ]
    }
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50/40">
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
                        <SidebarMenuButton
                          isActive={activeView === item.id}
                          onClick={() => setActiveView(item.id)}
                        >
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
                <SidebarMenuButton>
                  <HelpCircle className="size-4" />
                  <span>Help & Support</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={onLogout}>
                  <LogOut className="size-4" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          {/* Header */}
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
              <Button variant="ghost" size="icon">
                <Bell className="size-4" />
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src="" alt="Admin" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 space-y-4 p-4 md:p-6">
            {/* Dashboard View */}
            {activeView === "dashboard" && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Colleges</CardTitle>
                      <School className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{colleges.length}</div>
                      <p className="text-xs text-muted-foreground">
                        +2 from last month
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{users.length}</div>
                      <p className="text-xs text-muted-foreground">
                        +15% from last month
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Students</CardTitle>
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {users.filter(u => u.role === 'Student' && u.status === 'active').length}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        +8% from last week
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Education Boards</CardTitle>
                      <ClipboardList className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{educationBoards.length}</div>
                      <p className="text-xs text-muted-foreground">
                        +1 from last month
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>Recent Registrations</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <div className="space-y-4">
                        {users.slice(0, 5).map((user) => (
                          <div key={user.id} className="flex items-center">
                            <Avatar className="h-9 w-9">
                              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="ml-4 space-y-1">
                              <p className="text-sm font-medium leading-none">{user.name}</p>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                            <div className="ml-auto">
                              <Badge variant="outline">{user.role}</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                      <CardDescription>Frequently used operations</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button variant="outline" className="w-full justify-start" onClick={() => setActiveView("colleges")}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add New College
                      </Button>
                      <Button variant="outline" className="w-full justify-start" onClick={() => setActiveView("boards")}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Education Board
                      </Button>
                      <Button variant="outline" className="w-full justify-start" onClick={() => setActiveView("users")}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add New User
                      </Button>
                      <Button variant="outline" className="w-full justify-start" onClick={() => setActiveView("settings")}>
                        <Settings className="mr-2 h-4 w-4" />
                        System Settings
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Colleges View */}
            {/* {activeView === "colleges" && (
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>College Management</CardTitle>
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input placeholder="Search colleges..." className="pl-9 w-64" />
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {colleges.map((college) => (
                        <Card key={college.id} className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <Building className="w-5 h-5 text-blue-600" />
                                <h3 className="font-semibold text-lg">{college.name}</h3>
                                <Badge variant={college.status === 'active' ? 'default' : 'secondary'}>
                                  {college.status}
                                </Badge>
                              </div>
                              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-4 h-4" />
                                  {college.location}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4" />
                                  Est. {college.established}
                                </div>
                                <div className="flex items-center gap-2">
                                  <BookOpen className="w-4 h-4" />
                                  {college.type}
                                </div>
                                <div>
                                  Website: {college.website}
                                </div>
                              </div>
                              <div className="mt-2">
                                <p className="text-sm text-gray-600">Programs:</p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {college.programs.map((program, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs">
                                      {program}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => toggleCollegeStatus(college.id)}
                              >
                                <Switch checked={college.status === 'active'} />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => deleteCollege(college.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="w-5 h-5" />
                      Add New College
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>College Name *</Label>
                      <Input
                        placeholder="Enter college name"
                        value={collegeForm.name}
                        onChange={(e) => setCollegeForm({...collegeForm, name: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Location *</Label>
                      <Input
                        placeholder="City, State"
                        value={collegeForm.location}
                        onChange={(e) => setCollegeForm({...collegeForm, location: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Type *</Label>
                      <Select
                        value={collegeForm.type}
                        onValueChange={(value) => setCollegeForm({...collegeForm, type: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Public University">Public University</SelectItem>
                          <SelectItem value="Private University">Private University</SelectItem>
                          <SelectItem value="Private Institute">Private Institute</SelectItem>
                          <SelectItem value="Government College">Government College</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Established Year</Label>
                      <Input
                        placeholder="YYYY"
                        value={collegeForm.established}
                        onChange={(e) => setCollegeForm({...collegeForm, established: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Website</Label>
                      <Input
                        placeholder="example.edu"
                        value={collegeForm.website}
                        onChange={(e) => setCollegeForm({...collegeForm, website: e.target.value})}
                      />
                    </div>
                    
                    <Button onClick={handleAddCollege} className="w-full">
                      Add College
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
            )} */}

            {/* Colleges View - Now using the separate component */}
            {activeView === "colleges" && (
              <AdminCollegeView colleges={colleges} setColleges={setColleges} />
            )}

            {/* Education Boards View */}
            {activeView === "boards" && (
              <div className="space-y-6">
                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>Education Board Management</CardTitle>
                          <div className="flex items-center gap-2">
                            <div className="relative">
                              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                              <Input placeholder="Search boards..." className="pl-9 w-64" />
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {educationBoards.map((board) => (
                            <Card key={board.id} className="p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <ClipboardList className="w-5 h-5 text-blue-600" />
                                    <h3 className="font-semibold text-lg">{board.name}</h3>
                                    <Badge variant={board.status === 'active' ? 'default' : 'secondary'}>
                                      {board.status}
                                    </Badge>
                                    <Badge variant="outline">{board.shortName}</Badge>
                                  </div>
                                  <p className="text-sm text-gray-600 mb-3">{board.description}</p>
                                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                      <Building className="w-4 h-4" />
                                      {board.type}
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Globe className="w-4 h-4" />
                                      {board.country}
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Calendar className="w-4 h-4" />
                                      Est. {board.established}
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <School className="w-4 h-4" />
                                      {board.affiliatedColleges} Colleges
                                    </div>
                                  </div>
                                  <div className="mt-2 text-sm text-gray-600">
                                    Website: {board.website}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button variant="outline" size="sm">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => toggleBoardStatus(board.id)}
                                  >
                                    <Switch checked={board.status === 'active'} />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => deleteBoard(board.id)}
                                    className="text-red-600 hover:text-red-800"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Plus className="w-5 h-5" />
                          Add New Education Board
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label>Board Name *</Label>
                          <Input
                            placeholder="Enter board name"
                            value={boardForm.name}
                            onChange={(e) => setBoardForm({...boardForm, name: e.target.value})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Short Name *</Label>
                          <Input
                            placeholder="e.g., CBSE, ICSE"
                            value={boardForm.shortName}
                            onChange={(e) => setBoardForm({...boardForm, shortName: e.target.value})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Input
                            placeholder="Brief description"
                            value={boardForm.description}
                            onChange={(e) => setBoardForm({...boardForm, description: e.target.value})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Type *</Label>
                          <Select
                            value={boardForm.type}
                            onValueChange={(value) => setBoardForm({...boardForm, type: value})}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="National Board">National Board</SelectItem>
                              <SelectItem value="State Board">State Board</SelectItem>
                              <SelectItem value="Private Board">Private Board</SelectItem>
                              <SelectItem value="International Board">International Board</SelectItem>
                              <SelectItem value="Regulatory Body">Regulatory Body</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Country *</Label>
                          <Select
                            value={boardForm.country}
                            onValueChange={(value) => setBoardForm({...boardForm, country: value})}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="India">India</SelectItem>
                              <SelectItem value="United States">United States</SelectItem>
                              <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                              <SelectItem value="Canada">Canada</SelectItem>
                              <SelectItem value="Australia">Australia</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Established Year</Label>
                          <Input
                            placeholder="YYYY"
                            value={boardForm.established}
                            onChange={(e) => setBoardForm({...boardForm, established: e.target.value})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Website</Label>
                          <Input
                            placeholder="example.org"
                            value={boardForm.website}
                            onChange={(e) => setBoardForm({...boardForm, website: e.target.value})}
                          />
                        </div>
                        
                        <Button onClick={handleAddBoard} className="w-full">
                          Add Education Board
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {/* Users View */}
            {activeView === "users" && (
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>User Management</CardTitle>
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input placeholder="Search users..." className="pl-9 w-64" />
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {users.map((user) => (
                        <Card key={user.id} className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <User className="w-5 h-5 text-green-600" />
                                <h3 className="font-semibold text-lg">{user.name}</h3>
                                <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                                  {user.status}
                                </Badge>
                                <Badge variant="outline">{user.role}</Badge>
                              </div>
                              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                  <Mail className="w-4 h-4" />
                                  {user.email}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Phone className="w-4 h-4" />
                                  {user.phone}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4" />
                                  Joined: {user.joinDate}
                                </div>
                                {user.college && (
                                  <div className="flex items-center gap-2">
                                    <School className="w-4 h-4" />
                                    {user.college}
                                  </div>
                                )}
                              </div>
                              {user.program && (
                                <div className="mt-2">
                                  <Badge variant="outline" className="text-xs">
                                    {user.program}
                                  </Badge>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => toggleUserStatus(user.id)}
                              >
                                <Switch checked={user.status === 'active'} />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => deleteUser(user.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="w-5 h-5" />
                      Add New User
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Full Name *</Label>
                      <Input
                        placeholder="Enter full name"
                        value={userForm.name}
                        onChange={(e) => setUserForm({...userForm, name: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Email *</Label>
                      <Input
                        type="email"
                        placeholder="user@example.com"
                        value={userForm.email}
                        onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input
                        placeholder="+91 98765 43210"
                        value={userForm.phone}
                        onChange={(e) => setUserForm({...userForm, phone: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Role *</Label>
                      <Select
                        value={userForm.role}
                        onValueChange={(value) => setUserForm({...userForm, role: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Student">Student</SelectItem>
                          <SelectItem value="Mentor">Mentor</SelectItem>
                          <SelectItem value="Admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {userForm.role === 'Student' && (
                      <>
                        <div className="space-y-2">
                          <Label>College</Label>
                          <Select
                            value={userForm.college}
                            onValueChange={(value) => setUserForm({...userForm, college: value})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select college" />
                            </SelectTrigger>
                            <SelectContent>
                              {colleges.map((college) => (
                                <SelectItem key={college.id} value={college.name}>
                                  {college.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Program</Label>
                          <Select
                            value={userForm.program}
                            onValueChange={(value) => setUserForm({...userForm, program: value})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select program" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="BCA">BCA</SelectItem>
                              <SelectItem value="MCA">MCA</SelectItem>
                              <SelectItem value="BSc CS">BSc CS</SelectItem>
                              <SelectItem value="BSc IT">BSc IT</SelectItem>
                              <SelectItem value="Diploma CS">Diploma CS</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}
                    
                    <Button onClick={handleAddUser} className="w-full">
                      Add User
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
            )}

            {/* Roles View */}
            {activeView === "roles" && (
            <Card>
              <CardHeader>
                <CardTitle>Roles & Permissions</CardTitle>
                <CardDescription>
                  Manage user roles and their associated permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {roles.map((role) => (
                    <Card key={role.id} className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Shield className="w-5 h-5 text-purple-600" />
                          <h3 className="font-semibold">{role.name}</h3>
                        </div>
                        <Badge variant="secondary">{role.userCount} users</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{role.description}</p>
                      <div>
                        <p className="text-sm font-medium mb-2">Permissions:</p>
                        <div className="flex flex-wrap gap-1">
                          {role.permissions.map((permission, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {permission.replace('_', ' ')}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between mt-4">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
            )}

            {/* Settings View */}
            {activeView === "settings" && (
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                  <CardDescription>
                    Configure general system preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-gray-600">Send email notifications to users</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-approve Applications</Label>
                      <p className="text-sm text-gray-600">Automatically approve internship applications</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Maintenance Mode</Label>
                      <p className="text-sm text-gray-600">Put the system in maintenance mode</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Backup & Export</CardTitle>
                  <CardDescription>
                    Manage system backups and data exports
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full">
                    Download Database Backup
                  </Button>
                  <Button variant="outline" className="w-full">
                    Export User Data (CSV)
                  </Button>
                  <Button variant="outline" className="w-full">
                    Export College Data (CSV)
                  </Button>
                  <Button variant="outline" className="w-full text-red-600">
                    Clear All Data
                  </Button>
                </CardContent>
              </Card>
            </div>
            )}

            {/* Analytics View */}
            {activeView === "analytics" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>System Analytics</CardTitle>
                    <CardDescription>
                      Detailed analytics and reporting dashboard
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Analytics dashboard coming soon...</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Database View */}
            {activeView === "database" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Database Management</CardTitle>
                    <CardDescription>
                      Manage database operations and maintenance
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full">
                      Download Database Backup
                    </Button>
                    <Button variant="outline" className="w-full">
                      Export User Data (CSV)
                    </Button>
                    <Button variant="outline" className="w-full">
                      Export College Data (CSV)
                    </Button>
                    <Button variant="destructive" className="w-full">
                      Clear All Data
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}