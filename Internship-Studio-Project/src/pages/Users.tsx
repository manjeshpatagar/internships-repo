import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Mail, Phone, Calendar, School, Edit, Trash2, Plus, Search } from "lucide-react";
import type { College } from "./CollegesTab";

export interface UserItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: "active" | "inactive";
  joinDate: string;
  college?: string;
  program?: string;
}

interface Props {
  users: UserItem[];
  setUsers: React.Dispatch<React.SetStateAction<UserItem[]>>;
  colleges: College[];
}

export default function UsersTab({ users, setUsers, colleges }: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Student",
    college: "",
    program: "",
  });

  const handleAdd = () => {
    const newUser: UserItem = { id: Date.now().toString(), ...form, status: "active", joinDate: new Date().toISOString().split("T")[0] };
    setUsers((prev) => [...prev, newUser]);
    setForm({ name: "", email: "", phone: "", role: "Student", college: "", program: "" });
  };

  const deleteUser = (id: string) => setUsers((prev) => prev.filter((u) => u.id !== id));
  const toggleStatus = (id: string) =>
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u)));

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>User Management</CardTitle>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input placeholder="Search users..." className="pl-9 w-64" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users.map((u) => (
                <Card key={u.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <User className="w-5 h-5 text-green-600" />
                        <h3 className="font-semibold text-lg">{u.name}</h3>
                        <Badge variant={u.status === "active" ? "default" : "secondary"}>{u.status}</Badge>
                        <Badge variant="outline">{u.role}</Badge>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2"><Mail className="w-4 h-4" />{u.email}</div>
                        <div className="flex items-center gap-2"><Phone className="w-4 h-4" />{u.phone}</div>
                        <div className="flex items-center gap-2"><Calendar className="w-4 h-4" />Joined: {u.joinDate}</div>
                        {u.college && <div className="flex items-center gap-2"><School className="w-4 h-4" />{u.college}</div>}
                      </div>
                      {u.program && (
                        <div className="mt-2">
                          <Badge variant="outline" className="text-xs">{u.program}</Badge>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm"><Edit className="w-4 h-4" /></Button>
                      <Button variant="outline" size="sm" onClick={() => toggleStatus(u.id)}><Switch checked={u.status === "active"} /></Button>
                      <Button variant="outline" size="sm" onClick={() => deleteUser(u.id)} className="text-red-600 hover:text-red-800">
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
            <CardTitle className="flex items-center gap-2"><Plus className="w-5 h-5" />Add New User</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label>Full Name *</Label><Input placeholder="Enter full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div className="space-y-2"><Label>Email *</Label><Input type="email" placeholder="user@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
            <div className="space-y-2"><Label>Phone</Label><Input placeholder="+91 98765 43210" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
            <div className="space-y-2"><Label>Role *</Label>
              <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Student">Student</SelectItem>
                  <SelectItem value="Mentor">Mentor</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {form.role === "Student" && (
              <>
                <div className="space-y-2"><Label>College</Label>
                  <Select value={form.college} onValueChange={(v) => setForm({ ...form, college: v })}>
                    <SelectTrigger><SelectValue placeholder="Select college" /></SelectTrigger>
                    <SelectContent>
                      {colleges.map((c) => (
                        <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label>Program</Label>
                  <Select value={form.program} onValueChange={(v) => setForm({ ...form, program: v })}>
                    <SelectTrigger><SelectValue placeholder="Select program" /></SelectTrigger>
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
            <Button onClick={handleAdd} className="w-full">Add User</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}