// "use client";
// import CustomGiftsMarketplace from "@/components/Home";
// import GiftMarketplace from "@/components/Home";
// import GiftWebsite from "@/components/Vendor";
// import SEOHead from "@/seo/Head";
// import { useState, useEffect } from "react";

// const Page = () => {
//   const [tenants, setTenants] = useState({}); // Stores tenant data
//   const [tenantName, setTenantName] = useState("");
//   const [subdomain, setSubdomain] = useState("");
//   const [isLoading, setIsLoading] = useState(true); // To handle loading state

//   // Fetch the subdomain from the custom header set by middleware
//   useEffect(() => {
//     const fetchSubdomain = async () => {
//       setIsLoading(true); // Start loading
//       try {
//         const response = await fetch("/");
//         const subdomainHeader = response.headers.get("x-subdomain");
//         console.log({ subdomainHeader });
//         setSubdomain(subdomainHeader || ""); // Default to empty string if no subdomain
//       } catch (error) {
//         console.error("Error fetching subdomain:", error);
//       } finally {
//         setIsLoading(false); // End loading
//       }
//     };

//     fetchSubdomain();
//   }, []);

//   // Function to create a new tenant
//   const createTenant = () => {
//     if (!tenantName || tenants[tenantName]) {
//       alert("Tenant name is invalid or already exists.");
//       return;
//     }
//     setTenants((prev) => ({ ...prev, [tenantName]: { name: tenantName } }));
//     setTenantName(""); // Reset tenant name after creation
//   };

//   // Render the vendor's page for the tenant (subdomain)
//   const renderTenantPage = (tenant) => {
//     return (
//       <div>
//         <h1>Welcome to {tenant}!</h1>
//         <p>This is the vendor-specific page for {tenant}.</p>
//         <a href="/">Go Back</a>
//       </div>
//     );
//   };

//   // Render the main e-commerce homepage
//   // const renderMainAppHomepage = () => {
//   //   return (
//   //     <div>
//   //       <h1>Welcome to Our E-Commerce Application</h1>
//   //       <p>Explore the best products and offers!</p>
//   //       <div>
//   //         <h2>Create a New Tenant</h2>
//   //         <div>
//   //           <input
//   //             type="text"
//   //             placeholder="Enter tenant name"
//   //             value={tenantName}
//   //             onChange={(e) => setTenantName(e.target.value)}
//   //           />
//   //           <button onClick={createTenant}>Create Tenant</button>
//   //         </div>
//   //         <h2>Existing Tenants</h2>
//   //         <ul>
//   //           {Object.keys(tenants).length > 0 ? (
//   //             Object.keys(tenants).map((name) => (
//   //               <li key={name}>
//   //                 <a href={`http://${name}.${baseUrl}`}>{name}</a>
//   //               </li>
//   //             ))
//   //           ) : (
//   //             <p>No tenants available. Create one above.</p>
//   //           )}
//   //         </ul>
//   //       </div>
//   //     </div>
//   //   );
//   // };



//   const renderGiftHomepage = () => {
//     return (
//       <div className="bg-gradient-to-r from-purple-700 via-indigo-800 to-purple-900 min-h-screen flex flex-col">
//         {/* Header */}
//         <header className="text-white p-6 flex justify-between items-center shadow-xl">
//           <div className="text-3xl font-extrabold tracking-wide">
//             <span className="text-pink-400">Giftify</span>
//           </div>
//           <nav>
//             <ul className="flex space-x-8">
//               <li>
//                 <a href="#" className="text-lg hover:text-purple-300 transition duration-300">
//                   Home
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-lg hover:text-purple-300 transition duration-300">
//                   Shop
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-lg hover:text-purple-300 transition duration-300">
//                   Occasions
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-lg hover:text-purple-300 transition duration-300">
//                   Contact
//                 </a>
//               </li>
//             </ul>
//           </nav>
//         </header>
  
//         {/* Hero Section */}
//         <section className="bg-cover bg-center text-white p-20 flex items-center justify-center" style={{ backgroundImage: "url('https://via.placeholder.com/1200x800?text=Gift+Store')" }}>
//           <div className="text-center space-y-8">
//             <h1 className="text-5xl font-extrabold leading-tight">
//               Find the Perfect Gift for Every Occasion
//             </h1>
//             <p className="text-xl">Specially curated gifts for birthdays, weddings, holidays, and more.</p>
//             <button className="bg-purple-600 px-10 py-4 text-xl rounded-lg text-white hover:bg-purple-700 transition duration-300">
//               Shop Now
//             </button>
//           </div>
//         </section>
  
//         {/* Featured Gifts Section */}
//         <section className="p-12 bg-purple-100">
//           <h2 className="text-3xl font-semibold text-center text-purple-900 mb-10">Featured Gifts</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//             {Array.from({ length: 8 }).map((_, index) => (
//               <div key={index} className="bg-white p-6 rounded-lg shadow-lg transform transition hover:scale-105 hover:shadow-2xl">
//                 <img src={`https://via.placeholder.com/250?text=Gift+${index + 1}`} alt="Gift" className="w-full h-40 object-cover rounded-lg" />
//                 <h3 className="text-xl font-semibold text-center text-purple-800 mt-4">Gift {index + 1}</h3>
//                 <p className="text-center text-gray-600">$39.99</p>
//                 <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300">
//                   Add to Cart
//                 </button>
//               </div>
//             ))}
//           </div>
//         </section>
  
//         {/* Occasions Section */}
//         <section className="p-12 bg-indigo-700">
//           <h2 className="text-3xl font-semibold text-center text-white mb-10">Gifts for Every Occasion</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//             {["Birthdays", "Weddings", "Anniversaries", "Christmas", "Valentine's Day", "New Year"].map((occasion) => (
//               <div key={occasion} className="bg-white p-6 rounded-lg shadow-lg transform transition hover:scale-105 hover:shadow-2xl">
//                 <h3 className="text-xl font-semibold text-center text-purple-800">{occasion}</h3>
//                 <p className="text-center text-gray-600">Special gifts curated for this occasion</p>
//                 <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300">
//                   Shop Now
//                 </button>
//               </div>
//             ))}
//           </div>
//         </section>
  
//         {/* Best Sellers Section */}
//         <section className="p-12 bg-purple-600">
//           <h2 className="text-3xl font-semibold text-center text-white mb-10">Best Sellers</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//             {Array.from({ length: 6 }).map((_, index) => (
//               <div key={index} className="bg-white p-6 rounded-lg shadow-lg transform transition hover:scale-105 hover:shadow-2xl">
//                 <img src={`https://via.placeholder.com/250?text=Best+Seller+${index + 1}`} alt="Best Seller" className="w-full h-40 object-cover rounded-lg" />
//                 <h3 className="text-xl font-semibold text-center text-purple-800 mt-4">Best Seller {index + 1}</h3>
//                 <p className="text-center text-gray-600">$29.99</p>
//                 <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300">
//                   Add to Cart
//                 </button>
//               </div>
//             ))}
//           </div>
//         </section>
  
//         {/* Footer */}
//         <footer className="bg-purple-800 text-white text-center p-6">
//           <p>&copy; 2024 Giftify. All rights reserved.</p>
//           <p>Designed with 💖 by Your Team</p>
//         </footer>
//       </div>
//     );
//   };
  
 
  
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "localhost:3000";

//   if (isLoading) {
//     return <div>Loading...</div>; // Show loading state until subdomain is fetched
//   }

//   return (
//     <div className="">

//       {subdomain ? (
//         <GiftWebsite name={subdomain}/> // Render tenant page if subdomain exists
//       ) : (
//         // renderGiftHomepage() // Otherwise, render main e-commerce homepage
//         <GiftMarketplace/>
//       )}
//     </div>
//   );
// };

// export default Page;
import React, { useEffect, useState } from "react";
import { Menu, QrCode, Clock, Star, Check } from "lucide-react";
import {
  User,
  Utensils,
  BarChart,
  CreditCard,
  Settings,
  Phone,
} from "lucide-react"; // Import Lucide Icons

// Hero Section
const HeroSection = () => (
  <section className="bg-gradient-to-r from-red-600 to-yellow-500 text-white pb-24 pt-6 px-6 sm:px-8 lg:px-12 transition-all duration-1000">
    {/* Header Section */}
    <header className="flex justify-between items-center max-w-screen-xl mx-auto">
      <div className="text-white text-2xl font-bold tracking-wide">
        <a
          href="/"
          className="hover:text-gray-200 transition-colors duration-300"
        >
          Potoba
        </a>
      </div>
      <nav>
        <ul className="flex space-x-8 text-lg font-medium">
          <li>
            <a
              href="#app"
              className="text-white hover:text-gray-200 transition-colors duration-300"
            >
              App
            </a>
          </li>
          <li>
            <a
              href="#desktop"
              className="text-white hover:text-gray-200 transition-colors duration-300"
            >
              Desktop Software
            </a>
          </li>
        </ul>
      </nav>
    </header>

    {/* Main Hero Content */}
    <div className="container mx-auto text-center mt-12">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
        <span className="block">Transform Your Restaurant</span>
        <span className="block">with Potoba POS System</span>
      </h1>
      <p className="text-lg sm:text-xl mb-10 max-w-4xl mx-auto">
        Streamline your operations, boost efficiency, and grow your business
        with Potoba's cutting-edge app and desktop software tailored for the
        modern restaurant.
      </p>
      <a
        href="#signup"
        className="inline-block bg-white text-red-600 px-8 py-4 rounded-full text-lg font-semibold transform transition-all hover:bg-red-600 hover:text-white hover:scale-105 duration-300"
      >
        Start Free Trial
      </a>
    </div>

    {/* Product Images Section */}
    <div className="mt-20 grid grid-cols-1 md:grid-cols-1 gap-12 max-w-screen-xl mx-auto">
      {/* App Image */}
      <div className="flex justify-center items-center">
        <div className="relative overflow-hidden rounded-lg hover:scale-105 transition-transform duration-500">
          <img
            src="./software.webp"
            alt="App Preview"
            className="object-cover w-full h-full transition-all duration-500"
          />
        </div>
      </div>

      {/* Desktop Software Image */}
      {/* <div className="flex justify-center items-center">
        <div className="relative overflow-hidden rounded-lg shadow-2xl hover:scale-105 transition-transform duration-500">
          <img
            src="https://via.placeholder.com/500x350?text=Desktop+Software"
            alt="Desktop Software Preview"
            className="object-cover w-full h-full transition-all duration-500"
          />
        </div>
      </div> */}
    </div>
  </section>
);

const FeatureSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const sectionTop = document
      .getElementById("featureSection")
      .getBoundingClientRect().top;
    if (sectionTop <= window.innerHeight) {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      id="featureSection"
      className="py-24 px-6 sm:px-8 lg:px-12 bg-gradient-to-r from-gray-100 via-white to-gray-100 text-gray-900 transition-all duration-1000"
    >
      <div className="text-center mb-16">
        <h2
          className={`text-4xl sm:text-5xl font-extrabold text-red-600 mb-4 transform transition-all duration-1000 ease-in-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          Key Features
        </h2>
        <p
          className={`text-lg sm:text-xl text-muted max-w-3xl mx-auto opacity-0 transition-opacity duration-1000 ${
            isVisible ? "opacity-100" : ""
          }`}
        >
          Discover how Potoba can streamline your restaurant operations with
          these powerful features.
        </p>
      </div>

      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 max-w-screen-xl mx-auto transform transition-all duration-1000 ease-in-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        }`}
      >
        {/* Feature Cards */}
        {[
          {
            icon: <User size={48} color="#EF4444" />,
            title: "Staff Management",
            description:
              "Efficiently manage your staff with Potoba's real-time tracking and shift scheduling.",
          },
          {
            icon: <Utensils size={48} color="#EF4444" />,
            title: "Menu Management",
            description:
              "Customize your menu and track sales with ease, all in one platform.",
          },
          {
            icon: <BarChart size={48} color="#EF4444" />,
            title: "Analytics & Reports",
            description:
              "Get insights into your business performance with detailed analytics and reporting tools.",
          },
          {
            icon: <CreditCard size={48} color="#EF4444" />,
            title: "POS Integration",
            description:
              "Seamlessly integrate Potoba with your POS system to process orders and payments.",
          },
          {
            icon: <Settings size={48} color="#EF4444" />,
            title: "Customizable Settings",
            description:
              "Tailor Potoba to fit your restaurant’s specific needs with easy-to-configure settings.",
          },
          {
            icon: <Phone size={48} color="#EF4444" />,
            title: "Mobile Access",
            description:
              "Manage your restaurant from anywhere with Potoba’s mobile app.",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="bg-white shadow-xl rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 p-8"
          >
            <div className="flex justify-center mb-4">{feature.icon}</div>
            <h3 className="text-2xl font-semibold mb-3 text-gray-800">
              {feature.title}
            </h3>
            <p className="text-base text-muted">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="text-center mt-12">
        <a
          href="#"
          className="bg-red-600 text-white text-lg font-semibold py-3 px-8 rounded-full hover:bg-red-700 transition duration-300 transform hover:scale-105"
        >
          Try Potoba Now
        </a>
      </div>
    </section>
  );
};

const HowItWorksSection = () => {
  const [showSteps, setShowSteps] = useState(false);

  // Trigger animation when the component mounts
  useEffect(() => {
    setShowSteps(true);
  }, []);

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">How It Works</h2>
        <p className="text-xl text-gray-600 mb-12">
          Three simple steps to take your restaurant to the next level.
        </p>

        <div className="flex justify-center space-x-8">
          <div
            className={`text-center transition-opacity duration-700 ${
              showSteps
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="bg-red-100 text-red-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              1
            </div>
            <h3 className="text-xl font-semibold mb-2">Scan</h3>
            <p className="text-gray-600">
              Diners scan the QR code on their table to access the menu.
            </p>
          </div>

          <div
            className={`text-center transition-opacity duration-700 ${
              showSteps
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 translate-y-10"
            } delay-100`}
          >
            <div className="bg-green-100 text-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              2
            </div>
            <h3 className="text-xl font-semibold mb-2">Order</h3>
            <p className="text-gray-600">
              Browse the menu and place an order directly from their phone.
            </p>
          </div>

          <div
            className={`text-center transition-opacity duration-700 ${
              showSteps
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 translate-y-10"
            } delay-200`}
          >
            <div className="bg-purple-100 text-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              3
            </div>
            <h3 className="text-xl font-semibold mb-2">Enjoy</h3>
            <p className="text-gray-600">
              Orders are instantly sent to the kitchen, ensuring a smooth dining
              experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
// Software Preview Section
const SoftwarePreviewSection = () => (
  <div className="container mx-auto px-4 py-16 text-center">
    <h2 className="text-4xl font-bold text-gray-900 mb-6">Preview</h2>
    <p className="text-xl text-gray-600 mb-8">
      Take a look at how Potoba can transform your restaurant's ordering system.
    </p>
    <img
      src="./software2.webp"
      alt="App Preview"
      className="rounded-lg shadow-lg mb-8"
    />
  </div>
);

// Pricing Section
const PricingSection = () => {
  const [activePlan, setActivePlan] = useState("Premium");

  const plans = [
    {
      name: "Basic",
      description: "Perfect for small cafés or restaurants with limited tables",
      price: "₹2000",
      features: ["Up to 10 tables", "Basic analytics", "Standard support"],
      trial: "7-day free trial", // Free trial
    },
    {
      name: "Premium",
      description:
        "Ideal for medium to large restaurants, with advanced features and priority support",
      price: "₹5000",
      features: [
        "Unlimited tables",
        "Advanced analytics",
        "Priority support",
        "Custom integrations",
      ],
      trial: "14-day free trial", // Free trial
    },
    {
      name: "Enterprise",
      description:
        "For large-scale operations with custom integrations and dedicated support",
      price: "₹10000",
      features: [
        "Unlimited tables",
        "Full custom solutions",
        "24/7 dedicated support",
        "Enterprise-grade security",
      ],
      trial: "30-day free trial", // Free trial
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Choose the Plan That Works for You
        </h2>
        <p className="text-xl text-gray-600">
          Whether you're a small café or a large restaurant, we have a plan to
          suit your needs.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`border rounded-lg p-6 text-center ${
              activePlan === plan.name
                ? "border-red-600 shadow-xl"
                : "border-gray-200 hover:shadow-lg"
            } transition`}
            onClick={() => setActivePlan(plan.name)}
          >
            <h3 className="text-2xl font-semibold mb-4">{plan.name} Plan</h3>
            <p className="text-gray-600 mb-4">{plan.description}</p>
            <div className="text-4xl font-bold mb-6">{plan.price}</div>
            <p className="text-lg text-green-600 mb-4">{plan.trial}</p>{" "}
            {/* Free Trial */}
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-600 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
            <button className="w-full bg-red-600 text-white py-3 rounded-full hover:bg-red-700 transition">
              Choose {plan.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Testimonials Section
const TestimonialsSection = () => (
  <div className="bg-gray-50 py-16">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-4xl font-bold text-gray-900 mb-6">
        What Our Indian Customers Are Saying
      </h2>
      <p className="text-xl text-gray-600 mb-12">
        Don't just take our word for it—here's what restaurant owners across
        India have to say about our system.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <Star className="text-yellow-500 mx-auto mb-4" size={40} />
          <p className="text-gray-700 italic mb-4">
            "Since using this POS system, managing multiple locations has become
            seamless. The mobile ordering feature is especially loved by our
            customers, as it saves them time and enhances their dining
            experience."
          </p>
          <p className="font-semibold">
            — Rajesh Sharma, Owner, The Royal Café, Delhi
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <Star className="text-yellow-500 mx-auto mb-4" size={40} />
          <p className="text-gray-700 italic mb-4">
            "The efficiency and real-time order tracking have been a huge relief
            during busy hours. It’s a must-have for any restaurant looking to
            stay ahead of the competition in India!"
          </p>
          <p className="font-semibold">
            — Priya Kapoor, Manager, Café Central, Mumbai
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <Star className="text-yellow-500 mx-auto mb-4" size={40} />
          <p className="text-gray-700 italic mb-4">
            "As a busy restaurant owner in Bangalore, I needed a reliable
            system. This POS solution has helped me track orders better, improve
            customer service, and increase efficiency across all our branches."
          </p>
          <p className="font-semibold">
            — Arvind Reddy, Owner, Spice Kingdom, Bengaluru
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <Star className="text-yellow-500 mx-auto mb-4" size={40} />
          <p className="text-gray-700 italic mb-4">
            "Switching to this system was the best decision we made. The ease of
            use and integration with mobile wallets like Paytm and UPI has made
            transactions much smoother, especially for our tech-savvy
            customers."
          </p>
          <p className="font-semibold">
            — Sunita Rao, Owner, South Taste, Hyderabad
          </p>
        </div>
      </div>
    </div>
  </div>
);

// Call to Action Section
const CallToActionSection = () => (
  <div className="bg-red-600 text-white py-16">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-4xl font-bold mb-6">
        Ready to Transform Your Restaurant?
      </h2>
      <p className="text-xl mb-8">
        Start your journey today and experience the future of dining.
      </p>

      <div className="space-x-4">
        <button className="bg-white text-red-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition">
          Try Demo
        </button>
        <button className="bg-white text-red-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition">
          Try App
        </button>
        <button className="bg-white text-red-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition">
          Try Software
        </button>
      </div>

      <p className="text-xl mt-8">
        Have questions or want a personalized walkthrough?{" "}
        <span className="text-gray-200 font-semibold">Contact Us</span>
      </p>
    </div>
  </div>
);

// Footer Section
const FooterSection = () => (
  <footer className="bg-gray-800 text-white py-16">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-12">
        {/* About Section */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">About Potoba</h3>
          <p className="text-gray-400 mb-4">
            Potoba is a modern POS system designed to transform the way
            restaurants manage orders, streamline operations, and deliver
            exceptional customer experiences.
          </p>
          <button className="bg-red-600 text-white py-2 px-6 rounded-full hover:bg-red-700 transition">
            Learn More
          </button>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3 text-gray-400">
            <li>
              <a href="#features" className="hover:text-white transition">
                Features
              </a>
            </li>
            <li>
              <a href="#pricing" className="hover:text-white transition">
                Pricing
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-white transition">
                Contact
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-white transition">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Follow Us Section */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition">
              <i className="fab fa-facebook-f text-2xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <i className="fab fa-twitter text-2xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <i className="fab fa-instagram text-2xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <i className="fab fa-linkedin text-2xl"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-12 border-t border-gray-700 pt-8 text-center">
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Potoba. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

// Main App Component
const PotobaApp = () => (
  <div className="font-sans bg-gray-50 text-gray-800">
    <HeroSection />
    <FeatureSection />
    <HowItWorksSection />
    <SoftwarePreviewSection />
    <PricingSection />
    <TestimonialsSection />
    <CallToActionSection />
    <FooterSection />
  </div>
);

function App() {
  return <PotobaApp />;
}

export default App;

