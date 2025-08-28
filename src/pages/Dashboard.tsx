
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

  const sidebarItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'career-path', label: 'Career Path', icon: Target },
    { id: 'skill-gap', label: 'Skill Gap', icon: BarChart3 },
    { id: 'mentorship', label: 'Mentorship', icon: Users },
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
            <h1 className="text-3xl font-bold text-ai-blue-900">Profile Settings</h1>
            <Card className="card-gradient">
              <CardContent className="p-6">
                <p className="text-ai-blue-600">Profile management features coming soon...</p>
              </CardContent>
            </Card>
          </div>
        );
      
      case 'career-path':
        return (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-ai-blue-900">Career Path Analysis</h1>
            <Card className="card-gradient">
              <CardContent className="p-6">
                <p className="text-ai-blue-600">Detailed career path analysis coming soon...</p>
              </CardContent>
            </Card>
          </div>
        );
      
      case 'skill-gap':
        return (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-ai-blue-900">Skill Gap Analysis</h1>
            <Card className="card-gradient">
              <CardContent className="p-6">
                <p className="text-ai-blue-600">Advanced skill gap analysis coming soon...</p>
              </CardContent>
            </Card>
          </div>
        );
      
      case 'mentorship':
        return (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-ai-blue-900">Mentorship Platform</h1>
            <Card className="card-gradient">
              <CardContent className="p-6">
                <p className="text-ai-blue-600">Mentorship platform features coming soon...</p>
              </CardContent>
            </Card>
          </div>
        );
      
      case 'settings':
        return (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-ai-blue-900">Settings</h1>
            <Card className="card-gradient">
              <CardContent className="p-6">
                <p className="text-ai-blue-600">Account settings coming soon...</p>
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
        <div className={`bg-card border-r border-border transition-all duration-300 ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        }`}>
          <div className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              {!sidebarCollapsed && (
                <span className="text-xl font-bold text-foreground">AI Career</span>
              )}
            </div>
          </div>
          
          <nav className="px-4 space-y-2">
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
          </nav>
          
          <div className="absolute bottom-6 left-4 right-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-destructive hover:bg-destructive/10 rounded-lg transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              {!sidebarCollapsed && <span className="font-medium">Logout</span>}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Welcome back, Alex!</h1>
                <p className="text-muted-foreground mt-2">Let's continue your career journey</p>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                </Button>
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            {renderContent()}
          </div>
        </div>

        {/* Sidebar Toggle Button */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="fixed left-6 top-6 z-50 w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200"
        >
          {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronRight className="w-5 h-5 rotate-180" />}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
