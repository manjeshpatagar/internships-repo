import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  Code, 
  Database, 
  Palette, 
  Brain, 
  Bug, 
  Settings,
  GraduationCap,
  Briefcase,
  Users,
  Award,
  BookOpen,
  Target,
  FileText,
  MessageSquare,
  Zap,
  TrendingUp,
  Clock,
  Star,
  CheckCircle,
  Calendar,
  Building,
  ArrowRight,
  Globe,
  School,
  Trophy,
  BookmarkCheck
} from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const careerModules = [
    {
      icon: GraduationCap,
      title: "Internship Programs",
      description: "Academic and professional internships with real-world projects",
      color: "bg-purple-100 text-purple-800"
    },
    {
      icon: Briefcase,
      title: "Job Placement",
      description: "Connect with top companies and land your dream job",
      color: "bg-indigo-100 text-indigo-800"
    },
    {
      icon: BookOpen,
      title: "Skill Development",
      description: "Learn in-demand technologies through structured courses",
      color: "bg-violet-100 text-violet-800"
    },
    {
      icon: Users,
      title: "Mentorship",
      description: "One-on-one guidance from industry experts",
      color: "bg-blue-100 text-blue-800"
    },
    {
      icon: FileText,
      title: "Resume Building",
      description: "Create ATS-friendly resumes that get noticed",
      color: "bg-amber-100 text-amber-800"
    },
    {
      icon: MessageSquare,
      title: "Interview Prep",
      description: "Mock interviews and preparation for technical rounds",
      color: "bg-slate-100 text-slate-800"
    }
  ];

  const internshipTracks = [
    { 
      name: "Full Stack Development", 
      icon: Code, 
      color: "bg-purple-100 text-purple-800",
      duration: "12 weeks",
      level: "Intermediate",
      description: "Build end-to-end web applications using modern frameworks",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      projects: "3 Major Projects",
      placement: "94%"
    },
    { 
      name: "Frontend Development", 
      icon: Palette, 
      color: "bg-indigo-100 text-indigo-800",
      duration: "10 weeks",
      level: "Beginner-Friendly",
      description: "Create stunning user interfaces and interactive experiences",
      technologies: ["React", "TypeScript", "Tailwind", "Next.js"],
      projects: "4 UI Projects",
      placement: "91%"
    },
    { 
      name: "Backend Development", 
      icon: Database, 
      color: "bg-violet-100 text-violet-800",
      duration: "10 weeks",
      level: "Intermediate",
      description: "Build scalable APIs and server-side applications",
      technologies: ["Node.js", "Python", "PostgreSQL", "AWS"],
      projects: "3 API Projects",
      placement: "89%"
    },
    { 
      name: "AI & Machine Learning", 
      icon: Brain, 
      color: "bg-blue-100 text-blue-800",
      duration: "14 weeks",
      level: "Advanced",
      description: "Develop intelligent systems and data-driven solutions",
      technologies: ["Python", "TensorFlow", "PyTorch", "Pandas"],
      projects: "2 ML Models",
      placement: "96%"
    },
    { 
      name: "Quality Testing", 
      icon: Bug, 
      color: "bg-amber-100 text-amber-800",
      duration: "8 weeks",
      level: "Beginner-Friendly",
      description: "Ensure software quality through comprehensive testing",
      technologies: ["Selenium", "Jest", "Cypress", "Postman"],
      projects: "5 Test Suites",
      placement: "87%"
    },
    { 
      name: "Project Management", 
      icon: Settings, 
      color: "bg-slate-100 text-slate-800",
      duration: "6 weeks",
      level: "Beginner",
      description: "Lead projects and coordinate development teams",
      technologies: ["Jira", "Confluence", "Agile", "Scrum"],
      projects: "2 Team Projects",
      placement: "92%"
    }
  ];

  const academicPrograms = [
    { 
      name: "BCA", 
      fullName: "Bachelor of Computer Applications",
      description: "Comprehensive undergraduate program covering programming, software development, and computer applications",
      duration: "3 Years",
      eligibility: "12th Pass (Any Stream)",
      icon: BookOpen,
      features: ["Programming Fundamentals", "Web Development", "Database Management", "Software Engineering"],
      yearRequirement: "2nd Year or Above",
      credits: "Credit Eligible",
      color: "bg-blue-50 border-blue-200 hover:border-blue-400"
    },
    { 
      name: "MCA", 
      fullName: "Master of Computer Applications",
      description: "Advanced postgraduate program for in-depth computer science and application development skills",
      duration: "2 Years",
      eligibility: "Graduate in Any Field",
      icon: Award,
      features: ["Advanced Programming", "System Analysis", "AI/ML Basics", "Project Management"],
      yearRequirement: "1st Year or Above",
      credits: "Credit Eligible",
      color: "bg-purple-50 border-purple-200 hover:border-purple-400"
    },
    { 
      name: "BSc CS/IT", 
      fullName: "Bachelor of Science (Computer Science/IT)",
      description: "Scientific approach to computing with strong theoretical foundation and practical applications",
      duration: "3 Years",
      eligibility: "12th Pass (Science/Math)",
      icon: School,
      features: ["Data Structures", "Algorithms", "Computer Networks", "Operating Systems"],
      yearRequirement: "2nd Year or Above",
      credits: "Credit Eligible",
      color: "bg-green-50 border-green-200 hover:border-green-400"
    },
    { 
      name: "Diploma", 
      fullName: "Diploma in Computer Science/IT",
      description: "Practical-oriented program focusing on industry-ready skills and immediate job placement",
      duration: "2-3 Years",
      eligibility: "10th Pass",
      icon: Trophy,
      features: ["Hands-on Training", "Industry Projects", "Quick Employment", "Skill Certification"],
      yearRequirement: "2nd Year or Above",
      credits: "Credit Eligible",
      color: "bg-amber-50 border-amber-200 hover:border-amber-400"
    }
  ];

  const features = [
    {
      icon: Target,
      title: "Personalized Career Path",
      description: "Tailored roadmaps based on your goals and current skill level"
    },
    {
      icon: Zap,
      title: "Fast-Track Programs",
      description: "Accelerated learning paths to get you job-ready quickly"
    },
    {
      icon: TrendingUp,
      title: "Industry Connections",
      description: "Network with professionals and access exclusive opportunities"
    },
    {
      icon: Award,
      title: "Verified Credentials",
      description: "Industry-recognized certificates and project portfolios"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Transform Your Tech Career with
                <span className="text-primary block">Career Studio</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Your complete career development platform. From internships to job placement, 
                skill development to mentorship - everything you need to succeed in tech.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={onGetStarted}
                  className="text-lg px-8 py-3"
                >
                  Start Your Journey
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="text-lg px-8 py-3"
                >
                  Explore Services
                </Button>
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1753613648137-602c669cbe07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGxlYXJuaW5nJTIwY29kaW5nJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTk0MjEwMDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Students learning coding and technology"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Career Modules Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Complete Career Development Platform
            </h2>
            <p className="text-xl text-gray-600">
              All the tools and services you need to accelerate your tech career
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {careerModules.map((module, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <module.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                      <Badge variant="secondary" className={module.color}>
                        Available
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {module.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-50/50 to-indigo-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Career Studio?
            </h2>
            <p className="text-xl text-gray-600">
              We provide end-to-end support for your career transformation
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Internship Module Spotlight */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4">Featured Module</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Internship Programs
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Transform your career with industry-leading internship programs
            </p>
            
            {/* Program Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">1200+</div>
                <div className="text-gray-600">Students Placed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">150+</div>
                <div className="text-gray-600">Partner Companies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">95%</div>
                <div className="text-gray-600">Completion Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">4.8★</div>
                <div className="text-gray-600">Student Rating</div>
              </div>
            </div>
          </div>

          {/* Program Types Overview */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Academic Internships</h3>
              <p className="text-gray-600 mb-8">
                Complete your college internship requirements with real-world projects and industry mentorship.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>College credit eligible</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Industry mentor assigned</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Project-based learning</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Certificate of completion</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Professional Tracks</h3>
              <p className="text-gray-600 mb-8">
                Intensive skill-building programs designed for career advancement and job readiness.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Job placement assistance</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Portfolio development</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Interview preparation</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Industry networking events</span>
                </div>
              </div>

              {/* Next Batch Info */}
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Next Batch Starts</CardTitle>
                  </div>
                  <CardDescription>
                    <div className="text-primary font-semibold">December 15, 2024</div>
                    <div className="text-sm">Limited seats available</div>
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Programs Section - Full Width */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50/50 to-purple-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Academic Programs
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Choose your academic program and complete your internship requirements with industry experience
            </p>
            
            {/* Academic Program Benefits */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">College Credit</h4>
                <p className="text-gray-600 text-sm">Earn credits towards your degree completion</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Expert Mentorship</h4>
                <p className="text-gray-600 text-sm">Personal guidance from industry professionals</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Industry Certificate</h4>
                <p className="text-gray-600 text-sm">Recognized completion certificates</p>
              </div>
            </div>
          </div>

          {/* College Program Cards - Full Width Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {academicPrograms.map((program, index) => (
              <Card key={index} className={`hover:shadow-xl transition-all duration-300 border-2 ${program.color} group hover:-translate-y-1 flex flex-col h-full`}>
                <CardHeader className="pb-4 flex-shrink-0">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <program.icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl text-primary mb-1">{program.name}</CardTitle>
                    <div className="text-sm text-gray-600 font-medium mb-3 h-10 flex items-center justify-center">{program.fullName}</div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {program.credits}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col flex-1">
                  <div className="flex-1 space-y-4">
                    <CardDescription className="text-gray-600 leading-relaxed text-center h-20 flex items-center justify-center text-sm">
                      {program.description}
                    </CardDescription>
                    
                    <div className="space-y-3 py-3 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-700">Duration</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{program.duration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <BookmarkCheck className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-700">Eligibility</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{program.eligibility}</span>
                      </div>
                    </div>
                    
                    <div className="h-28">
                      <div className="text-sm font-medium text-gray-700 mb-2 text-center">Key Areas Covered:</div>
                      <div className="space-y-1">
                        {program.features.slice(0, 4).map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                            <span className="text-xs text-gray-600 leading-tight">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100 space-y-3 flex-shrink-0">
                    <div className="text-center">
                      <span className="text-sm text-gray-600">Requirement: </span>
                      <span className="text-sm font-medium text-gray-900">{program.yearRequirement}</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                      Apply Now
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Back to Internship Programs Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">

          {/* Technology Tracks */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">Choose Your Technology Track</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {internshipTracks.map((track, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <track.icon className="w-6 h-6 text-primary" />
                      </div>
                      <Badge variant="secondary" className={track.color}>
                        {track.level}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{track.name}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {track.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{track.duration} • {track.projects}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-semibold text-green-600">{track.placement} placement rate</span>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-2">Technologies:</div>
                        <div className="flex flex-wrap gap-1">
                          {track.technologies.map((tech, techIndex) => (
                            <Badge key={techIndex} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Company Partners */}
          <div className="text-center mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Our Industry Partners</h3>
            <p className="text-gray-600 mb-8">Students get placed at leading technology companies</p>
            <div className="flex items-center justify-center gap-8 opacity-60">
              <div className="flex items-center gap-2">
                <Building className="w-6 h-6" />
                <span className="font-semibold">TechCorp</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-6 h-6" />
                <span className="font-semibold">InnovateLabs</span>
              </div>
              <div className="flex items-center gap-2">
                <Code className="w-6 h-6" />
                <span className="font-semibold">DevSolutions</span>
              </div>
              <div className="flex items-center gap-2">
                <Brain className="w-6 h-6" />
                <span className="font-semibold">AI Dynamics</span>
              </div>
            </div>
          </div>

          {/* Student Testimonial */}
          <Card className="mb-12 bg-gradient-to-r from-purple-50 to-indigo-50 border-none">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-lg text-gray-700 mb-4 italic">
                  "The Full Stack Development internship completely transformed my career. Within 3 months of completion, 
                  I landed a developer role at a top tech company. The mentorship and real-world projects were invaluable."
                </blockquote>
                <div className="text-primary font-semibold">Priya Sharma</div>
                <div className="text-gray-600 text-sm">Full Stack Developer at TechCorp</div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button 
              size="lg" 
              onClick={onGetStarted}
              className="text-lg px-8 py-3 mr-4"
            >
              Apply for Internship
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="text-lg px-8 py-3"
            >
              Download Brochure
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of professionals who have accelerated their tech careers with Career Studio
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={onGetStarted}
            className="text-lg px-8 py-3"
          >
            Get Started Today
          </Button>
        </div>
      </section>
    </div>
  );
}