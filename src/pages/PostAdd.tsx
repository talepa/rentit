
import React from 'react';
import { useForm } from 'react-hook-form';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Image } from 'lucide-react';

interface PostAddFormData {
  title: string;
  description: string;
  price: number;
  rentalPeriod: 'hour' | 'day' | 'week' | 'month';
  location: string;
  images: FileList;
}

const PostAdd = () => {
  const { register, handleSubmit } = useForm<PostAddFormData>();

  const onSubmit = (data: PostAddFormData) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-appbg">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-textdark mb-6">Post the Add</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...register('title')} placeholder="Enter product title" className="mt-1" />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...register('description')} placeholder="Describe your product" className="mt-1" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price</Label>
                <Input id="price" type="number" {...register('price')} placeholder="0.00" className="mt-1" />
              </div>
              
              <div>
                <Label htmlFor="rentalPeriod">Rental Period</Label>
                <select {...register('rentalPeriod')} className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2">
                  <option value="hour">Per Hour</option>
                  <option value="day">Per Day</option>
                  <option value="week">Per Week</option>
                  <option value="month">Per Month</option>
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" {...register('location')} placeholder="Enter location" className="mt-1" />
            </div>

            <div>
              <Label htmlFor="images">Product Images</Label>
              <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Input
                  id="images"
                  type="file"
                  multiple
                  accept="image/*"
                  {...register('images')}
                  className="hidden"
                />
                <label htmlFor="images" className="cursor-pointer">
                  <Image className="mx-auto h-12 w-12 text-gray-400" />
                  <span className="mt-2 block text-sm font-medium text-gray-600">
                    Click to upload images
                  </span>
                </label>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Post Add
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostAdd;
