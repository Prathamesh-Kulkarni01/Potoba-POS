"use client";
import CustomGiftsMarketplace from "@/components/Home";
import GiftMarketplace from "@/components/Home";
import GiftWebsite from "@/components/Vendor";
import SEOHead from "@/seo/Head";
import { useState, useEffect } from "react";

const Page = () => {
  const [tenants, setTenants] = useState({}); // Stores tenant data
  const [tenantName, setTenantName] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [isLoading, setIsLoading] = useState(true); // To handle loading state

  // Fetch the subdomain from the custom header set by middleware
  useEffect(() => {
    const fetchSubdomain = async () => {
      setIsLoading(true); // Start loading
      try {
        const response = await fetch("/");
        const subdomainHeader = response.headers.get("x-subdomain");
        console.log({ subdomainHeader });
        setSubdomain(subdomainHeader || ""); // Default to empty string if no subdomain
      } catch (error) {
        console.error("Error fetching subdomain:", error);
      } finally {
        setIsLoading(false); // End loading
      }
    };

    fetchSubdomain();
  }, []);

  // Function to create a new tenant
  const createTenant = () => {
    if (!tenantName || tenants[tenantName]) {
      alert("Tenant name is invalid or already exists.");
      return;
    }
    setTenants((prev) => ({ ...prev, [tenantName]: { name: tenantName } }));
    setTenantName(""); // Reset tenant name after creation
  };

  // Render the vendor's page for the tenant (subdomain)
  const renderTenantPage = (tenant) => {
    return (
      <div>
        <h1>Welcome to {tenant}!</h1>
        <p>This is the vendor-specific page for {tenant}.</p>
        <a href="/">Go Back</a>
      </div>
    );
  };

  // Render the main e-commerce homepage
  // const renderMainAppHomepage = () => {
  //   return (
  //     <div>
  //       <h1>Welcome to Our E-Commerce Application</h1>
  //       <p>Explore the best products and offers!</p>
  //       <div>
  //         <h2>Create a New Tenant</h2>
  //         <div>
  //           <input
  //             type="text"
  //             placeholder="Enter tenant name"
  //             value={tenantName}
  //             onChange={(e) => setTenantName(e.target.value)}
  //           />
  //           <button onClick={createTenant}>Create Tenant</button>
  //         </div>
  //         <h2>Existing Tenants</h2>
  //         <ul>
  //           {Object.keys(tenants).length > 0 ? (
  //             Object.keys(tenants).map((name) => (
  //               <li key={name}>
  //                 <a href={`http://${name}.${baseUrl}`}>{name}</a>
  //               </li>
  //             ))
  //           ) : (
  //             <p>No tenants available. Create one above.</p>
  //           )}
  //         </ul>
  //       </div>
  //     </div>
  //   );
  // };



  const renderGiftHomepage = () => {
    return (
      <div className="bg-gradient-to-r from-purple-700 via-indigo-800 to-purple-900 min-h-screen flex flex-col">
        {/* Header */}
        <header className="text-white p-6 flex justify-between items-center shadow-xl">
          <div className="text-3xl font-extrabold tracking-wide">
            <span className="text-pink-400">Giftify</span>
          </div>
          <nav>
            <ul className="flex space-x-8">
              <li>
                <a href="#" className="text-lg hover:text-purple-300 transition duration-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-purple-300 transition duration-300">
                  Shop
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-purple-300 transition duration-300">
                  Occasions
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-purple-300 transition duration-300">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </header>
  
        {/* Hero Section */}
        <section className="bg-cover bg-center text-white p-20 flex items-center justify-center" style={{ backgroundImage: "url('https://via.placeholder.com/1200x800?text=Gift+Store')" }}>
          <div className="text-center space-y-8">
            <h1 className="text-5xl font-extrabold leading-tight">
              Find the Perfect Gift for Every Occasion
            </h1>
            <p className="text-xl">Specially curated gifts for birthdays, weddings, holidays, and more.</p>
            <button className="bg-purple-600 px-10 py-4 text-xl rounded-lg text-white hover:bg-purple-700 transition duration-300">
              Shop Now
            </button>
          </div>
        </section>
  
        {/* Featured Gifts Section */}
        <section className="p-12 bg-purple-100">
          <h2 className="text-3xl font-semibold text-center text-purple-900 mb-10">Featured Gifts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg transform transition hover:scale-105 hover:shadow-2xl">
                <img src={`https://via.placeholder.com/250?text=Gift+${index + 1}`} alt="Gift" className="w-full h-40 object-cover rounded-lg" />
                <h3 className="text-xl font-semibold text-center text-purple-800 mt-4">Gift {index + 1}</h3>
                <p className="text-center text-gray-600">$39.99</p>
                <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>
  
        {/* Occasions Section */}
        <section className="p-12 bg-indigo-700">
          <h2 className="text-3xl font-semibold text-center text-white mb-10">Gifts for Every Occasion</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {["Birthdays", "Weddings", "Anniversaries", "Christmas", "Valentine's Day", "New Year"].map((occasion) => (
              <div key={occasion} className="bg-white p-6 rounded-lg shadow-lg transform transition hover:scale-105 hover:shadow-2xl">
                <h3 className="text-xl font-semibold text-center text-purple-800">{occasion}</h3>
                <p className="text-center text-gray-600">Special gifts curated for this occasion</p>
                <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300">
                  Shop Now
                </button>
              </div>
            ))}
          </div>
        </section>
  
        {/* Best Sellers Section */}
        <section className="p-12 bg-purple-600">
          <h2 className="text-3xl font-semibold text-center text-white mb-10">Best Sellers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg transform transition hover:scale-105 hover:shadow-2xl">
                <img src={`https://via.placeholder.com/250?text=Best+Seller+${index + 1}`} alt="Best Seller" className="w-full h-40 object-cover rounded-lg" />
                <h3 className="text-xl font-semibold text-center text-purple-800 mt-4">Best Seller {index + 1}</h3>
                <p className="text-center text-gray-600">$29.99</p>
                <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>
  
        {/* Footer */}
        <footer className="bg-purple-800 text-white text-center p-6">
          <p>&copy; 2024 Giftify. All rights reserved.</p>
          <p>Designed with 💖 by Your Team</p>
        </footer>
      </div>
    );
  };
  
 
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "localhost:3000";

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state until subdomain is fetched
  }

  return (
    <div className="">
      <SEOHead/>
      {subdomain ? (
        <GiftWebsite name={subdomain}/> // Render tenant page if subdomain exists
      ) : (
        // renderGiftHomepage() // Otherwise, render main e-commerce homepage
        <GiftMarketplace/>
      )}
    </div>
  );
};

export default Page;
