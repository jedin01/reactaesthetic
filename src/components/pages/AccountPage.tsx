
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  CreditCard, 
  HelpCircle, 
  LogOut, 
  Settings, 
  Shield, 
  User as UserIcon
} from 'lucide-react';

const AccountPage = () => {
  const menuItems = [
    { icon: UserIcon, label: 'Profile', description: 'View and edit your profile information' },
    { icon: Bell, label: 'Notifications', description: 'Manage your notification preferences' },
    { icon: Shield, label: 'Privacy', description: 'Control your privacy settings' },
    { icon: CreditCard, label: 'Subscription', description: 'Manage your subscription plan' },
    { icon: Settings, label: 'Settings', description: 'App settings and preferences' },
    { icon: HelpCircle, label: 'Help & Support', description: 'Get assistance and find answers' },
    { icon: LogOut, label: 'Log Out', description: 'Sign out from your account' },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="pt-6 pb-20 px-4 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">Profile</span>
        <h1 className="text-3xl font-bold mt-2 tracking-tight">Account</h1>
        <p className="text-muted-foreground mt-2">Manage your account settings and preferences.</p>
      </motion.div>

      <motion.div 
        className="bg-card rounded-xl p-5 border shadow-sm mb-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-primary text-xl font-semibold">JD</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold">John Doe</h2>
            <p className="text-muted-foreground">john.doe@example.com</p>
          </div>
        </div>
        <div className="flex gap-3 mt-4">
          <button className="px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground">
            Edit Profile
          </button>
          <button className="px-4 py-2 rounded-lg text-sm font-medium bg-secondary text-secondary-foreground">
            View Activity
          </button>
        </div>
      </motion.div>

      <motion.div
        className="space-y-3"
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: {
              staggerChildren: 0.08
            }
          }
        }}
        initial="hidden"
        animate="visible"
      >
        {menuItems.map((item, index) => (
          <motion.button
            key={item.label}
            className="w-full bg-card hover:bg-primary/5 transition-colors rounded-xl p-4 border shadow-sm flex items-center gap-4 text-left"
            variants={fadeInUp}
          >
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <item.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">{item.label}</h3>
              <p className="text-muted-foreground text-sm">{item.description}</p>
            </div>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

export default AccountPage;
