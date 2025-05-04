
import React, { useState, useEffect } from 'react';
import { User, MessageSquare, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

interface Mentee {
  id: string;
  name: string;
  email: string;
  semester: string;
  branch: string;
  lastInteraction: string;
  status: 'active' | 'pending' | 'inactive';
}

interface Mentor {
  id: string;
  name: string;
  email: string;
  department: string;
  subjects: string;
  lastInteraction: string;
  status: 'active' | 'pending' | 'inactive';
}

const MentorshipPage = () => {
  const { user } = useAuth();
  const [mentorData, setMentorData] = useState<Mentor | null>(null);
  const [menteeData, setMenteeData] = useState<Mentee[]>([]);

  useEffect(() => {
    // Load mentorship data from localStorage
    if (user?.role === 'student') {
      const storedMentor = localStorage.getItem(`campusBuzz_mentor_${user.id}`);
      if (storedMentor) {
        setMentorData(JSON.parse(storedMentor));
      } else {
        // Generate demo mentor if none exists
        const demoMentor = generateDemoMentor();
        setMentorData(demoMentor);
        localStorage.setItem(`campusBuzz_mentor_${user.id}`, JSON.stringify(demoMentor));
      }
    } else if (user?.role === 'teacher') {
      const storedMentees = localStorage.getItem(`campusBuzz_mentees_${user.id}`);
      if (storedMentees) {
        setMenteeData(JSON.parse(storedMentees));
      } else {
        // Generate demo mentees if none exist
        const demoMentees = generateDemoMentees();
        setMenteeData(demoMentees);
        localStorage.setItem(`campusBuzz_mentees_${user.id}`, JSON.stringify(demoMentees));
      }
    }
  }, [user]);

  const generateDemoMentor = (): Mentor => {
    return {
      id: 'mentor_1',
      name: 'Prof. Johnson',
      email: 'johnson@university.edu',
      department: 'Computer Science',
      subjects: 'Data Structures, Algorithms',
      lastInteraction: '2 days ago',
      status: 'active'
    };
  };

  const generateDemoMentees = (): Mentee[] => {
    return [
      {
        id: 'student_1',
        name: 'Alex Johnson',
        email: 'alex@university.edu',
        semester: '3rd',
        branch: 'Computer Science',
        lastInteraction: '3 days ago',
        status: 'active'
      },
      {
        id: 'student_2',
        name: 'Sarah Williams',
        email: 'sarah@university.edu',
        semester: '3rd',
        branch: 'Computer Science',
        lastInteraction: '1 week ago',
        status: 'pending'
      },
      {
        id: 'student_3',
        name: 'Michael Brown',
        email: 'michael@university.edu',
        semester: '3rd',
        branch: 'Computer Science',
        lastInteraction: '2 weeks ago',
        status: 'inactive'
      }
    ];
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-campus-green text-white';
      case 'pending': return 'bg-campus-orange text-white';
      case 'inactive': return 'bg-muted-foreground text-white';
      default: return 'bg-muted text-foreground';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold">Mentorship</h2>
      
      {user?.role === 'student' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="col-span-1 md:col-span-2 campus-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Your Mentor</h3>
                
                {mentorData ? (
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="bg-campus-purple text-white text-xl">
                        {getInitials(mentorData.name)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{mentorData.name}</h4>
                          <p className="text-sm text-muted-foreground">{mentorData.email}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(mentorData.status)}`}>
                          {mentorData.status.charAt(0).toUpperCase() + mentorData.status.slice(1)}
                        </span>
                      </div>
                      
                      <div className="mt-2 space-y-1">
                        <p className="text-sm"><span className="font-medium">Department:</span> {mentorData.department}</p>
                        <p className="text-sm"><span className="font-medium">Subjects:</span> {mentorData.subjects}</p>
                        <p className="text-sm"><span className="font-medium">Last Interaction:</span> {mentorData.lastInteraction}</p>
                      </div>
                      
                      <div className="mt-4">
                        <Link to="/chat?type=mentor">
                          <Button className="campus-button">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Message Mentor
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-8">
                    <User className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h4 className="text-lg font-medium">No Mentor Assigned Yet</h4>
                    <p className="text-muted-foreground mb-4">You don't have a mentor assigned to you yet.</p>
                    <Button className="campus-button">Request Mentor</Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="campus-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Mentorship Resources</h3>
                <ul className="space-y-2">
                  <li className="p-2 hover:bg-muted rounded-md transition-colors">
                    <a href="#" className="text-sm font-medium flex items-center">
                      <span className="w-2 h-2 bg-campus-purple rounded-full mr-2"></span>
                      Academic Planning Guide
                    </a>
                  </li>
                  <li className="p-2 hover:bg-muted rounded-md transition-colors">
                    <a href="#" className="text-sm font-medium flex items-center">
                      <span className="w-2 h-2 bg-campus-blue rounded-full mr-2"></span>
                      Career Development Resources
                    </a>
                  </li>
                  <li className="p-2 hover:bg-muted rounded-md transition-colors">
                    <a href="#" className="text-sm font-medium flex items-center">
                      <span className="w-2 h-2 bg-campus-green rounded-full mr-2"></span>
                      Mental Health Support
                    </a>
                  </li>
                  <li className="p-2 hover:bg-muted rounded-md transition-colors">
                    <a href="#" className="text-sm font-medium flex items-center">
                      <span className="w-2 h-2 bg-campus-orange rounded-full mr-2"></span>
                      Study Tips & Strategies
                    </a>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">Manage your mentees and provide guidance</p>
            <Button className="campus-button">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Mentee
            </Button>
          </div>

          {menteeData.length === 0 ? (
            <Card className="p-8 text-center">
              <User className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium">No Mentees Assigned</h3>
              <p className="text-muted-foreground">You don't have any mentees assigned to you yet.</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {menteeData.map(mentee => (
                <Card key={mentee.id} className="campus-card">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback className="bg-campus-blue text-white">
                          {getInitials(mentee.name)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium truncate">{mentee.name}</h4>
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(mentee.status)}`}>
                            {mentee.status.charAt(0).toUpperCase() + mentee.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{mentee.email}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {mentee.semester} Semester, {mentee.branch}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <p className="text-xs text-muted-foreground whitespace-nowrap">
                          Last contact: {mentee.lastInteraction}
                        </p>
                        <Link to={`/chat?type=mentor&mentee=${mentee.id}`}>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Chat
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MentorshipPage;
