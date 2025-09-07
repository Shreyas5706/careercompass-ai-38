import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, AlertCircle, Clock, Users, GraduationCap, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type UserRole = "student" | "counselor" | "admin";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState<UserRole>("student");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    { id: "student" as UserRole, label: "Student", icon: GraduationCap },
    { id: "counselor" as UserRole, label: "Counselor", icon: Users },
    { id: "admin" as UserRole, label: "Institute Admin", icon: Building }
  ];

  const getRoleTitle = () => {
    switch (selectedRole) {
      case "student": return "Student Login";
      case "counselor": return "Counselor Login";
      case "admin": return "Admin Login";
      default: return "Login";
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setTimeout(() => {
        toast({
          title: "Login Successful!",
          description: `Welcome back to CareerCompass as ${selectedRole}`,
        });
        navigate('/dashboard');
        setIsLoading(false);
      }, 1000);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a237e] via-[#3949ab] to-[#6a1b9a]" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex">
        {/* Left Section - Branding */}
        <div className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-center items-center text-center">
          <div className="max-w-md text-white">
            <div className="mb-8 flex justify-center">
              <Clock className="w-16 h-16 text-white/80 animate-pulse" />
            </div>
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Welcome to<br />
              <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                CareerCompass
              </span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Select your role to access your personalized dashboard and unlock AI-powered career guidance
            </p>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Glassmorphism Card */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
              {/* Mobile Branding */}
              <div className="lg:hidden text-center mb-8">
                <Clock className="w-12 h-12 text-white/80 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-white mb-2">CareerCompass</h1>
                <p className="text-white/80">Select your role to continue</p>
              </div>

              {/* Role Selection */}
              <div className="mb-8">
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {roles.map((role) => {
                    const Icon = role.icon;
                    return (
                      <button
                        key={role.id}
                        onClick={() => setSelectedRole(role.id)}
                        className={`relative p-4 rounded-xl border transition-all duration-300 ${
                          selectedRole === role.id
                            ? 'bg-white/20 border-white/40 shadow-lg scale-105'
                            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                        }`}
                      >
                        <Icon className="w-6 h-6 text-white mx-auto mb-2" />
                        <span className="text-white text-sm font-medium block">{role.label}</span>
                        {selectedRole === role.id && (
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400/20 to-purple-400/20 pointer-events-none" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Form Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">{getRoleTitle()}</h2>
                <p className="text-white/70">Enter your credentials to access your dashboard</p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white font-medium">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`bg-white/15 backdrop-blur border-white/30 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-white/20 ${
                      errors.email ? 'border-red-400' : ''
                    }`}
                  />
                  {errors.email && (
                    <div className="flex items-center space-x-1 text-red-300 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white font-medium">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`bg-white/15 backdrop-blur border-white/30 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-white/20 pr-10 ${
                        errors.password ? 'border-red-400' : ''
                      }`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-white/10"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-white/70" />
                      ) : (
                        <Eye className="w-4 h-4 text-white/70" />
                      )}
                    </Button>
                  </div>
                  {errors.password && (
                    <div className="flex items-center space-x-1 text-red-300 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.password}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      id="remember"
                      type="checkbox"
                      className="w-4 h-4 text-blue-400 border-white/30 rounded focus:ring-blue-400/20 bg-white/10"
                    />
                    <Label htmlFor="remember" className="text-sm text-white/80">
                      Remember me
                    </Label>
                  </div>
                  <Link 
                    to="#" 
                    className="text-sm text-blue-300 hover:text-blue-200 font-medium transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign In to Dashboard"}
                </Button>

                <div className="text-center">
                  <span className="text-white/70">Don't have an account? </span>
                  <Link 
                    to="/register" 
                    className="text-blue-300 hover:text-blue-200 font-medium transition-colors"
                  >
                    Contact admin
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;