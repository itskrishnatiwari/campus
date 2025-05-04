
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

// Define proper types for the form data based on user role
interface BaseFormData {
  name: string;
  email: string;
}

interface StudentFormData extends BaseFormData {
  semester?: string;
  branch?: string;
}

interface TeacherFormData extends BaseFormData {
  department?: string;
  subjects?: string;
}

type FormDataType = StudentFormData | TeacherFormData;

const SettingsPage = () => {
  const { user, updateUser, logout } = useAuth();
  
  const [formData, setFormData] = useState<FormDataType>({
    name: user?.name || '',
    email: user?.email || '',
    ...(user?.role === 'student' ? {
      semester: user?.semester || '',
      branch: user?.branch || ''
    } : {
      department: user?.department || '',
      subjects: user?.subjects || ''
    })
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      updateUser(formData);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Settings</h2>
      </div>
      
      <Card className="p-6">
        <h3 className="text-xl font-medium mb-4">Profile Settings</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              value={formData.name} 
              onChange={handleChange} 
              className="campus-input"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={formData.email} 
              onChange={handleChange} 
              className="campus-input"
              disabled
            />
            <p className="text-xs text-muted-foreground">Email cannot be changed</p>
          </div>
          
          {user?.role === 'student' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="semester">Semester</Label>
                <Input 
                  id="semester" 
                  value={(formData as StudentFormData).semester || ''} 
                  onChange={handleChange} 
                  className="campus-input"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="branch">Branch</Label>
                <Input 
                  id="branch" 
                  value={(formData as StudentFormData).branch || ''} 
                  onChange={handleChange} 
                  className="campus-input"
                />
              </div>
            </>
          )}
          
          {user?.role === 'teacher' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input 
                  id="department" 
                  value={(formData as TeacherFormData).department || ''} 
                  onChange={handleChange} 
                  className="campus-input"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subjects">Subjects</Label>
                <Input 
                  id="subjects" 
                  value={(formData as TeacherFormData).subjects || ''} 
                  onChange={handleChange} 
                  className="campus-input"
                />
              </div>
            </>
          )}
          
          <div className="pt-4 flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={logout}>
              Logout
            </Button>
            <Button type="submit" className="campus-button">
              Save Changes
            </Button>
          </div>
        </form>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-xl font-medium mb-4">Appearance</h3>
        <div className="space-y-4">
          {/* Placeholder for theme settings */}
          <p className="text-muted-foreground">Theme settings will be added soon.</p>
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-xl font-medium mb-4 text-destructive">Danger Zone</h3>
        <div className="space-y-4">
          <p className="text-muted-foreground">Account deletion options will appear here.</p>
          <Button type="button" variant="destructive" disabled>
            Delete Account
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SettingsPage;
