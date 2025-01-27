"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useOrderStore } from '@/lib/store';
import { menuItems } from '@/lib/menu-data';
import { Users, UtensilsCrossed, Filter } from 'lucide-react';

export default function TablePage() {
  const params = useParams();
  const tableNumber = typeof params?.number === 'string' ? params.number : '';
  const [groupCode, setGroupCode] = useState('');
  const [userName, setUserName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dietaryFilters, setDietaryFilters] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false
  });

  const store = useOrderStore();

  useEffect(() => {
    if (tableNumber && !store.tableNumber) {
      store.setTableNumber(tableNumber);
    }
  }, [tableNumber, store]);

  const createNewGroup = () => {
    if (!userName) return;
    const newCode = Math.random().toString(36).substring(2, 6).toUpperCase();
    store.setGroupCode(newCode);
    store.addMember(userName);
    setGroupCode(newCode);
  };

  const joinExistingGroup = () => {
    if (!userName || !groupCode) return;
    store.setGroupCode(groupCode.toUpperCase());
    store.addMember(userName);
  };

  const filteredMenu = menuItems.filter(item => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    
    return Object.entries(dietaryFilters).every(([key, value]) => {
      if (!value) return true;
      return item.dietary[key as keyof typeof item.dietary];
    });
  });

  const categories = ['all', ...new Set(menuItems.map(item => item.category))];

  if (!store.groupCode) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Welcome to Table {tableNumber}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <Input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                  className="max-w-xs"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Create New Group</h3>
                  <Button onClick={createNewGroup} disabled={!userName}>
                    <Users className="mr-2 h-4 w-4" />
                    Create Group Order
                  </Button>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Join Existing Group</h3>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      value={groupCode}
                      onChange={(e) => setGroupCode(e.target.value.toUpperCase())}
                      placeholder="Enter 4-digit code"
                      className="max-w-[120px]"
                      maxLength={4}
                    />
                    <Button onClick={joinExistingGroup} disabled={!userName || groupCode.length !== 4}>
                      Join Group
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Table {tableNumber}</h1>
          <p className="text-gray-600">Group Code: {store.groupCode}</p>
        </div>
        <Button variant="outline" onClick={() => store.clearOrder()}>
          Leave Group
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Menu</CardTitle>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={selectedCategory} className="w-full">
                <TabsList className="mb-4">
                  {categories.map(category => (
                    <TabsTrigger
                      key={category}
                      value={category}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value={selectedCategory}>
                  <div className="grid grid-cols-1 gap-4">
                    {filteredMenu.map(item => (
                      <Card key={item.id}>
                        <CardContent className="p-4 flex gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold">{item.name}</h3>
                            <p className="text-sm text-gray-600">{item.description}</p>
                            <div className="mt-2 flex justify-between items-center">
                              <p className="font-semibold">${item.price.toFixed(2)}</p>
                              <Button
                                onClick={() => store.currentMemberId && 
                                  store.addItemToMember(store.currentMemberId, item.id)}
                              >
                                <UtensilsCrossed className="h-4 w-4 mr-2" />
                                Add to Order
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Group Order</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {store.members.map(member => {
                  const memberTotal = member.items.reduce((sum, item) => {
                    const menuItem = menuItems.find(m => m.id === item.menuItemId);
                    return sum + (menuItem?.price || 0) * item.quantity;
                  }, 0);

                  return (
                    <div key={member.id} className="border-b pb-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">{member.name}</h3>
                        <span className="text-sm">${memberTotal.toFixed(2)}</span>
                      </div>
                      {member.items.map(item => {
                        const menuItem = menuItems.find(m => m.id === item.menuItemId);
                        if (!menuItem) return null;

                        return (
                          <div key={item.menuItemId} className="flex justify-between items-center text-sm">
                            <span>{menuItem.name}</span>
                            <span>${menuItem.price.toFixed(2)}</span>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}

                <div className="pt-4">
                  <div className="flex justify-between items-center font-bold">
                    <span>Total</span>
                    <span>
                      ${store.members.reduce((total, member) => {
                        return total + member.items.reduce((sum, item) => {
                          const menuItem = menuItems.find(m => m.id === item.menuItemId);
                          return sum + (menuItem?.price || 0) * item.quantity;
                        }, 0);
                      }, 0).toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button className="w-full mt-4">
                  Place Order
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}