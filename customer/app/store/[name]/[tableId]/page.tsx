"use client";

import { useParams } from 'next/navigation';
import { ShoppingBag, Gift, Heart } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getData } from '@/lib/api';
type Product={
    id: number;
    name: string;
    price: number;
    image: string;
  }
type Products=Array<Product>;
interface StoreData {
  name: string;
  title: string;
  description: string;
  theme: {
    primary: string;
    secondary: string;
  };
  products: Products
}

export default function StorePage() {
  const params = useParams();
  const storeName = typeof params?.name === 'string' ? params.name : '';
  const tableId = typeof params?.tableId === 'string' ? params.tableId : '';
  const store = getData(storeName)

  if (!store) {
    notFound();
  }

  const handleAddToCart=(product:Product)=>{
    const name=product.name;
    console.log(`${name} added to cart for tableId:`,tableId);
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
                onClick={()=>handleAddToCart(product)}
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