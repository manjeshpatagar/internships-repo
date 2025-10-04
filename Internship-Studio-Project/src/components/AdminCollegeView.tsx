import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Switch } from "../components/ui/switch";
import { Search, Plus, Edit, Trash2, Building, MapPin, Calendar, BookOpen } from "lucide-react";

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

interface AdminCollegeViewProps {
  colleges: College[];
  setColleges: (colleges: College[]) => void;
}

export function AdminCollegeView({ colleges, setColleges }: AdminCollegeViewProps) {
  // College form state
  const [collegeForm, setCollegeForm] = useState({
    name: '',
    location: '',
    type: 'Public University',
    established: '',
    website: '',
    programs: [] as string[]
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

  const deleteCollege = (id: string) => {
    setColleges(colleges.filter(c => c.id !== id));
  };

  const toggleCollegeStatus = (id: string) => {
    setColleges(colleges.map(c => 
      c.id === id ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' } : c
    ));
  };

  return (
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
  );
}