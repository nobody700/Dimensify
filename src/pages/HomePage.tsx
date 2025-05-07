import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Image, Layers, Video, ArrowRight, Check } from 'lucide-react';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <Image className="h-6 w-6 text-primary-400" />,
      title: 'Text to Image',
      description: 'Transform your text prompts into stunning, high-quality images with precise control.',
      link: '/text-to-image'
    },
    {
      icon: <Layers className="h-6 w-6 text-secondary-400" />,
      title: 'Image to Image',
      description: 'Modify existing images with your text instructions for endless creative possibilities.',
      link: '/image-to-image'
    },
    {
      icon: <Video className="h-6 w-6 text-accent-400" />,
      title: 'Text to Video',
      description: 'Bring your ideas to life with AI-generated videos from simple text descriptions.',
      link: '/text-to-video'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="flex flex-col gap-16 py-8">
      {/* Hero Section */}
      <motion.section 
        className="flex flex-col items-center text-center py-12 md:py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="inline-block p-2 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-full mb-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Sparkles className="h-8 w-8 text-accent-400" />
        </motion.div>
        
        <motion.h1 
          className="text-4xl md:text-6xl font-bold font-heading mb-6 max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <span className="bg-gradient-to-r from-primary-400 to-accent-400 text-transparent bg-clip-text">
            Transform Your Ideas
          </span>{' '}
          into Stunning Visuals
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-gray-300 max-w-3xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Unleash your creativity with our AI-powered media generation platform. 
          Create beautiful images and videos from simple text prompts in seconds.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Link to="/text-to-image" className="px-8 py-3 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg font-medium text-white hover:opacity-90 transition-opacity flex items-center justify-center">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link to="/billing" className="px-8 py-3 bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-lg font-medium text-white hover:bg-dark-800 transition-colors">
            View Pricing
          </Link>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="py-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div 
          className="text-center mb-12"
          variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Powerful Creative Tools
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Explore our suite of AI-powered generation tools to bring your creative visions to life.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-dark-900/40 backdrop-blur-md border border-dark-800 rounded-2xl p-6 flex flex-col hover:border-primary-800/50 transition-colors group"
            >
              <div className="bg-dark-800/80 rounded-xl p-3 w-fit mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 mb-6 flex-grow">{feature.description}</p>
              <Link 
                to={feature.link}
                className="flex items-center text-primary-400 font-medium group-hover:text-primary-300 transition-colors"
              >
                Try now
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Pricing CTA */}
      <motion.section 
        className="py-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="bg-gradient-to-r from-primary-900/40 to-accent-900/40 border border-primary-800/30 rounded-2xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <motion.h2 
                className="text-2xl md:text-3xl font-bold font-heading mb-4"
                variants={itemVariants}
              >
                Upgrade to Pro for Unlimited Access
              </motion.h2>
              <motion.p 
                className="text-gray-300 mb-6"
                variants={itemVariants}
              >
                Get unlimited generations, priority access, and advanced features for just ₹10 for lifetime access.
              </motion.p>
              <motion.ul 
                className="space-y-3 mb-8"
                variants={itemVariants}
              >
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-primary-400 mr-2" />
                  <span>Unlimited image & video generations</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-primary-400 mr-2" />
                  <span>Advanced control over generation parameters</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-primary-400 mr-2" />
                  <span>Priority processing for faster results</span>
                </li>
              </motion.ul>
              <motion.div variants={itemVariants}>
                <Link 
                  to="/billing"
                  className="px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg font-medium text-white hover:opacity-90 transition-opacity inline-flex items-center"
                >
                  Upgrade Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>
            </div>
            <div className="flex-1 flex justify-center">
              <motion.div 
                className="relative"
                variants={itemVariants}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition"></div>
                <div className="relative bg-dark-900 rounded-2xl p-6 border border-dark-800">
                  <div className="mb-6 text-center">
                    <span className="text-xs font-semibold px-3 py-1 bg-primary-900/50 text-primary-300 rounded-full">
                      MOST POPULAR
                    </span>
                    <h3 className="text-2xl font-bold mt-4">Pro Plan</h3>
                    <div className="mt-2 flex items-center justify-center">
                      <span className="text-4xl font-bold">₹10</span>
                      <span className="text-gray-400 ml-2">Lifetime</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-primary-400 mr-2" />
                      <span>Unlimited generations</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-primary-400 mr-2" />
                      <span>Priority processing</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-primary-400 mr-2" />
                      <span>Advanced parameters</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-primary-400 mr-2" />
                      <span>4K resolution support</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-primary-400 mr-2" />
                      <span>Premium support</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;