
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const AuthForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [role, setRole] = useState<'student' | 'teacher'>('student');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (authMode === 'login') {
        // Login logic would go here with Supabase
        toast.success('Login successful!');
      } else {
        // Signup logic would go here with Supabase
        toast.success('Account created! Please verify your email.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error('Auth error:', error);
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@university.edu" required className="campus-input" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" required className="campus-input" />
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signup-name">Full Name</Label>
              <Input id="signup-name" placeholder="John Doe" required className="campus-input" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="signup-email">Email</Label>
              <Input id="signup-email" type="email" placeholder="you@university.edu" required className="campus-input" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="signup-password">Password</Label>
              <Input id="signup-password" type="password" placeholder="••••••••" required className="campus-input" />
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
                  <Label htmlFor="semester">Semester</Label>
                  <Input id="semester" placeholder="e.g. 3rd" required className="campus-input" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="branch">Branch</Label>
                  <Input id="branch" placeholder="e.g. Computer Science" required className="campus-input" />
                </div>
              </div>
            )}

            {role === 'teacher' && (
              <div className="grid grid-cols-1 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" placeholder="e.g. Computer Science" required className="campus-input" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subjects">Subjects</Label>
                  <Input id="subjects" placeholder="e.g. Data Structures, Algorithms" required className="campus-input" />
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
