
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, User, FilePlus, BookOpen, Grid2X2, MessageSquare, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchBar from './SearchBar';
import { useIsMobile } from '@/hooks/use-mobile';
import NotificationPopover from './NotificationPopover';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomepage = location.pathname === '/';
  const isMobile = useIsMobile();
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  // Add body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

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
                <h1 className="ml-2 text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-pulse-subtle">Rentit</h1>
              </div>
            </Link>
          </div>
          
          {!isHomepage && (
            <div className="hidden md:flex md:flex-1 mx-4">
              <SearchBar compact={true} className="max-w-md mx-auto" />
            </div>
          )}
          
          <div className="hidden md:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="flex items-center bg-transparent hover:bg-accent/10">
                    <Grid2X2 className="h-4 w-4 mr-1 group-hover:text-accent transition-colors duration-300" />
                    <span>Categories</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-2 gap-3 p-4 w-[400px]">
                      <Link to="/categories/electronics" className="flex items-center space-x-2 p-2 rounded hover:bg-accent/10 transition-colors duration-200">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-500 text-xs">E</span>
                        </div>
                        <span className="text-sm">Electronics</span>
                      </Link>
                      <Link to="/categories/vehicles" className="flex items-center space-x-2 p-2 rounded hover:bg-accent/10 transition-colors duration-200">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                          <span className="text-green-500 text-xs">V</span>
                        </div>
                        <span className="text-sm">Vehicles</span>
                      </Link>
                      <Link to="/categories/clothing" className="flex items-center space-x-2 p-2 rounded hover:bg-accent/10 transition-colors duration-200">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                          <span className="text-purple-500 text-xs">C</span>
                        </div>
                        <span className="text-sm">Clothing</span>
                      </Link>
                      <Link to="/categories/tools" className="flex items-center space-x-2 p-2 rounded hover:bg-accent/10 transition-colors duration-200">
                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                          <span className="text-orange-500 text-xs">T</span>
                        </div>
                        <span className="text-sm">Tools</span>
                      </Link>
                      <Link to="/categories/toys" className="flex items-center space-x-2 p-2 rounded hover:bg-accent/10 transition-colors duration-200">
                        <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                          <span className="text-pink-500 text-xs">T</span>
                        </div>
                        <span className="text-sm">Toys & Games</span>
                      </Link>
                      <Link to="/categories/sports" className="flex items-center space-x-2 p-2 rounded hover:bg-accent/10 transition-colors duration-200">
                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                          <span className="text-red-500 text-xs">S</span>
                        </div>
                        <span className="text-sm">Sports Equipment</span>
                      </Link>
                      <Link to="/categories" className="col-span-2 text-center text-primary text-sm hover:underline mt-2">
                        View All Categories
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <Link to="/post-add" className="relative overflow-hidden bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white px-4 py-2 rounded-md text-sm font-medium flex items-center transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md hover:translate-y-[-2px]">
              <FilePlus className="h-4 w-4 mr-1 group-hover:rotate-12 transition-transform" />
              <span>Post Ad</span>
              <span className="absolute top-0 right-0 w-12 h-full bg-white/20 transform skew-x-30 translate-x-20 transition-transform ease-out duration-700 hover:translate-x-32"></span>
            </Link>
            <Link to="/my-bookings" className="text-textdark hover:text-secondary px-3 py-2 rounded-md text-sm font-medium flex items-center relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-secondary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left group transition-all duration-300 hover:translate-y-[-2px]">
              <BookOpen className="h-4 w-4 mr-1 group-hover:text-secondary transition-colors duration-300 group-hover:rotate-12 transform" />
              <span>My Bookings</span>
            </Link>
            <Link to="/messages" className="text-textdark hover:text-accent px-3 py-2 rounded-md text-sm font-medium flex items-center relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-accent after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left group transition-all duration-300 hover:translate-y-[-2px]">
              <MessageSquare className="h-4 w-4 mr-1 group-hover:text-accent transition-colors duration-300 group-hover:rotate-12 transform" />
              <span>Messages</span>
            </Link>
            <NotificationPopover />
            <Link to="/login">
              <Button variant="outline" className="flex items-center space-x-1 border-secondary text-secondary hover:text-white hover:bg-secondary transition-colors duration-300 animate-pulse-subtle">
                <User className="h-4 w-4 mr-1 group-hover:rotate-12 transform transition-transform" />
                <span>Login</span>
              </Button>
            </Link>
          </div>
          
          <div className="flex md:hidden items-center space-x-2">
            <NotificationPopover />
            <Button variant="ghost" size="icon" className="text-textdark hover:bg-secondary/10 hover:text-secondary transition-colors duration-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <X className="h-6 w-6 transition-transform hover:rotate-90" />
              ) : (
                <Menu className="h-6 w-6 transition-transform hover:rotate-12" />
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-40 pt-16 animate-fade-in">
          <div className="px-4 py-6 space-y-4 flex flex-col h-full">
            {!isHomepage && (
              <div className="px-2 py-3">
                <SearchBar compact={true} />
              </div>
            )}
            
            <div className="border-b pb-2">
              <button 
                className="flex items-center justify-between w-full px-3 py-4 rounded-md text-base font-medium text-textdark hover:text-accent hover:bg-accent/5 transition-all duration-300"
                onClick={() => {
                  const elem = document.getElementById('categories-dropdown');
                  if (elem) {
                    elem.classList.toggle('hidden');
                  }
                }}
              >
                <div className="flex items-center">
                  <Grid2X2 className="h-5 w-5 mr-3" />
                  <span>Categories</span>
                </div>
                <ChevronDown className="h-5 w-5 transform transition-transform duration-300" />
              </button>
              
              <div id="categories-dropdown" className="hidden px-8 py-2 space-y-2">
                <Link to="/categories/electronics" className="block py-2 text-gray-600 hover:text-primary">Electronics</Link>
                <Link to="/categories/vehicles" className="block py-2 text-gray-600 hover:text-primary">Vehicles</Link>
                <Link to="/categories/clothing" className="block py-2 text-gray-600 hover:text-primary">Clothing</Link>
                <Link to="/categories/tools" className="block py-2 text-gray-600 hover:text-primary">Tools</Link>
                <Link to="/categories/toys" className="block py-2 text-gray-600 hover:text-primary">Toys & Games</Link>
                <Link to="/categories/sports" className="block py-2 text-gray-600 hover:text-primary">Sports Equipment</Link>
                <Link to="/categories" className="block py-2 text-primary font-medium">View All Categories →</Link>
              </div>
            </div>
            
            <Link to="/post-add" 
              className="flex items-center px-3 py-4 rounded-md text-base font-medium text-white bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-all duration-300 transform hover:scale-[1.02] hover:translate-x-1"
              onClick={() => setIsMenuOpen(false)}
            >
              <FilePlus className="h-5 w-5 mr-3 transition-transform hover:rotate-12" />
              <span>Post Ad</span>
            </Link>
            <Link to="/my-bookings" 
              className="flex items-center px-3 py-4 rounded-md text-base font-medium text-textdark hover:text-secondary hover:bg-secondary/5 transition-all duration-300 transform hover:translate-x-1"
              onClick={() => setIsMenuOpen(false)}
            >
              <BookOpen className="h-5 w-5 mr-3 transition-transform hover:rotate-12" />
              <span>My Bookings</span>
            </Link>
            <Link to="/messages" 
              className="flex items-center px-3 py-4 rounded-md text-base font-medium text-textdark hover:text-accent hover:bg-accent/5 transition-all duration-300 transform hover:translate-x-1"
              onClick={() => setIsMenuOpen(false)}
            >
              <MessageSquare className="h-5 w-5 mr-3 transition-transform hover:rotate-12" />
              <span>Messages</span>
            </Link>
            <Link to="/login" 
              className="flex items-center px-3 py-4 rounded-md text-base font-medium text-secondary hover:bg-secondary hover:text-white transition-all duration-300 transform hover:translate-x-1"
              onClick={() => setIsMenuOpen(false)}
            >
              <User className="h-5 w-5 mr-3 transition-transform" />
              <span>Login / Sign up</span>
            </Link>

            <div className="mt-auto p-4 text-center">
              <p className="text-sm text-gray-500">© 2023 Rentit. All rights reserved.</p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
