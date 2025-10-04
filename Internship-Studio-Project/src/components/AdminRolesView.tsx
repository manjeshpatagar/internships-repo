import React, { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { Badge } from "../components/ui/badge";
import { Plus, Pencil, Trash2, Save, X } from "lucide-react";

type RoleName = "Admin" | "HOD" | "Teacher" | "Mentor" | "Student";
const ROLES: RoleName[] = ["Admin", "HOD", "Teacher", "Mentor", "Student"];

type ResourceDef = { id: string; name: string; actions: string[]; properties: string[] };
type RolePermissions = { actions: string[]; properties: string[] };
type PermissionsByResource = Record<string, Record<RoleName, RolePermissions>>;

const uid = (p = "") => `${p}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
const actionBadge = (a: string) =>
  ({
    create: "bg-green-100 text-green-800",
    read: "bg-blue-100 text-blue-800",
    update: "bg-yellow-100 text-yellow-800",
    delete: "bg-red-100 text-red-800",
    activate: "bg-green-50 text-green-700",
    deactivate: "bg-red-50 text-red-700",
    apply: "bg-purple-100 text-purple-800",
    approve: "bg-green-100 text-green-800",
    reject: "bg-red-100 text-red-800",
    assign_role: "bg-indigo-100 text-indigo-800",
  }[a] || "bg-gray-100 text-gray-800");

const INIT_RES: ResourceDef[] = [
  { id: "r_college", name: "College", actions: ["create","read","update","delete","activate","deactivate"], properties: ["college_id","name","address","city","state","pincode","thumbnail_image","website","status"] },
  { id: "r_department", name: "Department", actions: ["create","read","update","delete","activate","deactivate"], properties: ["dep_id","college_id","dep_name","dep_code","hod_id","status"] },
  { id: "r_semester", name: "Semester", actions: ["create","read","update","delete","activate","deactivate"], properties: ["sem_id","dep_id","name","number","academic_year_id","status"] },
  { id: "r_subject", name: "Subject", actions: ["create","read","update","delete","activate","deactivate"], properties: ["sub_id","sem_id","name","code","status"] },
  { id: "r_internship", name: "Internship", actions: ["create","read","update","delete","apply","approve","reject","activate","deactivate"], properties: ["internship_id","type","title","description","duration","start_date","end_date","status"] },
  { id: "r_user", name: "User", actions: ["create","read","update","delete","activate","deactivate","assign_role"], properties: ["user_id","name","email","password","role","college_id","dep_id","status"] },
  { id: "r_studymaterial", name: "Study Material", actions: ["create","read","update","delete","activate","deactivate"], properties: ["material_id","sub_id","title","file_url","uploaded_by","status"] },
];

export default function AdminRolesPermissionMatrix() {
  const [resources, setResources] = useState(INIT_RES);
  const [selectedId, setSelectedId] = useState(resources[0].id);
  const [autoSave, setAutoSave] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [modal, setModal] = useState(false);
  const [editRes, setEditRes] = useState<ResourceDef | null>(null);
  const [form, setForm] = useState({ name: "", actions: "", props: "" });

  const initPerms = useMemo(() => {
    const base: PermissionsByResource = {};
    for (const r of INIT_RES) {
      base[r.id] = {} as any;
      for (const role of ROLES)
        base[r.id][role] = {
          actions: role === "Admin" ? [...r.actions] : [],
          properties: role === "Admin" ? [...r.properties] : [],
        };
    }
    return base;
  }, []);

  const [perms, setPerms] = useState(initPerms);
  const res = resources.find((r) => r.id === selectedId)!;

  const ensurePerms = (r: ResourceDef) =>
    setPerms((p) => {
      const c = { ...p };
      c[r.id] ??= {} as any;
      for (const role of ROLES) {
        const cur = c[r.id][role] || { actions: [], properties: [] };
        c[r.id][role] = {
          actions: role === "Admin" ? r.actions : cur.actions.filter((a) => r.actions.includes(a)),
          properties: role === "Admin" ? r.properties : cur.properties.filter((p) => r.properties.includes(p)),
        };
      }
      return c;
    });

  const openAdd = () => {
    setEditRes(null);
    setForm({ name: "", actions: "create,read,update,delete", props: "id,name" });
    setModal(true);
  };
  const openEdit = (r: ResourceDef) => {
    setEditRes(r);
    setForm({ name: r.name, actions: r.actions.join(","), props: r.properties.join(",") });
    setModal(true);
  };

  const saveRes = () => {
    const name = form.name.trim(),
      a = form.actions.split(",").map((x) => x.trim()).filter(Boolean),
      p = form.props.split(",").map((x) => x.trim()).filter(Boolean);
    if (!name || !a.length) return alert("Enter name & actions");
    if (editRes) {
      setResources((r) => r.map((x) => (x.id === editRes.id ? { ...x, name, actions: a, properties: p } : x)));
      ensurePerms({ ...editRes, name, actions: a, properties: p });
    } else {
      const newRes = { id: uid("r_"), name, actions: a, properties: p };
      setResources((r) => [newRes, ...r]);
      ensurePerms(newRes);
      setSelectedId(newRes.id);
    }
    setModal(false);
    setEditRes(null);
    setDirty(true);
    if (autoSave) saveAll();
  };

  const delRes = (id: string) => {
    if (!confirm("Delete resource?")) return;
    setResources((r) => r.filter((x) => x.id !== id));
    setPerms((p) => {
      const c = { ...p };
      delete c[id];
      return c;
    });
    setSelectedId(resources[0]?.id || "");
    setDirty(true);
    if (autoSave) saveAll();
  };

  const toggle = (role: RoleName, act: string) => {
    if (role === "Admin") return;
    setPerms((p) => {
      const c = { ...p },
        rp = { ...c[selectedId][role] };
      rp.actions = rp.actions.includes(act)
        ? rp.actions.filter((x) => x !== act)
        : [...rp.actions, act];
      c[selectedId][role] = rp;
      return c;
    });
    setDirty(true);
    if (autoSave) saveAll();
  };

  const toggleAll = (role: RoleName, checked: boolean) => {
    if (role === "Admin") return;
    setPerms((p) => ({
      ...p,
      [selectedId]: {
        ...p[selectedId],
        [role]: { ...p[selectedId][role], actions: checked ? [...res.actions] : [] },
      },
    }));
    setDirty(true);
    if (autoSave) saveAll();
  };

  const toggleProp = (role: RoleName, prop: string, checked: boolean) => {
    if (role === "Admin") return;
    setPerms((p) => {
      const c = { ...p },
        rp = { ...c[selectedId][role] };
      rp.properties = checked
        ? [...new Set([...rp.properties, prop])]
        : rp.properties.filter((x) => x !== prop);
      c[selectedId][role] = rp;
      return c;
    });
    setDirty(true);
    if (autoSave) saveAll();
  };

  const toggleAllProps = (role: RoleName, ckd: boolean) => {
    if (role === "Admin") return;
    setPerms((p) => ({
      ...p,
      [selectedId]: {
        ...p[selectedId],
        [role]: { ...p[selectedId][role], properties: ckd ? [...res.properties] : [] },
      },
    }));
    setDirty(true);
    if (autoSave) saveAll();
  };

  const saveAll = () => {
    console.log("Saved:", perms);
    setDirty(false);
  };

  return (
    <div className="space-y-6">
      {/* Top controls */}
      <Card>
        <CardHeader><CardTitle>Resources</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)} className="border rounded p-2 flex-1">
              {resources.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
            <Button variant="ghost" onClick={openAdd}><Plus className="w-4 h-4" /> Add</Button>
            <Button variant="ghost" onClick={() => openEdit(res)}><Pencil className="w-4 h-4" /> Edit</Button>
            <Button variant="ghost" className="text-red-600" onClick={() => delRes(res.id)}><Trash2 className="w-4 h-4" /> Delete</Button>
          </div>
          <div className="flex gap-4 items-center">
            <label className="flex items-center gap-2 text-sm">
              Auto Save <Switch checked={autoSave} onCheckedChange={setAutoSave} />
            </label>
            <Button onClick={saveAll} disabled={!dirty}><Save className="w-4 h-4" /> Save</Button>
            {dirty && <Badge variant="secondary">Unsaved</Badge>}
          </div>
        </CardContent>
      </Card>

      {/* Permission Table */}
      <Card>
        <CardHeader><CardTitle>Permissions for: {res.name}</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Role</th>
                  {res.actions.map((a) => <th key={a} className="p-2 text-center"><Badge className={actionBadge(a)}>{a}</Badge></th>)}
                  <th className="p-2 text-center">All</th>
                  <th className="p-2 text-left">Properties</th>
                </tr>
              </thead>
              <tbody>
                {ROLES.map((r) => {
                  const pr = perms[selectedId][r];
                  const allA = pr.actions.length === res.actions.length;
                  const allP = pr.properties.length === res.properties.length;
                  return (
                    <tr key={r} className="border-b">
                      <td className="p-3 font-medium">{r}</td>
                      {res.actions.map((a) => (
                        <td key={a} className="p-2 text-center">
                          <Switch checked={pr.actions.includes(a)} onCheckedChange={() => toggle(r, a)} disabled={r === "Admin"} />
                        </td>
                      ))}
                      <td className="p-2 text-center"><Switch checked={allA} onCheckedChange={(v) => toggleAll(r, v)} disabled={r === "Admin"} /></td>
                      <td className="p-2">
                        <details className="border rounded">
                          <summary className="px-3 py-2 bg-gray-50 flex justify-between cursor-pointer">
                            <span>({pr.properties.length})</span><span>▼</span>
                          </summary>
                          <div className="p-3 grid grid-cols-2 md:grid-cols-3 gap-2">
                            <label className="flex gap-2 items-center text-xs">
                              <input type="checkbox" checked={allP} onChange={(e) => toggleAllProps(r, e.target.checked)} disabled={r === "Admin"} />
                              <b>Select All</b>
                            </label>
                            {res.properties.map((p) => (
                              <label key={p} className="flex gap-2 items-center text-xs">
                                <input type="checkbox" checked={pr.properties.includes(p)} onChange={(e) => toggleProp(r, p, e.target.checked)} disabled={r === "Admin"} />
                                {p}
                              </label>
                            ))}
                          </div>
                        </details>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded shadow-lg w-full max-w-lg">
            <div className="flex justify-between p-4 border-b">
              <h3 className="font-semibold">{editRes ? "Edit Resource" : "Add Resource"}</h3>
              <X className="w-5 h-5 cursor-pointer" onClick={() => setModal(false)} />
            </div>
            <div className="p-4 space-y-3">
              {["name", "actions", "props"].map((f, i) => (
                <div key={f}>
                  <Label>{["Name", "Actions (comma)", "Properties (comma)"][i]}</Label>
                  <input
                    className="border rounded p-2 w-full"
                    value={(form as any)[f]}
                    onChange={(e) => setForm({ ...form, [f]: e.target.value })}
                  />
                </div>
              ))}
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setModal(false)}>Cancel</Button>
                <Button onClick={saveRes}><Save className="w-4 h-4 mr-1" /> Save</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
