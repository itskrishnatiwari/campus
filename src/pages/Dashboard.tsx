
import { useState } from 'react';
import StudentDashboard from '@/components/dashboard/StudentDashboard';
import TeacherDashboard from '@/components/dashboard/TeacherDashboard';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  // Fallback to student if user role is somehow missing
  const userRole = user?.role || 'student';
  
  // This toggle is just for demo purposes
  const [demoRole, setDemoRole] = useState<'student' | 'teacher'>(userRole as 'student' | 'teacher');
  
  const toggleRole = () => {
    setDemoRole(prev => prev === 'student' ? 'teacher' : 'student');
  };

  return (
    <>
      <div className="mb-4 flex justify-end">
        <button 
          onClick={toggleRole} 
          className="text-xs bg-muted px-2 py-1 rounded-md text-muted-foreground"
        >
          Toggle to {demoRole === 'student' ? 'Teacher' : 'Student'} View (Demo)
        </button>
      </div>
      
      {demoRole === 'student' ? <StudentDashboard /> : <TeacherDashboard />}
    </>
  );
};

export default Dashboard;
