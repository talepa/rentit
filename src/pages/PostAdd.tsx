
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Image, MapPin, Plus, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface PostAddFormData {
  title: string;
  description: string;
  price: number;
  rentalPeriod: 'hour' | 'day' | 'week' | 'month';
  category: string;
  location: string;
}

const PostAdd = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<PostAddFormData>();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('day');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    setSelectedImages([...selectedImages, ...newFiles]);
    
    // Create image preview URLs
    const newImageUrls = newFiles.map(file => URL.createObjectURL(file));
    setImagePreviewUrls([...imagePreviewUrls, ...newImageUrls]);
  };

  const removeImage = (index: number) => {
    // Release object URL to avoid memory leaks
    URL.revokeObjectURL(imagePreviewUrls[index]);
    
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
    setImagePreviewUrls(imagePreviewUrls.filter((_, i) => i !== index));
  };

  const onSubmit = (data: PostAddFormData) => {
    setIsSubmitting(true);
    
    // Merge form data with selected images and other values
    const formData = {
      ...data,
      rentalPeriod: selectedPeriod,
      category: selectedCategory,
      images: selectedImages,
    };
    
    console.log('Form submitted:', formData);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Add posted successfully",
        description: "Your item is now listed and available for rent",
      });
      navigate('/my-listings');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-appbg">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-textdark">Post the Add</h1>
          <Button variant="outline" onClick={() => navigate('/my-listings')}>
            My Listings
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-primary/20 to-primary/5 border-b">
            <h2 className="text-xl font-medium text-textdark">Item Details</h2>
            <p className="text-sm text-gray-600">Provide information about what you're offering for rent</p>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
                <Input 
                  id="title" 
                  {...register('title', { required: true })} 
                  placeholder="Enter product title" 
                  className={errors.title ? "border-red-500" : ""}
                />
                {errors.title && <p className="text-red-500 text-xs">Title is required</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category <span className="text-red-500">*</span></Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="vehicles">Vehicles</SelectItem>
                    <SelectItem value="tools">Tools</SelectItem>
                    <SelectItem value="homestay">Home & Stay</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="services">Services</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description <span className="text-red-500">*</span></Label>
              <Textarea 
                id="description" 
                {...register('description', { required: true })} 
                placeholder="Describe your product in detail" 
                className={`min-h-[120px] ${errors.description ? "border-red-500" : ""}`}
              />
              {errors.description && <p className="text-red-500 text-xs">Description is required</p>}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="price">Price <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5">$</span>
                  <Input 
                    id="price" 
                    type="number" 
                    step="0.01"
                    min="0"
                    {...register('price', { required: true, min: 0 })} 
                    placeholder="0.00" 
                    className={`pl-7 ${errors.price ? "border-red-500" : ""}`}
                  />
                </div>
                {errors.price && <p className="text-red-500 text-xs">Valid price is required</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rentalPeriod">Rental Period <span className="text-red-500">*</span></Label>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hour">Per Hour</SelectItem>
                    <SelectItem value="day">Per Day</SelectItem>
                    <SelectItem value="week">Per Week</SelectItem>
                    <SelectItem value="month">Per Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location <span className="text-red-500">*</span></Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input 
                  id="location" 
                  {...register('location', { required: true })} 
                  placeholder="Enter location" 
                  className={`pl-10 ${errors.location ? "border-red-500" : ""}`}
                />
              </div>
              {errors.location && <p className="text-red-500 text-xs">Location is required</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="images">Product Images <span className="text-red-500">*</span></Label>
              <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6">
                {imagePreviewUrls.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                    {imagePreviewUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={url} 
                          alt={`Preview ${index}`} 
                          className="h-24 w-full object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                    <label 
                      htmlFor="images" 
                      className="flex flex-col items-center justify-center h-24 rounded-md border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50"
                    >
                      <Plus className="h-6 w-6 text-gray-400" />
                      <span className="text-xs text-gray-500 mt-1">Add more</span>
                    </label>
                  </div>
                ) : (
                  <label htmlFor="images" className="flex flex-col items-center justify-center cursor-pointer">
                    <Image className="mx-auto h-12 w-12 text-gray-400" />
                    <span className="mt-2 block text-sm font-medium text-gray-600">
                      Click to upload images
                    </span>
                    <span className="mt-1 block text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </span>
                  </label>
                )}
                <Input
                  id="images"
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
              {imagePreviewUrls.length === 0 && (
                <p className="text-amber-600 text-xs">At least one image is recommended</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="h-5 w-5 border-2 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mr-2"></div>
                  <span>Posting...</span>
                </div>
              ) : "Post the Add"}
            </Button>
          </form>
        </div>
        
        {/* Owner's Listings Management Preview Section */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-medium text-textdark">My Listings</h2>
              <Button variant="outline" size="sm" onClick={() => navigate('/my-listings')}>
                View All
              </Button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              After posting, you'll be able to track your rentals, manage bookings, and communicate with renters from your dashboard.
            </p>
            
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
                <div className="h-24 bg-gray-200 flex items-center justify-center">
                  <Image className="h-8 w-8 text-gray-400" />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium">Track rentals</h3>
                  <p className="text-xs text-gray-500">Monitor who is renting your items</p>
                </div>
              </div>
              
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
                <div className="h-24 bg-gray-200 flex items-center justify-center">
                  <Image className="h-8 w-8 text-gray-400" />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium">Manage bookings</h3>
                  <p className="text-xs text-gray-500">Accept or decline rental requests</p>
                </div>
              </div>
              
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
                <div className="h-24 bg-gray-200 flex items-center justify-center">
                  <Image className="h-8 w-8 text-gray-400" />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium">Earnings</h3>
                  <p className="text-xs text-gray-500">Track your rental income</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PostAdd;
