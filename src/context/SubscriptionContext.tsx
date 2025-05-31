import { createContext, useContext, useState, useEffect } from 'react';
import { revenuecat, SUBSCRIPTION_PLANS, PREMIUM_FEATURES } from '../lib/revenuecat';
import { useAuth } from './AuthContext';

interface SubscriptionContextType {
  isSubscribed: boolean;
  subscriptionPlan: string | null;
  features: string[];
  loading: boolean;
  checkFeatureAccess: (feature: string) => boolean;
  purchaseSubscription: (plan: string) => Promise<boolean>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionPlan, setSubscriptionPlan] = useState<string | null>(null);
  const [features, setFeatures] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadSubscriptionStatus();
    }
  }, [user]);

  const loadSubscriptionStatus = async () => {
    try {
      const customer = await revenuecat.getCustomerInfo();
      const activePlans = Object.keys(customer.entitlements.active);
      
      setIsSubscribed(activePlans.length > 0);
      setSubscriptionPlan(activePlans[0] || null);
      setFeatures(Object.values(customer.entitlements.active).map(e => e.identifier));
    } catch (error) {
      console.error('Error loading subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkFeatureAccess = (feature: string) => {
    return features.includes(feature);
  };

  const purchaseSubscription = async (plan: string) => {
    try {
      const result = await revenuecat.purchasePackage(plan);
      await loadSubscriptionStatus();
      return true;
    } catch (error) {
      console.error('Error purchasing subscription:', error);
      return false;
    }
  };

  return (
    <SubscriptionContext.Provider value={{
      isSubscribed,
      subscriptionPlan,
      features,
      loading,
      checkFeatureAccess,
      purchaseSubscription
    }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};