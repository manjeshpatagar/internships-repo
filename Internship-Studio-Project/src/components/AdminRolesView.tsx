import React from "react";
import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { Shield, Edit, Trash2, Plus, Save, X } from "lucide-react";

// --- Interfaces ---
interface Permission {
  resource: string;
  actions: string[];
  propertyLevel?: { [key: string]: string[] };
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  userCount: number;
}

// --- Resources ---
const RESOURCES = [
  { name: "College", actions: ["create","read","update","delete","activate","deactivate","draft"], properties:["college_id","name","address","city","state","pincode","thumbnail_image","website","status"] },
  { name: "Department", actions: ["create","read","update","delete","activate","deactivate","draft"], properties:["dep_id","college_id","dep_name","dep_code","hod_id","status"] },
  { name: "Semester", actions: ["create","read","update","delete","activate","deactivate","draft"], properties:["sem_id","dep_id","name","number","academic_year_id","status"] },
  { name: "Subject", actions: ["create","read","update","delete","activate","deactivate","draft"], properties:["sub_id","sem_id","name","code","status"] },
  { name: "Internship", actions: ["create","read","update","delete","apply","approve","reject","activate","deactivate"], properties:["internship_id","type","title","description","duration","start_date","end_date","status"] },
  { name: "User", actions: ["create","read","update","delete","activate","deactivate","assign_role"], properties:["user_id","name","email","password","role","college_id","dep_id","status"] },
  { name: "Study Material", actions: ["create","read","update","delete","activate","deactivate"], properties:["material_id","sub_id","title","file_url","uploaded_by","status"] },
];

// --- Default Permissions ---
const DEFAULT_ROLE_PERMISSIONS: Record<string, Permission[]> = {
  Admin: RESOURCES.map(r => ({ resource: r.name, actions: [...r.actions], propertyLevel: { read: [...r.properties] } })),
  HOD: RESOURCES.map(r => ({ resource: r.name, actions: ["read","update","activate","deactivate"], propertyLevel: { read: [...r.properties] } })),
  Teacher: RESOURCES.map(r => ({ resource: r.name, actions: ["read","update"], propertyLevel: { read: [...r.properties] } })),
  Student: RESOURCES.map(r => ({ resource: r.name, actions: ["read","apply"], propertyLevel: { read: [...r.properties] } })),
  Mentor: RESOURCES.map(r => ({ resource: r.name, actions: ["read","approve","reject"], propertyLevel: { read: [...r.properties] } })),
};

// --- Helper ---
const getPermissionColor = (action: string) => {
  const colors: { [key: string]: string } = {
    create: "bg-green-100 text-green-800",
    read: "bg-blue-100 text-blue-800",
    update: "bg-yellow-100 text-yellow-800",
    delete: "bg-red-100 text-red-800",
    activate: "bg-green-100 text-green-800",
    deactivate: "bg-red-100 text-red-800",
    draft: "bg-gray-100 text-gray-800",
    apply: "bg-purple-100 text-purple-800",
    approve: "bg-green-100 text-green-800",
    reject: "bg-red-100 text-red-800",
    assign_role: "bg-indigo-100 text-indigo-800",
  };
  return colors[action] || "bg-gray-100 text-gray-800";
};

// --- Component ---
export function AdminRolesView() {
  const [roles, setRoles] = useState<Role[]>([
    { id: "1", name: "Admin", description: "Full system access", permissions: DEFAULT_ROLE_PERMISSIONS.Admin, userCount: 1 },
    { id: "2", name: "HOD", description: "Department head access", permissions: DEFAULT_ROLE_PERMISSIONS.HOD, userCount: 3 },
    { id: "3", name: "Teacher", description: "Teacher access", permissions: DEFAULT_ROLE_PERMISSIONS.Teacher, userCount: 10 },
    { id: "4", name: "Student", description: "Student access", permissions: DEFAULT_ROLE_PERMISSIONS.Student, userCount: 50 },
    { id: "5", name: "Mentor", description: "Mentor access", permissions: DEFAULT_ROLE_PERMISSIONS.Mentor, userCount: 5 },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [newRole, setNewRole] = useState({ name: "", description: "" });

  const roleRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const filteredRoles = roles.filter(r =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectRole = (roleId: string) => {
    setSelectedRoleId(roleId);
    setSearchTerm(roles.find(r=>r.id===roleId)?.name || "");
    setTimeout(()=> roleRefs.current[roleId]?.scrollIntoView({ behavior:"smooth", block:"start" }), 100);
  };

  // --- Role CRUD & Permissions ---
  const deleteRole = (id: string) => setRoles(roles.filter(r=>r.id!==id));
  const startEditRole = (role: Role) => { setEditingRole({...role}); setSelectedRoleId(role.id); };
  const cancelEdit = () => setEditingRole(null);
  const saveRole = () => { if(editingRole){ setRoles(roles.map(r=>r.id===editingRole.id?editingRole:r)); setEditingRole(null); } };
  const addNewRole = () => { if(newRole.name.trim()){ setRoles([...roles, { id:Date.now().toString(), name:newRole.name, description:newRole.description, permissions:RESOURCES.map(r=>({ resource:r.name, actions:[], propertyLevel:{} })), userCount:0 }]); setNewRole({name:"", description:""}); } };
  const togglePermission = (roleId:string, resource:string, action:string) => { setRoles(roles.map(role=>{ if(role.id===roleId && role.name!=="Admin"){ const resPerm = role.permissions.find(p=>p.resource===resource); if(resPerm){ const has = resPerm.actions.includes(action); return {...role, permissions: role.permissions.map(p=>p.resource===resource?{...p, actions:has?p.actions.filter(a=>a!==action):[...p.actions, action]}:p)}; } } return role; })); };
  const toggleAllActions = (roleId:string, resource:string, enable:boolean) => { setRoles(roles.map(role=>{ if(role.id===roleId && role.name!=="Admin"){ const allActions = enable ? RESOURCES.find(r=>r.name===resource)!.actions : []; return {...role, permissions: role.permissions.map(p=>p.resource===resource?{...p, actions:allActions}:p)}; } return role; })); };
  const togglePropertyPermission = (roleId:string, resource:string, action:string, property:string, checked:boolean) => { setRoles(roles.map(role=>{ if(role.id===roleId && role.name!=="Admin"){ return {...role, permissions: role.permissions.map(p=>{ if(p.resource===resource){ const current = p.propertyLevel?.[action]||[]; const updated = checked?[...new Set([...current, property])]:current.filter(pr=>pr!==property); return {...p, propertyLevel:{...p.propertyLevel, [action]:updated}} } return p; })}; } return role; })); };
  const hasPermission = (role:Role, resource:string, action:string) => role.name==="Admin"?true:role.permissions.find(p=>p.resource===resource)?.actions.includes(action)||false;
  const hasFullAccess = (role:Role, resource:string) => role.name==="Admin"?true:RESOURCES.find(r=>r.name===resource)?.actions.every(a=>role.permissions.find(p=>p.resource===resource)?.actions.includes(a));

  return (
    <div className="space-y-6">

      {/* Search + Dropdown */}
      <Card className="sticky top-0 z-50 bg-white">
        <CardHeader><CardTitle>Search / Select Role</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          <Input placeholder="Type role name..." value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} />
          <select className="w-full border rounded p-2 mt-1" value={selectedRoleId||""} onChange={e=>handleSelectRole(e.target.value)}>
            <option value="">-- Select Role --</option>
            {filteredRoles.map(r=><option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
        </CardContent>
      </Card>

      {/* Add Role */}
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Plus className="w-5 h-5"/> Add New Role</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div><Label>Role Name</Label><Input placeholder="Enter role name" value={newRole.name} onChange={e=>setNewRole({...newRole,name:e.target.value})}/></div>
            <div><Label>Description</Label><Input placeholder="Enter description" value={newRole.description} onChange={e=>setNewRole({...newRole,description:e.target.value})}/></div>
          </div>
          <Button className="w-full" onClick={addNewRole}><Plus className="w-4 h-4 mr-2"/> Add Role</Button>
        </CardContent>
      </Card>

      {/* Role List */}
      <div className="max-h-[600px] overflow-y-auto space-y-4">
        {filteredRoles.map(role=>(
          <Card key={role.id} ref={el=>roleRefs.current[role.id]=el} className={`p-6 ${selectedRoleId===role.id?"ring-2 ring-purple-500":""}`}>
            <div className="flex items-start justify-between mb-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-purple-600"/>
                  <div>
                    <h3 className="text-xl font-semibold">{role.name}</h3>
                    <p className="text-sm text-gray-600">{role.description}</p>
                  </div>
                </div>
                <Badge variant="secondary">{role.userCount} users</Badge>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={()=>startEditRole(role)}><Edit className="w-4 h-4"/></Button>
                {role.name!=="Admin" && <Button variant="outline" size="sm" className="text-red-600" onClick={()=>deleteRole(role.id)}><Trash2 className="w-4 h-4"/></Button>}
              </div>
            </div>

            {/* Permissions */}
            <div className="space-y-4">
              <h4 className="font-medium text-lg">Permissions</h4>
              <div className="grid gap-6">
                {RESOURCES.map(resource=>(
                  <div key={resource.name} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h5 className="font-medium text-lg">{resource.name}</h5>
                      {role.name!=="Admin" && <div className="flex items-center gap-2"><Switch checked={hasFullAccess(role,resource.name)} onCheckedChange={checked=>toggleAllActions(role.id,resource.name,checked)}/><span className="text-xs">Enable All</span></div>}
                    </div>
                    <div className="flex flex-wrap gap-3 mb-3">{resource.actions.map(action=>(
                      <div key={action} className="flex items-center gap-2">
                        <Switch checked={hasPermission(role,resource.name,action)} onCheckedChange={()=>togglePermission(role.id,resource.name,action)} disabled={role.name==="Admin"} />
                        <Badge variant="outline" className={`text-xs capitalize ${getPermissionColor(action)}`}>{action.replace("_"," ")}</Badge>
                      </div>
                    ))}</div>
                    <div>
                      <h6 className="text-sm font-medium text-gray-700 mb-1">Property-Level Access (Read)</h6>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">{resource.properties.map(prop=>(
                        <div key={prop} className="flex items-center gap-2">
                          <Switch checked={role.name==="Admin"?true:role.permissions.find(p=>p.resource===resource.name)?.propertyLevel?.read?.includes(prop)||false} onCheckedChange={checked=>togglePropertyPermission(role.id,resource.name,"read",prop,checked)} disabled={role.name==="Admin"}/>
                          <span className="text-xs">{prop}</span>
                        </div>
                      ))}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}