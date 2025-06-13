import { useRouterState } from '@tanstack/react-router';
import { useEffect } from 'react';
import { Link } from '@tanstack/react-router';

const NotFound = () => {
  const routerState = useRouterState();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      routerState.location.pathname
    );
  }, [routerState.location.pathname]);

  return (
    <div className="absolute z-[100] top-0 right-0 min-h-screen flex items-center justify-center bg-gray-100 w-[100vw]">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <Link 
          to="/" 
          className="text-blue-500 hover:text-blue-700 underline"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;