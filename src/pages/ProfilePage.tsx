import React, { useState } from 'react';
import { Camera, Mail, User, Calendar, BookOpen, Building, MessageSquare, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface ProfileTabProps {
  user: any;
}

const ProfilePage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'activity'>('overview');

  if (!user) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Profile</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <Card className="campus-card">
            <CardContent className="p-6 text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <div className="w-full h-full rounded-full bg-campus-purple text-white flex items-center justify-center text-3xl">
                  {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                </div>
                <button className="absolute bottom-0 right-0 bg-background p-1.5 rounded-full border border-border">
                  <Camera className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
              
              <h3 className="font-medium text-lg">{user.name}</h3>
              <p className="text-muted-foreground capitalize">{user.role}</p>
              
              <div className="mt-4">
                <Button className="w-full campus-button">Edit Profile</Button>
              </div>
              
              <div className="mt-6 space-y-3">
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">{user.email}</span>
                </div>
                
                {user.role === 'student' && (
                  <>
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">Semester: {user.semester}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">{user.branch}</span>
                    </div>
                  </>
                )}
                
                {user.role === 'teacher' && (
                  <>
                    <div className="flex items-center text-sm">
                      <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">{user.department}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">{user.subjects}</span>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'overview' | 'activity')}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            </TabsList>

            <div className="mt-4">
              <TabsContent value="overview">
                <ProfileOverview user={user} />
              </TabsContent>
              <TabsContent value="activity">
                <ProfileActivity user={user} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

const ProfileOverview: React.FC<ProfileTabProps> = ({ user }) => {
  return (
    <Card className="campus-card">
      <CardContent className="p-6">
        <h3 className="font-medium text-lg mb-4">About Me</h3>
        
        <p className="text-muted-foreground mb-6">
          {user.bio || `Hello, I'm ${user.name}. I ${user.role === 'student' ? 'study' : 'teach'} at the university.`}
        </p>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">{user.role === 'student' ? 'Current Courses' : 'Teaching Courses'}</h4>
            <div className="grid grid-cols-2 gap-2">
              {['Data Structures', 'Algorithms', 'Database Management', 'Computer Networks'].map((course, index) => (
                <div key={index} className="bg-muted p-2 rounded text-sm">
                  {course}
                </div>
              ))}
            </div>
          </div>
          
          {user.role === 'student' && (
            <div>
              <h4 className="font-medium mb-2">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {['Java', 'Python', 'C++', 'JavaScript', 'SQL', 'React', 'Node.js'].map((skill, index) => (
                  <div key={index} className="bg-campus-purple/10 text-campus-purple px-3 py-1 rounded-full text-xs">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {user.role === 'teacher' && (
            <div>
              <h4 className="font-medium mb-2">Specializations</h4>
              <div className="flex flex-wrap gap-2">
                {['Algorithms', 'Data Science', 'Machine Learning', 'Databases', 'Programming Languages'].map((spec, index) => (
                  <div key={index} className="bg-campus-purple/10 text-campus-purple px-3 py-1 rounded-full text-xs">
                    {spec}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div>
            <h4 className="font-medium mb-2">Contact Information</h4>
            <div className="space-y-2">
              <p className="text-sm flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{user.email}</span>
              </p>
              <p className="text-sm flex items-center">
                <User className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>University ID: {user.id.substring(5, 12).toUpperCase()}</span>
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ProfileActivity: React.FC<ProfileTabProps> = ({ user }) => {
  const activities = [
    { type: 'note', date: '2 days ago', text: 'Downloaded "Data Structures - Week 5" notes' },
    { type: 'message', date: '3 days ago', text: 'Sent a message in Data Structures chat' },
    { type: 'buzz', date: '1 week ago', text: 'Posted on BuzzBoard' },
    { type: 'event', date: '1 week ago', text: 'RSVP\'d to "Algorithms Study Group"' },
    { type: 'note', date: '2 weeks ago', text: 'Downloaded "Algorithm Analysis Notes"' },
  ];

  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'note': return <BookOpen className="h-4 w-4 text-campus-purple" />;
      case 'message': return <MessageSquare className="h-4 w-4 text-campus-blue" />;
      case 'buzz': return <Users className="h-4 w-4 text-campus-orange" />;
      case 'event': return <Calendar className="h-4 w-4 text-campus-green" />;
      default: return <User className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <Card className="campus-card">
      <CardContent className="p-6">
        <h3 className="font-medium text-lg mb-4">Recent Activity</h3>
        
        {activities.length === 0 ? (
          <div className="text-center py-8">
            <User className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No recent activity to display</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 pb-4 border-b last:border-0">
                <div className="bg-muted p-2 rounded-full">
                  {getActivityIcon(activity.type)}
                </div>
                
                <div className="flex-1">
                  <p className="text-sm">{activity.text}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfilePage;
