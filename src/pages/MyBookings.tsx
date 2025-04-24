
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
        <h1 className="text-3xl font-bold text-textdark mb-6">My Bookings</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {DEMO_BOOKINGS.map((booking) => (
            <Card key={booking.id}>
              <CardHeader>
                <CardTitle className="text-lg">{booking.productName}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <img
                    src={booking.image}
                    alt={booking.productName}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <span className={`absolute top-2 right-2 px-2 py-1 rounded text-sm ${
                    booking.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                  } text-white`}>
                    {booking.status}
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">From: {booking.startDate}</p>
                  <p className="text-sm text-gray-600">To: {booking.endDate}</p>
                  <p className="text-sm text-gray-600">Owner: {booking.owner}</p>
                  <p className="font-semibold">${booking.price}/day</p>
                  <Button variant="outline" className="w-full mt-4" onClick={() => console.log("Message sent")}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message Owner
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
