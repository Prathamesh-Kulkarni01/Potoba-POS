"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { listRestaurants, createRestaurant } from '@/lib/api/restaurants';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem } from '@/components/ui/select';
import { Dialog, DialogOverlay, DialogContent } from '@/components/ui/dialog';
import { updateProfile } from '@/lib/api/auth';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { PlusCircle, Store, MapPin, Clock, Users, TrendingUp, ChefHat, Settings, Phone } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const RestaurantDashboard = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [userId, setUserId] = useState(session?.user?.id);
  
  // Form states
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState('closed');
  const [contactNumber, setContactNumber] = useState('');
  const [businessHoursOpen, setBusinessHoursOpen] = useState('');
  const [businessHoursClose, setBusinessHoursClose] = useState('');
  
  // UI states
  const [restaurants, setRestaurants] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch restaurants on mount and userId change
  useEffect(() => {
    const fetchRestaurants = async () => {
      if (userId) {
        try {
          const data = await listRestaurants();
          setRestaurants(data);
        } catch (error) {
          console.error('Error fetching restaurants:', error);
        }
      }
    };

    fetchRestaurants();
  }, [userId]);

  // Reset form state
  const resetForm = () => {
    setName('');
    setAddress('');
    setStatus('closed');
    setContactNumber('');
    setBusinessHoursOpen('');
    setBusinessHoursClose('');
  };

  // Handle restaurant creation
  const handleCreateRestaurant = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const restaurantData = {
        owner: userId || '',
        name,
        address,
        status,
        contactNumber,
        businessHoursOpen,
        businessHoursClose,
      };

      const res = await createRestaurant(restaurantData);

      if (res) {
        // Refresh restaurants list
        const updatedRestaurants = await listRestaurants();
        setRestaurants(updatedRestaurants);
        
        // Close dialog and reset form
        setIsDialogOpen(false);
        resetForm();
      } else {
        throw new Error('Failed to create restaurant');
      }
    } catch (error) {
      console.error('Error creating restaurant:', error);
      alert('Error creating restaurant. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle restaurant selection
  const handleSelectRestaurant = async (restaurantId) => {
    if (!userId) return;

    try {
      const res = await updateProfile(userId, { selectedRestaurant: restaurantId });
      
      if (res.ok) {
        // Refresh restaurants list to update UI
        const updatedRestaurants = await listRestaurants();
        setRestaurants(updatedRestaurants);
      } else {
        throw new Error('Failed to select restaurant');
      }
    } catch (error) {
      console.error('Error selecting restaurant:', error);
      alert('Error selecting restaurant. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section */}
      <div className="bg-orange-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-4">Welcome to Your Restaurant Hub</h1>
            <p className="text-xl text-orange-100 mb-8">Manage all your restaurants in one place. Streamline operations, boost revenue, and deliver exceptional dining experiences.</p>
            <Button 
              className="bg-white text-orange-900 hover:bg-orange-100"
              onClick={() => setIsDialogOpen(true)}
              disabled={!userId}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Restaurant
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-white/80 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Store className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-zinc-600">Active Restaurants</p>
                  <h3 className="text-2xl font-bold text-zinc-900">
                    {restaurants.filter(r => r.status === 'open').length}
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Restaurants Grid */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-zinc-900 mb-2">Your Restaurants</h2>
          <p className="text-zinc-600 mb-6">Select a restaurant to manage operations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Add New Restaurant Card */}
          <Card 
            className="group hover:shadow-xl transition-all duration-300 border-2 border-dashed border-zinc-300 bg-white/50 hover:border-orange-300 cursor-pointer"
            onClick={() => setIsDialogOpen(true)}
          >
            <CardContent className="flex flex-col items-center justify-center h-full min-h-[400px]">
              <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mb-6 group-hover:bg-orange-200 transition-colors duration-300">
                <PlusCircle className="h-10 w-10 text-orange-600" />
              </div>
              <h3 className="text-2xl font-semibold text-zinc-900 mb-3">Add New Restaurant</h3>
              <p className="text-zinc-600 text-center max-w-xs">Start managing a new location and grow your business</p>
            </CardContent>
          </Card>

          {/* Existing Restaurant Cards */}
          {restaurants.map((restaurant) => (
            <Card 
              key={restaurant.id} 
              className="hover:shadow-xl transition-all duration-300 group bg-white"
              onClick={() => handleSelectRestaurant(restaurant.id)}
            >
              <CardHeader className="p-0 relative">
                <img
                  src="/api/placeholder/400/200"
                  alt={restaurant.name}
                  className="w-full h-48 object-cover rounded-t-lg group-hover:brightness-90 transition-all"
                />
                <div className="absolute top-4 right-4">
                  <Button variant="secondary" size="icon" className="bg-white/90 hover:bg-white">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <CardTitle className="text-2xl mb-2">{restaurant.name}</CardTitle>
                <CardDescription className="text-zinc-600 mb-4">
                  {restaurant.status}
                </CardDescription>
                <div className="space-y-3">
                  <div className="flex items-center text-zinc-600">
                    <MapPin className="h-4 w-4 mr-2 text-orange-600" />
                    <span className="text-sm">{restaurant.address}</span>
                  </div>
                  <div className="flex items-center text-zinc-600">
                    <Clock className="h-4 w-4 mr-2 text-orange-600" />
                    <span className="text-sm">{restaurant.businessHoursOpen} - {restaurant.businessHoursClose}</span>
                  </div>
                  <div className="flex items-center text-zinc-600">
                    <Phone className="h-4 w-4 mr-2 text-orange-600" />
                    <span className="text-sm">{restaurant.contactNumber}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-zinc-50">
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  <Store className="mr-2 h-4 w-4" />
                  Select Restaurant
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Create Restaurant Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Restaurant</DialogTitle>
            <DialogDescription>
              Enter your restaurant details below to get started with management.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateRestaurant}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Restaurant Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter restaurant name"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter restaurant address"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contactNumber">Contact Number</Label>
                <Input
                  id="contactNumber"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  placeholder="Enter contact number"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="businessHoursOpen">Opening Time</Label>
                  <Input
                    id="businessHoursOpen"
                    type="time"
                    value={businessHoursOpen}
                    onChange={(e) => setBusinessHoursOpen(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="businessHoursClose">Closing Time</Label>
                  <Input
                    id="businessHoursClose"
                    type="time"
                    value={businessHoursClose}
                    onChange={(e) => setBusinessHoursClose(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => {
                setIsDialogOpen(false);
                resetForm();
              }}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-orange-600 hover:bg-orange-700"
                disabled={isLoading}
              >
                {isLoading ? 'Creating...' : 'Create Restaurant'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RestaurantDashboard;