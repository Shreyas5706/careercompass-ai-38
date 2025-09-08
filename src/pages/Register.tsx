import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  GraduationCap, 
  Users, 
  Building, 
  ArrowLeft, 
  ArrowRight, 
  Clock,
  Upload,
  Eye,
  EyeOff,
  CheckCircle,
  X,
  AlertCircle,
  FileText,
  Calendar,
  Phone,
  Mail,
  User,
  Shield,
  ChevronLeft,
  ChevronRight,
  Check
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type UserRole = "student" | "counselor" | "admin";
type RegistrationStep = 1 | 2 | 3 | 4 | 5;

interface FormData {
  // Step 1: Role Selection
  role: UserRole | "";
  
  // Step 2: Basic Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  password: string;
  confirmPassword: string;
  
  // Step 3: Role-Specific Information
  // Student fields
  studentId: string;
  currentGrade: string;
  institutionName: string;
  academicProgram: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  relationship: string;
  
  // Counselor fields
  professionalTitle: string;
  licenseNumber: string;
  yearsExperience: string;
  specializations: string[];
  currentOrganization: string;
  highestQualification: string;
  certifications: string;
  reference1Name: string;
  reference1Phone: string;
  reference1Email: string;
  
  // Admin fields
  officialDesignation: string;
  institutionRegNumber: string;
  adminJustification: string;
  institutionType: string;
  accreditationBody: string;
  yearsInEducation: string;
}

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<RegistrationStep>(1);
  const [selectedRole, setSelectedRole] = useState<UserRole | "">("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const [formData, setFormData] = useState<FormData>({
    role: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    password: "",
    confirmPassword: "",
    studentId: "",
    currentGrade: "",
    institutionName: "",
    academicProgram: "",
    parentName: "",
    parentPhone: "",
    parentEmail: "",
    relationship: "",
    professionalTitle: "",
    licenseNumber: "",
    yearsExperience: "",
    specializations: [],
    currentOrganization: "",
    highestQualification: "",
    certifications: "",
    reference1Name: "",
    reference1Phone: "",
    reference1Email: "",
    officialDesignation: "",
    institutionRegNumber: "",
    adminJustification: "",
    institutionType: "",
    accreditationBody: "",
    yearsInEducation: ""
  });

  const roles = [
    { 
      id: "student" as UserRole, 
      title: "Student",
      icon: GraduationCap,
      subtitle: "Quick & Easy Registration",
      description: "Access personalized career guidance and skill development tools"
    },
    { 
      id: "counselor" as UserRole, 
      title: "Counselor",
      icon: Users,
      subtitle: "Professional Verification",
      description: "Help students discover their potential with AI-powered insights"
    },
    { 
      id: "admin" as UserRole, 
      title: "Institute Admin",
      icon: Building,
      subtitle: "Full Control & Management",
      description: "Manage your institution's career guidance programs"
    }
  ];

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Role Selection";
      case 2: return "Basic Information";
      case 3: return "Role-Specific Details";
      case 4: return "Document Upload";
      case 5: return "Review & Submit";
      default: return "";
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^(\+91|91|0)?[6789]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const getPasswordStrength = (password: string) => {
    const criteria = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    const score = Object.values(criteria).filter(Boolean).length;
    
    return {
      score,
      criteria,
      strength: score >= 4 ? 'Strong' : score >= 2 ? 'Medium' : 'Weak',
      color: score >= 4 ? 'text-green-400' : score >= 2 ? 'text-yellow-400' : 'text-red-400',
      bgColor: score >= 4 ? 'bg-green-500' : score >= 2 ? 'bg-yellow-500' : 'bg-red-500'
    };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleNext = () => {
    if (canProceed()) {
      setCurrentStep(prev => (prev + 1) as RegistrationStep);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => (prev - 1) as RegistrationStep);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    setTimeout(() => {
      toast({
        title: "Registration Successful!",
        description: `Welcome to CareerCompass as a ${selectedRole}. Your application is under review.`,
      });
      navigate('/dashboard');
      setIsLoading(false);
    }, 2000);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedRole !== "";
      case 2:
        return formData.firstName && formData.lastName && formData.email && formData.phone && 
               formData.dateOfBirth && formData.gender && formData.password && 
               formData.confirmPassword && formData.password === formData.confirmPassword;
      default:
        return true;
    }
  };

  const renderRoleSelection = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-foreground mb-4">Choose Your Role</h3>
        <p className="text-muted-foreground text-lg">Select the option that best describes you</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`relative p-8 rounded-2xl border-2 transition-all duration-300 cursor-pointer text-center ${
                selectedRole === role.id
                  ? 'bg-primary/20 border-primary/50 shadow-xl scale-105'
                  : 'bg-card/50 border-border hover:bg-card hover:border-primary/30 hover:scale-102'
              }`}
            >
              <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-foreground mb-2">{role.title}</h4>
              <p className="text-primary text-lg mb-4">{role.subtitle}</p>
              <p className="text-muted-foreground">{role.description}</p>
              {selectedRole === role.id && (
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderBasicInformation = () => {
    const basicFields = [
      { name: "firstName", label: "First Name", type: "text", placeholder: "Enter your first name" },
      { name: "lastName", label: "Last Name", type: "text", placeholder: "Enter your last name" },
      { name: "email", label: "Email Address", type: "email", placeholder: "Enter your email address" },
      { name: "phone", label: "Phone Number", type: "tel", placeholder: "+91 98765 43210" },
      { name: "dateOfBirth", label: "Date of Birth", type: "date", placeholder: "" },
      { 
        name: "gender", 
        label: "Gender", 
        type: "select", 
        placeholder: "Select Gender",
        options: ["Male", "Female", "Other", "Prefer not to say"]
      }
    ];

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-foreground mb-4">Basic Information</h3>
          <p className="text-muted-foreground">Tell us a bit about yourself</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {basicFields.map((field) => (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={field.name} className="text-foreground font-medium">{field.label}</Label>
              {field.type === 'select' ? (
                <select
                  id={field.name}
                  name={field.name}
                  value={formData[field.name as keyof typeof formData] as string}
                  onChange={handleInputChange}
                  className={`w-full input-field ${
                    errors[field.name] ? 'border-destructive' : ''
                  }`}
                >
                  <option value="">Select {field.label}</option>
                  {field.options?.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              ) : field.type === 'date' ? (
                <Input
                  id={field.name}
                  name={field.name}
                  type="date"
                  value={formData[field.name as keyof typeof formData] as string}
                  onChange={handleInputChange}
                  className={`input-field ${
                    errors[field.name] ? 'border-destructive' : ''
                  }`}
                />
              ) : (
                <Input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.name as keyof typeof formData] as string}
                  onChange={handleInputChange}
                  className={`input-field ${
                    errors[field.name] ? 'border-destructive' : ''
                  }`}
                />
              )}
              {errors[field.name] && (
                <div className="flex items-center space-x-1 text-destructive text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors[field.name]}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Password Fields */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label className="text-foreground font-medium">Password</Label>
            <div className="relative">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Create a strong password"
                className="input-field pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 hover:bg-muted/20"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <Eye className="w-4 h-4 text-muted-foreground" />
                )}
              </Button>
            </div>
            
            {formData.password && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Password strength:</span>
                  <span className={`text-sm font-medium ${passwordStrength.color}`}>
                    {passwordStrength.strength}
                  </span>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.bgColor}`} 
                    style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-foreground font-medium">Confirm Password</Label>
            <div className="relative">
              <Input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                className="input-field pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 hover:bg-muted/20"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <Eye className="w-4 h-4 text-muted-foreground" />
                )}
              </Button>
            </div>
            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <div className="flex items-center space-x-1 text-destructive text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>Passwords do not match</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderRoleSelection();
      case 2:
        return renderBasicInformation();
      case 3:
        return (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold text-foreground mb-4">Role-Specific Information</h3>
            <p className="text-muted-foreground">This section will be completed based on your selected role</p>
          </div>
        );
      case 4:
        return (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold text-foreground mb-4">Document Upload</h3>
            <p className="text-muted-foreground">Upload required documents for verification</p>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">Review & Submit</h3>
              <p className="text-muted-foreground">Please review your information before submitting</p>
            </div>
            
            <div className="bg-card rounded-xl p-6 space-y-4">
              <h4 className="text-lg font-semibold text-foreground">Registration Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Role:</span>
                  <span className="text-foreground ml-2 capitalize">{selectedRole}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Name:</span>
                  <span className="text-foreground ml-2">{formData.firstName} {formData.lastName}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Email:</span>
                  <span className="text-foreground ml-2">{formData.email}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="text-foreground ml-2">{formData.phone}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary/20 bg-card"
                />
                <Label htmlFor="terms" className="text-foreground">
                  I agree to the Terms & Conditions and Privacy Policy
                </Label>
              </div>
              
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="consent"
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary/20 bg-card"
                />
                <Label htmlFor="consent" className="text-foreground">
                  I consent to the processing of my personal data for career guidance services
                </Label>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 animated-grid opacity-20 pointer-events-none"></div>

      <div className="relative z-10 min-h-screen container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Clock className="w-16 h-16 text-primary mx-auto mb-6 animate-pulse icon-float" />
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Create Your <span className="bg-gradient-primary bg-clip-text text-transparent">CareerCompass</span> Account
          </h1>
          <p className="text-muted-foreground text-lg">Join thousands of students discovering their perfect career path</p>
        </div>

        {/* Main Container */}
        <div className="max-w-5xl mx-auto">
          {/* Glassmorphism Card */}
          <div className="bg-card/80 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-2xl">
            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-foreground">Step {currentStep} of 5</h2>
                <span className="text-muted-foreground text-sm">{getStepTitle()}</span>
              </div>
              <Progress value={(currentStep / 5) * 100} className="h-3 bg-border">
                <div className="h-full bg-gradient-primary rounded-full transition-all duration-500" 
                     style={{ width: `${(currentStep / 5) * 100}%` }} />
              </Progress>
            </div>

            {/* Step Content */}
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <Button 
                  onClick={handlePrevious}
                  variant="outline"
                  className="border-border text-foreground hover:bg-muted"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
              )}
              
              <div className={currentStep === 1 ? "ml-auto" : ""}>
                {currentStep < 5 ? (
                  <Button 
                    onClick={handleNext}
                    variant="gradient"
                    disabled={!canProceed()}
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSubmit}
                    variant="gradient"
                    disabled={isLoading || !canProceed()}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Back to Login */}
          <div className="text-center mt-8">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link 
              to="/login" 
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;