import { motion } from 'framer-motion';
import { Crown, Star, Shield, Video, Palette, TrendingUp } from 'lucide-react';
import { SUBSCRIPTION_PLANS, PREMIUM_FEATURES } from '../../lib/revenuecat';
import { useSubscription } from '../../context/SubscriptionContext';

const PremiumFeatures = () => {
  const { purchaseSubscription } = useSubscription();

  const features = [
    {
      id: PREMIUM_FEATURES.UNLIMITED_CONVERSATIONS,
      title: 'Unlimited Conversations',
      description: 'Chat with your AI companion without any limits',
      icon: <Crown className="h-6 w-6 text-yellow-500" />
    },
    {
      id: PREMIUM_FEATURES.ADVANCED_AI,
      title: 'Advanced AI Models',
      description: 'Access to more sophisticated AI models for deeper conversations',
      icon: <Star className="h-6 w-6 text-purple-500" />
    },
    {
      id: PREMIUM_FEATURES.VIDEO_CHAT,
      title: 'Video Chat',
      description: 'Face-to-face conversations with your AI wellness coach',
      icon: <Video className="h-6 w-6 text-blue-500" />
    },
    {
      id: PREMIUM_FEATURES.PRIORITY_SUPPORT,
      title: 'Priority Support',
      description: '24/7 priority access to our support team',
      icon: <Shield className="h-6 w-6 text-green-500" />
    },
    {
      id: PREMIUM_FEATURES.CUSTOM_THEMES,
      title: 'Custom Themes',
      description: 'Personalize your experience with custom themes',
      icon: <Palette className="h-6 w-6 text-pink-500" />
    },
    {
      id: PREMIUM_FEATURES.ANALYTICS,
      title: 'Advanced Analytics',
      description: 'Detailed insights into your mental wellness journey',
      icon: <TrendingUp className="h-6 w-6 text-indigo-500" />
    }
  ];

  const plans = [
    {
      id: SUBSCRIPTION_PLANS.PREMIUM,
      name: 'Premium',
      price: '$9.99/month',
      features: [
        PREMIUM_FEATURES.UNLIMITED_CONVERSATIONS,
        PREMIUM_FEATURES.ADVANCED_AI,
        PREMIUM_FEATURES.PRIORITY_SUPPORT
      ]
    },
    {
      id: SUBSCRIPTION_PLANS.PRO,
      name: 'Pro',
      price: '$19.99/month',
      features: Object.values(PREMIUM_FEATURES)
    },
    {
      id: SUBSCRIPTION_PLANS.LIFETIME,
      name: 'Lifetime',
      price: '$199.99',
      features: Object.values(PREMIUM_FEATURES)
    }
  ];

  return (
    <div className="py-12 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Upgrade Your Experience</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get access to premium features and take your mental wellness journey to the next level
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
              whileHover={{ y: -5 }}
            >
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p className="text-2xl font-bold text-purple-600 mb-4">{plan.price}</p>
              
              <ul className="space-y-3 mb-6">
                {features.map((feature) => (
                  <li 
                    key={feature.id}
                    className={`flex items-center gap-2 ${
                      plan.features.includes(feature.id)
                        ? 'text-gray-800'
                        : 'text-gray-400'
                    }`}
                  >
                    {feature.icon}
                    <span>{feature.title}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => purchaseSubscription(plan.id)}
                className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Choose {plan.name}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PremiumFeatures;