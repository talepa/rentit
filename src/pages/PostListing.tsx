
import React from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { FilePenLine, Image, Check, AlertCircle } from 'lucide-react';

const PostListing = () => {
  return (
    <div className="min-h-screen bg-[#F1F0FB]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-textdark mb-6 relative inline-block">
          Post a Listing
          <div className="absolute -bottom-1 left-0 h-3 w-1/2 bg-secondary/20 rounded-full -z-[1] transition-all duration-500"></div>
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium text-textdark">Listing Title</label>
                <input 
                  type="text" 
                  id="title" 
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                  placeholder="Enter a catchy title for your listing"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium text-textdark">Category</label>
                <select 
                  id="category" 
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                >
                  <option value="">Select a category</option>
                  <option value="electronics">Electronics</option>
                  <option value="furniture">Furniture</option>
                  <option value="appliances">Appliances</option>
                  <option value="clothing">Clothing</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="price" className="text-sm font-medium text-textdark">Daily Rental Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input 
                    type="number" 
                    id="price" 
                    className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium text-textdark">Description</label>
                <textarea 
                  id="description" 
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                  placeholder="Describe your item in detail"
                ></textarea>
              </div>
            </div>
            
            <div className="space-y-6 animate-fade-in" style={{animationDelay: '0.2s'}}>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center hover:border-secondary transition-colors cursor-pointer h-48">
                <Image className="h-12 w-12 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 text-center">
                  Drag and drop images here, or click to select files
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  (Maximum 5 images, 5MB each)
                </p>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-medium text-textdark">Location</label>
                <input 
                  type="text" 
                  id="location" 
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                  placeholder="Enter your location"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="availability" className="text-sm font-medium text-textdark">Availability</label>
                <select 
                  id="availability" 
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                >
                  <option value="always">Always Available</option>
                  <option value="weekdays">Weekdays Only</option>
                  <option value="weekends">Weekends Only</option>
                  <option value="custom">Custom Schedule</option>
                </select>
              </div>
              
              <div className="pt-4">
                <div className="flex items-start mb-4">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-secondary"
                    />
                  </div>
                  <label htmlFor="terms" className="ml-2 text-xs text-gray-600">
                    I agree to the Terms and Conditions and understand my responsibilities as a lender
                  </label>
                </div>
                
                <Button 
                  className="w-full py-6 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md text-white font-bold text-lg rounded-md"
                >
                  <FilePenLine className="mr-2 h-5 w-5 animate-pulse-subtle" />
                  Post Listing
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-6 bg-[#D3E4FD]/30 p-4 rounded-md">
            <div className="flex space-x-2">
              <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-textdark">Listing Tips</h3>
                <ul className="mt-1 text-xs text-gray-500 space-y-1">
                  <li className="flex items-center">
                    <Check className="h-3 w-3 text-secondary mr-1" />
                    Add clear, high-quality photos from different angles
                  </li>
                  <li className="flex items-center">
                    <Check className="h-3 w-3 text-secondary mr-1" />
                    Be detailed in your description (condition, dimensions, features)
                  </li>
                  <li className="flex items-center">
                    <Check className="h-3 w-3 text-secondary mr-1" />
                    Set a competitive daily rate based on your item's value
                  </li>
                  <li className="flex items-center">
                    <Check className="h-3 w-3 text-secondary mr-1" />
                    Respond quickly to rental requests to improve your listing rank
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostListing;
