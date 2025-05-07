
import React from 'react';
import Navbar from '@/components/Navbar';

const PostListing = () => {
  return (
    <div className="min-h-screen bg-appbg">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-textdark mb-6 relative inline-block">
          Post a Listing
          <div className="absolute -bottom-1 left-0 h-3 w-1/2 bg-primary/10 rounded-full -z-[1] transition-all duration-500"></div>
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300">
          <p className="text-textdark">Post listing form will be implemented here.</p>
        </div>
      </div>
    </div>
  );
};

export default PostListing;
