
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const HomePage = () => {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

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
        <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">Welcome</span>
        <h1 className="text-3xl font-bold mt-2 tracking-tight">Home</h1>
        <p className="text-muted-foreground mt-2">Discover the latest content and updates.</p>
      </motion.div>

      <div 
        ref={el => sectionRefs.current[0] = el} 
        className="fade-in-section mb-8 bg-card rounded-xl p-6 border shadow-sm"
      >
        <h2 className="text-xl font-semibold mb-3">Featured Content</h2>
        <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <span className="text-primary font-medium">Featured Image</span>
          </div>
        </div>
        <p className="text-muted-foreground text-sm">
          Explore our curated selection of premium content designed to enhance your experience.
        </p>
      </div>
      
      <div 
        ref={el => sectionRefs.current[1] = el} 
        className="fade-in-section mb-8"
      >
        <h2 className="text-xl font-semibold mb-3">Recent Updates</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div 
              key={item} 
              className="bg-card rounded-lg p-4 border shadow-sm flex items-center gap-4"
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-medium text-sm">{item}</span>
              </div>
              <div>
                <h3 className="font-medium">Update Title {item}</h3>
                <p className="text-muted-foreground text-sm">Short description about this update</p>
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
          {['Browse', 'Search', 'Favorites', 'Settings'].map((action) => (
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
