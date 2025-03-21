
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div 
        className="text-center max-w-md w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="h-24 w-24 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 10,
            delay: 0.2
          }}
        >
          <span className="text-primary text-4xl font-bold">404</span>
        </motion.div>
        
        <h1 className="text-3xl font-bold mb-2">Page not found</h1>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <motion.a 
          href="/" 
          className="inline-flex items-center px-4 py-2 rounded-lg font-medium bg-primary text-primary-foreground"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Return to Home
        </motion.a>
      </motion.div>
    </div>
  );
};

export default NotFound;
