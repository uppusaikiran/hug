import { RevenueCat } from 'revenuecat-js';

// Initialize RevenueCat
export const revenuecat = new RevenueCat({
  publicKey: import.meta.env.VITE_REVENUECAT_PUBLIC_KEY || '',
});

// Define subscription plans
export const SUBSCRIPTION_PLANS = {
  PREMIUM: 'premium_monthly',
  PRO: 'pro_monthly',
  LIFETIME: 'lifetime_access'
} as const;

// Define premium features
export const PREMIUM_FEATURES = {
  UNLIMITED_CONVERSATIONS: 'unlimited_conversations',
  ADVANCED_AI: 'advanced_ai_models',
  PRIORITY_SUPPORT: 'priority_support',
  VIDEO_CHAT: 'video_chat',
  CUSTOM_THEMES: 'custom_themes',
  ANALYTICS: 'advanced_analytics'
} as const;

// Create a context to manage subscription state
export const useSubscription = () => {
  const checkEntitlement = async (feature: string) => {
    try {
      const customer = await revenuecat.getCustomerInfo();
      return customer.entitlements.active[feature] !== undefined;
    } catch (error) {
      console.error('Error checking entitlement:', error);
      return false;
    }
  };

  const purchasePackage = async (packageId: string) => {
    try {
      const offering = await revenuecat.getOffering(packageId);
      if (offering) {
        await revenuecat.purchasePackage(offering);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error purchasing package:', error);
      return false;
    }
  };

  return {
    checkEntitlement,
    purchasePackage
  };
};