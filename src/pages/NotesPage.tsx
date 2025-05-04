
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Plus, Download, FileUp, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Note {
  id: string;
  title: string;
  subject: string;
  uploadedBy: string;
  uploadDate: string;
  fileUrl: string; // In a real app, this would be a link to a file
  rating: number;
  downloads: number;
  isVerified: boolean;
}

// Initial sample notes data
const sampleNotes: Note[] = [
  {
    id: '1',
    title: 'Data Structures Introduction',
    subject: 'Computer Science',
    uploadedBy: 'Prof. Johnson',
    uploadDate: '2023-10-15',
    fileUrl: '#',
    rating: 4.5,
    downloads: 120,
    isVerified: true
  },
  {
    id: '2',
    title: 'Algorithms Analysis',
    subject: 'Computer Science',
    uploadedBy: 'Prof. Williams',
    uploadDate: '2023-11-02',
    fileUrl: '#',
    rating: 4.2,
    downloads: 95,
    isVerified: true
  },
  {
    id: '3',
    title: 'Database Design Principles',
    subject: 'Information Systems',
    uploadedBy: 'Prof. Garcia',
    uploadDate: '2023-09-28',
    fileUrl: '#',
    rating: 3.8,
    downloads: 67,
    isVerified: false
  }
];

const NotesPage = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [newNote, setNewNote] = useState({
    title: '',
    subject: 'Computer Science',
    fileUrl: '#' // In a real app, this would be handled by file upload
  });

  // Initialize notes from localStorage or use sample data
  useEffect(() => {
    const storedNotes = localStorage.getItem('campusBuzzNotes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    } else {
      setNotes(sampleNotes);
      localStorage.setItem('campusBuzzNotes', JSON.stringify(sampleNotes));
    }
  }, []);

  const handleAddNote = () => {
    if (!user) return;
    
    const note: Note = {
      id: `note_${Date.now()}`,
      title: newNote.title,
      subject: newNote.subject,
      uploadedBy: user.name,
      uploadDate: new Date().toISOString().split('T')[0],
      fileUrl: newNote.fileUrl,
      rating: 0,
      downloads: 0,
      isVerified: user.role === 'teacher'
    };
    
    const updatedNotes = [note, ...notes];
    setNotes(updatedNotes);
    localStorage.setItem('campusBuzzNotes', JSON.stringify(updatedNotes));
    
    setNewNote({ title: '', subject: 'Computer Science', fileUrl: '#' });
    setIsDialogOpen(false);
    toast.success('Note added successfully!');
  };

  const handleDownload = (id: string) => {
    // Update download count
    const updatedNotes = notes.map(note => 
      note.id === id ? { ...note, downloads: note.downloads + 1 } : note
    );
    setNotes(updatedNotes);
    localStorage.setItem('campusBuzzNotes', JSON.stringify(updatedNotes));
    
    // In a real app, this would initiate a file download
    toast.success('Download started!');
  };

  // Filter notes based on search term and subject
  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = subjectFilter === 'all' || note.subject === subjectFilter;
    return matchesSearch && matchesSubject;
  });

  // Get unique subjects for the filter
  const subjects = Array.from(new Set(notes.map(note => note.subject)));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Study Notes</h2>
        
        {user?.role === 'teacher' && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="campus-button">
                <Plus className="mr-2 h-4 w-4" />
                Upload Note
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Upload Study Material</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <label htmlFor="title">Title</label>
                  <Input 
                    id="title" 
                    value={newNote.title}
                    onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                    placeholder="e.g. Introduction to Data Structures" 
                  />
                </div>
                
                <div className="space-y-2">
                  <label>Subject</label>
                  <Select 
                    value={newNote.subject} 
                    onValueChange={(value) => setNewNote({...newNote, subject: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                      <SelectItem value="Information Systems">Information Systems</SelectItem>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label>Upload File</label>
                  <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                    <FileUp className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-center text-muted-foreground">
                      Drag and drop a file, or click to browse
                    </p>
                    <p className="text-xs text-center text-muted-foreground mt-1">
                      (PDF, DOCX, PPTX up to 10MB)
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 mt-4">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button 
                    onClick={handleAddNote} 
                    className="campus-button"
                    disabled={!newNote.title.trim()}
                  >
                    Upload
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
      
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search notes..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <Select value={subjectFilter} onValueChange={setSubjectFilter}>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder="Subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            {subjects.map(subject => (
              <SelectItem key={subject} value={subject}>{subject}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Notes List */}
      {filteredNotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNotes.map(note => (
            <Card key={note.id} className="p-4 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{note.title}</h3>
                  {note.isVerified && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                      Verified
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground">Subject: {note.subject}</p>
                <p className="text-sm text-muted-foreground">Uploaded by: {note.uploadedBy}</p>
                <p className="text-xs text-muted-foreground mt-1">{note.uploadDate}</p>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg 
                        key={star} 
                        className={`h-4 w-4 ${star <= Math.round(note.rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">
                    {note.downloads} downloads
                  </span>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDownload(note.id)}
                  className="text-campus-purple hover:text-campus-purple/70"
                >
                  <Download className="mr-1 h-4 w-4" />
                  Download
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No notes found</p>
          {user?.role === 'teacher' && (
            <Button onClick={() => setIsDialogOpen(true)} variant="link" className="mt-2">
              Upload your first note
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default NotesPage;
