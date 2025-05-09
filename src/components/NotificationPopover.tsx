
import React from 'react';
import { Bell } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from '@/components/ui/button';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const NotificationPopover = () => {
  // Mock notifications data
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: '1',
      title: 'New Message',
      message: 'You have a new message from John regarding the camera',
      time: '2 minutes ago',
      read: false
    },
    {
      id: '2',
      title: 'Booking confirmed',
      message: 'Your booking for the Electric Scooter has been confirmed',
      time: '1 hour ago',
      read: false
    },
    {
      id: '3',
      title: 'Payment received',
      message: 'You received $45 for the DSLR Camera rental',
      time: 'Yesterday',
      read: true
    },
    {
      id: '4',
      title: 'Reminder',
      message: 'Your rental of Camping Tent ends tomorrow',
      time: '2 days ago',
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-xs text-white animate-pulse">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-h-[400px]">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-medium">Notifications</h3>
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={markAllAsRead}
                className="text-xs hover:bg-primary/10"
              >
                Mark all as read
              </Button>
            )}
          </div>
          <div className="overflow-y-auto max-h-[300px]">
            {notifications.length > 0 ? (
              <div className="divide-y">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-3 hover:bg-gray-50 cursor-pointer transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex justify-between">
                      <h4 className="text-sm font-medium">{notification.title}</h4>
                      <span className="text-xs text-gray-500">{notification.time}</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                    {!notification.read && (
                      <span className="inline-flex ml-1 h-2 w-2 rounded-full bg-primary"></span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500">
                <p>No notifications</p>
              </div>
            )}
          </div>
          <div className="border-t p-2">
            <Button variant="outline" size="sm" className="w-full text-xs">
              View all notifications
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationPopover;
