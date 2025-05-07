
import React from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DEMO_BOOKINGS = [
  {
    id: 1,
    productName: "Professional Camera",
    owner: "John Doe",
    startDate: "2024-04-25",
    endDate: "2024-04-27",
    status: "active",
    price: 50,
    image: "/placeholder.svg"
  },
  {
    id: 2,
    productName: "Mountain Bike",
    owner: "Jane Smith",
    startDate: "2024-05-01",
    endDate: "2024-05-03",
    status: "pending",
    price: 30,
    image: "/placeholder.svg"
  }
];

const MyBookings = () => {
  return (
    <div className="min-h-screen bg-appbg">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-textdark mb-6 relative inline-block">
          My Bookings
          <div className="absolute -bottom-1 left-0 h-3 w-1/2 bg-primary/10 rounded-full -z-[1] group-hover:w-full transition-all duration-500"></div>
        </h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {DEMO_BOOKINGS.map((booking, index) => (
            <Card key={booking.id} className="transform transition-all duration-300 hover:shadow-lg hover:scale-[1.02] animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
              <CardHeader>
                <CardTitle className="text-lg relative group">
                  <span className="relative z-10">{booking.productName}</span>
                  <div className="absolute -bottom-1 left-0 h-2 w-0 bg-primary/10 rounded-full -z-0 group-hover:w-full transition-all duration-500"></div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative overflow-hidden rounded-md">
                  <img
                    src={booking.image}
                    alt={booking.productName}
                    className="w-full h-48 object-cover rounded-md mb-4 transform transition-all duration-500 hover:scale-110"
                  />
                  <span className={`absolute top-2 right-2 px-2 py-1 rounded text-sm ${
                    booking.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                  } text-white transform transition-all duration-300 hover:scale-105`}>
                    {booking.status}
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">From: <span className="font-medium">{booking.startDate}</span></p>
                  <p className="text-sm text-gray-600">To: <span className="font-medium">{booking.endDate}</span></p>
                  <p className="text-sm text-gray-600">Owner: <span className="font-medium">{booking.owner}</span></p>
                  <p className="font-semibold">${booking.price}/day</p>
                  <Button variant="outline" className="w-full mt-4 group" onClick={() => console.log("Message sent")}>
                    <MessageSquare className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
                    <span>Message Owner</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
