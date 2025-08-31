
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Home, 
  User, 
  Target, 
  BarChart3, 
  Users, 
  Settings, 
  LogOut,
  TrendingUp,
  Award,
  Calendar,
  MessageCircle,
  ChevronRight,
  Star,
  BookOpen,
  Briefcase,
  Clock,
  Bell,
  Send
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState('home');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const sidebarItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'career-path', label: 'Career Path', icon: Target },
    { id: 'skill-gap', label: 'Skill Gap', icon: BarChart3 },
    { id: 'mentorship', label: 'Mentorship', icon: Users },
    { id: 'job-market', label: 'Job Market Insights', icon: TrendingUp },
    { id: 'learning-hub', label: 'Adaptive Learning Hub', icon: BookOpen },
    { id: 'interview-coach', label: 'AI Interview Coach', icon: MessageCircle },
    { id: 'achievements', label: 'Achievement System', icon: Award },
    { id: 'scholarships', label: 'Scholarship Finder', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const careerRecommendations = [
    {
      title: "Data Scientist",
      match: 92,
      description: "Perfect match for your analytical skills and math background",
      skills: ["Python", "Machine Learning", "Statistics"],
      growth: "+22% job growth"
    },
    {
      title: "Software Engineer",
      match: 85,
      description: "Great fit for your programming experience",
      skills: ["JavaScript", "React", "Node.js"],
      growth: "+13% job growth"
    },
    {
      title: "AI/ML Engineer",
      match: 89,
      description: "Ideal for your interest in artificial intelligence",
      skills: ["TensorFlow", "Deep Learning", "Python"],
      growth: "+31% job growth"
    }
  ];

  const skillRoadmap = [
    { skill: "Python Programming", progress: 85, status: "Advanced", color: "bg-green-500" },
    { skill: "Machine Learning", progress: 70, status: "Intermediate", color: "bg-blue-500" },
    { skill: "Data Visualization", progress: 60, status: "Intermediate", color: "bg-yellow-500" },
    { skill: "SQL & Databases", progress: 45, status: "Beginner", color: "bg-orange-500" },
    { skill: "Cloud Computing", progress: 30, status: "Beginner", color: "bg-red-500" }
  ];

  const jobMarketTrends = [
    { role: "AI Engineer", change: "+31%", trend: "up", salary: "$120k" },
    { role: "Data Scientist", change: "+22%", trend: "up", salary: "$110k" },
    { role: "DevOps Engineer", change: "+19%", trend: "up", salary: "$105k" },
    { role: "Cybersecurity Analyst", change: "+28%", trend: "up", salary: "$95k" }
  ];

  const mentors = [
    { name: "Sarah Chen", role: "Senior Data Scientist at Google", rating: 4.9, sessions: 127 },
    { name: "Michael Rodriguez", role: "ML Engineer at Tesla", rating: 4.8, sessions: 89 },
    { name: "Emily Johnson", role: "Tech Lead at Microsoft", rating: 4.9, sessions: 156 }
  ];

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div className="space-y-8">
            {/* Welcome Header */}
            <div className="bg-gradient-primary text-white rounded-xl p-8">
              <h1 className="text-3xl font-bold mb-2">Welcome back, John! 👋</h1>
              <p className="text-white/80 text-lg">
                Ready to continue your career journey? Here's your progress overview.
              </p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">Career Match</p>
                      <p className="text-2xl font-bold text-card-foreground">92%</p>
                    </div>
                    <div className="p-3 rounded-full bg-gradient-primary">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">Skills Progress</p>
                      <p className="text-2xl font-bold text-card-foreground">68%</p>
                    </div>
                    <div className="p-3 rounded-full bg-gradient-primary">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">Mentor Sessions</p>
                      <p className="text-2xl font-bold text-card-foreground">12</p>
                    </div>
                    <div className="p-3 rounded-full bg-gradient-primary">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">Certificates</p>
                      <p className="text-2xl font-bold text-card-foreground">5</p>
                    </div>
                    <div className="p-3 rounded-full bg-gradient-primary">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Career Recommendations */}
            <div>
              <h2 className="text-2xl font-bold text-ai-blue-900 mb-6">Career Recommendations</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {careerRecommendations.map((career, index) => (
                  <Card key={index} className="card-gradient hover:scale-105 transition-transform duration-200 cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-ai-blue-900">{career.title}</CardTitle>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-ai-gold-500 fill-current" />
                          <span className="text-sm font-semibold text-ai-blue-700">{career.match}%</span>
                        </div>
                      </div>
                      <Progress value={career.match} className="progress-bar h-2" />
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-ai-blue-600 mb-4">
                        {career.description}
                      </CardDescription>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-ai-blue-800 mb-2">Required Skills:</p>
                          <div className="flex flex-wrap gap-2">
                            {career.skills.map((skill, skillIndex) => (
                              <span 
                                key={skillIndex}
                                className="px-2 py-1 bg-ai-blue-100 text-ai-blue-700 text-xs rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-sm text-green-600 font-medium">{career.growth}</span>
                          <ChevronRight className="w-4 h-4 text-ai-blue-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Skill Roadmap */}
            <div>
              <h2 className="text-2xl font-bold text-ai-blue-900 mb-6">Your Skill Roadmap</h2>
              <Card className="card-gradient">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {skillRoadmap.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-ai-blue-900">{item.skill}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              item.status === 'Advanced' ? 'bg-green-100 text-green-700' :
                              item.status === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {item.status}
                            </span>
                          </div>
                          <Progress value={item.progress} className="progress-bar h-3" />
                          <p className="text-sm text-ai-blue-600 mt-1">{item.progress}% Complete</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Job Market Trends */}
              <div>
                <h2 className="text-2xl font-bold text-ai-blue-900 mb-6">Job Market Trends</h2>
                <Card className="card-gradient">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {jobMarketTrends.map((trend, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-ai-blue-50 rounded-lg">
                          <div>
                            <h3 className="font-semibold text-ai-blue-900">{trend.role}</h3>
                            <p className="text-sm text-ai-blue-600">Avg. Salary: {trend.salary}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-1">
                              <TrendingUp className="w-4 h-4 text-green-600" />
                              <span className="text-green-600 font-semibold">{trend.change}</span>
                            </div>
                            <p className="text-xs text-ai-blue-600">growth rate</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Mentorship Connect */}
              <div>
                <h2 className="text-2xl font-bold text-ai-blue-900 mb-6">Connect with Mentors</h2>
                <Card className="card-gradient">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {mentors.map((mentor, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-ai-blue-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                              {mentor.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <h3 className="font-semibold text-ai-blue-900">{mentor.name}</h3>
                              <p className="text-sm text-ai-blue-600">{mentor.role}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <div className="flex items-center space-x-1">
                                  <Star className="w-3 h-3 text-ai-gold-500 fill-current" />
                                  <span className="text-xs text-ai-blue-700">{mentor.rating}</span>
                                </div>
                                <span className="text-xs text-ai-blue-600">•</span>
                                <span className="text-xs text-ai-blue-600">{mentor.sessions} sessions</span>
                              </div>
                            </div>
                          </div>
                          <Button size="sm" className="btn-primary">
                            Connect
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );
      
      case 'profile':
        return (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    JD
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">John Doe</h2>
                    <p className="text-muted-foreground">Computer Science Student</p>
                    <p className="text-sm text-muted-foreground">john.doe@university.edu</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Career Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Data Science", "Machine Learning", "Software Engineering", "AI Research"].map((interest, index) => (
                        <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Python", "JavaScript", "React", "Machine Learning", "Data Analysis"].map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case 'career-path':
        return (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-foreground">Career Path Analysis</h1>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Recommended Career Tracks</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { title: "Data Scientist", progress: 75, description: "Advanced analytics and machine learning" },
                    { title: "ML Engineer", progress: 60, description: "Production ML systems and deployment" },
                    { title: "Software Engineer", progress: 85, description: "Full-stack development and architecture" }
                  ].map((track, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <h3 className="font-semibold text-foreground">{track.title}</h3>
                        <span className="text-sm text-muted-foreground">{track.progress}%</span>
                      </div>
                      <Progress value={track.progress} className="h-2" />
                      <p className="text-sm text-muted-foreground">{track.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Career Milestones</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { milestone: "Complete Python Certification", status: "completed" },
                    { milestone: "Build ML Portfolio Project", status: "in-progress" },
                    { milestone: "Internship Application", status: "upcoming" },
                    { milestone: "Network with Industry Professionals", status: "upcoming" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        item.status === 'completed' ? 'bg-green-500' :
                        item.status === 'in-progress' ? 'bg-yellow-500' : 'bg-gray-300'
                      }`} />
                      <span className="text-foreground">{item.milestone}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        );
      
      case 'skill-gap':
        return (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-foreground">Skill Gap Analysis</h1>
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Skills Missing for Data Scientist Role</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { skill: "Deep Learning", priority: "High", courses: ["TensorFlow Specialization", "Deep Learning.ai"] },
                  { skill: "Statistical Analysis", priority: "Medium", courses: ["Statistics for Data Science", "Probability Theory"] },
                  { skill: "Cloud Computing (AWS)", priority: "High", courses: ["AWS Machine Learning", "Cloud Practitioner"] },
                  { skill: "SQL Advanced", priority: "Low", courses: ["Advanced SQL", "Database Design"] }
                ].map((item, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-foreground">{item.skill}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        item.priority === 'High' ? 'bg-red-100 text-red-700' :
                        item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {item.priority} Priority
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Recommended Courses:</p>
                    <div className="flex flex-wrap gap-2">
                      {item.courses.map((course, courseIndex) => (
                        <span key={courseIndex} className="px-2 py-1 bg-primary/10 text-primary rounded text-sm">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        );
      
      case 'mentorship':
        return (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-foreground">Mentorship Platform</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Dr. Sarah Chen", specialty: "Data Science & AI", company: "Google", rating: 4.9, sessions: 127, available: true },
                { name: "Michael Rodriguez", specialty: "Software Engineering", company: "Meta", rating: 4.8, sessions: 89, available: false },
                { name: "Emily Johnson", specialty: "Machine Learning", company: "Microsoft", rating: 4.9, sessions: 156, available: true },
                { name: "David Kim", specialty: "Cloud Computing", company: "Amazon", rating: 4.7, sessions: 73, available: true },
                { name: "Lisa Thompson", specialty: "Product Management", company: "Apple", rating: 4.8, sessions: 92, available: false },
                { name: "James Wilson", specialty: "Cybersecurity", company: "IBM", rating: 4.6, sessions: 64, available: true }
              ].map((mentor, index) => (
                <Card key={index} className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                        {mentor.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{mentor.name}</h3>
                        <p className="text-sm text-muted-foreground">{mentor.company}</p>
                      </div>
                    </div>
                    <p className="text-sm text-foreground mb-2">{mentor.specialty}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-foreground">{mentor.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{mentor.sessions} sessions</span>
                    </div>
                    <Button 
                      size="sm" 
                      variant={mentor.available ? "default" : "outline"} 
                      className="w-full"
                      disabled={!mentor.available}
                    >
                      {mentor.available ? "Connect" : "Unavailable"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      
      case 'job-market':
        return (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-foreground">Job Market Insights</h1>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Trending Roles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {jobMarketTrends.map((trend, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <h3 className="font-semibold text-foreground">{trend.role}</h3>
                        <p className="text-sm text-muted-foreground">Avg. Salary: {trend.salary}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <span className="text-green-600 font-semibold">{trend.change}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Market Predictions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border border-border rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">AI & Machine Learning</h3>
                    <p className="text-sm text-muted-foreground">Expected to grow by 40% in the next 2 years with increasing demand for AI specialists.</p>
                  </div>
                  <div className="p-4 border border-border rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">Cloud Computing</h3>
                    <p className="text-sm text-muted-foreground">Continuous growth with 35% increase in cloud architect positions.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'learning-hub':
        return (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-foreground">Adaptive Learning Hub</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Python for Data Science", progress: 75, type: "Course", provider: "Coursera" },
                { title: "Machine Learning Basics", progress: 45, type: "Course", provider: "edX" },
                { title: "SQL Fundamentals", progress: 90, type: "Course", provider: "Khan Academy" },
                { title: "Data Visualization", progress: 30, type: "Project", provider: "Kaggle" },
                { title: "Deep Learning", progress: 15, type: "Course", provider: "Udacity" },
                { title: "Portfolio Project", progress: 60, type: "Project", provider: "Personal" }
              ].map((item, index) => (
                <Card key={index} className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{item.type}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{item.provider}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Progress</span>
                        <span className="text-sm text-foreground">{item.progress}%</span>
                      </div>
                      <Progress value={item.progress} className="h-2" />
                    </div>
                    <Button size="sm" className="w-full mt-4">Continue Learning</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'interview-coach':
        return (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-foreground">AI Interview Coach</h1>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Practice Sessions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { type: "Technical Interview", difficulty: "Medium", duration: "45 min", completed: true },
                    { type: "Behavioral Interview", difficulty: "Easy", duration: "30 min", completed: true },
                    { type: "Case Study", difficulty: "Hard", duration: "60 min", completed: false },
                    { type: "Data Science Interview", difficulty: "Hard", duration: "50 min", completed: false }
                  ].map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <h3 className="font-semibold text-foreground">{session.type}</h3>
                        <p className="text-sm text-muted-foreground">{session.difficulty} • {session.duration}</p>
                      </div>
                      <Button size="sm" variant={session.completed ? "outline" : "default"}>
                        {session.completed ? "Review" : "Start"}
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Performance Analytics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Communication Skills</span>
                      <span className="text-sm text-foreground">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Technical Knowledge</span>
                      <span className="text-sm text-foreground">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Problem Solving</span>
                      <span className="text-sm text-foreground">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'achievements':
        return (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-foreground">Achievement System</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Python Master", description: "Completed Python certification", earned: true, date: "2024-01-15" },
                { title: "Data Explorer", description: "Analyzed 5 datasets", earned: true, date: "2024-02-20" },
                { title: "ML Practitioner", description: "Built first ML model", earned: true, date: "2024-03-10" },
                { title: "Portfolio Builder", description: "Created 3 projects", earned: false, progress: 2 },
                { title: "Interview Expert", description: "Passed 10 mock interviews", earned: false, progress: 7 },
                { title: "Network Leader", description: "Connected with 20 mentors", earned: false, progress: 12 }
              ].map((achievement, index) => (
                <Card key={index} className={`bg-card border-border ${achievement.earned ? 'ring-2 ring-primary/20' : ''}`}>
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                      achievement.earned ? 'bg-gradient-primary' : 'bg-muted'
                    }`}>
                      <Award className={`w-8 h-8 ${achievement.earned ? 'text-white' : 'text-muted-foreground'}`} />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>
                    {achievement.earned ? (
                      <p className="text-xs text-primary">Earned on {achievement.date}</p>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="text-foreground">{achievement.progress}/10</span>
                        </div>
                        <Progress value={(achievement.progress / 10) * 100} className="h-2" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'scholarships':
        return (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-foreground">Scholarship Finder</h1>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Tech Diversity Scholarship", amount: "$5,000", deadline: "2024-06-15", match: 95, description: "For underrepresented students in STEM" },
                { title: "AI Research Grant", amount: "$10,000", deadline: "2024-07-30", match: 88, description: "For students pursuing AI/ML research" },
                { title: "Data Science Excellence Award", amount: "$3,000", deadline: "2024-05-20", match: 92, description: "For outstanding data science students" },
                { title: "Future Leaders Scholarship", amount: "$7,500", deadline: "2024-08-10", match: 85, description: "For emerging technology leaders" }
              ].map((scholarship, index) => (
                <Card key={index} className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-semibold text-foreground">{scholarship.title}</h3>
                      <span className="text-lg font-bold text-primary">{scholarship.amount}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{scholarship.description}</p>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Match Score</span>
                        <span className="text-sm text-foreground">{scholarship.match}%</span>
                      </div>
                      <Progress value={scholarship.match} className="h-2" />
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Deadline: {scholarship.deadline}</span>
                        <Button size="sm">Apply Now</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <p className="text-muted-foreground">Account settings coming soon...</p>
              </CardContent>
            </Card>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Light Grid Background */}
      <div className="fixed inset-0 bg-grid-pattern bg-[size:30px_30px] opacity-10 pointer-events-none"></div>
      
      <div className="relative z-10 flex">
        {/* Sidebar */}
        <div className={`bg-card border-r border-border transition-all duration-300 flex flex-col min-h-screen ${
          sidebarCollapsed ? 'w-16 md:w-20' : 'w-64'
        }`}>
          <div className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              {!sidebarCollapsed && (
                <span className="text-xl font-bold text-foreground">CareerCompass</span>
              )}
            </div>
          </div>
          
          <nav className="px-4 space-y-2 flex-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-gradient-primary text-white'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
              </button>
            ))}
            
            {/* Logout button positioned after settings */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-destructive hover:bg-destructive/10 rounded-lg transition-all duration-200 mt-4"
            >
              <LogOut className="w-5 h-5" />
              {!sidebarCollapsed && <span className="font-medium">Logout</span>}
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-4 md:p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">Welcome back, Alex!</h1>
                <p className="text-muted-foreground mt-2">Let's continue your career journey</p>
              </div>
              <div className="flex items-center space-x-2 md:space-x-4">
                <div className="relative">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    onClick={() => setShowNotifications(!showNotifications)}
                  >
                    <Bell className="w-4 h-4 md:mr-2" />
                    <span className="hidden md:inline">Notifications</span>
                  </Button>
                  {showNotifications && (
                    <div className="absolute right-0 top-full mt-2 w-72 md:w-80 bg-card border border-border rounded-lg shadow-lg z-50 animate-fade-in">
                      <div className="p-4">
                        <h3 className="font-semibold text-foreground mb-3">Recent Notifications</h3>
                        <div className="space-y-3">
                          {[
                            { title: "New mentor match found", desc: "Sarah Chen is available for mentorship", time: "2 hours ago" },
                            { title: "Skill assessment complete", desc: "Your Python skills have been updated", time: "1 day ago" },
                            { title: "Interview opportunity", desc: "Tech company wants to schedule an interview", time: "2 days ago" },
                            { title: "Course completion", desc: "You've completed Machine Learning Basics", time: "3 days ago" }
                          ].map((notif, index) => (
                            <div key={index} className="p-3 border border-border rounded-lg hover:bg-secondary/50 cursor-pointer">
                              <h4 className="font-medium text-foreground text-sm">{notif.title}</h4>
                              <p className="text-xs text-muted-foreground">{notif.desc}</p>
                              <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <button 
                  onClick={() => setActiveSection('profile')}
                  className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
                >
                  <User className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>
            {renderContent()}
          </div>
        </div>

        {/* Sidebar Toggle Button */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="fixed left-4 md:left-6 top-4 md:top-6 z-50 w-8 h-8 md:w-10 md:h-10 bg-card border border-border rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200"
        >
          {sidebarCollapsed ? <ChevronRight className="w-4 h-4 md:w-5 md:h-5" /> : <ChevronRight className="w-4 h-4 md:w-5 md:h-5 rotate-180" />}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
