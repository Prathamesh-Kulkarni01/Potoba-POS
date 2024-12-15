import React, { useState } from "react";
import {
  Gift,
  Heart,
  ShoppingBag,
  User,
  Baby,
  Star,
  Calendar,
  Cake,
  Home,
  Shirt,
  Dress,
  ShoppingCart,
  Watch,
  Camera,
  Package,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const GiftWebsite = ({ name }) => {
  const [activeCategory, setActiveCategory] = useState("all");

  const giftCategories = [
    {
      icon: <User className="text-pink-600" size={40} />,
      title: "For Her",
      category: "women",
      description: "Elegant & Thoughtful Gifts",
    },
    {
      icon: <Shirt className="text-blue-600" size={40} />,
      title: "For Him",
      category: "men",
      description: "Sophisticated & Unique Presents",
    },
    {
      icon: <Baby className="text-green-600" size={40} />,
      title: "For Kids",
      category: "children",
      description: "Playful & Imaginative Surprises",
    },
  ];

  const occasionTypes = [
    {
      icon: <Cake className="text-orange-600" size={40} />,
      title: "Birthdays",
      description: "Celebrate Special Moments",
    },
    {
      icon: <Heart className="text-red-600" size={40} />,
      title: "Anniversary",
      description: "Expressing Eternal Love",
    },
    {
      icon: <Calendar className="text-purple-600" size={40} />,
      title: "Festivals",
      description: "Cultural & Festive Gifts",
    },
  ];

  const featuredProducts = [
    {
      name: "Personalized Photo Lamp",
      price: "Rs.700",
      image: "https://m.media-amazon.com/images/I/81Oo-qEEXOL.jpg",
      category: "women",
    },
    {
      name: "Engraved Leather Wallet",
      price: "Rs. 500",
      image:
        "https://nurulgifts.com/cdn/shop/files/4comboBLUECOLOUR.jpg?v=1714501949&width=1445",
      category: "men",
    },
    {
      name: "Custom Storybook",
      price: "Rs. 490",
      image:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ4Ut7gNHAoCJTLgoaqEsWl1pYnHHL0KLwM1Zr8gehhQ5U328aa2bwjH4BazB51-0KP6HpubsXFMA8XmwNeNByOW5_isp8vziWPz7Nf2s6Y_njm-5BrrSTc",
      category: "children",
    },
    {
      name: "Couple's Memory Box",
      price: "Rs 100",
      image:
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS-RQjdw_vK1ASB1Cr4YZlSdb5kM5BVkzrE94SQCUMIVJVy2pebQnpjlYhEaRnQeBKIYQ2kxXtFkZEHcqJ_NARbM15YWTJtcqkDs3ONryqOMVFebA5dRCjT",
      category: "all",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-[#F7F1E5] to-[#EDE6D6] min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <Gift className="text-rose-600 mr-2" size={40} />
          <h1 className="text-2xl font-bold text-rose-900">
            {name?.toUpperCase()}
          </h1>
        </div>
        <nav className="flex space-x-6 text-rose-800">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="text-rose-900 hover:text-rose-800"
          >
            <Heart size={24} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            className="bg-rose-900 text-white px-4 py-2 rounded-full hover:bg-rose-700 flex items-center"
          >
            <ShoppingCart size={20} className="mr-2" />{" "}
            <span className="hidden sm:block">Cart</span>
          </motion.button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto py-16 px-4 grid md:grid-cols-2 items-center">
        <div>
          <h2 className="text-4xl font-bold text-rose-900 mb-4">
            Gifts That Tell Stories
          </h2>
          <p className="text-rose-700 text-xl mb-6">
            Personalized. Meaningful. Unforgettable.
          </p>
          <button className="bg-rose-600 text-white px-8 py-3 rounded-full flex items-center hover:bg-rose-700 transition">
            Explore Gifts <ArrowRight className="ml-2" />
          </button>
        </div>
        <div className="grid grid-cols-2 mt-10 gap-4">
          <img
            src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQIso2484pzn6bfcxZJx0aiA2JiA-rIEDoAUPQT6-YGmZKcqad85maG2Cz3EvllhJ19ocdM0J3RWnW5eDPVNfTnzncylEOpIQ"
            alt="Gift"
            className="rounded-lg shadow-xl transform hover:scale-105 transition"
          />
          <img
            src="https://zocivoci.com/wp-content/uploads/2023/11/mo-heart-b-1-scaled.jpg"
            alt="Personalized Gift"
            className="rounded-lg shadow-xl mt-10 transform hover:scale-105 transition"
          />
        </div>
      </section>
      <SocialOrderButtons/>
      {/* Gift Categories */}
      <section id="categories" className="container mx-auto py-16 px-4">
        <h3 className="text-3xl font-bold text-center text-rose-900 mb-10">
          Gift Categories
        </h3>
        <div className="grid  md:grid-cols-3 gap-6">
          {giftCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 item-center  flex-col text-center flex-col items-center shadow-md hover:shadow-xl transition transform hover:-translate-y-2"
              onClick={() => setActiveCategory(category.category)}
            >
              <p className="w-5 ms-[45%]">{category.icon}</p>
              <h4 className="text-xl font-bold mt-4 text-rose-800">
                {category.title}
              </h4>
              <p className="text-rose-600 mt-2">{category.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Occasions */}
      <section id="occasions" className="container mx-auto py-16 px-4 bg-white">
        <h3 className="text-3xl font-bold text-center text-rose-900 mb-10">
          Gifts for Every Occasion
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {occasionTypes.map((occasion, index) => (
            <div
              key={index}
              className="bg-rose-50 rounded-lg p-6 text-center shadow-md hover:shadow-xl transition transform hover:-translate-y-2"
            >
              <p className="w-5 ms-[45%]">{occasion.icon}</p>
              <h4 className="text-xl font-bold mt-4 text-rose-800">
                {occasion.title}
              </h4>
              <p className="text-rose-600 mt-2">{occasion.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto py-16 px-4">
        <h3 className="text-3xl font-bold text-center text-rose-900 mb-10">
          Featured Gifts
        </h3>
        <div className="grid md:grid-cols-4 gap-6">
          {featuredProducts
            .filter(
              (product) =>
                activeCategory === "all" || product.category === activeCategory
            )
            .map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 text-center shadow-md hover:shadow-xl transition transform hover:scale-105"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="mx-auto mb-4 rounded-md h-64 object-cover"
                />
                <h4 className="text-xl font-bold text-rose-800">
                  {product.name}
                </h4>
                <p className="text-rose-600 mt-2">{product.price}</p>
                <button className="mt-4 bg-rose-600 text-white px-6 py-2 rounded-full hover:bg-rose-700 transition">
                  Add to Cart
                </button>
              </div>
            ))}
        </div>
      </section>

      {/* About Us */}
      <section className="container mx-auto py-16 px-4 bg-rose-50">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-3xl font-bold text-rose-900 mb-6">Our Story</h3>
            <p className="text-rose-700 mb-4">
              {name} was born from a simple belief: every gift should tell a
              story. We collaborate with artisans and designers to create
              personalized gifts that capture memories, celebrate relationships,
              and bring joy.
            </p>
            <p className="text-rose-700">
              Our mission is to make gifting an experience of love,
              thoughtfulness, and personal connection.
            </p>
            <button className="mt-6 bg-rose-600 text-white px-8 py-3 rounded-full hover:bg-rose-700 transition">
              Learn More
            </button>
          </div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG7T1gp2iZmxMqJwtv6Xpbr6x_4DqtWmYIgg&s"
            alt="Our Story"
            className="rounded-lg shadow-xl"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-rose-900 text-white py-12">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div>
            <h5 className="font-bold mb-4">{name}</h5>
            <p className="text-rose-200">
              Personalized Gifts, Endless Emotions
            </p>
          </div>
          <div>
            <h5 className="font-bold mb-4">Quick Links</h5>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-rose-300 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#categories"
                  className="text-rose-300 hover:text-white"
                >
                  Categories
                </a>
              </li>
              <li>
                <a href="#occasions" className="text-rose-300 hover:text-white">
                  Occasions
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-4">Customer Support</h5>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-rose-300 hover:text-white">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-rose-300 hover:text-white">
                  Shipping
                </a>
              </li>
              <li>
                <a href="#" className="text-rose-300 hover:text-white">
                  Returns
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-4">Connect</h5>
            <div className="flex space-x-4">
              <a href="#" className="text-rose-300 hover:text-white">
                Facebook
              </a>
              <a href="#" className="text-rose-300 hover:text-white">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GiftWebsite;



const SocialOrderButtons = () => {
  return (
    <div className="flex flex justify-center items-center gap-6 py-10 bg-gradient-to-r  to-purple-700 text-white">
     
      
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/1234567890?text=Hi,%20I%20would%20like%20to%20place%20an%20order!"
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 rounded-lg bg-green-500 hover:bg-green-600 shadow-md flex items-center gap-3 transition-transform transform hover:scale-105"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp Logo"
          className="w-6 h-6"
        />
        <span>Order on WhatsApp</span>
      </a>

      {/* Instagram Order Button */}
      <a
        href="https://www.instagram.com/direct/inbox/"
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 rounded-lg bg-pink-500 hover:bg-pink-600 shadow-md flex items-center gap-3 transition-transform transform hover:scale-105"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
          alt="Instagram Logo"
          className="w-6 h-6"
        />
        <span>Follow on Instagram</span>
      </a>

     
    </div>
  );
};

