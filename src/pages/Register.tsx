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
  Shield
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
      label: "Student", 
      icon: GraduationCap,
      subtitle: "Quick & Easy Registration",
      description: "Access personalized career guidance and skill development tools"
    },
    { 
      id: "counselor" as UserRole, 
      label: "Counselor", 
      icon: Users,
      subtitle: "Professional Verification",
      description: "Help students discover their potential with AI-powered insights"
    },
    { 
      id: "admin" as UserRole, 
      label: "Institute Admin", 
      icon: Building,
      subtitle: "Full Control & Management",
      description: "Manage your institution's career guidance programs"
    }
  ];

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleRoleSelect = (role: UserRole) => {
    setFormData(prev => ({ ...prev, role }));
    setCurrentStep(2);
  };

  const validateStep = (step: RegistrationStep): boolean => {
    const newErrors: {[key: string]: string} = {};
    
    switch (step) {
      case 1:
        if (!formData.role) {
          newErrors.role = "Please select a role";
        }
        break;
        
      case 2:
        if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
        if (!formData.email) {
          newErrors.email = "Email is required";
        } else if (!validateEmail(formData.email)) {
          newErrors.email = "Please enter a valid email address";
        }
        if (!formData.phone) {
          newErrors.phone = "Phone number is required";
        } else if (!validatePhone(formData.phone)) {
          newErrors.phone = "Please enter a valid Indian phone number";
        }
        if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
        if (!formData.gender) newErrors.gender = "Gender is required";
        if (!formData.password) {
          newErrors.password = "Password is required";
        } else if (passwordStrength.score < 4) {
          newErrors.password = "Password must meet all security requirements";
        }
        if (!formData.confirmPassword) {
          newErrors.confirmPassword = "Please confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = "Passwords do not match";
        }
        break;
        
      case 3:
        // Role-specific validation
        if (formData.role === "student") {
          if (!formData.currentGrade) newErrors.currentGrade = "Current grade is required";
          if (!formData.institutionName) newErrors.institutionName = "Institution name is required";
          if (!formData.parentName) newErrors.parentName = "Parent/Guardian name is required";
          if (!formData.parentPhone) newErrors.parentPhone = "Parent/Guardian phone is required";
        } else if (formData.role === "counselor") {
          if (!formData.professionalTitle) newErrors.professionalTitle = "Professional title is required";
          if (!formData.licenseNumber) newErrors.licenseNumber = "License number is required";
          if (!formData.yearsExperience) newErrors.yearsExperience = "Years of experience is required";
        } else if (formData.role === "admin") {
          if (!formData.officialDesignation) newErrors.officialDesignation = "Official designation is required";
          if (!formData.institutionRegNumber) newErrors.institutionRegNumber = "Institution registration number is required";
          if (!formData.adminJustification) newErrors.adminJustification = "Admin access justification is required";
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => (prev + 1) as RegistrationStep);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => (prev - 1) as RegistrationStep);
  };

  const handleSubmit = async () => {
    if (validateStep(currentStep)) {
      setIsLoading(true);
      
      setTimeout(() => {
        toast({
          title: "Registration Successful!",
          description: `Welcome to CareerCompass as a ${formData.role}. Your application is under review.`,
        });
        navigate('/dashboard');
        setIsLoading(false);
      }, 2000);
    }
  };

  const getProgressPercentage = () => {
    return (currentStep / 5) * 100;
  };

  const renderRoleSelection = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Choose Your Role</h2>
        <p className="text-white/80 text-lg">Select the option that best describes you</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <button
              key={role.id}
              onClick={() => handleRoleSelect(role.id)}
              className="group relative p-8 rounded-2xl bg-white/8 backdrop-blur-xl border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{role.label}</h3>
                  <p className="text-blue-200 text-sm font-medium mb-3">{role.subtitle}</p>
                  <p className="text-white/70 text-sm leading-relaxed">{role.description}</p>
                </div>
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderBasicInformation = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Basic Information</h2>
        <p className="text-white/70">Tell us about yourself</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-white font-medium">First Name</Label>
          <Input
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="Enter your first name"
            className="bg-white/10 backdrop-blur border-white/30 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-white/20"
          />
          {errors.firstName && (
            <div className="flex items-center space-x-1 text-red-300 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{errors.firstName}</span>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <Label className="text-white font-medium">Last Name</Label>
          <Input
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Enter your last name"
            className="bg-white/10 backdrop-blur border-white/30 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-white/20"
          />
          {errors.lastName && (
            <div className="flex items-center space-x-1 text-red-300 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{errors.lastName}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label className="text-white font-medium">Email Address</Label>
        <Input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your email address"
          className="bg-white/10 backdrop-blur border-white/30 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-white/20"
        />
        {errors.email && (
          <div className="flex items-center space-x-1 text-red-300 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{errors.email}</span>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-white font-medium">Phone Number</Label>
          <Input
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="+91 98765 43210"
            className="bg-white/10 backdrop-blur border-white/30 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-white/20"
          />
          {errors.phone && (
            <div className="flex items-center space-x-1 text-red-300 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{errors.phone}</span>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <Label className="text-white font-medium">Date of Birth</Label>
          <Input
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            className="bg-white/10 backdrop-blur border-white/30 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-white/20"
          />
          {errors.dateOfBirth && (
            <div className="flex items-center space-x-1 text-red-300 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{errors.dateOfBirth}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label className="text-white font-medium">Gender</Label>
        <RadioGroup value={formData.gender} onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}>
          <div className="flex space-x-6">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" className="border-white/30 text-white" />
              <Label htmlFor="male" className="text-white">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" className="border-white/30 text-white" />
              <Label htmlFor="female" className="text-white">Female</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" className="border-white/30 text-white" />
              <Label htmlFor="other" className="text-white">Other</Label>
            </div>
          </div>
        </RadioGroup>
        {errors.gender && (
          <div className="flex items-center space-x-1 text-red-300 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{errors.gender}</span>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <Label className="text-white font-medium">Password</Label>
        <div className="relative">
          <Input
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Create a strong password"
            className="bg-white/10 backdrop-blur border-white/30 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-white/20 pr-10"
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
        
        {formData.password && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-white/80">Password strength:</span>
              <span className={`text-sm font-medium ${passwordStrength.color}`}>
                {passwordStrength.strength}
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.bgColor}`} 
                style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
              />
            </div>
          </div>
        )}
        
        {errors.password && (
          <div className="flex items-center space-x-1 text-red-300 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{errors.password}</span>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <Label className="text-white font-medium">Confirm Password</Label>
        <div className="relative">
          <Input
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm your password"
            className="bg-white/10 backdrop-blur border-white/30 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-white/20 pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 hover:bg-white/10"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff className="w-4 h-4 text-white/70" />
            ) : (
              <Eye className="w-4 h-4 text-white/70" />
            )}
          </Button>
        </div>
        {errors.confirmPassword && (
          <div className="flex items-center space-x-1 text-red-300 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{errors.confirmPassword}</span>
          </div>
        )}
      </div>
    </div>
  );

  const renderRoleSpecificFields = () => {
    if (formData.role === "student") {
      return (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Student Information</h2>
            <p className="text-white/70">Tell us about your academic background</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-white font-medium">Student ID (if any)</Label>
              <Input
                name="studentId"
                value={formData.studentId}
                onChange={handleInputChange}
                placeholder="Enter your student ID"
                className="bg-white/10 backdrop-blur border-white/30 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-white/20"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-white font-medium">Current Grade/Class/Year</Label>
              <Input
                name="currentGrade"
                value={formData.currentGrade}
                onChange={handleInputChange}
                placeholder="e.g., Grade 12, 2nd Year B.Tech"
                className="bg-white/10 backdrop-blur border-white/30 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-white/20"
              />
              {errors.currentGrade && (
                <div className="flex items-center space-x-1 text-red-300 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.currentGrade}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="text-white font-medium">Institution Name</Label>
            <Input
              name="institutionName"
              value={formData.institutionName}
              onChange={handleInputChange}
              placeholder="Enter your school/college name"
              className="bg-white/10 backdrop-blur border-white/30 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-white/20"
            />
            {errors.institutionName && (
              <div className="flex items-center space-x-1 text-red-300 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.institutionName}</span>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label className="text-white font-medium">Academic Program/Stream</Label>
            <Input
              name="academicProgram"
              value={formData.academicProgram}
              onChange={handleInputChange}
              placeholder="e.g., Science, Commerce, Engineering"
              className="bg-white/10 backdrop-blur border-white/30 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-white/20"
            />
          </div>
          
          <div className="bg-white/5 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Parent/Guardian Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white font-medium">Parent/Guardian Name</Label>
                <Input
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleInputChange}
                  placeholder="Enter parent/guardian name"
                  className="bg-white/10 backdrop-blur border-white/30 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-white/20"
                />
                {errors.parentName && (
                  <div className="flex items-center space-x-1 text-red-300 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.parentName}</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label className="text-white font-medium">Parent/Guardian Phone</Label>
                <Input
                  name="parentPhone"
                  value={formData.parentPhone}
                  onChange={handleInputChange}
                  placeholder="+91 98765 43210"
                  className="bg-white/10 backdrop-blur border-white/30 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-white/20"
                />
                {errors.parentPhone && (
                  <div className="flex items-center space-x-1 text-red-300 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.parentPhone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    if (formData.role === "counselor") {
      return (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Professional Information</h2>
            <p className="text-white/70">Tell us about your professional background</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-white font-medium">Professional Title</Label>
              <Input
                name="professionalTitle"
                value={formData.professionalTitle}
                onChange={handleInputChange}
                placeholder="e.g., Career Counselor, Psychologist"
                className="bg-white/10 backdrop-blur border-white/30 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-white/20"
              />
              {errors.professionalTitle && (
                <div className="flex items-center space-x-1 text-red-300 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.professionalTitle}</span>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label className="text-white font-medium">License Number</Label>
              <Input
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleInputChange}
                placeholder="Enter your professional license number"
                className="bg-white/10 backdrop-blur border-white/30 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-white/20"
              />
              {errors.licenseNumber && (
                <div className="flex items-center space-x-1 text-red-300 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.licenseNumber}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-white font-medium">Years of Experience</Label>
              <Input
                name="yearsExperience"
                value={formData.yearsExperience}
                onChange={handleInputChange}
                placeholder="e.g., 5 years"
                className="bg-white/10 backdrop-blur border-white/30 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-white/20"
              />
              {errors.yearsExperience && (
                <div className="flex items-center space-x-1 text-red-300 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.yearsExperience}</span>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label className="text-white font-medium">Current Organization</Label>
              <Input
                name="currentOrganization"
                value={formData.currentOrganization}
                onChange={handleInputChange}
                placeholder="Enter your current workplace"
                className="bg-white/10 backdrop-blur border-white/30 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-white/20"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="text-white font-medium">Highest Qualification</Label>
            <Input
              name="highestQualification"
              value={formData.highestQualification}
              onChange={handleInputChange}
              placeholder="e.g., M.A. Psychology, Ph.D. Education"
              className="bg-white/10 backdrop-blur border-white/30 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-white/20"
            />
          </div>
        </div>
      );
    }
    
    if (formData.role === "admin") {
      return (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Administrative Information</h2>
            <p className="text-white/70">Verify your administrative credentials</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-white font-medium">Official Designation</Label>
              <Input
                name="officialDesignation"
                value={formData.officialDesignation}
                onChange={handleInputChange}
                placeholder="e.g., Principal, Director, Dean"
                className="bg-white/10 backdrop-blur border-white/30 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-white/20"
              />
              {errors.officialDesignation && (
                <div className="flex items-center space-x-1 text-red-300 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.officialDesignation}</span>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label className="text-white font-medium">Institution Registration Number</Label>
              <Input
                name="institutionRegNumber"
                value={formData.institutionRegNumber}
                onChange={handleInputChange}
                placeholder="Enter institution registration number"
                className="bg-white/10 backdrop-blur border-white/30 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-white/20"
              />
              {errors.institutionRegNumber && (
                <div className="flex items-center space-x-1 text-red-300 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.institutionRegNumber}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="text-white font-medium">Institution Type</Label>
            <RadioGroup value={formData.institutionType} onValueChange={(value) => setFormData(prev => ({ ...prev, institutionType: value }))}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["School", "College", "University", "Training Center"].map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <RadioGroupItem value={type.toLowerCase()} id={type} className="border-white/30 text-white" />
                    <Label htmlFor={type} className="text-white">{type}</Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label className="text-white font-medium">Admin Access Justification</Label>
            <textarea
              name="adminJustification"
              value={formData.adminJustification}
              onChange={handleInputChange}
              placeholder="Please explain why you need administrative access to CareerCompass..."
              rows={4}
              className="w-full bg-white/10 backdrop-blur border border-white/30 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-white/20 rounded-lg px-3 py-2 resize-none"
            />
            {errors.adminJustification && (
              <div className="flex items-center space-x-1 text-red-300 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.adminJustification}</span>
              </div>
            )}
          </div>
        </div>
      );
    }
    
    return null;
  };

  const renderDocumentUpload = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Document Upload</h2>
        <p className="text-white/70">Upload required documents for verification</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 rounded-xl p-6 border-2 border-dashed border-white/30 hover:border-white/50 transition-colors cursor-pointer">
          <div className="text-center space-y-4">
            <Upload className="w-12 h-12 text-white/70 mx-auto" />
            <div>
              <h3 className="text-white font-medium">Photo ID</h3>
              <p className="text-white/60 text-sm">Aadhaar, Passport, or Driver's License</p>
            </div>
            <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
              Choose File
            </Button>
          </div>
        </div>
        
        <div className="bg-white/5 rounded-xl p-6 border-2 border-dashed border-white/30 hover:border-white/50 transition-colors cursor-pointer">
          <div className="text-center space-y-4">
            <FileText className="w-12 h-12 text-white/70 mx-auto" />
            <div>
              <h3 className="text-white font-medium">Academic Certificate</h3>
              <p className="text-white/60 text-sm">Latest academic transcript or certificate</p>
            </div>
            <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
              Choose File
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReview = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Review & Submit</h2>
        <p className="text-white/70">Please review your information before submitting</p>
      </div>
      
      <div className="bg-white/5 rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-semibold text-white">Registration Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-white/70">Role:</span>
            <span className="text-white ml-2 capitalize">{formData.role}</span>
          </div>
          <div>
            <span className="text-white/70">Name:</span>
            <span className="text-white ml-2">{formData.firstName} {formData.lastName}</span>
          </div>
          <div>
            <span className="text-white/70">Email:</span>
            <span className="text-white ml-2">{formData.email}</span>
          </div>
          <div>
            <span className="text-white/70">Phone:</span>
            <span className="text-white ml-2">{formData.phone}</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="terms"
            className="w-4 h-4 text-blue-400 border-white/30 rounded focus:ring-blue-400/20 bg-white/10"
          />
          <Label htmlFor="terms" className="text-white/90">
            I agree to the Terms & Conditions and Privacy Policy
          </Label>
        </div>
        
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="consent"
            className="w-4 h-4 text-blue-400 border-white/30 rounded focus:ring-blue-400/20 bg-white/10"
          />
          <Label htmlFor="consent" className="text-white/90">
            I consent to the processing of my personal data for career guidance services
          </Label>
        </div>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: return renderRoleSelection();
      case 2: return renderBasicInformation();
      case 3: return renderRoleSpecificFields();
      case 4: return renderDocumentUpload();
      case 5: return renderReview();
      default: return renderRoleSelection();
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

      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <div className="text-center pt-8 pb-6">
          <div className="flex justify-center items-center space-x-3 mb-4">
            <Clock className="w-8 h-8 text-white/80" />
            <h1 className="text-3xl font-bold text-white">Create Your Account</h1>
          </div>
          <p className="text-white/80">Join CareerCompass and start your personalized career journey</p>
        </div>

        {/* Progress Bar */}
        {currentStep > 1 && (
          <div className="max-w-2xl mx-auto px-8 mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/70 text-sm">Step {currentStep} of 5</span>
              <span className="text-white/70 text-sm">{Math.round(getProgressPercentage())}% Complete</span>
            </div>
            <Progress value={getProgressPercentage()} className="h-2 bg-white/20" />
          </div>
        )}

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-8 pb-8">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
            {renderStepContent()}
            
            {/* Navigation Buttons */}
            {currentStep > 1 && (
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/20">
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                
                {currentStep < 5 ? (
                  <Button
                    onClick={nextStep}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white"
                  >
                    {isLoading ? "Submitting..." : "Submit Application"}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pb-8">
          <span className="text-white/70">Already have an account? </span>
          <Link 
            to="/login" 
            className="text-blue-300 hover:text-blue-200 font-medium transition-colors"
          >
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;