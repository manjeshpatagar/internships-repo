import React from "react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import {
  ClipboardList,
  Building,
  Globe,
  Calendar,
  School,
  Edit,
  Trash2,
  Plus,
  Search,
} from "lucide-react";

export interface EducationBoard {
  id: string;
  name: string;
  shortName: string;
  description: string;
  type: string;
  country: string;
  established: string;
  website: string;
  status: "active" | "inactive";
  affiliatedColleges: number;
}

interface Props {
  boards: EducationBoard[];
  setBoards: React.Dispatch<React.SetStateAction<EducationBoard[]>>;
}

export default function EducationBoardsTab({ boards, setBoards }: Props) {
  const [form, setForm] = useState({
    name: "",
    shortName: "",
    description: "",
    type: "National Board",
    country: "India",
    established: "",
    website: "",
  });

  const handleAdd = () => {
    const newBoard: EducationBoard = {
      id: String(Date.now()),
      ...form,
      status: "active",
      affiliatedColleges: 0,
    };
    setBoards((prev) => [...prev, newBoard]);
    setForm({
      name: "",
      shortName: "",
      description: "",
      type: "National Board",
      country: "India",
      established: "",
      website: "",
    });
  };

  const deleteBoard = (id: string) => setBoards((prev) => prev.filter((b) => b.id !== id));

  const toggleStatus = (id: string) =>
    setBoards((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: b.status === "active" ? "inactive" : "active" } : b))
    );

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Education Board Management</CardTitle>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input placeholder="Search boards..." className="pl-9 w-64" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {boards.map((board) => (
                <Card key={board.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <ClipboardList className="w-5 h-5 text-blue-600" />
                        <h3 className="font-semibold text-lg">{board.name}</h3>
                        <Badge variant={board.status === "active" ? "default" : "secondary"}>
                          {board.status}
                        </Badge>
                        <Badge variant="outline">{board.shortName}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{board.description}</p>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2"><Building className="w-4 h-4" />{board.type}</div>
                        <div className="flex items-center gap-2"><Globe className="w-4 h-4" />{board.country}</div>
                        <div className="flex items-center gap-2"><Calendar className="w-4 h-4" />Est. {board.established}</div>
                        <div className="flex items-center gap-2"><School className="w-4 h-4" />{board.affiliatedColleges} Colleges</div>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">Website: {board.website}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm"><Edit className="w-4 h-4" /></Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleStatus(board.id)}
                        className={
                          board.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }
                      >
                        <span className="sr-only">toggle status</span>
                        <div
                          className={`w-3 h-3 rounded-full ${
                            board.status === "active" ? "bg-green-500" : "bg-gray-400"
                          }`}
                        />
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
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Short Name *</Label>
              <Input
                placeholder="e.g., CBSE"
                value={form.shortName}
                onChange={(e) => setForm({ ...form, shortName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Input
                placeholder="Brief description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Type *</Label>
              <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
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
                value={form.country}
                onValueChange={(v) => setForm({ ...form, country: v })}
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
                value={form.established}
                onChange={(e) => setForm({ ...form, established: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Website</Label>
              <Input
                placeholder="example.org"
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
              />
            </div>
            <Button onClick={handleAdd} className="w-full">
              Add Education Board
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}