
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, User, FilePlus, BookOpen, Grid2X2, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchBar from './SearchBar';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomepage = location.pathname === '/';

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-white font-poppins font-bold">R</span>
                </div>
                <h1 className="ml-2 text-xl font-bold text-primary">RentMate</h1>
              </div>
            </Link>
          </div>
          
          {!isHomepage && (
            <div className="hidden md:flex md:flex-1 mx-4">
              <SearchBar compact={true} className="max-w-md mx-auto" />
            </div>
          )}
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/categories" className="text-textdark hover:text-primary px-3 py-2 rounded-md text-sm font-medium flex items-center">
              <Grid2X2 className="h-4 w-4 mr-1" />
              <span>Categories</span>
            </Link>
            <Link to="/post-add" className="text-primary hover:text-primary/90 px-3 py-2 rounded-md text-sm font-medium flex items-center">
              <FilePlus className="h-4 w-4 mr-1" />
              <span>Post the Add</span>
            </Link>
            <Link to="/my-bookings" className="text-textdark hover:text-primary px-3 py-2 rounded-md text-sm font-medium flex items-center">
              <BookOpen className="h-4 w-4 mr-1" />
              <span>My Bookings</span>
            </Link>
            <Link to="/messages" className="text-textdark hover:text-primary px-3 py-2 rounded-md text-sm font-medium flex items-center">
              <MessageSquare className="h-4 w-4 mr-1" />
              <span>Messages</span>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="flex items-center space-x-1">
                <User className="h-4 w-4 mr-1" />
                <span>Login</span>
              </Button>
            </Link>
          </div>
          
          <div className="flex md:hidden">
            <Button variant="ghost" size="icon" className="text-textdark" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
            {!isHomepage && (
              <div className="px-3 py-2">
                <SearchBar compact={true} />
              </div>
            )}
            <Link to="/categories" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-textdark hover:text-primary">
              <Grid2X2 className="h-4 w-4 mr-2" />
              <span>Categories</span>
            </Link>
            <Link to="/post-add" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-primary hover:text-primary/90">
              <FilePlus className="h-4 w-4 mr-2" />
              <span>Post the Add</span>
            </Link>
            <Link to="/my-bookings" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-textdark hover:text-primary">
              <BookOpen className="h-4 w-4 mr-2" />
              <span>My Bookings</span>
            </Link>
            <Link to="/messages" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-textdark hover:text-primary">
              <MessageSquare className="h-4 w-4 mr-2" />
              <span>Messages</span>
            </Link>
            <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-primary">
              Login / Sign up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
