
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, Calendar, FileText, MessageSquare, PlusCircle, Upload, User, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TeacherDashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Welcome, Professor!</h2>
          <p className="text-muted-foreground">Computer Science Department</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="campus-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-campus-purple" />
                Today's Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-2">
                <div className="bg-muted/50 p-2 rounded-md">
                  <p className="font-medium">CS-301 Lecture</p>
                  <p className="text-xs text-muted-foreground">10:00 AM - 11:30 AM</p>
                </div>
                <div className="bg-muted/50 p-2 rounded-md">
                  <p className="font-medium">Office Hours</p>
                  <p className="text-xs text-muted-foreground">2:00 PM - 4:00 PM</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link to="/events" className="w-full">
                <Button variant="outline" className="w-full">View Schedule</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="campus-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <MessageSquare className="mr-2 h-5 w-5 text-campus-purple" />
                Active Subject Chats
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-campus-orange text-white flex items-center justify-center mr-2">CS</div>
                    <div>
                      <p className="font-medium">CS-301 Data Structures</p>
                      <p className="text-xs text-muted-foreground">23 new messages</p>
                    </div>
                  </div>
                  <span className="text-xs bg-campus-purple/10 text-campus-purple px-2 py-1 rounded-full">10</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-campus-blue text-white flex items-center justify-center mr-2">AL</div>
                    <div>
                      <p className="font-medium">CS-205 Algorithms</p>
                      <p className="text-xs text-muted-foreground">5 new messages</p>
                    </div>
                  </div>
                  <span className="text-xs bg-campus-purple/10 text-campus-purple px-2 py-1 rounded-full">5</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link to="/chat" className="w-full">
                <Button variant="outline" className="w-full">Open Chats</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="campus-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Users className="mr-2 h-5 w-5 text-campus-purple" />
                Mentees Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-2">
                <div className="bg-muted/50 p-2 rounded-md">
                  <div className="flex items-center mb-1">
                    <div className="h-6 w-6 rounded-full bg-campus-green text-white flex items-center justify-center mr-2">A</div>
                    <p className="font-medium">Alex Johnson</p>
                  </div>
                  <p className="text-xs text-muted-foreground">Assignment submitted • 3h ago</p>
                </div>
                <div className="bg-muted/50 p-2 rounded-md">
                  <div className="flex items-center mb-1">
                    <div className="h-6 w-6 rounded-full bg-campus-red text-white flex items-center justify-center mr-2">S</div>
                    <p className="font-medium">Sarah Williams</p>
                  </div>
                  <p className="text-xs text-muted-foreground">Requested meeting • 1d ago</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link to="/mentorship" className="w-full">
                <Button variant="outline" className="w-full">View All Mentees</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-4">
          <Link to="/notes/upload" className="campus-card p-4 flex flex-col items-center justify-center hover:border-campus-purple text-center">
            <Upload className="h-8 w-8 text-campus-purple mb-2" />
            <span className="font-medium">Upload Notes</span>
          </Link>
          <Link to="/chat/create" className="campus-card p-4 flex flex-col items-center justify-center hover:border-campus-purple text-center">
            <MessageSquare className="h-8 w-8 text-campus-orange mb-2" />
            <span className="font-medium">Create Announcement</span>
          </Link>
          <Link to="/events/create" className="campus-card p-4 flex flex-col items-center justify-center hover:border-campus-purple text-center">
            <PlusCircle className="h-8 w-8 text-campus-blue mb-2" />
            <span className="font-medium">Create Event</span>
          </Link>
          <Link to="/profile" className="campus-card p-4 flex flex-col items-center justify-center hover:border-campus-purple text-center">
            <User className="h-8 w-8 text-campus-green mb-2" />
            <span className="font-medium">Profile</span>
          </Link>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Your Study Materials</h2>
          <Link to="/notes/upload">
            <Button size="sm" className="campus-button">
              <Upload className="h-4 w-4 mr-2" />
              Upload New
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="campus-card flex p-3 items-center">
            <div className="bg-campus-purple/10 p-3 rounded-lg mr-3">
              <FileText className="h-6 w-6 text-campus-purple" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Data Structures - Week 5.pdf</p>
              <p className="text-xs text-muted-foreground">Uploaded on May 2, 2025 • 125 downloads</p>
            </div>
            <Link to="/notes/edit/1">
              <Button variant="ghost" size="sm">Edit</Button>
            </Link>
          </div>
          
          <div className="campus-card flex p-3 items-center">
            <div className="bg-campus-orange/10 p-3 rounded-lg mr-3">
              <FileText className="h-6 w-6 text-campus-orange" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Algorithm Analysis Notes.pdf</p>
              <p className="text-xs text-muted-foreground">Uploaded on May 1, 2025 • 87 downloads</p>
            </div>
            <Link to="/notes/edit/2">
              <Button variant="ghost" size="sm">Edit</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeacherDashboard;
