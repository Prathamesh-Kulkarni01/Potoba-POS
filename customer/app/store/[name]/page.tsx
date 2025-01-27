"use client";

import { useParams } from 'next/navigation';
import { ShoppingBag, Gift, Heart } from 'lucide-react';
import { notFound } from 'next/navigation';

interface StoreData {
  name: string;
  title: string;
  description: string;
  theme: {
    primary: string;
    secondary: string;
  };
  products: Array<{
    id: number;
    name: string;
    price: number;
    image: string;
  }>;
}

const mockStores: Record<string, StoreData> = {
  giftshop: {
    name: 'giftshop',
    title: 'Premium Gift Shop',
    description: 'Curated collection of premium gifts for all occasions',
    theme: {
      primary: '#6D28D9',
      secondary: '#4C1D95',
    },
    products: [
      { id: 1, name: 'Luxury Watch', price: 299.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30' },
      { id: 2, name: 'Leather Wallet', price: 89.99, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93' },
      { id: 3, name: 'Premium Perfume', price: 129.99, image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f' },
    ]
  },
  handmade: {
    name: 'handmade',
    title: 'Handmade Crafts',
    description: 'Unique handcrafted gifts made with love',
    theme: {
      primary: '#059669',
      secondary: '#047857',
    },
    products: [
      { id: 1, name: 'Handwoven Scarf', price: 49.99, image: 'https://images.unsplash.com/photo-1481437642641-2f0ae875f836' },
      { id: 2, name: 'Ceramic Vase', price: 79.99, image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61' },
      { id: 3, name: 'Wooden Box', price: 39.99, image: 'https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51' },
    ]
  },
  luxury: {
    name: 'luxury',
    title: 'Luxury Gifts',
    description: 'Exclusive luxury gifts for special occasions',
    theme: {
      primary: '#B91C1C',
      secondary: '#991B1B',
    },
    products: [
      { id: 1, name: 'Diamond Necklace', price: 999.99, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338' },
      { id: 2, name: 'Gold Watch', price: 1299.99, image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49' },
      { id: 3, name: 'Designer Bag', price: 799.99, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3' },
    ]
  }
};

export default function StorePage() {
  const params = useParams();
  const storeName = typeof params?.name === 'string' ? params.name : '';
  const store = mockStores[storeName];

  if (!store) {
    notFound();
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: `${store.theme.primary}10` }}>
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: store.theme.primary }}>
                {store.title}
              </h1>
              <p className="mt-1 text-gray-600">{store.description}</p>
            </div>
            <div className="flex space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Heart className="h-6 w-6 text-gray-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <ShoppingBag className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {store.products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-w-3 aspect-h-2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold" style={{ color: store.theme.primary }}>
                  {product.name}
                </h3>
                <p className="mt-2 text-gray-600">${product.price.toFixed(2)}</p>
                <button
                  className="mt-4 w-full py-2 px-4 rounded-md text-white flex items-center justify-center space-x-2"
                  style={{ backgroundColor: store.theme.primary }}
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-500">
            © 2024 {store.title}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}