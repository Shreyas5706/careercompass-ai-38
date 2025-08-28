import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, Target, Users, TrendingUp, Star, ChevronRight, Brain, Award, Zap, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { FeatureModal } from "@/components/FeatureModal";
import { useState } from "react";

export default function Index() {
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const features = [
    {
      icon: Target,
      title: "Career Path Finder",
      description: "AI-powered career recommendations based on your skills, interests, and market trends.",
      details: "Our advanced AI analyzes thousands of career paths and matches you with opportunities that align with your unique profile. We consider your educational background, skills, interests, and current market demand to provide personalized recommendations.",
      benefits: [
        "Personalized career matching using machine learning",
        "Real-time market demand analysis",
        "Skills gap identification",
        "Educational pathway recommendations"
      ],
      ctaText: "Explore Careers"
    },
    {
      icon: BookOpen,
      title: "Skill Gap Analyzer",
      description: "Identify missing skills and get personalized learning roadmaps to fill the gaps.",
      details: "Compare your current skill set against industry requirements and receive a detailed roadmap to bridge any gaps. Our system tracks the latest industry trends and skill demands.",
      benefits: [
        "Comprehensive skill assessment",
        "Industry-specific requirements analysis",
        "Personalized learning paths",
        "Progress tracking and milestones"
      ],
      ctaText: "Analyze Skills"
    },
    {
      icon: Users,
      title: "Mentorship Connect",
      description: "Connect with industry professionals and mentors in your field of interest.",
      details: "Access our network of verified industry professionals who are passionate about helping the next generation. Get matched with mentors based on your career goals and interests.",
      benefits: [
        "Verified industry professionals",
        "Smart mentor matching",
        "Structured mentorship programs",
        "Regular progress check-ins"
      ],
      ctaText: "Find Mentors"
    },
    {
      icon: TrendingUp,
      title: "Job Market Insights",
      description: "Real-time job market data and salary insights to help you make informed decisions.",
      details: "Access comprehensive job market analytics including salary trends, skill demand, geographic opportunities, and future growth projections for your target career.",
      benefits: [
        "Real-time salary data",
        "Job availability trends",
        "Geographic opportunity mapping",
        "Future market projections"
      ],
      ctaText: "View Insights"
    }
  ];

  const handleFeatureClick = (feature: any) => {
    setSelectedFeature(feature);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 animated-grid opacity-20 pointer-events-none"></div>
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white icon-float" />
              </div>
              <span className="text-xl font-bold text-foreground">AI Career Advisor</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('home')} className="nav-link">Home</button>
              <button onClick={() => scrollToSection('features')} className="nav-link">Features</button>
              <button onClick={() => scrollToSection('about')} className="nav-link">About</button>
              <button onClick={() => scrollToSection('contact')} className="nav-link">Contact</button>
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex space-x-4">
              <Link to="/login">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="gradient">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border animate-fade-in">
              <div className="container mx-auto px-6 py-4 space-y-4">
                <button onClick={() => scrollToSection('home')} className="block w-full text-left nav-link">Home</button>
                <button onClick={() => scrollToSection('features')} className="block w-full text-left nav-link">Features</button>
                <button onClick={() => scrollToSection('about')} className="block w-full text-left nav-link">About</button>
                <button onClick={() => scrollToSection('contact')} className="block w-full text-left nav-link">Contact</button>
                <div className="flex flex-col space-y-2 pt-4">
                  <Link to="/login">
                    <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="gradient" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative z-10 container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in">
            Personalized AI Career & 
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Skills Advisor</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed animate-fade-in">
            Empowering Students with AI-Powered Career Guidance. Discover your perfect career path, 
            identify skill gaps, and connect with mentors to accelerate your professional growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Link to="/register">
              <Button size="lg" variant="gradient" className="text-lg px-8 py-4 group">
                Get Started 
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-4">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Why Choose Our AI Career Advisor?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Advanced AI technology meets personalized career guidance to help you make informed decisions about your future.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="feature-card bg-card border-border"
              onClick={() => handleFeatureClick(feature)}
            >
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white icon-float" />
                </div>
                <CardTitle className="text-card-foreground text-xl mb-2">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-center leading-relaxed">
                  {feature.description}
                </CardDescription>
                <div className="text-center mt-4">
                  <span className="text-primary text-sm font-medium hover:underline">
                    Click to learn more →
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-8">About Our Mission</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-white icon-float" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">AI-Powered</h3>
              <p className="text-muted-foreground">Advanced machine learning algorithms analyze career trends and provide personalized recommendations.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white icon-float" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Expert Guidance</h3>
              <p className="text-muted-foreground">Connect with industry experts and mentors who provide real-world insights and career advice.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white icon-float" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Instant Results</h3>
              <p className="text-muted-foreground">Get immediate feedback and recommendations to accelerate your career development journey.</p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We believe that everyone deserves access to quality career guidance. Our platform combines cutting-edge AI technology 
            with human expertise to provide students with the tools and insights they need to make informed career decisions and 
            achieve their professional goals.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">What Students Say</h2>
          <p className="text-xl text-muted-foreground">Join thousands of students who have transformed their careers with our AI advisor.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Sarah Johnson",
              role: "Computer Science Student",
              content: "The AI career advisor helped me identify my passion for data science and provided a clear roadmap to get there. I landed my dream internship!",
              rating: 5
            },
            {
              name: "Michael Chen",
              role: "Business Major",
              content: "The skill gap analysis was eye-opening. I never realized which skills I was missing for my target career. Now I'm much more prepared.",
              rating: 5
            },
            {
              name: "Emily Rodriguez",
              role: "Engineering Student",
              content: "Connecting with mentors through this platform changed my perspective on my career. The guidance has been invaluable.",
              rating: 5
            }
          ].map((testimonial, index) => (
            <Card key={index} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="bg-gradient-primary rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Transform Your Career?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have already discovered their perfect career path with our AI-powered guidance system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4 group hover:scale-105 transition-all duration-300">
                Start Your Journey 
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4 hover:scale-105 transition-all duration-300">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">Get In Touch</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Have questions? We're here to help you on your career journey.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-card border-border">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold text-foreground mb-2">Email Us</h3>
                <p className="text-muted-foreground">support@aicareeradvisor.com</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold text-foreground mb-2">Call Us</h3>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-foreground">AI Career Advisor</span>
              </div>
              <p className="text-muted-foreground">Empowering students with AI-powered career guidance.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Platform</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Status</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-muted-foreground">&copy; 2024 AI Career Advisor. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Feature Modal */}
      {selectedFeature && (
        <FeatureModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          feature={selectedFeature}
        />
      )}
    </div>
  );
}