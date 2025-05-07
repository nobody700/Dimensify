import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Sparkles, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const BillingPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'pro'>('free');
  
  const plans = {
    free: {
      name: 'Free',
      price: '₹0',
      period: 'forever',
      features: [
        { name: 'Limited image generations', included: true },
        { name: 'Limited video generations', included: true },
        { name: 'Basic image resolutions', included: true },
        { name: 'Standard generation speed', included: true },
        { name: 'Community support', included: true },
        { name: 'Advanced parameters control', included: false },
        { name: 'Priority processing', included: false },
        { name: '4K image resolution', included: false },
        { name: 'Unlimited generations', included: false },
        { name: 'Premium support', included: false },
      ],
    },
    pro: {
      name: 'Pro',
      price: '₹10',
      period: 'lifetime',
      features: [
        { name: 'Limited image generations', included: true },
        { name: 'Limited video generations', included: true },
        { name: 'Basic image resolutions', included: true },
        { name: 'Standard generation speed', included: true },
        { name: 'Community support', included: true },
        { name: 'Advanced parameters control', included: true },
        { name: 'Priority processing', included: true },
        { name: '4K image resolution', included: true },
        { name: 'Unlimited generations', included: true },
        { name: 'Premium support', included: true },
      ],
    },
  };

  const handleUpgrade = () => {
    toast.info(
      <div className="flex flex-col">
        <h3 className="font-bold text-lg mb-2">Coming Soon!</h3>
        <p>
          Pro upgrades will be available soon. We'll notify you when they're ready!
        </p>
      </div>,
      {
        duration: 5000,
        icon: <AlertCircle className="h-5 w-5 text-primary-500" />,
      }
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="flex flex-col gap-8">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold font-heading mb-4">
          <span className="bg-gradient-to-r from-primary-400 to-accent-400 text-transparent bg-clip-text">
            Choose Your Plan
          </span>
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Get access to our powerful AI media generation tools with a plan that fits your needs.
        </p>
      </motion.div>

      <motion.div
        className="flex flex-col md:flex-row gap-8 justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Free Plan */}
        <motion.div
          variants={itemVariants}
          className={`bg-dark-900/50 backdrop-blur-sm border ${
            selectedPlan === 'free' 
              ? 'border-primary-500 ring-1 ring-primary-500/30' 
              : 'border-dark-800'
          } rounded-xl p-6 md:p-8 max-w-md w-full relative overflow-hidden transition-all`}
          onClick={() => setSelectedPlan('free')}
        >
          {selectedPlan === 'free' && (
            <motion.div
              className="absolute inset-0 bg-primary-500/5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
          
          <div className="mb-8 text-center">
            <h2 className="text-xl font-bold mb-2">{plans.free.name}</h2>
            <div className="flex justify-center items-baseline">
              <span className="text-3xl md:text-4xl font-bold">{plans.free.price}</span>
              <span className="text-gray-400 ml-2">{plans.free.period}</span>
            </div>
          </div>
          
          <ul className="space-y-3 mb-8">
            {plans.free.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                {feature.included ? (
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                ) : (
                  <X className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                )}
                <span className={feature.included ? 'text-white' : 'text-gray-500'}>
                  {feature.name}
                </span>
              </li>
            ))}
          </ul>
          
          <button
            className={`w-full py-3 ${
              selectedPlan === 'free'
                ? 'bg-primary-600 hover:bg-primary-700'
                : 'bg-dark-800 hover:bg-dark-700'
            } rounded-lg font-medium transition-colors`}
            onClick={() => setSelectedPlan('free')}
          >
            Current Plan
          </button>
        </motion.div>
        
        {/* Pro Plan */}
        <motion.div
          variants={itemVariants}
          className={`bg-dark-900/50 backdrop-blur-sm border ${
            selectedPlan === 'pro' 
              ? 'border-primary-500 ring-1 ring-primary-500/30' 
              : 'border-dark-800'
          } rounded-xl p-6 md:p-8 max-w-md w-full relative overflow-hidden transition-all`}
          onClick={() => setSelectedPlan('pro')}
        >
          {/* Popular badge */}
          <div className="absolute top-0 right-0">
            <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white text-xs font-bold px-4 py-1 transform translate-x-[30%] translate-y-[40%] rotate-45">
              POPULAR
            </div>
          </div>
          
          {selectedPlan === 'pro' && (
            <motion.div
              className="absolute inset-0 bg-primary-500/5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
          
          <div className="mb-8 text-center">
            <h2 className="text-xl font-bold mb-2">{plans.pro.name}</h2>
            <div className="flex justify-center items-baseline">
              <span className="text-3xl md:text-4xl font-bold">{plans.pro.price}</span>
              <span className="text-gray-400 ml-2">{plans.pro.period}</span>
            </div>
          </div>
          
          <ul className="space-y-3 mb-8">
            {plans.pro.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                {feature.included ? (
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                ) : (
                  <X className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                )}
                <span className={feature.included ? 'text-white' : 'text-gray-500'}>
                  {feature.name}
                </span>
              </li>
            ))}
          </ul>
          
          <button
            onClick={handleUpgrade}
            className={`w-full py-3 ${
              selectedPlan === 'pro'
                ? 'bg-gradient-to-r from-primary-500 to-accent-500 hover:opacity-90'
                : 'bg-dark-800 hover:bg-dark-700'
            } rounded-lg font-medium transition-all flex items-center justify-center`}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Upgrade
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        className="max-w-3xl mx-auto bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-6 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">How does the lifetime Pro plan work?</h3>
            <p className="text-gray-400">
              Pay once and enjoy Pro benefits forever. No monthly fees or subscriptions. The lifetime Pro plan gives you unlimited access to all our current and future features.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Can I upgrade later?</h3>
            <p className="text-gray-400">
              Yes, you can start with the Free plan and upgrade to Pro anytime you want. Your usage and content will be preserved when you upgrade.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
            <p className="text-gray-400">
              We accept credit/debit cards, UPI, and net banking through our secure Razorpay payment gateway for safe and instant transactions.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">How is "limited generations" defined in the Free plan?</h3>
            <p className="text-gray-400">
              The Free plan includes 10 image generations and 3 video generations per day. Pro users get unlimited generations without any daily limits.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BillingPage;