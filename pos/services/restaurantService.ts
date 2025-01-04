// services/restaurantService.ts

export const fetchRestaurantProfile = async (userId: string) => {
    const response = await fetch(`/api/restaurant?userId=${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }
    return response.json();
  };
  
  export const createRestaurantProfile = async (profileData: { name: string; address: string; userId: string }) => {
    const response = await fetch('/api/restaurant', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });
    if (!response.ok) {
      throw new Error('Failed to create profile');
    }
    return response.json();
  };
  