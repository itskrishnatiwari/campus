
import React, { useState, useEffect } from 'react';
import { Calendar, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'class' | 'test' | 'assignment' | 'meeting' | 'other';
  createdBy: string;
}

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const { user } = useAuth();

  useEffect(() => {
    // Load events from localStorage
    const storedEvents = localStorage.getItem(`campusBuzz_events`);
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    } else {
      // Generate demo events if none exist
      const demoEvents = generateDemoEvents();
      setEvents(demoEvents);
      localStorage.setItem(`campusBuzz_events`, JSON.stringify(demoEvents));
    }
  }, []);

  const generateDemoEvents = (): Event[] => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    return [
      {
        id: '1',
        title: 'Data Structures Test',
        description: 'Mid-semester exam covering arrays, linked lists, and trees',
        date: tomorrow.toISOString().split('T')[0],
        time: '10:00 AM',
        location: 'Room 101',
        type: 'test',
        createdBy: 'Prof. Johnson'
      },
      {
        id: '2',
        title: 'Project Submission Deadline',
        description: 'Final submission for the semester project',
        date: nextWeek.toISOString().split('T')[0],
        time: '11:59 PM',
        location: 'Online Submission',
        type: 'assignment',
        createdBy: 'Prof. Smith'
      },
      {
        id: '3',
        title: 'Algorithms Study Group',
        description: 'Review session for the upcoming algorithm exam',
        date: today.toISOString().split('T')[0],
        time: '4:00 PM',
        location: 'Library Study Room 3',
        type: 'meeting',
        createdBy: 'Alex Johnson'
      },
      {
        id: '4',
        title: 'Database Management Quiz',
        description: 'Quick quiz on SQL and normalization',
        date: yesterday.toISOString().split('T')[0],
        time: '2:30 PM',
        location: 'Room 203',
        type: 'test',
        createdBy: 'Prof. Williams'
      }
    ];
  };

  // Filter events by upcoming or past
  const filteredEvents = events.filter(event => {
    const eventDate = new Date(`${event.date}T${event.time}`);
    const today = new Date();
    
    if (activeTab === 'upcoming') {
      return eventDate >= today;
    } else {
      return eventDate < today;
    }
  });
  
  // Sort events by date (closest first for upcoming, most recent first for past)
  filteredEvents.sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    
    if (activeTab === 'upcoming') {
      return dateA.getTime() - dateB.getTime();
    } else {
      return dateB.getTime() - dateA.getTime();
    }
  });

  const getEventTypeColor = (type: string) => {
    switch(type) {
      case 'test': return 'bg-campus-red/10 text-campus-red';
      case 'assignment': return 'bg-campus-orange/10 text-campus-orange';
      case 'meeting': return 'bg-campus-blue/10 text-campus-blue';
      case 'class': return 'bg-campus-purple/10 text-campus-purple';
      default: return 'bg-campus-green/10 text-campus-green';
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Events & Schedule</h2>
          <p className="text-muted-foreground">Stay updated with your academic calendar</p>
        </div>
        {user?.role === 'teacher' && (
          <Button className="campus-button">
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Event
          </Button>
        )}
      </div>

      <Tabs defaultValue="upcoming" value={activeTab} onValueChange={(value) => setActiveTab(value as 'upcoming' | 'past')}>
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>

        <div className="mt-4">
          {filteredEvents.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="flex justify-center mb-4">
                <Calendar className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No {activeTab} events</h3>
              <p className="text-muted-foreground">
                {activeTab === 'upcoming' ? 'You have no upcoming events scheduled.' : 'No past events to display.'}
              </p>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredEvents.map(event => (
                <Card key={event.id} className="campus-card">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="min-w-[60px] text-center">
                        <div className="text-xl font-bold">{formatDate(event.date).split(' ')[2]}</div>
                        <div className="text-sm text-muted-foreground">{formatDate(event.date).split(' ').slice(0, 2).join(' ')}</div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center">
                            <h3 className="font-medium">{event.title}</h3>
                            <span className={`ml-2 text-xs px-2 py-1 rounded-full ${getEventTypeColor(event.type)}`}>
                              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                            </span>
                          </div>
                          <span className="text-sm text-muted-foreground">{event.time}</span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div>Location: {event.location}</div>
                          <div>Added by: {event.createdBy}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
};

export default EventsPage;
