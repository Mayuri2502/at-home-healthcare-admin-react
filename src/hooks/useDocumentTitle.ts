import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const routeTitles: Record<string, string> = {
  '/dashboard': 'Dashboard - At-Home Healthcare',
  '/doctors': 'Doctors - At-Home Healthcare',
  '/providers': 'Providers - At-Home Healthcare',
  '/services': 'Services - At-Home Healthcare',
  '/requests': 'Service Requests - At-Home Healthcare',
  '/forms': 'Forms - At-Home Healthcare',
  '/notifications': 'Notifications - At-Home Healthcare',
  '/login': 'Login - At-Home Healthcare',
  '/forgot-password': 'Forgot Password - At-Home Healthcare',
  '/reset-password': 'Reset Password - At-Home Healthcare',
};

export const useDocumentTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    
    // Check for exact match first
    if (routeTitles[path]) {
      document.title = routeTitles[path];
      return;
    }
    
    // Check for dynamic routes
    if (path.startsWith('/doctors/')) {
      document.title = 'Doctor Details - At-Home Healthcare';
      return;
    }
    
    if (path.startsWith('/providers/create')) {
      document.title = 'Create Provider - At-Home Healthcare';
      return;
    }
    
    if (path.startsWith('/providers/edit/')) {
      document.title = 'Edit Provider - At-Home Healthcare';
      return;
    }
    
    // Default title
    document.title = 'At-Home Healthcare';
  }, [location]);
};
