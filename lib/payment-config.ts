export type PaymentSku =
  | 'starter_5'
  | 'explorer_12'
  | 'deep_dive_30'
  | 'member_monthly'
  | 'member_yearly';

export type PaymentRightsType = 'reading_credits' | 'membership';

export interface PaymentProductConfig {
  sku: PaymentSku;
  rightsType: PaymentRightsType;
  providerProductId: string;
  amount: number;
  currency: 'USD';
  displayName: string;
  readingCredits?: number;
  membershipPlanCode?: 'member_monthly' | 'member_yearly';
}

const PAYMENT_PRODUCTS: Record<PaymentSku, PaymentProductConfig> = {
  starter_5: {
    sku: 'starter_5',
    rightsType: 'reading_credits',
    providerProductId: process.env.CREEM_PRODUCT_STARTER || '',
    amount: 4.99,
    currency: 'USD',
    displayName: 'Starter',
    readingCredits: 5,
  },
  explorer_12: {
    sku: 'explorer_12',
    rightsType: 'reading_credits',
    providerProductId: process.env.CREEM_PRODUCT_EXPLORER || '',
    amount: 9.99,
    currency: 'USD',
    displayName: 'Explorer',
    readingCredits: 12,
  },
  deep_dive_30: {
    sku: 'deep_dive_30',
    rightsType: 'reading_credits',
    providerProductId: process.env.CREEM_PRODUCT_DEEP_DIVE || '',
    amount: 19.99,
    currency: 'USD',
    displayName: 'Deep Dive',
    readingCredits: 30,
  },
  member_monthly: {
    sku: 'member_monthly',
    rightsType: 'membership',
    providerProductId: process.env.CREEM_PRODUCT_MEMBER_MONTHLY || '',
    amount: 19.99,
    currency: 'USD',
    displayName: 'Monthly Member',
    membershipPlanCode: 'member_monthly',
  },
  member_yearly: {
    sku: 'member_yearly',
    rightsType: 'membership',
    providerProductId: process.env.CREEM_PRODUCT_MEMBER_YEARLY || '',
    amount: 99,
    currency: 'USD',
    displayName: 'Yearly Member',
    membershipPlanCode: 'member_yearly',
  },
};

export function isPaymentSku(value: string): value is PaymentSku {
  return value in PAYMENT_PRODUCTS;
}

export function getPaymentProductConfig(sku: PaymentSku): PaymentProductConfig {
  return PAYMENT_PRODUCTS[sku];
}
