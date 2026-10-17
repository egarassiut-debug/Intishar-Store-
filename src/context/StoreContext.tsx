import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Order,
  CustomerInfo,
  Coupon,
  OrderStatus,
  PaymentMethod,
  Merchant
} from '../types/store';
import { INITIAL_PRODUCTS, VALID_COUPONS, INITIAL_MERCHANTS } from '../data/initialProducts';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface StoreContextType {
  // Store Data
  products: Product[];
  approvedProducts: Product[];
  pendingApprovalProducts: Product[];
  cart: CartItem[];
  orders: Order[];
  wishlist: string[];
  activeCategory: string;
  searchQuery: string;
  sortBy: string;
  selectedProduct: Product | null;
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  isWhatsAppCheckoutOpen: boolean;
  isMerchantModalOpen: boolean;
  appliedCoupon: Coupon | null;
  couponError: string | null;
  currentView: 'store' | 'admin' | 'merchant-dashboard' | 'order-success';
  activeOrder: Order | null;
  toasts: Toast[];

  // Merchant Portal
  merchants: Merchant[];
  currentMerchant: Merchant | null;
  registerMerchant: (data: {
    businessName: string;
    ownerName: string;
    phone: string;
    governorate: string;
    payoutMethod: Merchant['payoutMethod'];
    payoutDetails: string;
    email: string;
    password?: string;
  }) => Merchant;
  loginMerchant: (email: string, pass: string) => boolean;
  logoutMerchant: () => void;
  submitMerchantProduct: (
    productData: Omit<Product, 'id' | 'rating' | 'ratingCount' | 'approvalStatus' | 'submittedAt'>
  ) => void;

  // Admin Approval & Management
  approveProduct: (productId: string, commissionRate?: number) => void;
  rejectProduct: (productId: string, reason?: string) => void;
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'ratingCount' | 'approvalStatus'>) => void;
  updateProduct: (id: string, updatedFields: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Financial Metrics
  totalRevenue: number;
  totalAdminCommissions: number;
  totalPaidAdsRevenue: number;
  totalMerchantPayouts: number;

  // View & UI Controllers
  setActiveCategory: (cat: string) => void;
  setSearchQuery: (q: string) => void;
  setSortBy: (sort: string) => void;
  setSelectedProduct: (p: Product | null) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsCheckoutOpen: (open: boolean) => void;
  setIsWhatsAppCheckoutOpen: (open: boolean) => void;
  setIsMerchantModalOpen: (open: boolean) => void;
  setCurrentView: (view: 'store' | 'admin' | 'merchant-dashboard' | 'order-success') => void;

  // Cart Handlers
  addToCart: (product: Product, quantity?: number, variant?: Record<string, string>) => void;
  removeFromCart: (cartId: string) => void;
  updateCartQuantity: (cartId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  // Totals
  cartSubtotal: number;
  cartDiscount: number;
  cartShipping: number;
  cartTotal: number;
  cartItemCount: number;

  // Checkout Handlers
  createOrder: (customer: CustomerInfo, paymentMethod: PaymentMethod) => Order;
  createWhatsAppOrder: (customer: CustomerInfo) => { order: Order; whatsappUrl: string };

  // Wishlist
  toggleWishlist: (productId: string) => void;
  isItemInWishlist: (productId: string) => boolean;

  // Utilities
  formatPrice: (amountInEGP: number) => string;
  showToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const LOCAL_STORAGE_PRODUCTS_KEY = 'riwaq_egypt_products_v2';
const LOCAL_STORAGE_MERCHANTS_KEY = 'riwaq_egypt_merchants_v2';
const LOCAL_STORAGE_ACTIVE_MERCHANT_KEY = 'riwaq_egypt_active_merchant_v2';
const LOCAL_STORAGE_CART_KEY = 'riwaq_egypt_cart_v2';
const LOCAL_STORAGE_ORDERS_KEY = 'riwaq_egypt_orders_v2';
const LOCAL_STORAGE_WISHLIST_KEY = 'riwaq_egypt_wishlist_v2';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products State
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_PRODUCTS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_PRODUCTS;
  });

  // Merchants State
  const [merchants, setMerchants] = useState<Merchant[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_MERCHANTS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_MERCHANTS;
  });

  // Active Logged-in Merchant
  const [currentMerchant, setCurrentMerchant] = useState<Merchant | null>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_ACTIVE_MERCHANT_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return null;
  });

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return [];
  });

  // Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_ORDERS_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return [
      {
        id: 'ord-eg-101',
        orderNumber: 'EG-2026-8812',
        items: [
          {
            cartId: 'item-demo-eg-1',
            product: INITIAL_PRODUCTS[0],
            quantity: 1,
            selectedVariant: { 'اللون': 'أبيض ناصع', 'المقاس': 'كينج كبير (200×200)' }
          }
        ],
        subtotal: 1850,
        discount: 0,
        shipping: 0,
        total: 1850,
        paymentMethod: 'instapay',
        paymentStatus: 'paid',
        status: 'processing',
        totalAdminCommission: 185,
        customer: {
          fullName: 'د. يوسف الشافعي',
          phone: '01001234567',
          governorate: 'القاهرة',
          city: 'مصر الجديدة',
          address: 'شارع الثورة، بجوار سنترال ألماظة'
        },
        createdAt: '2026-10-15 16:20',
        trackingNumber: 'BOSTA-EG-992014'
      },
      {
        id: 'ord-eg-102',
        orderNumber: 'EG-2026-8813',
        items: [
          {
            cartId: 'item-demo-eg-2',
            product: INITIAL_PRODUCTS[1],
            quantity: 1
          }
        ],
        subtotal: 950,
        discount: 95,
        shipping: 50,
        total: 905,
        paymentMethod: 'vodafone_cash',
        paymentStatus: 'paid',
        status: 'pending',
        totalAdminCommission: 150, // paid ad fee
        customer: {
          fullName: 'مروة عبدالحميد',
          phone: '01123456789',
          governorate: 'الإسكندرية',
          city: 'سموحة',
          address: 'شارع فوزي معاذ، عمارة الأطباء'
        },
        createdAt: '2026-10-16 09:10',
        trackingNumber: 'BOSTA-EG-881230'
      }
    ];
  });

  // Wishlist State
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_WISHLIST_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return ['prod-1', 'prod-3'];
  });

  // UI States
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isWhatsAppCheckoutOpen, setIsWhatsAppCheckoutOpen] = useState<boolean>(false);
  const [isMerchantModalOpen, setIsMerchantModalOpen] = useState<boolean>(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'store' | 'admin' | 'merchant-dashboard' | 'order-success'>('store');
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(products));
    } catch {
      // ignore
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_MERCHANTS_KEY, JSON.stringify(merchants));
    } catch {
      // ignore
    }
  }, [merchants]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_ACTIVE_MERCHANT_KEY, JSON.stringify(currentMerchant));
    } catch {
      // ignore
    }
  }, [currentMerchant]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_WISHLIST_KEY, JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  // Toast System
  const showToast = (message: string, type: Toast['type'] = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Egyptian Pound Price Formatter
  const formatPrice = (amountInEGP: number): string => {
    return `${amountInEGP.toLocaleString('ar-EG')} ج.م`;
  };

  // Approved products visible to regular buyers on the storefront
  const approvedProducts = products.filter((p) => p.approvalStatus === 'approved');
  const pendingApprovalProducts = products.filter((p) => p.approvalStatus === 'pending');

  // Merchant Portal Operations
  const registerMerchant = (data: {
    businessName: string;
    ownerName: string;
    phone: string;
    governorate: string;
    payoutMethod: Merchant['payoutMethod'];
    payoutDetails: string;
    email: string;
    password?: string;
  }): Merchant => {
    const newMerchant: Merchant = {
      ...data,
      id: `merch-${Date.now()}`,
      status: 'active',
      totalSales: 0,
      commissionPaidToAdmin: 0,
      netEarnings: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setMerchants((prev) => [newMerchant, ...prev]);
    setCurrentMerchant(newMerchant);
    showToast(`أهلاً بك يا ${data.ownerName}! تم تسجيل متجر "${data.businessName}" بنجاح`, 'success');
    return newMerchant;
  };

  const loginMerchant = (email: string, pass: string): boolean => {
    const found = merchants.find(
      (m) => m.email.toLowerCase() === email.trim().toLowerCase() && (m.password === pass || !m.password)
    );
    if (found) {
      setCurrentMerchant(found);
      showToast(`تم تسجيل الدخول بنجاح لمتجر: ${found.businessName}`, 'success');
      return true;
    }
    showToast('بيانات الدخول غير صحيحة، يرجى التأكد من البريد وكلمة المرور', 'error');
    return false;
  };

  const logoutMerchant = () => {
    setCurrentMerchant(null);
    setCurrentView('store');
    showToast('تم تسجيل الخروج من حساب التاجر', 'info');
  };

  // Merchant Submits Product For Admin Review
  const submitMerchantProduct = (
    productData: Omit<Product, 'id' | 'rating' | 'ratingCount' | 'approvalStatus' | 'submittedAt'>
  ) => {
    const newProd: Product = {
      ...productData,
      id: `prod-m-${Date.now()}`,
      rating: 5.0,
      ratingCount: 0,
      approvalStatus: 'pending',
      merchantId: currentMerchant?.id,
      merchantName: currentMerchant?.businessName || 'تاجر مسجل',
      submittedAt: new Date().toLocaleString('ar-EG', { dateStyle: 'short', timeStyle: 'short' }),
      adFeePaid: productData.listingType === 'paid_ad' ? 150 : 0
    };

    setProducts((prev) => [newProd, ...prev]);
    showToast(
      `تم إرسال منتج "${newProd.name.slice(0, 25)}..." للمراجعة! سيظهر بالمتجر فور موافقة الإدارة.`,
      'success'
    );
  };

  // Admin Approval & Rejection
  const approveProduct = (productId: string, commissionRate?: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          return {
            ...p,
            approvalStatus: 'approved',
            rejectionReason: undefined,
            commissionRate: commissionRate !== undefined ? commissionRate : p.commissionRate
          };
        }
        return p;
      })
    );
    showToast('تمت الموافقة على المنتج وتفعيله مباشرة في متجر مصر!', 'success');
  };

  const rejectProduct = (productId: string, reason = 'لم يستوفِ معايير الجودة المصرية المطلوبة') => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          return {
            ...p,
            approvalStatus: 'rejected',
            rejectionReason: reason
          };
        }
        return p;
      })
    );
    showToast(`تم رفض المنتج وإرسال السبب للتاجر: "${reason}"`, 'warning');
  };

  // Standard Store Admin Add / Edit / Delete
  const addProduct = (product: Omit<Product, 'id' | 'rating' | 'ratingCount' | 'approvalStatus'>) => {
    const newProd: Product = {
      ...product,
      id: `prod-adm-${Date.now()}`,
      rating: 5.0,
      ratingCount: 1,
      approvalStatus: 'approved'
    };
    setProducts((prev) => [newProd, ...prev]);
    showToast(`تمت إضافة منتج "${newProd.name}" مباشرة إلى المتجر`, 'success');
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p)));
    showToast('تم تحديث بيانات المنتج بنجاح', 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('تم حذف المنتج نهائياً', 'info');
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
    showToast(`تم تحديث حالة الطلب إلى "${status}"`, 'success');
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1, variant?: Record<string, string>) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          JSON.stringify(item.selectedVariant || {}) === JSON.stringify(variant || {})
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: Math.min(newQty, product.stock)
        };
        return updated;
      }

      const cartId = `${product.id}-${Date.now()}`;
      return [
        ...prevCart,
        { cartId, product, quantity: Math.min(quantity, product.stock), selectedVariant: variant }
      ];
    });

    showToast(`تمت إضافة "${product.name.slice(0, 24)}..." إلى سلة مشترياتك!`, 'success');
  };

  const removeFromCart = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
    showToast('تم إزالة الصنف من السلة', 'info');
  };

  const updateCartQuantity = (cartId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.cartId === cartId) {
          const validQty = Math.min(quantity, item.product.stock);
          return { ...item, quantity: validQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string): boolean => {
    const trimmed = code.trim().toUpperCase();
    const found = VALID_COUPONS.find((c) => c.code === trimmed);
    if (!found) {
      setCouponError('كود الخصم غير صحيح أو منتهي الصلاحية');
      return false;
    }
    if (found.minPurchase && cartSubtotal < found.minPurchase) {
      setCouponError(`الحد الأدنى لاستخدام هذا الكود هو ${found.minPurchase} ج.م`);
      return false;
    }
    setAppliedCoupon(found);
    setCouponError(null);
    showToast(`تم تفعيل خصم (${found.discountPercentage}%) بكود ${found.code}!`, 'success');
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
  };

  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartDiscount = appliedCoupon
    ? Math.round((cartSubtotal * appliedCoupon.discountPercentage) / 100)
    : 0;
  // Free shipping above 1000 EGP in Egypt, otherwise 50 EGP
  const cartShipping = cartSubtotal >= 1000 || cartSubtotal === 0 ? 0 : 50;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartShipping);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Financial Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalAdminCommissions = orders.reduce((sum, o) => sum + (o.totalAdminCommission || 0), 0);
  const totalPaidAdsRevenue = products
    .filter((p) => p.listingType === 'paid_ad' && p.approvalStatus === 'approved')
    .reduce((sum, p) => sum + (p.adFeePaid || 150), 0);
  const totalMerchantPayouts = Math.max(0, totalRevenue - totalAdminCommissions);

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('تمت إزالة المنتج من المفضلة', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('تم حفظ المنتج في قائمة الرغبات ❤️', 'success');
        return [...prev, productId];
      }
    });
  };

  const isItemInWishlist = (productId: string) => wishlist.includes(productId);

  // Place Order (Online)
  const createOrder = (customer: CustomerInfo, paymentMethod: PaymentMethod): Order => {
    const orderNum = `EG-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    // Calculate admin commission on this order
    const orderAdminCommission = cart.reduce((sum, it) => {
      if (it.product.listingType === 'commission') {
        const rate = it.product.commissionRate || 10;
        return sum + Math.round((it.product.price * it.quantity * rate) / 100);
      }
      return sum;
    }, 0);

    const newOrder: Order = {
      id: `ord-eg-${Date.now()}`,
      orderNumber: orderNum,
      items: [...cart],
      subtotal: cartSubtotal,
      discount: cartDiscount,
      shipping: cartShipping,
      total: cartTotal,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      status: 'pending',
      totalAdminCommission: orderAdminCommission,
      customer,
      createdAt: new Date().toLocaleString('ar-EG', { dateStyle: 'short', timeStyle: 'short' }),
      trackingNumber: `BOSTA-EG-${Math.floor(100000 + Math.random() * 900000)}`
    };

    // Deduct stock and credit merchant sales
    setProducts((prev) =>
      prev.map((prod) => {
        const inOrder = cart.find((c) => c.product.id === prod.id);
        if (inOrder) {
          return { ...prod, stock: Math.max(0, prod.stock - inOrder.quantity) };
        }
        return prod;
      })
    );

    // Update merchant balances if products belonged to registered merchants
    cart.forEach((it) => {
      if (it.product.merchantId) {
        setMerchants((prevM) =>
          prevM.map((m) => {
            if (m.id === it.product.merchantId) {
              const saleAmount = it.product.price * it.quantity;
              const commissionCut =
                it.product.listingType === 'commission'
                  ? Math.round((saleAmount * (it.product.commissionRate || 10)) / 100)
                  : 0;
              const netGain = saleAmount - commissionCut;
              return {
                ...m,
                totalSales: m.totalSales + saleAmount,
                commissionPaidToAdmin: m.commissionPaidToAdmin + commissionCut,
                netEarnings: m.netEarnings + netGain
              };
            }
            return m;
          })
        );
      }
    });

    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrder(newOrder);
    clearCart();
    setIsCheckoutOpen(false);
    setCurrentView('order-success');
    showToast(`تم تسجيل وتأكيد طلبك برقم ${orderNum} بنجاح!`, 'success');
    return newOrder;
  };

  // WhatsApp Order (Egyptian Format)
  const createWhatsAppOrder = (customer: CustomerInfo): { order: Order; whatsappUrl: string } => {
    const orderNum = `EG-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const orderAdminCommission = cart.reduce((sum, it) => {
      if (it.product.listingType === 'commission') {
        const rate = it.product.commissionRate || 10;
        return sum + Math.round((it.product.price * it.quantity * rate) / 100);
      }
      return sum;
    }, 0);

    const newOrder: Order = {
      id: `ord-eg-${Date.now()}`,
      orderNumber: orderNum,
      items: [...cart],
      subtotal: cartSubtotal,
      discount: cartDiscount,
      shipping: cartShipping,
      total: cartTotal,
      paymentMethod: 'whatsapp',
      paymentStatus: 'pending',
      status: 'pending',
      totalAdminCommission: orderAdminCommission,
      customer,
      createdAt: new Date().toLocaleString('ar-EG', { dateStyle: 'short', timeStyle: 'short' }),
      trackingNumber: `BOSTA-EG-${Math.floor(100000 + Math.random() * 900000)}`
    };

    // Format WhatsApp message for Egypt
    const storePhone = '201000000000'; // Egypt phone format
    let msg = `السلام عليكم ورحمة الله، متجر رواق مصر 🇪🇬\n`;
    msg += `أود تأكيد طلبي الجديد عبر المتجر:\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `📦 *رقم الطلب:* ${orderNum}\n`;
    msg += `👤 *اسم العميل:* ${customer.fullName}\n`;
    msg += `📱 *رقم الموبايل:* ${customer.phone}\n`;
    msg += `📍 *المحافظة والعنوان:* ${customer.governorate} - ${customer.city} - ${customer.address}\n`;
    if (customer.notes) msg += `📝 *ملاحظات التوصيل:* ${customer.notes}\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `🛍️ *المنتجات المصرية المطلوبة:*\n`;

    cart.forEach((item, index) => {
      const variantStr = item.selectedVariant
        ? ` (${Object.entries(item.selectedVariant).map(([k, v]) => `${k}: ${v}`).join('، ')})`
        : '';
      msg += `${index + 1}. ${item.product.name}${variantStr}\n   الكمية: ${item.quantity} × ${item.product.price} ج.م = ${item.quantity * item.product.price} ج.م\n`;
    });

    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `💵 *المجموع الفرعي:* ${cartSubtotal} ج.م\n`;
    if (cartDiscount > 0) {
      msg += `🏷️ *الخصم (${appliedCoupon?.code}):* -${cartDiscount} ج.م\n`;
    }
    msg += `🚚 *الشحن لـ ${customer.governorate}:* ${cartShipping === 0 ? 'مجاني' : `${cartShipping} ج.م`}\n`;
    msg += `✨ *المبلغ الإجمالي المستحق:* ${cartTotal} ج.م\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `برجاء إرسال تفاصيل التحويل عبر فودافون كاش أو إنستاباي لتأكيد الشحن فوراً، شكراً جزيلاً!`;

    const encoded = encodeURIComponent(msg);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${storePhone}&text=${encoded}`;

    // Deduct stock
    setProducts((prev) =>
      prev.map((prod) => {
        const inOrder = cart.find((c) => c.product.id === prod.id);
        if (inOrder) {
          return { ...prod, stock: Math.max(0, prod.stock - inOrder.quantity) };
        }
        return prod;
      })
    );

    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrder(newOrder);
    clearCart();
    setIsWhatsAppCheckoutOpen(false);
    setCurrentView('order-success');
    showToast(`تم تجهيز رسالة واتساب للطلب ${orderNum}!`, 'success');

    return { order: newOrder, whatsappUrl };
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        approvedProducts,
        pendingApprovalProducts,
        cart,
        orders,
        wishlist,
        activeCategory,
        searchQuery,
        sortBy,
        selectedProduct,
        isCartOpen,
        isCheckoutOpen,
        isWhatsAppCheckoutOpen,
        isMerchantModalOpen,
        appliedCoupon,
        couponError,
        currentView,
        activeOrder,
        toasts,

        merchants,
        currentMerchant,
        registerMerchant,
        loginMerchant,
        logoutMerchant,
        submitMerchantProduct,

        approveProduct,
        rejectProduct,
        addProduct,
        updateProduct,
        deleteProduct,
        updateOrderStatus,

        totalRevenue,
        totalAdminCommissions,
        totalPaidAdsRevenue,
        totalMerchantPayouts,

        setActiveCategory,
        setSearchQuery,
        setSortBy,
        setSelectedProduct,
        setIsCartOpen,
        setIsCheckoutOpen,
        setIsWhatsAppCheckoutOpen,
        setIsMerchantModalOpen,
        setCurrentView,

        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,

        cartSubtotal,
        cartDiscount,
        cartShipping,
        cartTotal,
        cartItemCount,

        createOrder,
        createWhatsAppOrder,

        toggleWishlist,
        isItemInWishlist,

        formatPrice,
        showToast,
        removeToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return context;
};
