
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageSquare, BookOpen, Users, ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16 bg-gradient-to-b from-white to-muted/30">
        <div className="max-w-3xl mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-campus-purple">
            Welcome to CampusBuzz
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Your complete campus communication platform for students and teachers
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link to="/auth">
              <Button className="campus-button text-lg px-6 py-6">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <Link to="/dashboard">
              <Button variant="outline" className="text-lg px-6 py-6">
                Demo Dashboard
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="campus-card p-6">
              <MessageSquare className="h-12 w-12 text-campus-purple mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Real-time Messaging</h3>
              <p className="text-muted-foreground">Connect with classmates and teachers instantly through classroom and private chats.</p>
            </div>
            
            <div className="campus-card p-6">
              <BookOpen className="h-12 w-12 text-campus-orange mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Study Materials</h3>
              <p className="text-muted-foreground">Access and share lecture notes, assignments and academic resources.</p>
            </div>
            
            <div className="campus-card p-6">
              <Users className="h-12 w-12 text-campus-blue mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">BuzzBoard</h3>
              <p className="text-muted-foreground">Anonymous campus messaging board for feedback, advice and confessions.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t p-4 bg-white text-center">
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} CampusBuzz. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Index;
