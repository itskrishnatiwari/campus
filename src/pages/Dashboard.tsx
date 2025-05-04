
import { useState } from 'react';
import StudentDashboard from '@/components/dashboard/StudentDashboard';
import TeacherDashboard from '@/components/dashboard/TeacherDashboard';

const Dashboard = () => {
  // In a real app, this would come from auth context
  const [userRole, setUserRole] = useState<'student' | 'teacher'>('student');

  const toggleRole = () => {
    setUserRole(prev => prev === 'student' ? 'teacher' : 'student');
  };

  return (
    <>
      <div className="mb-4 flex justify-end">
        <button 
          onClick={toggleRole} 
          className="text-xs bg-muted px-2 py-1 rounded-md text-muted-foreground"
        >
          Toggle to {userRole === 'student' ? 'Teacher' : 'Student'} View (Demo)
        </button>
      </div>
      
      {userRole === 'student' ? <StudentDashboard /> : <TeacherDashboard />}
    </>
  );
};

export default Dashboard;
