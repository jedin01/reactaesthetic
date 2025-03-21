
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, FileText } from 'lucide-react';

const SummariesPage = () => {
  const summaries = [
    {
      id: 1,
      title: "Project Overview",
      excerpt: "A brief summary of the project goals, timeline, and key milestones.",
      date: "Today",
      status: "New"
    },
    {
      id: 2,
      title: "Weekly Report",
      excerpt: "Summary of this week's progress, challenges, and upcoming tasks.",
      date: "Yesterday",
      status: "Read"
    },
    {
      id: 3,
      title: "Market Analysis",
      excerpt: "Overview of current market trends and competitor activities.",
      date: "3 days ago",
      status: "Read"
    },
    {
      id: 4,
      title: "Q3 Performance",
      excerpt: "Summary of third quarter performance metrics and insights.",
      date: "1 week ago",
      status: "Read"
    },
    {
      id: 5,
      title: "Feature Roadmap",
      excerpt: "Upcoming features and enhancements planned for the next release.",
      date: "2 weeks ago",
      status: "Read"
    }
  ];

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
        className="mb-8"
      >
        <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">Browse</span>
        <h1 className="text-3xl font-bold mt-2 tracking-tight">Summaries</h1>
        <p className="text-muted-foreground mt-2">View and manage your summary collection.</p>
      </motion.div>

      <div className="flex overflow-x-auto pb-2 mb-6 gap-2 -mx-1 px-1">
        {["All", "New", "Read", "Favorites", "Shared"].map((filter, index) => (
          <motion.button
            key={filter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.05 }}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              filter === "All" 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {filter}
          </motion.button>
        ))}
      </div>
      
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {summaries.map((summary) => (
          <motion.div
            key={summary.id}
            variants={item}
            className="bg-card rounded-xl p-4 border shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-lg font-semibold">{summary.title}</h2>
              <div className="flex items-center">
                <span className="text-xs text-muted-foreground">{summary.date}</span>
                {summary.status === "New" ? (
                  <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    New
                  </span>
                ) : (
                  <CheckCircle2 className="ml-2 h-4 w-4 text-muted-foreground" />
                )}
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-3">{summary.excerpt}</p>
            <div className="flex justify-between items-center">
              <div className="flex items-center text-xs text-muted-foreground">
                <FileText className="h-3 w-3 mr-1" />
                <span>Summary</span>
                <span className="mx-2">•</span>
                <Clock className="h-3 w-3 mr-1" />
                <span>3 min read</span>
              </div>
              <button className="text-xs font-medium text-primary hover:underline">
                Read more
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SummariesPage;
