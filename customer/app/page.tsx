"use client";

import { useState, useEffect } from "react";
import { ShoppingBag, Gift } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

const Page = () => {
  const [tenants, setTenants] = useState({
    giftshop: { name: 'Gift Shop' },
    handmade: { name: 'Handmade Crafts' },
    luxury: { name: 'Luxury Gifts' }
  });
  const [tenantName, setTenantName] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSubdomain = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/");
        const subdomainHeader = response.headers.get("x-subdomain");
        setSubdomain(subdomainHeader || "");
      } catch (error) {
        console.error("Error fetching subdomain:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubdomain();
  }, []);

  const createTenant = () => {
    if (!tenantName || tenants[tenantName]) {
      alert("Tenant name is invalid or already exists.");
      return;
    }
    setTenants((prev) => ({ ...prev, [tenantName]: { name: tenantName } }));
    setTenantName("");
  };

  const renderMainAppHomepage = () => {
    const baseUrl = process.env.NEXT_PUBLIC_DOMAIN || "localhost:3000";
    const isWebContainer = typeof window !== 'undefined' && window.location.hostname.includes('webcontainer');

    return (
      <div className="min-h-screen bg-gradient-to-r from-purple-700 via-indigo-800 to-purple-900">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-8">
            <div className="flex items-center justify-center mb-8">
              <Gift className="w-12 h-12 text-purple-600 mr-4" />
              <h1 className="text-4xl font-bold text-gray-800">Gift Store Platform</h1>
            </div>
            
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-700 mb-6">Available Stores</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(tenants).map(([key, tenant]) => (
                  <div key={key} className="bg-purple-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold text-purple-800 mb-2">{tenant.name}</h3>
                    {isWebContainer ? (
                      <Link href={`/store/${key}`} className="inline-block">
                        <Button className="w-full bg-purple-600 hover:bg-purple-700">
                          <ShoppingBag className="w-4 h-4 mr-2" />
                          Visit Store
                        </Button>
                      </Link>
                    ) : (
                      <a href={`http://${key}.${baseUrl}`} className="inline-block w-full">
                        <Button className="w-full bg-purple-600 hover:bg-purple-700">
                          <ShoppingBag className="w-4 h-4 mr-2" />
                          Visit Store
                        </Button>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-8">
              <h2 className="text-2xl font-semibold text-gray-700 mb-6">Create New Store</h2>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Enter store name"
                  value={tenantName}
                  onChange={(e) => setTenantName(e.target.value)}
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <Button onClick={createTenant} className="bg-purple-600 hover:bg-purple-700">
                  Create Store
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div>
      {subdomain ? (
        <h1>Store: {subdomain}</h1>
      ) : (
        renderMainAppHomepage()
      )}
    </div>
  );
};

export default Page;