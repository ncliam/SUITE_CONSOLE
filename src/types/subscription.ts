// App pricing - per-app pricing model
export interface AppPricing {
  appCode: string
  appName: string
  description: string
  pricing: {
    monthly: number
    yearly: number
  }
  features: string[]
}

// App subscription - per-team per-app subscription
export interface AppSubscription {
  id: string
  teamId: string  // CHANGED from organizationId
  appCode: string  // CHANGED from planId
  status: 'trial' | 'active' | 'past_due' | 'cancelled' | 'expired'
  billingCycle: 'monthly' | 'yearly'
  currentPeriodStart: string
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
  subscribedAt: string
}
