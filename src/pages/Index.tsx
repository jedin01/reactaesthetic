
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HomePage from '@/components/pages/HomePage';
import SummariesPage from '@/components/pages/SummariesPage';
import AccountPage from '@/components/pages/AccountPage';
import { motion, AnimatePresence } from 'framer-motion';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'summaries':
        return <SummariesPage />;
      case 'account':
        return <AccountPage />;
      default:
        return <HomePage />;
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="h-16 w-16 mb-4 bg-primary/10 rounded-full flex items-center justify-center">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="h-8 w-8 bg-primary rounded-full"
            />
          </div>
          <h1 className="text-2xl font-bold">Loading</h1>
          <p className="text-muted-foreground">Preparing your experience...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="custom-navbar-observer">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="min-h-screen pb-16"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
      
      <CustomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

const CustomNavbar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'home', icon: 'Home', label: 'Home' },
    { id: 'summaries', icon: 'ListChecks', label: 'Summaries' },
    { id: 'account', icon: 'User', label: 'Account' }
  ];

  return (
    <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
  );
};

export default Index;
