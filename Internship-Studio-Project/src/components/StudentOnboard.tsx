import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowLeft, CheckCircle } from "lucide-react";

interface StudentOnboardProps {
  onBack: () => void;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  careerService: string;
  internshipType: 'academic' | 'non-academic' | '';
  academicProgram: string;
  nonAcademicTrack: string;
  college: string;
  year: string;
  experience: string;
  motivation: string;
  skills: string[];
  availability: string;
}

export function StudentOnboard({ onBack }: StudentOnboardProps) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    careerService: '',
    internshipType: '',
    academicProgram: '',
    nonAcademicTrack: '',
    college: '',
    year: '',
    experience: '',
    motivation: '',
    skills: [],
    availability: ''
  });

  const careerServices = [
    'Internship Programs',
    'Job Placement',
    'Skill Development',
    'Mentorship',
    'Resume Building',
    'Interview Preparation'
  ];

  const academicPrograms = ['BCA', 'MCA', 'BSc Computer Science', 'BSc IT', 'Diploma CS', 'Diploma IT'];
  const nonAcademicTracks = [
    'Full Stack Development',
    'Frontend Development', 
    'Backend Development',
    'AI & Machine Learning',
    'Quality Testing',
    'Project Management'
  ];
  const skillsList = [
    'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'HTML/CSS',
    'MongoDB', 'MySQL', 'Git', 'Docker', 'AWS', 'Testing'
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleSubmit = () => {
    // Here you would typically send data to backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <CardHeader className="pb-8">
              <div className="mx-auto w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-12 h-12 text-purple-600" />
              </div>
              <CardTitle className="text-3xl text-purple-800">Application Submitted!</CardTitle>
              <CardDescription className="text-lg">
                Thank you for applying to Career Studio. We'll review your application and get back to you within 2-3 business days.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Application ID: <span className="font-mono font-semibold">CS-{Date.now().toString().slice(-6)}</span>
              </p>
              <Button onClick={onBack} variant="outline">
                Back to Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Join Career Studio
            </h1>
            <p className="text-xl text-gray-600">
              Step {step} of 4: Let's get you started on your career journey
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  {step === 1 && "Personal Information"}
                  {step === 2 && "Service Selection"}
                  {step === 3 && "Program Details"}
                  {step === 4 && "Additional Information"}
                </CardTitle>
                <CardDescription>
                  {step === 1 && "Tell us about yourself"}
                  {step === 2 && "Choose your career service"}
                  {step === 3 && "Configure your program"}
                  {step === 4 && "Complete your application"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Step 1: Personal Information */}
                {step === 1 && (
                  <>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          placeholder="Enter your full name"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </div>
                  </>
                )}

                {/* Step 2: Service Selection */}
                {step === 2 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="careerService">Career Service *</Label>
                      <Select
                        value={formData.careerService}
                        onValueChange={(value) => handleInputChange('careerService', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select the service you're interested in" />
                        </SelectTrigger>
                        <SelectContent>
                          {careerServices.map(service => (
                            <SelectItem key={service} value={service}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {formData.careerService === 'Internship Programs' && (
                      <div className="space-y-3">
                        <Label>Internship Type *</Label>
                        <RadioGroup
                          value={formData.internshipType}
                          onValueChange={(value) => handleInputChange('internshipType', value)}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="academic" id="academic" />
                            <Label htmlFor="academic">Academic Internship (College Requirement)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="non-academic" id="non-academic" />
                            <Label htmlFor="non-academic">Professional Internship (Skill Development)</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    )}

                    {formData.careerService && formData.careerService !== 'Internship Programs' && (
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-blue-800">
                          You've selected <strong>{formData.careerService}</strong>. Our team will contact you with more details about this service.
                        </p>
                      </div>
                    )}
                  </>
                )}

                {/* Step 3: Program Details */}
                {step === 3 && formData.careerService === 'Internship Programs' && (
                  <>
                    {formData.internshipType === 'academic' && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="academicProgram">Academic Program *</Label>
                          <Select
                            value={formData.academicProgram}
                            onValueChange={(value) => handleInputChange('academicProgram', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select your program" />
                            </SelectTrigger>
                            <SelectContent>
                              {academicPrograms.map(program => (
                                <SelectItem key={program} value={program}>
                                  {program}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="college">College/University *</Label>
                            <Input
                              id="college"
                              placeholder="Your institution name"
                              value={formData.college}
                              onChange={(e) => handleInputChange('college', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="year">Current Year *</Label>
                            <Select
                              value={formData.year}
                              onValueChange={(value) => handleInputChange('year', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select year" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1st">1st Year</SelectItem>
                                <SelectItem value="2nd">2nd Year</SelectItem>
                                <SelectItem value="3rd">3rd Year</SelectItem>
                                <SelectItem value="final">Final Year</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </>
                    )}

                    {formData.internshipType === 'non-academic' && (
                      <div className="space-y-2">
                        <Label htmlFor="nonAcademicTrack">Technology Track *</Label>
                        <Select
                          value={formData.nonAcademicTrack}
                          onValueChange={(value) => handleInputChange('nonAcademicTrack', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your track" />
                          </SelectTrigger>
                          <SelectContent>
                            {nonAcademicTracks.map(track => (
                              <SelectItem key={track} value={track}>
                                {track}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="space-y-3">
                      <Label>Technical Skills (Select all that apply)</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {skillsList.map(skill => (
                          <div key={skill} className="flex items-center space-x-2">
                            <Checkbox
                              id={skill}
                              checked={formData.skills.includes(skill)}
                              onCheckedChange={() => handleSkillToggle(skill)}
                            />
                            <Label htmlFor={skill} className="text-sm">{skill}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Step 4: Additional Details */}
                {step === 4 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="experience">Previous Experience</Label>
                      <Textarea
                        id="experience"
                        placeholder="Describe any relevant projects, courses, or work experience..."
                        value={formData.experience}
                        onChange={(e) => handleInputChange('experience', e.target.value)}
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="motivation">Why are you interested in this service? *</Label>
                      <Textarea
                        id="motivation"
                        placeholder="Tell us about your goals and what you hope to achieve..."
                        value={formData.motivation}
                        onChange={(e) => handleInputChange('motivation', e.target.value)}
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="availability">Availability *</Label>
                      <Select
                        value={formData.availability}
                        onValueChange={(value) => handleInputChange('availability', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your availability" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-time">Full-time (40 hours/week)</SelectItem>
                          <SelectItem value="part-time">Part-time (20 hours/week)</SelectItem>
                          <SelectItem value="flexible">Flexible (Weekends/Evenings)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={step === 1}
                  >
                    Previous
                  </Button>
                  
                  {step < 4 ? (
                    <Button
                      onClick={nextStep}
                      disabled={
                        (step === 1 && (!formData.fullName || !formData.email || !formData.phone)) ||
                        (step === 2 && !formData.careerService) ||
                        (step === 2 && formData.careerService === 'Internship Programs' && !formData.internshipType) ||
                        (step === 3 && formData.careerService === 'Internship Programs' && formData.internshipType === 'academic' && (!formData.academicProgram || !formData.college || !formData.year)) ||
                        (step === 3 && formData.careerService === 'Internship Programs' && formData.internshipType === 'non-academic' && !formData.nonAcademicTrack)
                      }
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      disabled={!formData.motivation || !formData.availability}
                    >
                      Submit Application
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className={`flex items-center ${step >= 1 ? 'text-primary' : 'text-gray-400'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 text-sm ${
                      step >= 1 ? 'bg-primary text-white' : 'bg-gray-200'
                    }`}>
                      1
                    </div>
                    Personal Info
                  </div>
                  <div className={`flex items-center ${step >= 2 ? 'text-primary' : 'text-gray-400'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 text-sm ${
                      step >= 2 ? 'bg-primary text-white' : 'bg-gray-200'
                    }`}>
                      2
                    </div>
                    Service Selection
                  </div>
                  <div className={`flex items-center ${step >= 3 ? 'text-primary' : 'text-gray-400'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 text-sm ${
                      step >= 3 ? 'bg-primary text-white' : 'bg-gray-200'
                    }`}>
                      3
                    </div>
                    Program Details
                  </div>
                  <div className={`flex items-center ${step >= 4 ? 'text-primary' : 'text-gray-400'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 text-sm ${
                      step >= 4 ? 'bg-primary text-white' : 'bg-gray-200'
                    }`}>
                      4
                    </div>
                    Final Details
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Have questions about the application process?
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}