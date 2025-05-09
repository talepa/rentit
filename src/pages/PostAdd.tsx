
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { FilePlus, Upload, Check, Camera, MapPin, Calendar, DollarSign, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import LocationMap from '@/components/LocationMap';
import { useToast } from '@/hooks/use-toast';

const PostAdd = () => {
  const [activeStep, setActiveStep] = useState('details');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    price: '',
    location: '',
    availableFrom: '',
    availableTo: '',
    features: {
      delivery: false,
      insurance: false,
      discount: false,
    }
  });
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      for (let i = 0; i < Math.min(files.length, 5); i++) {
        const url = URL.createObjectURL(files[i]);
        newImages.push(url);
      }
      setSelectedImages([...selectedImages, ...newImages].slice(0, 5));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (checked: boolean, name: keyof typeof formData.features) => {
    setFormData({
      ...formData,
      features: {
        ...formData.features,
        [name]: checked
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ ...formData, images: selectedImages });
    toast({
      title: "Success!",
      description: "Your ad has been posted successfully.",
      variant: "default",
    });
  };

  const categories = [
    { value: "electronics", label: "Electronics" },
    { value: "vehicles", label: "Vehicles" },
    { value: "clothing", label: "Clothing" },
    { value: "tools", label: "Tools" },
    { value: "toys", label: "Toys & Games" },
    { value: "sports", label: "Sports Equipment" },
    { value: "home", label: "Home & Garden" },
    { value: "other", label: "Other" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="bg-appbg min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-primary relative inline-block">
            Post Your Ad
            <span className="absolute -z-10 bottom-0 left-0 h-3 w-full bg-primary/10 rounded-full"></span>
          </h1>
          <p className="text-gray-600 mt-2 max-w-md mx-auto">
            Rent out your items and earn money. It's quick and easy!
          </p>
        </motion.div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <Tabs defaultValue="details" className="w-full" onValueChange={setActiveStep}>
            <div className="bg-primary/5 px-4 py-3">
              <TabsList className="grid grid-cols-3 w-full bg-white">
                <TabsTrigger value="details" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 mr-2" />
                    <span>Details</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="images" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  <div className="flex items-center">
                    <Camera className="h-4 w-4 mr-2" />
                    <span>Images</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="location" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>Location</span>
                  </div>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <form onSubmit={handleSubmit}>
              <TabsContent value="details">
                <div className="p-6">
                  <motion.div 
                    className="grid gap-6 md:grid-cols-2"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div variants={itemVariants}>
                      <Label htmlFor="title" className="text-sm font-medium text-gray-700 mb-1 block">
                        Title
                      </Label>
                      <Input 
                        id="title"
                        name="title"
                        placeholder="Enter a descriptive title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full"
                        required
                      />
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                      <Label htmlFor="category" className="text-sm font-medium text-gray-700 mb-1 block">
                        Category
                      </Label>
                      <Select 
                        onValueChange={(value) => handleSelectChange("category", value)}
                        value={formData.category}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="md:col-span-2">
                      <Label htmlFor="description" className="text-sm font-medium text-gray-700 mb-1 block">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Describe your item in detail"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="min-h-32 resize-none"
                        required
                      />
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                      <Label htmlFor="price" className="text-sm font-medium text-gray-700 mb-1 block">
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1 text-gray-400" />
                          <span>Price (per day)</span>
                        </div>
                      </Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                      />
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="space-y-3">
                      <Label className="text-sm font-medium text-gray-700 block">
                        Features
                      </Label>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="delivery" 
                          checked={formData.features.delivery}
                          onCheckedChange={(checked) => handleCheckboxChange(checked as boolean, "delivery")}
                        />
                        <Label htmlFor="delivery" className="text-sm text-gray-600 cursor-pointer">
                          Offers delivery
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="insurance" 
                          checked={formData.features.insurance}
                          onCheckedChange={(checked) => handleCheckboxChange(checked as boolean, "insurance")}
                        />
                        <Label htmlFor="insurance" className="text-sm text-gray-600 cursor-pointer">
                          Insurance included
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="discount" 
                          checked={formData.features.discount}
                          onCheckedChange={(checked) => handleCheckboxChange(checked as boolean, "discount")}
                        />
                        <Label htmlFor="discount" className="text-sm text-gray-600 cursor-pointer">
                          Offers discount for long-term
                        </Label>
                      </div>
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                      <Label htmlFor="availableFrom" className="text-sm font-medium text-gray-700 mb-1 block">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                          <span>Available From</span>
                        </div>
                      </Label>
                      <Input
                        id="availableFrom"
                        name="availableFrom"
                        type="date"
                        value={formData.availableFrom}
                        onChange={handleInputChange}
                      />
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                      <Label htmlFor="availableTo" className="text-sm font-medium text-gray-700 mb-1 block">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                          <span>Available To</span>
                        </div>
                      </Label>
                      <Input
                        id="availableTo"
                        name="availableTo"
                        type="date"
                        value={formData.availableTo}
                        onChange={handleInputChange}
                      />
                    </motion.div>
                  </motion.div>
                  
                  <div className="mt-8 flex justify-end">
                    <Button 
                      type="button" 
                      onClick={() => setActiveStep('images')}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Continue to Images
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="images">
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Upload Images</h3>
                    <p className="text-sm text-gray-500">
                      Add up to 5 images. First image will be the cover (maximum size: 5MB each).
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-6">
                    <div className="flex justify-center">
                      <Label 
                        htmlFor="image-upload"
                        className="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                      >
                        <div className="text-center">
                          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-base font-medium text-gray-700">Click to upload</p>
                          <p className="text-sm text-gray-500">or drag and drop</p>
                          <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP up to 5MB</p>
                        </div>
                        <Input 
                          id="image-upload" 
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          multiple
                          onChange={handleImageChange}
                        />
                      </Label>
                    </div>
                    
                    {selectedImages.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Images</h4>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                          {selectedImages.map((image, index) => (
                            <div key={index} className="relative group">
                              <img 
                                src={image}
                                alt={`Preview ${index + 1}`}
                                className="h-32 w-full object-cover rounded-md"
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-md">
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => setSelectedImages(selectedImages.filter((_, i) => i !== index))}
                                >
                                  Remove
                                </Button>
                              </div>
                              {index === 0 && (
                                <span className="absolute top-1 left-1 bg-primary text-white text-xs px-2 py-1 rounded-md">
                                  Cover
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-8 flex justify-between">
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => setActiveStep('details')}
                    >
                      Back
                    </Button>
                    <Button 
                      type="button"
                      onClick={() => setActiveStep('location')}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Continue to Location
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="location">
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Location</h3>
                    <p className="text-sm text-gray-500">
                      Enter your location or select it on the map.
                    </p>
                  </div>
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <Label htmlFor="location" className="text-sm font-medium text-gray-700 mb-1 block">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                          <span>Address</span>
                        </div>
                      </Label>
                      <Input
                        id="location"
                        name="location"
                        placeholder="Enter your address"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="mb-4"
                        required
                      />
                      
                      <div className="text-sm text-gray-500 space-y-2">
                        <p>Your exact address will not be shared with renters until you confirm the booking.</p>
                        <p>Only the general area will be displayed on your listing.</p>
                      </div>
                    </div>
                    
                    <div className="h-60 md:h-auto rounded-md overflow-hidden border border-gray-200">
                      <LocationMap />
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-between">
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => setActiveStep('images')}
                    >
                      Back
                    </Button>
                    <Button 
                      type="submit"
                      className="bg-primary hover:bg-primary/90 flex items-center"
                    >
                      <FilePlus className="h-4 w-4 mr-2" />
                      Post Ad
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </form>
          </Tabs>
        </div>
        
        <div className="mt-8 bg-primary/5 rounded-lg p-6">
          <h3 className="text-lg font-medium text-primary mb-4">Posting Tips</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Check className="h-5 w-5 text-green-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-700">
                  <strong>Be descriptive:</strong> Include details about condition, specifications, and features.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Check className="h-5 w-5 text-green-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-700">
                  <strong>Quality images:</strong> Take clear photos in good lighting from multiple angles.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Check className="h-5 w-5 text-green-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-700">
                  <strong>Fair pricing:</strong> Research similar items to set a competitive daily rate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostAdd;
