
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
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 group hover:scale-105 transition-transform duration-300">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center transform transition-all duration-300 group-hover:shadow-lg group-hover:rotate-6">
                  <span className="text-white font-poppins font-bold text-lg group-hover:scale-110 transition-transform">R</span>
                </div>
                <h1 className="ml-2 text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Rentit</h1>
              </div>
            </Link>
          </div>
          
          {!isHomepage && (
            <div className="hidden md:flex md:flex-1 mx-4">
              <SearchBar compact={true} className="max-w-md mx-auto" />
            </div>
          )}
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/categories" className="text-textdark hover:text-accent px-3 py-2 rounded-md text-sm font-medium flex items-center relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-accent after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left group transition-all duration-300 hover:translate-y-[-2px]">
              <Grid2X2 className="h-4 w-4 mr-1 group-hover:text-accent transition-colors duration-300 group-hover:rotate-12 transform" />
              <span>Categories</span>
            </Link>
            <Link to="/post-add" className="relative overflow-hidden bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white px-4 py-2 rounded-md text-sm font-medium flex items-center transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md hover:translate-y-[-2px]">
              <FilePlus className="h-4 w-4 mr-1 group-hover:rotate-12 transition-transform" />
              <span>Post the Add</span>
              <span className="absolute top-0 right-0 w-12 h-full bg-white/20 transform skew-x-30 translate-x-20 transition-transform ease-out duration-700 group-hover:translate-x-32"></span>
            </Link>
            <Link to="/my-bookings" className="text-textdark hover:text-secondary px-3 py-2 rounded-md text-sm font-medium flex items-center relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-secondary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left group transition-all duration-300 hover:translate-y-[-2px]">
              <BookOpen className="h-4 w-4 mr-1 group-hover:text-secondary transition-colors duration-300 group-hover:rotate-12 transform" />
              <span>My Bookings</span>
            </Link>
            <Link to="/messages" className="text-textdark hover:text-accent px-3 py-2 rounded-md text-sm font-medium flex items-center relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-accent after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left group transition-all duration-300 hover:translate-y-[-2px]">
              <MessageSquare className="h-4 w-4 mr-1 group-hover:text-accent transition-colors duration-300 group-hover:rotate-12 transform" />
              <span>Messages</span>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="flex items-center space-x-1 border-secondary text-secondary hover:text-white hover:bg-secondary transition-colors duration-300 animate-pulse-subtle">
                <User className="h-4 w-4 mr-1 group-hover:rotate-12 transform transition-transform" />
                <span>Login</span>
              </Button>
            </Link>
          </div>
          
          <div className="flex md:hidden">
            <Button variant="ghost" size="icon" className="text-textdark hover:bg-secondary/10 hover:text-secondary transition-colors duration-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-6 w-6 transition-transform hover:rotate-12" />
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
            <Link to="/categories" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-textdark hover:text-accent hover:bg-accent/5 transition-all duration-300 transform hover:translate-x-1">
              <Grid2X2 className="h-4 w-4 mr-2 transition-transform hover:rotate-12" />
              <span>Categories</span>
            </Link>
            <Link to="/post-add" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-white bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-all duration-300 transform hover:scale-[1.02] hover:translate-x-1">
              <FilePlus className="h-4 w-4 mr-2 transition-transform hover:rotate-12" />
              <span>Post the Add</span>
            </Link>
            <Link to="/my-bookings" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-textdark hover:text-secondary hover:bg-secondary/5 transition-all duration-300 transform hover:translate-x-1">
              <BookOpen className="h-4 w-4 mr-2 transition-transform hover:rotate-12" />
              <span>My Bookings</span>
            </Link>
            <Link to="/messages" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-textdark hover:text-accent hover:bg-accent/5 transition-all duration-300 transform hover:translate-x-1">
              <MessageSquare className="h-4 w-4 mr-2 transition-transform hover:rotate-12" />
              <span>Messages</span>
            </Link>
            <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-secondary hover:bg-secondary hover:text-white transition-all duration-300 transform hover:translate-x-1">
              Login / Sign up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
