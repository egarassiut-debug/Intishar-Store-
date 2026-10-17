export interface ProductVariant {
  id: string;
  name: string;
  options: string[];
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export type ListingType = 'commission' | 'paid_ad';
export type ProductApprovalStatus = 'approved' | 'pending' | 'rejected';

export interface Product {
  id: string;
  name: string;
  nameEn?: string;
  description: string;
  category: 'textiles' | 'pottery' | 'electronics' | 'fragrance' | 'leather' | 'food';
  categoryLabel: string;
  price: number; // in EGP
  originalPrice?: number;
  rating: number;
  ratingCount: number;
  stock: number;
  image: string;
  gallery?: string[];
  features: string[];
  isFeatured?: boolean;
  isNewArrival?: boolean;
  variants?: ProductVariant[];
  reviews?: ProductReview[];

  // Merchant & Egyptian Marketplace fields
  merchantId?: string;
  merchantName?: string;
  approvalStatus: ProductApprovalStatus;
  rejectionReason?: string;
  listingType: ListingType;
  commissionRate: number; // percentage (e.g. 10%)
  adFeePaid?: number; // EGP fixed fee for paid ads
  submittedAt?: string;
}

export interface Merchant {
  id: string;
  businessName: string;
  ownerName: string;
  phone: string;
  governorate: string;
  payoutMethod: 'vodafone_cash' | 'instapay' | 'bank_transfer';
  payoutDetails: string; // Phone number for Vodafone cash or InstaPay IPA/handle
  email: string;
  password?: string;
  status: 'active' | 'suspended';
  totalSales: number;
  commissionPaidToAdmin: number;
  netEarnings: number;
  createdAt: string;
}

export interface CartItem {
  cartId: string;
  product: Product;
  quantity: number;
  selectedVariant?: Record<string, string>;
}

export interface CustomerInfo {
  fullName: string;
  phone: string;
  email?: string;
  governorate: string; // Egyptian Governorate
  city: string;
  address: string;
  notes?: string;
}

export type PaymentMethod = 'vodafone_cash' | 'instapay' | 'meeza' | 'card' | 'cod' | 'whatsapp';

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'paid' | 'pending';
  status: OrderStatus;
  customer: CustomerInfo;
  createdAt: string;
  trackingNumber?: string;
  // Financial breakdown for admin
  totalAdminCommission: number;
}

export interface Coupon {
  code: string;
  discountPercentage: number;
  minPurchase?: number;
}
