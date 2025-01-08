/* eslint-disable no-console */
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { listRestaurants, createRestaurant } from '@/lib/api/restaurants';
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem } from '@/components/ui/select';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { updateProfile } from '@/lib/api/auth';

import {
  PlusCircle,
  Store,
  Users,
  TrendingUp,
  Settings,
  IndianRupeeIcon
} from 'lucide-react';

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';

const RestaurantDashboard = () => {
  // const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id;

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
          if (data.length > 3) {
            data.length = 3;
          }
          setRestaurants(data);
        } catch (error) {
          // eslint-disable-next-line no-console
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
  const handleCreateRestaurant = async (e: any) => {
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
        businessHoursClose
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
  const handleSelectRestaurant = async (restaurantId: string) => {
    if (userId) {
      try {
        const res = await updateProfile(userId, {
          selectedRestaurant: restaurantId
        });

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
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section */}
      <div className="bg-orange-500 py-8 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="mb-4 text-5xl font-bold">Welcome to Potoba</h1>
            <p className="mb-8 text-xl text-orange-100">
              Manage all your restaurants in one place. Streamline operations,
              boost revenue, and deliver exceptional dining experiences.
            </p>
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

      <div className="container mx-auto overflow-auto px-4 py-8">
        {/* Stats Overview */}
        {/* Stats Cards with Animation */}
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-4">
          <Card className="bg-white/80 backdrop-blur transition-all hover:shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="rounded-lg bg-green-100 p-3">
                  <Store className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-zinc-600">Active Restaurants</p>
                  <h3 className="text-2xl font-bold text-zinc-900">
                    {restaurants.filter((r) => r.status === 'open').length}
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur transition-all hover:shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="rounded-lg bg-blue-100 p-3">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-zinc-600">Total Staff</p>
                  <h3 className="text-2xl font-bold text-zinc-900">124</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur transition-all hover:shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="rounded-lg bg-yellow-100 p-3">
                  <IndianRupeeIcon className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-zinc-600">Monthly Revenue</p>
                  <h3 className="text-2xl font-bold text-zinc-900">₹45.2K</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur transition-all hover:shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="rounded-lg bg-purple-100 p-3">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-zinc-600">Growth Rate</p>
                  <h3 className="text-2xl font-bold text-zinc-900">+12.5%</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Restaurants Grid */}
        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-bold text-zinc-900">
            Your Restaurants
          </h2>
          <p className="mb-6 text-zinc-600">
            Select a restaurant to manage operations
          </p>
        </div>

        <div className="flex  gap-6 overflow-auto">
          {/* Add New Restaurant Card */}
          <Card
            className="group w-[340px] cursor-pointer border-2 border-dashed border-zinc-300 bg-white/50 transition-all duration-300 hover:border-orange-300 hover:shadow-xl"
            onClick={() => setIsDialogOpen(true)}
          >
            <CardContent className="flex h-full min-h-[300px] flex-col items-center justify-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 transition-colors duration-300 group-hover:bg-orange-200">
                <PlusCircle className="h-10 w-10 text-orange-600" />
              </div>
              <h3 className="mb-3 text-2xl font-semibold text-zinc-900">
                Add New Restaurant
              </h3>
              <p className="max-w-xs text-center text-zinc-600">
                Start managing a new location and grow your business
              </p>
            </CardContent>
          </Card>

          {/* Existing Restaurant Cards */}
          {restaurants.map((restaurant) => (
            <Card
              key={restaurant.id!}
              className="group h-[300px] w-[340px] overflow-hidden bg-white transition-all duration-300 hover:shadow-xl"
              onClick={() => handleSelectRestaurant(restaurant.id)}
            >
              <CardHeader className="relative p-0 ">
                <Image
                  src="https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?q=80&w=2089&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt={restaurant.name!}
                  width={200}
                  height={200}
                  className="h-[180px] w-full rounded-t-lg object-cover transition-all group-hover:brightness-90"
                />
                <div className="absolute right-2 top-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="bg-white/90 hover:bg-white"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pb-3 pt-2">
                <h3 className="mb-2 text-center text-2xl font-semibold text-zinc-900">
                  {restaurant.name}
                </h3>
              </CardContent>
              <CardFooter className="bg-zinc-50">
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  <Store className="mr-2 h-4 w-4" />
                  Manage Restaurant
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
              Enter your restaurant details below to get started with
              management.
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
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsDialogOpen(false);
                  resetForm();
                }}
              >
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
