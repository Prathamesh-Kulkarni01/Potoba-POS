import React, { useState, useEffect, useRef } from 'react';
import { 
    Gift, 
    ShoppingCart, 
    Heart, 
    Star, 
    MessageCircle, 
    User, 
    Search, 
    Filter, 
    ArrowRight, 
    CheckCircle, 
    Award, 
    Globe, 
    Clock, 
    Sparkles,
    TrendingUp,
    Zap,
    Rocket,
    ThumbsUp,
    Bell,
    DollarSign,
    Package,
    Smile,
    HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GiftMarketplace = () => {
  // State Management
  const [activeCategory, setActiveCategory] = useState('All Occasions');
  const [selectedOccasion, setSelectedOccasion] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(null);

  // Psychological Trigger Categories
  const occasionCategories = [
    { name: 'Wedding', icon: '💍', description: 'Celebrate Love & Union' },
    { name: 'Birthday', icon: '🎂', description: 'Personal Milestones' },
    { name: 'Anniversary', icon: '❤️', description: 'Relationship Memories' },
    { name: 'Corporate', icon: '🏢', description: 'Professional Appreciation' },
    { name: 'Graduation', icon: '🎓', description: 'Achievement Celebration' }
  ];

  // Featured Vendors with Psychological Triggers
  const featuredVendors = [
    {
      name: 'Artisan Memories',
      specialty: 'Personalized Storytelling Gifts',
      rating: 4.9,
      reviews: 240,
      expertise: ['Emotional Connection', 'Unique Narratives']
    },
    {
      name: 'Craft Masters',
      specialty: 'Handcrafted Emotional Experiences',
      rating: 4.8,
      reviews: 180,
      expertise: ['Sentimental Design', 'Emotional Intelligence']
    }
  ];

  // Trending & Recommended Gifts
  const trendingGifts = [
    {
      name: 'Memory Storybook',
      price: 129.99,
      customizationLevel: 'High',
      emotionalValue: 'Extremely High',
      icon: '📖'
    },
    {
      name: 'Personalized Family Tree',
      price: 199.99,
      customizationLevel: 'Premium',
      emotionalValue: 'Deep Connection',
      icon: '🌳'
    }
  ];
  // Trending Products with Psychological Positioning
  const trendingProducts = [
    {
      id: 1,
      name: 'Personalized Memory Box',
      price: 89.99,
      vendor: 'Artisan Memories',
      rating: 4.8,
      image: 'https://img.freepik.com/free-photo/belief-faith-hope-love-concept_53876-120939.jpg?semt=ais_hybrid',
      emotionalTrigger: 'Nostalgia & Connection'
    },
    {
      id: 2,
      name: 'Custom Family Portrait',
      price: 159.99,
      vendor: 'Family Moments Studio',
      rating: 4.9,
      image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQgnH4TuuBIrYuNBmCDiuPRcBYVCNG7UjpSOkXyNg_lPD04h3pca27zQl57W-JAdIFTXt9FaMrOG9TkITfZt_iRpPliL4xV0f1oOO3WkJpWQwaw-z2KXoTP&usqp=CAE',
      emotionalTrigger: 'Family Bonds'
    },
    {
      id: 3,
      name: 'Handcrafted Wisdom Journals',
      price: 49.99,
      vendor: 'Narrative Crafters',
      rating: 4.7,
      image: 'data:image/jpeg;base64,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',
      emotionalTrigger: 'Personal Growth'
    }
  ];

  // Customer Testimonials
  const testimonials = [
    {
      name: 'Sarah M.',
      message: 'The most unique and thoughtful gift platform I\'ve ever used!',
      occasion: 'Anniversary Gift',
      rating: 5
    },
    {
      name: 'Michael T.',
      message: 'Found the perfect corporate gift that truly showed appreciation.',
      occasion: 'Employee Recognition',
      rating: 5
    }
  ];

  // How It Works Steps
  const platformSteps = [
    {
      icon: <Search size={32} className="text-purple-600" />,
      title: 'Explore & Discover',
      description: 'Browse unique gifts tailored to your occasion'
    },
    {
      icon: <MessageCircle size={32} className="text-purple-600" />,
      title: 'Connect with Artisans',
      description: 'Discuss custom requirements directly'
    },
    {
      icon: <Gift size={32} className="text-purple-600" />,
      title: 'Create Your Perfect Gift',
      description: 'Personalize and bring your vision to life'
    },
    {
      icon: <Package size={32} className="text-purple-600" />,
      title: 'Seamless Delivery',
      description: 'Carefully packaged and shipped with love'
    }
  ];

  // Value Propositions
  const valueProps = [
    {
      icon: <Sparkles size={48} className="text-purple-600" />,
      title: 'Unique Personalization',
      description: 'Every gift tells a unique story'
    },
    {
      icon: <ThumbsUp size={48} className="text-purple-600" />,
      title: 'Quality Guaranteed',
      description: 'Curated artisans, premium craftsmanship'
    },
    {
      icon: <Globe size={48} className="text-purple-600" />,
      title: 'Local & Global',
      description: 'Supporting artisans worldwide'
    }
  ];
  // Psychological UX Flow Components
  const PsychologicalTriggerModal = ({ trigger, onClose }) => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
    >
      <motion.div 
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-2xl max-w-md w-full p-6 text-center"
      >
        <Sparkles className="mx-auto text-purple-600 mb-4" size={64} />
        <h2 className="text-2xl font-bold text-purple-900 mb-3">
          {trigger.name} Gift Inspiration
        </h2>
        <p className="text-purple-700 mb-6">{trigger.description}</p>
        <div className="grid grid-cols-2 gap-4">
          <button 
            className="bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
            onClick={onClose}
          >
            Explore Gifts
          </button>
          <button 
            className="border-2 border-purple-600 text-purple-700 py-3 rounded-lg hover:bg-purple-50 transition"
            onClick={onClose}
          >
            Custom Request
          </button>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 relative"
    >
      {/* Psychological Trigger Modal */}
      <AnimatePresence>
        {modalOpen && (
          <PsychologicalTriggerModal 
            trigger={modalOpen} 
            onClose={() => setModalOpen(null)} 
          />
        )}
      </AnimatePresence>

      {/* Advanced Navigation */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md shadow-lg">
        <div className="container mx-auto flex justify-between items-center p-4">
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="flex items-center space-x-1"
          >
            <Gift className="text-purple-600" size={32} />
            <h1 className="text-2xl font-bold text-purple-900 mx-2">Giftदो</h1>
          </motion.div>

          <div className="flex items-center space-x-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative flex-grow max-w-md"
            >
              <input 
                type="text" 
                placeholder="Find the perfect gift..."
                className="w-full ms-2 pl-10 pr-4 py-2 rounded-full border border-purple-200 focus:ring-2 focus:ring-purple-400 transition"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" size={20} />
            </motion.div>

            <motion.button 
              whileHover={{ scale: 1.1 }}
              className="text-purple-700 hover:text-purple-900"
            >
              <Heart size={24} />
            </motion.button>

            <motion.button 
              whileHover={{ scale: 1.1 }}
              className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 flex items-center"
            >
              <ShoppingCart size={20} className="mr-2" /> <span className="hidden sm:block">Cart</span>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Hero Section with Psychological Positioning */}
      <header className="container mx-auto px-4 py-16 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-extrabold text-purple-900 mb-6"
        >
          Transform Moments into Memories
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl text-purple-700 max-w-2xl mx-auto mb-10"
        >
          Connecting passionate local artisans with gift seekers who value unique, 
          personalized experiences that tell a story
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex justify-center space-x-4"
        >
          <button className="bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition flex items-center">
            Start Gifting <ArrowRight className="ml-2" size={20} />
          </button>
          <button className="border-2 border-purple-600 text-purple-700 px-6 py-3 rounded-full hover:bg-purple-50 transition">
            Explore Artisans
          </button>
        </motion.div>
      </header>

      {/* Occasion Categories with Psychological Depth */}
      {/* <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-5 gap-6">
          {occasionCategories.map((occasion) => (
            <motion.div
              key={occasion.name}
              whileHover={{ scale: 1.05 }}
              onClick={() => setModalOpen(occasion)}
              className="bg-white rounded-2xl p-6 text-center shadow-lg cursor-pointer hover:shadow-xl transition"
            >
              <div className="text-6xl mb-4">{occasion.icon}</div>
              <h3 className="font-bold text-purple-900 mb-2">{occasion.name}</h3>
              <p className="text-sm text-purple-600">{occasion.description}</p>
            </motion.div>
          ))}
        </div>
      </section> */}

     
 {/* Trending Products Section */}
 <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
            Trending Gifts Right Now
          </h2>
          <p className="text-purple-700 max-w-2xl mx-auto">
            Discover gifts that are capturing hearts and creating memories
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trendingProducts.map((product) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg"
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-purple-900 mb-2">
                  {product.name}
                </h3>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-pink-600 font-bold">${product.price}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="text-yellow-500" fill="currentColor" size={16} />
                    <span>{product.rating}</span>
                  </div>
                </div>
                <p className="text-purple-700 text-sm mb-4">
                  By {product.vendor}
                </p>
                <button className="w-full bg-purple-600 text-white py-2 rounded-full hover:bg-purple-700 transition">
                  Customize Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
 {/* Featured Vendors Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-purple-900 mb-12">
            Curated Local Artisan Network
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredVendors.map((vendor) => (
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-purple-50 rounded-2xl p-6 flex items-center space-x-6"
              >
                <div className="bg-white p-4 rounded-full">
                  <Award className="text-purple-600" size={48} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-purple-900">{vendor.name}</h3>
                  <p className="text-purple-700 mb-2">{vendor.specialty}</p>
                  <div className="flex items-center space-x-2">
                    <Star className="text-yellow-500" fill="currentColor" size={20} />
                    <span>{vendor.rating} ({vendor.reviews} Reviews)</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
              How Giftदो Works
            </h2>
            <p className="text-purple-700 max-w-2xl mx-auto">
              Your journey to the perfect gift, simplified
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {platformSteps.map((step, index) => (
              <motion.div
                whileHover={{ scale: 1.05 }}
                key={step.title}
                className="bg-purple-50 p-6 rounded-2xl text-center"
              >
                <div className="mb-4 flex justify-center">
                  {step.icon}
                </div>
                <h3 className="font-bold text-purple-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-purple-700">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="container mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {valueProps.map((prop) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              key={prop.title}
              className="bg-white p-8 rounded-2xl text-center shadow-lg"
            >
              <div className="mb-6 flex justify-center">
                {prop.icon}
              </div>
              <h3 className="font-bold text-xl text-purple-900 mb-4">
                {prop.title}
              </h3>
              <p className="text-purple-700">
                {prop.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-purple-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Gift Creators Say
            </h2>
            <p className="max-w-2xl mx-auto">
              Real stories from people who found their perfect gift
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial) => (
              <motion.div
                whileHover={{ scale: 1.02 }}
                key={testimonial.name}
                className="bg-white/10 p-6 rounded-2xl"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400" fill="currentColor" size={20} />
                  ))}
                </div>
                <p className="italic mb-4">"{testimonial.message}"</p>
                <div className="font-bold">
                  {testimonial.name} - {testimonial.occasion}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Your Gift Journey Today
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-white/90">
            Connect with local artisans, create memories, and make every occasion special
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-purple-700 px-8 py-3 rounded-full hover:bg-purple-50 transition">
              Explore Gifts
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white/20 transition">
              Become a Vendor
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4">Giftदो</h3>
              <p className="text-purple-200">
                Connecting hearts through thoughtful gifts
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-pink-300">Explore Gifts</a></li>
                <li><a href="#" className="hover:text-pink-300">Vendor Portal</a></li>
                <li><a href="#" className="hover:text-pink-300">About Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-pink-300">Help Center</a></li>
                <li><a href="#" className="hover:text-pink-300">Shipping Info</a></li>
                <li><a href="#" className="hover:text-pink-300">Returns</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <div className="flex space-x-4">
                {/* Social Icons would go here */}
              </div>
            </div>
          </div>
          <div className="border-t border-purple-700 mt-8 pt-4 text-center">
            <p>© 2024 Giftदो. All Rights Reserved</p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default GiftMarketplace;