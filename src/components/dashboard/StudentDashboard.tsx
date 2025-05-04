
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Book, Calendar, FileText, MessageSquare, User, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const StudentDashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Welcome, Student!</h2>
          <p className="text-muted-foreground">Computer Science, Semester 3</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="campus-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Bell className="mr-2 h-5 w-5 text-campus-purple" />
                Upcoming
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-2">
                <div className="bg-muted/50 p-2 rounded-md">
                  <p className="font-medium">Data Structures Test</p>
                  <p className="text-xs text-muted-foreground">Tomorrow, 10:00 AM</p>
                </div>
                <div className="bg-muted/50 p-2 rounded-md">
                  <p className="font-medium">Project Submission</p>
                  <p className="text-xs text-muted-foreground">May 7, 11:59 PM</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link to="/events" className="w-full">
                <Button variant="outline" className="w-full">View Calendar</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="campus-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <MessageSquare className="mr-2 h-5 w-5 text-campus-purple" />
                Recent Chats
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-campus-orange text-white flex items-center justify-center mr-2">CS</div>
                    <div>
                      <p className="font-medium">CS-301 Class</p>
                      <p className="text-xs text-muted-foreground">Prof: When is the next...</p>
                    </div>
                  </div>
                  <span className="text-xs bg-campus-purple/10 text-campus-purple px-2 py-1 rounded-full">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-campus-blue text-white flex items-center justify-center mr-2">DS</div>
                    <div>
                      <p className="font-medium">Data Structures</p>
                      <p className="text-xs text-muted-foreground">Alex: Can someone explain...</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link to="/chat" className="w-full">
                <Button variant="outline" className="w-full">Open Chat</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="campus-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Users className="mr-2 h-5 w-5 text-campus-purple" />
                BuzzBoard
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-2">
                <div className="bg-muted/50 p-2 rounded-md">
                  <p className="font-medium">Anonymous</p>
                  <p className="text-sm">Anyone else struggling with the Algorithm assignment?</p>
                  <div className="flex items-center mt-1 space-x-2">
                    <span className="text-xs bg-campus-purple/10 text-campus-purple px-2 py-0.5 rounded-full">6 replies</span>
                    <span className="text-xs text-muted-foreground">2h ago</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link to="/buzzboard" className="w-full">
                <Button variant="outline" className="w-full">View BuzzBoard</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Quick Access</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-4">
          <Link to="/chat" className="campus-card p-4 flex flex-col items-center justify-center hover:border-campus-purple text-center">
            <MessageSquare className="h-8 w-8 text-campus-purple mb-2" />
            <span className="font-medium">Class Chat</span>
          </Link>
          <Link to="/notes" className="campus-card p-4 flex flex-col items-center justify-center hover:border-campus-purple text-center">
            <Book className="h-8 w-8 text-campus-orange mb-2" />
            <span className="font-medium">Study Notes</span>
          </Link>
          <Link to="/buzzboard" className="campus-card p-4 flex flex-col items-center justify-center hover:border-campus-purple text-center">
            <Users className="h-8 w-8 text-campus-blue mb-2" />
            <span className="font-medium">BuzzBoard</span>
          </Link>
          <Link to="/profile" className="campus-card p-4 flex flex-col items-center justify-center hover:border-campus-purple text-center">
            <User className="h-8 w-8 text-campus-green mb-2" />
            <span className="font-medium">Profile</span>
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Recent Study Materials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="campus-card flex p-3 items-center">
            <div className="bg-campus-purple/10 p-3 rounded-lg mr-3">
              <FileText className="h-6 w-6 text-campus-purple" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Data Structures - Week 5.pdf</p>
              <p className="text-xs text-muted-foreground">Uploaded by Prof. Johnson • May 2, 2025</p>
            </div>
            <Link to="/notes/1">
              <Button variant="ghost" size="sm">View</Button>
            </Link>
          </div>
          
          <div className="campus-card flex p-3 items-center">
            <div className="bg-campus-orange/10 p-3 rounded-lg mr-3">
              <FileText className="h-6 w-6 text-campus-orange" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Algorithm Analysis Notes.pdf</p>
              <p className="text-xs text-muted-foreground">Uploaded by Prof. Smith • May 1, 2025</p>
            </div>
            <Link to="/notes/2">
              <Button variant="ghost" size="sm">View</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentDashboard;
