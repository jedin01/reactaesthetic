
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';

// Function to fetch a daily quote
const fetchDailyQuote = async () => {
  try {
    const response = await fetch('https://api.quotable.io/random?tags=inspirational,education');
    if (!response.ok) {
      throw new Error('Failed to fetch quote');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching quote:', error);
    return { content: "Learning is a treasure that will follow its owner everywhere.", author: "Chinese Proverb" };
  }
};

const HomePage = () => {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const { data: quote, isLoading } = useQuery({
    queryKey: ['dailyQuote'],
    queryFn: fetchDailyQuote,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, observerOptions);

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="pt-6 pb-20 px-4 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">Welcome to Studyable</span>
        <h1 className="text-3xl font-bold mt-2 tracking-tight">Your Study Assistant</h1>
        <p className="text-muted-foreground mt-2">Your AI-powered study companion for better learning.</p>
      </motion.div>

      <div 
        ref={el => sectionRefs.current[0] = el} 
        className="fade-in-section mb-8"
      >
        <Card className="border shadow-sm overflow-hidden">
          <div className="notebook-paper p-6">
            <h2 className="text-xl font-semibold mb-3 text-blue-800">Daily Motivation</h2>
            <div className="min-h-[120px] flex flex-col justify-center">
              {isLoading ? (
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/4 mt-4"></div>
                </div>
              ) : (
                <>
                  <p className="text-slate-700 italic mb-2 leading-relaxed">"{quote?.content}"</p>
                  <p className="text-right text-slate-500 text-sm">- {quote?.author}</p>
                </>
              )}
            </div>
          </div>
        </Card>
      </div>
      
      <div 
        ref={el => sectionRefs.current[1] = el} 
        className="fade-in-section mb-8"
      >
        <h2 className="text-xl font-semibold mb-3">Recent Updates</h2>
        <div className="space-y-3">
          {[
            { title: "Study Summaries", desc: "Create and manage your study notes" },
            { title: "AI Assistance", desc: "Get help with complex topics" },
            { title: "Progress Tracking", desc: "Monitor your learning journey" }
          ].map((item, index) => (
            <div 
              key={index} 
              className="bg-card rounded-lg p-4 border shadow-sm flex items-center gap-4"
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-medium text-sm">{index + 1}</span>
              </div>
              <div>
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div 
        ref={el => sectionRefs.current[2] = el} 
        className="fade-in-section"
      >
        <h2 className="text-xl font-semibold mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          {['New Summary', 'Study Planner', 'Flashcards', 'Settings'].map((action) => (
            <button
              key={action}
              className="bg-card hover:bg-primary/5 transition-colors rounded-lg p-4 border shadow-sm text-center"
            >
              <h3 className="font-medium">{action}</h3>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
