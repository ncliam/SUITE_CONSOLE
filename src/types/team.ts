export interface Team {
  id: string
  name: string
  owner: string  // email của owner
  verified: boolean  // *** KEY: Team verification
  logo?: string
  status: 'active' | 'suspended' | 'pending_verification'
  billingEmail: string
  taxId?: string
  address?: {
    street: string
    city: string
    province: string
    postalCode: string
    country: string
  }
  createdAt: string
  updatedAt: string
  key?: string  // Firestore key (optional, for compatibility)
}

export interface TeamMember {
  id: string
  teamId: string
  userId: string
  email: string
  displayName?: string
  photoURL?: string
  role: 'owner' | 'billing_admin' | 'member'
  status: 'active' | 'invited' | 'suspended'
  joinedAt?: string
}

export type TeamPermission =
  | 'view:billing'
  | 'manage:billing'
  | 'view:invoices'
  | 'pay:invoices'
  | 'invite:members'
  | 'manage:members'
  | 'edit:team'
  | 'subscribe:apps'  // Chỉ verified team mới có
  | 'access:apps'
