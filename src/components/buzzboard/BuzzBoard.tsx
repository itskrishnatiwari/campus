
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Filter, MessageSquare, PlusCircle, ThumbsUp } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BuzzPost {
  id: string;
  content: string;
  likes: number;
  replies: number;
  category: string;
  timeAgo: string;
}

const BuzzBoard: React.FC = () => {
  const [posts, setPosts] = useState<BuzzPost[]>([
    {
      id: '1',
      content: "Is anyone else struggling with the Algorithm assignment due next week? I'm stuck on problem 3...",
      likes: 15,
      replies: 8,
      category: "Academic",
      timeAgo: "2h ago",
    },
    {
      id: '2',
      content: "Unpopular opinion: The cafeteria food isn't that bad compared to other universities. Fight me.",
      likes: 32,
      replies: 24,
      category: "Confession",
      timeAgo: "5h ago",
    },
    {
      id: '3',
      content: "Lost a blue notebook with Data Structures notes near the library yesterday. If found please let me know!",
      likes: 7,
      replies: 3,
      category: "Lost & Found",
      timeAgo: "1d ago",
    },
    {
      id: '4',
      content: "Anyone else think we should extend library hours during finals week? I study best at night!",
      likes: 45,
      replies: 12,
      category: "Feedback",
      timeAgo: "2d ago",
    },
  ]);

  const [filter, setFilter] = useState('all');
  const [isOpen, setIsOpen] = useState(false);
  const [newPost, setNewPost] = useState({ content: '', category: 'Academic' });

  const handleSubmitPost = () => {
    if (!newPost.content.trim()) return;

    const post: BuzzPost = {
      id: (posts.length + 1).toString(),
      content: newPost.content,
      likes: 0,
      replies: 0,
      category: newPost.category,
      timeAgo: "Just now",
    };

    setPosts([post, ...posts]);
    setNewPost({ content: '', category: 'Academic' });
    setIsOpen(false);
  };

  const handleLike = (id: string) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const filteredPosts = filter === 'all' 
    ? posts 
    : posts.filter(post => post.category === filter);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">BuzzBoard</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="campus-button">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Create Anonymous Post</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Select 
                  value={newPost.category} 
                  onValueChange={(value) => setNewPost({...newPost, category: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Academic">Academic</SelectItem>
                    <SelectItem value="Confession">Confession</SelectItem>
                    <SelectItem value="Feedback">Feedback</SelectItem>
                    <SelectItem value="Lost & Found">Lost & Found</SelectItem>
                    <SelectItem value="Advice">Advice</SelectItem>
                    <SelectItem value="Fun">Fun</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Textarea 
                placeholder="Share your thoughts anonymously..." 
                className="min-h-32"
                value={newPost.content}
                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                <Button onClick={handleSubmitPost} className="campus-button">Post Anonymously</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2 mb-4">
        <Filter className="h-5 w-5 text-muted-foreground" />
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Posts</SelectItem>
            <SelectItem value="Academic">Academic</SelectItem>
            <SelectItem value="Confession">Confession</SelectItem>
            <SelectItem value="Feedback">Feedback</SelectItem>
            <SelectItem value="Lost & Found">Lost & Found</SelectItem>
            <SelectItem value="Advice">Advice</SelectItem>
            <SelectItem value="Fun">Fun</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="campus-card p-4">
            <div className="flex justify-between items-start mb-2">
              <span className="bg-campus-purple/10 text-campus-purple text-xs px-2 py-1 rounded-full">
                {post.category}
              </span>
              <span className="text-xs text-muted-foreground">{post.timeAgo}</span>
            </div>
            
            <p className="mb-4">{post.content}</p>
            
            <div className="flex items-center space-x-4 mt-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center space-x-1 text-muted-foreground hover:text-campus-purple"
                onClick={() => handleLike(post.id)}
              >
                <ThumbsUp className="h-4 w-4" />
                <span>{post.likes}</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center space-x-1 text-muted-foreground hover:text-campus-purple"
              >
                <MessageSquare className="h-4 w-4" />
                <span>{post.replies}</span>
              </Button>
            </div>
          </Card>
        ))}

        {filteredPosts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No posts found in this category</p>
            <Button onClick={() => setIsOpen(true)} variant="link" className="mt-2 text-campus-purple">
              Create the first post
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuzzBoard;
