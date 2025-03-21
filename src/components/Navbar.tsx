
import React from 'react';
import { Home, BookText, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

type NavItemProps = {
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  onClick: () => void;
};

const NavItem = ({ icon: Icon, label, isActive, onClick }: NavItemProps) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "nav-item flex flex-col items-center gap-1",
        isActive && "nav-item-active"
      )}
    >
      <Icon className={cn("nav-icon h-6 w-6", isActive ? "text-primary" : "text-muted-foreground")} />
      <span className={cn("nav-text text-xs", isActive ? "text-primary" : "text-muted-foreground")}>
        {label}
      </span>
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute bottom-0 h-1 w-1 rounded-full bg-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  );
};

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navbar = ({ activeTab, setActiveTab }: NavbarProps) => {
  return (
    <motion.nav 
      className="fixed bottom-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-lg border-t border-border px-2 flex justify-around items-center z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 200, 
        damping: 20,
        delay: 0.2
      }}
    >
      <NavItem
        icon={Home}
        label="Home"
        isActive={activeTab === 'home'}
        onClick={() => setActiveTab('home')}
      />
      <NavItem
        icon={BookText}
        label="Notes"
        isActive={activeTab === 'summaries'}
        onClick={() => setActiveTab('summaries')}
      />
      <NavItem
        icon={User}
        label="Account"
        isActive={activeTab === 'account'}
        onClick={() => setActiveTab('account')}
      />
    </motion.nav>
  );
};

export default Navbar;
