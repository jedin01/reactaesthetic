
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookText, Plus, ChevronDown, ChevronUp, FileText, Edit, X, GraduationCap, Brain } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type Summary = {
  id: number;
  subject: string;
  title: string;
  content: string;
  date: string;
  expanded?: boolean;
  category: 'math' | 'science' | 'literature' | 'history' | 'language';
};

const categoryIcons = {
  math: <span className="text-blue-600">∑</span>,
  science: <span className="text-green-600">⚗️</span>,
  literature: <span className="text-purple-600">📚</span>,
  history: <span className="text-amber-600">🏛️</span>,
  language: <span className="text-pink-600">🗣️</span>,
};

const SummariesPage = () => {
  const [summaries, setSummaries] = useState<Summary[]>([
    {
      id: 1,
      subject: "Mathematics",
      title: "Calculus Fundamentals",
      content: "Derivatives are used to measure the rate of change of a function with respect to a variable. The power rule states that if f(x) = xⁿ, then f'(x) = n·xⁿ⁻¹.",
      date: "Today",
      category: "math"
    },
    {
      id: 2,
      subject: "Science",
      title: "Cell Structure & Function",
      content: "The cell membrane is a semipermeable barrier that controls what enters and exits the cell. Organelles are specialized structures that perform various functions within the cell.",
      date: "Yesterday",
      category: "science"
    },
    {
      id: 3,
      subject: "Literature",
      title: "Shakespeare's Themes",
      content: "Recurring themes in Shakespeare's works include love, power, ambition, and betrayal. His characters often struggle with moral dilemmas and internal conflicts.",
      date: "3 days ago",
      category: "literature"
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [newSummary, setNewSummary] = useState({
    subject: "",
    title: "",
    content: "",
    category: "math" as Summary["category"]
  });

  const toggleExpand = (id: number) => {
    setSummaries(summaries.map(summary => 
      summary.id === id ? { ...summary, expanded: !summary.expanded } : summary
    ));
  };

  const handleAddSummary = () => {
    const newId = summaries.length > 0 ? Math.max(...summaries.map(s => s.id)) + 1 : 1;
    
    setSummaries([
      {
        id: newId,
        subject: newSummary.subject,
        title: newSummary.title,
        content: newSummary.content,
        date: "Just now",
        category: newSummary.category
      },
      ...summaries
    ]);
    
    setNewSummary({
      subject: "",
      title: "",
      content: "",
      category: "math"
    });
    
    setIsDialogOpen(false);
  };

  const filteredSummaries = activeCategory === 'all' 
    ? summaries 
    : summaries.filter(summary => summary.category === activeCategory);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="pt-6 pb-20 px-4 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4 flex items-center justify-between"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <GraduationCap className="text-primary h-5 w-5" />
            <h1 className="text-2xl font-bold tracking-tight">Study Notes</h1>
          </div>
          <p className="text-muted-foreground text-sm">Your personalized study assistant</p>
        </div>
        
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsDialogOpen(true)}
          className="bg-primary text-primary-foreground rounded-full h-10 w-10 flex items-center justify-center shadow-md"
        >
          <Plus className="h-5 w-5" />
        </motion.button>
      </motion.div>

      <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveCategory}>
        <TabsList className="bg-card border rounded-full p-1 w-full overflow-x-auto flex flex-nowrap justify-start" style={{scrollbarWidth: 'none'}}>
          <TabsTrigger 
            value="all" 
            className="rounded-full text-xs px-3 py-1.5 whitespace-nowrap"
          >
            All Notes
          </TabsTrigger>
          <TabsTrigger 
            value="math" 
            className="rounded-full text-xs px-3 py-1.5 whitespace-nowrap flex items-center gap-1"
          >
            {categoryIcons.math} Math
          </TabsTrigger>
          <TabsTrigger 
            value="science" 
            className="rounded-full text-xs px-3 py-1.5 whitespace-nowrap flex items-center gap-1"
          >
            {categoryIcons.science} Science
          </TabsTrigger>
          <TabsTrigger 
            value="literature" 
            className="rounded-full text-xs px-3 py-1.5 whitespace-nowrap flex items-center gap-1"
          >
            {categoryIcons.literature} Literature
          </TabsTrigger>
          <TabsTrigger 
            value="history" 
            className="rounded-full text-xs px-3 py-1.5 whitespace-nowrap flex items-center gap-1"
          >
            {categoryIcons.history} History
          </TabsTrigger>
          <TabsTrigger 
            value="language" 
            className="rounded-full text-xs px-3 py-1.5 whitespace-nowrap flex items-center gap-1"
          >
            {categoryIcons.language} Language
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {filteredSummaries.length === 0 ? (
          <div className="bg-muted/50 rounded-lg p-6 text-center">
            <BookText className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
            <h3 className="font-medium text-lg mb-1">No notes yet</h3>
            <p className="text-muted-foreground text-sm mb-4">Create your first study note to get started</p>
            <button 
              onClick={() => setIsDialogOpen(true)}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium"
            >
              Create Note
            </button>
          </div>
        ) : (
          filteredSummaries.map((summary) => (
            <motion.div
              key={summary.id}
              variants={item}
              className="overflow-hidden"
            >
              <Card 
                className="border border-amber-200 bg-[#FEF7CD] shadow-sm overflow-hidden" 
                style={{
                  backgroundImage: "linear-gradient(90deg, transparent 0px, #FDE1D3 1px, transparent 1px, transparent 20px), linear-gradient(#FEF7CD 27px, #333 28px, #FEF7CD 28px, #FEF7CD 31px)"
                }}
              >
                <div className="px-4 py-3 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      {categoryIcons[summary.category]}
                      <span className="text-xs font-medium text-muted-foreground">{summary.subject}</span>
                    </div>
                    <h3 className="font-semibold">{summary.title}</h3>
                  </div>
                  <button 
                    onClick={() => toggleExpand(summary.id)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {summary.expanded ? 
                      <ChevronUp className="h-5 w-5" /> : 
                      <ChevronDown className="h-5 w-5" />
                    }
                  </button>
                </div>
                
                {summary.expanded && (
                  <CardContent className="pt-0 pb-3 px-4">
                    <div className="text-sm leading-relaxed whitespace-pre-line font-[Courier] mt-2" style={{lineHeight: '26px'}}>
                      {summary.content}
                    </div>
                    <div className="flex justify-between items-center mt-4 text-xs text-muted-foreground">
                      <span>{summary.date}</span>
                      <div className="flex gap-2">
                        <button className="hover:text-primary transition-colors">
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                        <button className="hover:text-destructive transition-colors">
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            </motion.div>
          ))
        )}
      </motion.div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              <span>Create New Study Note</span>
            </DialogTitle>
            <DialogDescription>
              Add a new note to your study collection
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select 
                id="category"
                value={newSummary.category}
                onChange={(e) => setNewSummary({...newSummary, category: e.target.value as Summary["category"]})}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="math">Mathematics</option>
                <option value="science">Science</option>
                <option value="literature">Literature</option>
                <option value="history">History</option>
                <option value="language">Language</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input 
                id="subject" 
                value={newSummary.subject}
                onChange={(e) => setNewSummary({...newSummary, subject: e.target.value})}
                placeholder="e.g., Calculus, Biology, English Literature"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                value={newSummary.title}
                onChange={(e) => setNewSummary({...newSummary, title: e.target.value})}
                placeholder="e.g., Derivatives, Cell Structure, Shakespeare's Themes"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea 
                id="content"
                value={newSummary.content}
                onChange={(e) => setNewSummary({...newSummary, content: e.target.value})}
                placeholder="Enter your study notes here..."
                className="min-h-[150px] font-[Courier]"
                style={{
                  lineHeight: '26px',
                  backgroundImage: "linear-gradient(#fff 27px, #333 28px, #fff 28px, #fff 31px)",
                  backgroundSize: "100% 31px",
                  backgroundAttachment: "local"
                }}
              />
            </div>
          </div>
          
          <DialogFooter className="sm:justify-between">
            <button
              type="button"
              className="text-sm text-muted-foreground hover:text-destructive transition-colors"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium"
              onClick={handleAddSummary}
            >
              Save Note
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SummariesPage;
