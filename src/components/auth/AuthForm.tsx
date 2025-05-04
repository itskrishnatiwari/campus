
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth } from '@/contexts/AuthContext';

const AuthForm: React.FC = () => {
  const { login, signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  
  // Form fields
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    semester: '',
    branch: '',
    department: '',
    subjects: '',
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoginData(prev => ({ ...prev, [id.replace('login-', '')]: value }));
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSignupData(prev => ({ ...prev, [id.replace('signup-', '')]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(loginData.email, loginData.password);
      toast.success('Login successful!');
    } catch (error: any) {
      toast.error(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const userData = {
        name: signupData.name,
        email: signupData.email,
        role,
        ...(role === 'student' ? {
          semester: signupData.semester,
          branch: signupData.branch
        } : {
          department: signupData.department,
          subjects: signupData.subjects
        })
      };
      
      await signup(userData, signupData.password);
      toast.success('Account created successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md p-6 shadow-lg animate-fade-in">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-campus-purple">CampusBuzz</h1>
        <p className="text-muted-foreground mt-1">Connect, Collaborate, Campus</p>
      </div>

      <Tabs value={authMode} onValueChange={(v) => setAuthMode(v as 'login' | 'signup')}>
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">Email</Label>
              <Input 
                id="login-email" 
                type="email" 
                placeholder="you@university.edu" 
                value={loginData.email}
                onChange={handleLoginChange}
                required 
                className="campus-input" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="login-password">Password</Label>
              <Input 
                id="login-password" 
                type="password" 
                placeholder="••••••••" 
                value={loginData.password}
                onChange={handleLoginChange}
                required 
                className="campus-input" 
              />
            </div>

            <Button type="submit" className="w-full campus-button" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>

            <p className="text-sm text-center text-muted-foreground mt-4">
              Don't have an account?{" "}
              <a onClick={() => setAuthMode('signup')} className="campus-link cursor-pointer">
                Sign up
              </a>
            </p>
          </form>
        </TabsContent>

        <TabsContent value="signup">
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signup-name">Full Name</Label>
              <Input 
                id="signup-name" 
                placeholder="John Doe" 
                value={signupData.name} 
                onChange={handleSignupChange} 
                required 
                className="campus-input" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="signup-email">Email</Label>
              <Input 
                id="signup-email" 
                type="email" 
                placeholder="you@university.edu" 
                value={signupData.email} 
                onChange={handleSignupChange} 
                required 
                className="campus-input" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="signup-password">Password</Label>
              <Input 
                id="signup-password" 
                type="password" 
                placeholder="••••••••" 
                value={signupData.password} 
                onChange={handleSignupChange} 
                required 
                className="campus-input" 
              />
            </div>

            <div className="space-y-2">
              <Label>I am a:</Label>
              <RadioGroup 
                defaultValue="student" 
                className="flex space-x-4 mt-1" 
                value={role}
                onValueChange={(value) => setRole(value as 'student' | 'teacher')}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="student" id="student" />
                  <Label htmlFor="student" className="cursor-pointer">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="teacher" id="teacher" />
                  <Label htmlFor="teacher" className="cursor-pointer">Teacher</Label>
                </div>
              </RadioGroup>
            </div>

            {role === 'student' && (
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="signup-semester">Semester</Label>
                  <Input 
                    id="signup-semester" 
                    placeholder="e.g. 3rd" 
                    value={signupData.semester} 
                    onChange={handleSignupChange} 
                    required 
                    className="campus-input" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-branch">Branch</Label>
                  <Input 
                    id="signup-branch" 
                    placeholder="e.g. Computer Science" 
                    value={signupData.branch} 
                    onChange={handleSignupChange} 
                    required 
                    className="campus-input" 
                  />
                </div>
              </div>
            )}

            {role === 'teacher' && (
              <div className="grid grid-cols-1 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="signup-department">Department</Label>
                  <Input 
                    id="signup-department" 
                    placeholder="e.g. Computer Science" 
                    value={signupData.department} 
                    onChange={handleSignupChange} 
                    required 
                    className="campus-input" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-subjects">Subjects</Label>
                  <Input 
                    id="signup-subjects" 
                    placeholder="e.g. Data Structures, Algorithms" 
                    value={signupData.subjects} 
                    onChange={handleSignupChange} 
                    required 
                    className="campus-input" 
                  />
                </div>
              </div>
            )}

            <Button type="submit" className="w-full campus-button" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </Button>
            
            <p className="text-sm text-center text-muted-foreground mt-4">
              Already have an account?{" "}
              <a onClick={() => setAuthMode('login')} className="campus-link cursor-pointer">
                Login
              </a>
            </p>
          </form>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default AuthForm;
