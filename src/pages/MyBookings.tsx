
import React from 'react';
import Navbar from '@/components/Navbar';

const MyBookings = () => {
  return (
    <div className="min-h-screen bg-appbg">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-textdark mb-6">My Bookings</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-textdark">Bookings list will be implemented here.</p>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
