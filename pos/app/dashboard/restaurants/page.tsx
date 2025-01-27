'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
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
import { useUser } from '@/hooks/useUser';
import { Restaurant } from '@/types/backendEntity';
import { toast } from 'sonner';
import PageContainer from '@/components/layout/page-container';

const RestaurantDashboard = () => {
  const router = useRouter();
  const { user, updateUser } = useUser();
  const userId = user?._id;

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState('closed');
  const [contactNumber, setContactNumber] = useState('');
  const [businessHoursOpen, setBusinessHoursOpen] = useState('');
  const [businessHoursClose, setBusinessHoursClose] = useState('');

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRestaurants = useCallback(async () => {
    if (userId) {
      try {
        const data = await listRestaurants();
        console.log({ data });
        setRestaurants(data);
      } catch (error) {
        toast.error('Error fetching restaurants.');
        console.error('Error fetching restaurants:', error);
      }
    }
  }, [userId]);

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  const resetForm = () => {
    setName('');
    setAddress('');
    setStatus('closed');
    setContactNumber('');
    setBusinessHoursOpen('');
    setBusinessHoursClose('');
  };

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
        await fetchRestaurants();
        setIsDialogOpen(false);
        resetForm();
        toast.success('Restaurant created successfully.');
      } else {
        toast.error('Failed to create restaurant.');
        throw new Error('Failed to create restaurant');
      }
    } catch (error) {
      console.error('Error creating restaurant:', error);
      toast.error('Error creating restaurant. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectRestaurant = async (selectedRestaurant: string) => {
    console.log({user})
    if (userId) {
      try {
        const res = await updateProfile(userId, { id:selectedRestaurant?._id });
        if (res) {
          updateUser(res);
          router.push('/dashboard');
          toast.success('Restaurant selected successfully.');
        } else {
          toast.error('Failed to select restaurant.');
          throw new Error('Failed to select restaurant');
        }
      } catch (error) {
        console.error('Error selecting restaurant:', error);
        toast.error('Error selecting restaurant. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen overflow-auto bg-gradient-to-b from-background to-muted">
      <PageContainer scrollable>
        <div>
          <div className="mb-8">
            <h2 className="mb-2 text-3xl font-bold text-foreground">
              Your Restaurants
            </h2>
            <p className="mb-6 text-muted-foreground">
              Select a restaurant to manage operations
            </p>
          </div>

          <div className="flex flex-wrap gap-6 overflow-auto">
            <Card
              className="group w-[320px] cursor-pointer border-2 border-dashed border-muted-foreground bg-card/50 transition-all duration-300 hover:border-primary hover:shadow-xl"
              onClick={() => setIsDialogOpen(true)}
            >
              <CardContent className="flex h-full min-h-[300px] flex-col items-center justify-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                  <PlusCircle className="h-10 w-10 text-primary" />
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-foreground">
                  Add New Restaurant
                </h3>
                <p className="max-w-xs text-center text-muted-foreground">
                  Start managing a new location and grow your business
                </p>
              </CardContent>
            </Card>

            {restaurants?.map((restaurant) => (
              <Card
                key={restaurant._id!}
                className="group h-[300px] w-full overflow-hidden bg-card transition-all duration-300 hover:shadow-xl sm:w-[320px]"
                onClick={() => handleSelectRestaurant(restaurant._id)}
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
                <CardContent className="pb-3 pt-2  bg-muted">
                  <h3 className="mb-2 text-center text-2xl font-semibold ">
                    {restaurant.name}g
                  </h3>
                </CardContent>
                <CardFooter className="bg-muted">
                  <Button className="hover:bg-primary-dark w-full bg-primary">
                    <Store className="mr-2 h-4 w-4" />
                    Manage Restaurant
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </PageContainer>
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
                className="hover:bg-primary-dark bg-primary"
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
