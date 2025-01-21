"use client"
import { Menu } from 'lucide-react';
import React, { useState, useEffect } from 'react';
// ...existing code...

const DemoPage = () => {
  const [showIframe, setShowIframe] = useState(false);
  const [showSplash, setShowSplash] = useState(false);

  const handleTryAppClick = () => {
    setShowSplash(true);
    setTimeout(() => {
      setShowSplash(false);
      setShowIframe(true);
    }, 3000); // Show splash screen for 3 seconds before showing iframe
  };

  return (
    <div>
      {/* Splash Screen */}
      {showSplash && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="animate-spin-slow mb-4">
              <img src="/ "lt="Robot" className="w-24 h-24 mx-auto animate-bounce" />
            </div>
            <h1 className="text-4xl font-bold mb-2 animate-pulse">Welcome to Potoba</h1>
            <p className="text-lg animate-pulse">Loading your demo experience...</p>
          </div>
        </div>
      )}

      {/* Small Responsive Header */}
      <header className="bg-red-600 text-white p-4 flex justify-between items-center">
        <div className="text-xl font-bold">
          <a href="/" className="hover:text-gray-200 transition-colors duration-300">
            Potoba
          </a>
        </div>
        <nav className="hidden md:flex space-x-4">
          <a href="#app" className="hover:text-gray-200 transition-colors duration-300">App</a>
          <a href="#desktop" className="hover:text-gray-200 transition-colors duration-300">Desktop Software</a>
        </nav>
        <button className="md:hidden text-white focus:outline-none">
          <Menu size={24} />
        </button>
      </header>

      {/* ...existing code... */}

      {/* Try App Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 animate-fade-in">Try Our Apps</h2>
          <p className="text-lg text-gray-600 mb-8 animate-fade-in">No payment or credit card needed. It's free!</p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition duration-300 transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4">Potoba POS</h3>
              <p className="text-gray-600 mb-4">Experience the power of Potoba POS system.</p>
              <button className="bg-red-600 text-white py-3 px-6 rounded-full hover:bg-red-700 transition" onClick={handleTryAppClick}>
                Try Potoba POS
              </button>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition duration-300 transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4">Customer App</h3>
              <p className="text-gray-600 mb-4">Enhance customer experience with our app.</p>
              <button className="bg-red-600 text-white py-3 px-6 rounded-full hover:bg-red-700 transition" onClick={handleTryAppClick}>
                Try Customer App
              </button>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition duration-300 transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4">Another App</h3>
              <p className="text-gray-600 mb-4">Discover more features with our additional app.</p>
              <button className="bg-red-600 text-white py-3 px-6 rounded-full hover:bg-red-700 transition" onClick={handleTryAppClick}>
                Try Staff App
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Iframe */}
      {showIframe && (
        <section className="fixed inset-0 bg-white z-50">
          <iframe
            src="https://potoba-pos.vercel.app/" // Replace with the actual URL of the app
            title="App Preview"
            className="w-full h-full border-0"
          ></iframe>
          <button
            className="absolute top-4 right-4 bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-700 transition"
            onClick={() => setShowIframe(false)}
          >
            Close
          </button>
        </section>
      )}

      {/* Additional Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 animate-fade-in">Why Choose Potoba?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition duration-300 transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4">User-Friendly Interface</h3>
              <p className="text-gray-600">Our intuitive interface ensures a seamless experience for all users.</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition duration-300 transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4">24/7 Customer Support</h3>
              <p className="text-gray-600">Get round-the-clock support to resolve any issues promptly.</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition duration-300 transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4">Affordable Pricing</h3>
              <p className="text-gray-600">We offer competitive pricing plans to suit all business sizes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ...existing code... */}
    </div>
  );
};

export default DemoPage;
