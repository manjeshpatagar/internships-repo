import { Button } from "./ui/button";
import { LogIn, Shield, User } from "lucide-react";

interface NavigationProps {
  currentPage: 'landing' | 'onboard' | 'admin-login' | 'candidate-login' | 'admin-panel';
  onPageChange: (page: 'landing' | 'onboard' | 'admin-login' | 'candidate-login' | 'admin-panel') => void;
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  return (
    <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 
              className="text-2xl font-bold text-primary cursor-pointer"
              onClick={() => onPageChange('landing')}
            >
              Career Studio
            </h1>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button
                onClick={() => onPageChange('landing')}
                className={`px-3 py-2 rounded-md transition-colors ${
                  currentPage === 'landing'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => onPageChange('onboard')}
                className={`px-3 py-2 rounded-md transition-colors ${
                  currentPage === 'onboard'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                Get Started
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange('candidate-login')}
              className="hidden sm:flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              Candidate Login
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange('admin-login')}
              className="hidden sm:flex items-center gap-2"
            >
              <Shield className="w-4 h-4" />
              Admin Login
            </Button>
            
            <div className="md:hidden">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage === 'landing' ? 'onboard' : 'landing')}
              >
                {currentPage === 'landing' ? 'Get Started' : 'Home'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}